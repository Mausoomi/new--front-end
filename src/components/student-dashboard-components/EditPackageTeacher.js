import React, { useEffect, useState } from "react";
import { fetchPackage } from "../../store/actions/packagesActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../admin-dashboard-components/AdminNav";
import {
  Create_CutsomPackage,
  GetExistingTeacher_Availability,
} from "../../store/actions/teachersActions";
import { Modal } from "antd";
import { toast } from "react-toastify";

const EditPackageTeacher = () => {
  const { Package_ID } = useParams();
  const dispatch = useDispatch();
  const [Availability, setAvailability] = useState();
  const [loading, setLoading] = useState(false);
  const [SelectedSlots, setSelectedSlots] = useState({}); // Object to store selected slots for each teacher
  const [isModalVisible, setIsModalVisible] = useState();
  const [SelectedTeacherId, setSelectedTeacherId] = useState(null);
  const [AllSlots, setAllSlots] = useState([]);
  const user = useSelector((state) => state.students.user);
  const pack = useSelector((state) => state.packages.currentPackage);
  const Number_of_Lectures = pack.Number_of_Lectures;

  const TeacherSlots = useSelector(
    (state) => state.teachers.Teacher_Availabile_Slots
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        await dispatch(fetchPackage(Package_ID));
      } catch (error) {
        console.error("Error fetching package:", error.message);
      }
    };
    fetchPackageData();
  }, [Package_ID, dispatch]);

  useEffect(() => {
    if (TeacherSlots.length > 0) {
      setAvailability(TeacherSlots);
    }
  }, [TeacherSlots]);

  const HandleAvailability = (id) => {
    dispatch(GetExistingTeacher_Availability(id));
    setIsModalVisible(id); // Pass teacher._id as the argument
    setSelectedTeacherId(id);
  };

  const handleSlotSelection = (teacherId, date, slot) => {
    setSelectedSlots((prevSelectedSlots) => {
      const updatedSelectedSlots = { ...prevSelectedSlots };

      // If the teacherId is not present in selectedSlots, initialize it with an empty object
      if (!updatedSelectedSlots.hasOwnProperty(teacherId)) {
        updatedSelectedSlots[teacherId] = {};
      }

      // If the date is not present for the teacher, initialize it with an empty array
      if (!updatedSelectedSlots[teacherId].hasOwnProperty(date)) {
        updatedSelectedSlots[teacherId][date] = [];
      }

      // Check if the slot is already selected for this date and teacher
      const isSlotSelected = updatedSelectedSlots[teacherId][date].some(
        (selectedSlot) =>
          selectedSlot.start === slot.start && selectedSlot.end === slot.end
      );

      // If the slot is not selected, add it; otherwise, remove it
      if (!isSlotSelected) {
        updatedSelectedSlots[teacherId][date].push(slot);
      } else {
        const selectedIndex = updatedSelectedSlots[teacherId][date].filter(
          (selectedSlot) =>
            selectedSlot.start === slot.start && selectedSlot.end === slot.end
        );
        updatedSelectedSlots[teacherId][date].splice(selectedIndex, 1);
      }

      return updatedSelectedSlots;
    });
  };

  const submitHandler = () => {
    // console.log(SelectedSlots);

    // Check if there are more than one teacher selected
    const mergedSlots = Object.values(SelectedSlots).reduce((acc, slots) => {
      for (const date in slots) {
        if (acc[date]) {
          acc[date] = acc[date].concat(slots[date]);
        } else {
          acc[date] = [...slots[date]];
        }
      }
      return acc;
    }, {});

    setAllSlots([...AllSlots, mergedSlots]); // Push mergedSlots into AllSlots array
    setSelectedSlots({}); // Reset SelectedSlots to empty object

    setIsModalVisible(false); // Close modal after submission
  };

  // console.log(AllSlots);

  const PackageMaker = async (e) => {
    e.preventDefault();
    let totalCount = 0;
    // console.log(AllSlots);
    for (const date in AllSlots) {
      const slots = AllSlots[date];
      for (const key in slots) {
        if (Array.isArray(slots[key])) {
          totalCount += slots[key].length;
        } else {
          console.error(
            "Invalid slot structure for date",
            date,
            ":",
            slots[key]
          );
        }
      }
    }
    // console.log("Total number of objects:", totalCount);
    if (totalCount === 0) {
      return toast.error("Please select the slots of the teacher");
    }
    if (totalCount === Number_of_Lectures || totalCount < Number_of_Lectures) {
      const formData = {
        Student_ID: user._id,
        Package_ID: pack._id,
        Scheduled_Dates: AllSlots,
      };
      await dispatch(Create_CutsomPackage(formData));
      await navigate(`/Student-dashboard/Packages/${Package_ID}`, {
        state: totalCount,
      });
    } else {
      await toast.error(
        `The Number of selected Slot should Equal to Number of Lectures Provided`
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="Package_mainPage_style">
        <form onSubmit={PackageMaker}>
          <div className="Package_header_style">
            <h6 className="text-dark">
              Please Select Teachers and their Availability
            </h6>
          </div>
          <div className="Package_list_style mt-3">
            <div className="d-flex flex-wrap mx-5 w-100 mt-2">
              {pack?.Teacher_IDs?.map((teacher, index) => (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-light mx-3"
                    key={index}
                    onClick={() => HandleAvailability(teacher._id)}
                  >
                    <div className="EditPackage_card">
                      <div className="EditPackage_div">
                        <div className="EditPackage_image_div">
                          <img
                            src={`https://ik.imagekit.io/8s3jwexmv/${
                              teacher?.Profile_Image[0] || "default-profile.jpg"
                            }`}
                            alt={`${teacher.Username}'s Profile`}
                          />
                        </div>
                        <span className="Courses_card_teacher_span mx-1 mt-3">
                          {teacher.Username}
                        </span>
                        <span className="Courses_card_teacher_span mx-1 mt-2">
                          {teacher?.Short_Title}
                        </span>
                        <span className="Courses_card_teacher_span mx-1 mt-2">
                          {teacher?.Email}
                        </span>
                      </div>
                    </div>
                  </button>
                </>
              ))}
            </div>
            <Modal
              open={isModalVisible === SelectedTeacherId}
              onOk={submitHandler}
              onCancel={() => setIsModalVisible(false)}
            >
              <div className="mt-3">
                {Availability ? (
                  <>
                    {Availability?.map((dateSlots, index) => (
                      <div key={index}>
                        {Object.entries(dateSlots).map(
                          ([date, slots], innerIndex) => (
                            <div key={innerIndex}>
                              <h4>{date}</h4>
                              {slots.map((slot, slotIndex) => (
                                <div key={slotIndex}>
                                  <input
                                    type="checkbox"
                                    id={`${SelectedTeacherId}-${index}-${slotIndex}`}
                                    checked={
                                      SelectedSlots[SelectedTeacherId] &&
                                      SelectedSlots[SelectedTeacherId][date] &&
                                      SelectedSlots[SelectedTeacherId][
                                        date
                                      ].some(
                                        (selectedSlot) =>
                                          selectedSlot.start === slot.start &&
                                          selectedSlot.end === slot.end
                                      )
                                    }
                                    onChange={() =>
                                      handleSlotSelection(
                                        SelectedTeacherId,
                                        date,
                                        slot
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`${SelectedTeacherId}-${index}-${slotIndex}`}
                                  >
                                    {slot.start} - {slot.end}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="mx-3 mt-3"> Please Select a Teacher First</p>
                )}
              </div>
            </Modal>
          </div>
          <div className="w-100 d-flex justify-content-end p-2">
            <button type="submit" className="btn btn-outline-danger w-25 mx-4">
              CheckDetails
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPackageTeacher;
