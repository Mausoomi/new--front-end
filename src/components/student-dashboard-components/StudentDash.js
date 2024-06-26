// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// import { useDispatch, useSelector } from "react-redux";
// import { GetBookingsByStudentID } from "../../store/actions/bookingActions";
// import { useNavigate } from "react-router-dom";
// import OwncloudSignupFormPopup from "./OwncloudSignupFormPopup";

// const StudentDash = () => {
//   const student = useSelector((state) => state.students.user);
//   const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
//   console.log(Bookings);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [OwncloudFormPopup, setOwncloudSignupFormPopup] = useState(false);
//   const [date, setDate] = useState(new Date()); // Define date state variable
// const [fillterBookingData , setFillterBookingData] = useState(false)
//   // console.log(Bookings);

//   useEffect(() => {
//     dispatch(GetBookingsByStudentID(student._id));
//   }, [student._id, dispatch]);

//   //---------------------------------------------------------------------------------------------- Total number of lectures -----------------
//   const countTotalLectures = (Bookings) => {
//     return Bookings.reduce((total, booking) => {
//       const numberOfLectures = booking.Package_ID.Number_of_Lectures || 0;
//       return total + numberOfLectures;
//     }, 0);
//   };

//   const totalLectures = countTotalLectures(Bookings);

//   // --------------------------------------------------------------------------------------------- Completed Sessions  ----------------------
//   function countCompletedSessions(Bookings) {
//     let completedSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Completed"
//       if (Booking.Status === "Completed") {
//         completedSessionsCount++;
//       }
//     }
//     return completedSessionsCount;
//   }
//   const completedSessions = countCompletedSessions(Bookings);

//   // ---------------------------------------------------------------------------------------------- Pending Sessions -------------------------
//   function countPendingOrScheduledSessions(Bookings) {
//     let pendingOrScheduledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is either "Pending" or "Scheduled"
//       if (Booking.Status === "Pending" || Booking.Status === "Scheduled") {
//         pendingOrScheduledSessionsCount++;
//       }
//     }
//     return pendingOrScheduledSessionsCount;
//   }
//   const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

//   // ------------------------------------------------------------------------------------------------ Cancelled Sessions ----------------------
//   function countCancelledSessions(Bookings) {
//     let cancelledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Cancelled"
//       if (Booking.Status === "Cancelled") {
//         cancelledSessionsCount++;
//       }
//     }
//     return cancelledSessionsCount;
//   }
//   const cancelledSessions = countCancelledSessions(Bookings);
//   // ---------------------------------------------------------------------------------------------------------------------------------------------

//   const roomHandler = (id) => {
//     navigate(`/room/meeting/${id}`);
//   };

//   const DispatchHandler = async () => {
//     // console.log(student.hasOwncloudAccount);
//     if (student.hasOwncloudAccount) {
//       window.open("https://cloud.speakable.online/", "_blank");
//     }else{
//       openOwncloudSignupFormPopup()
//     }
//   };

//   const closeOwncloudSignupFormPopup = () => {
//     setOwncloudSignupFormPopup(false);
//   };

//   const openOwncloudSignupFormPopup = () => {
//     setOwncloudSignupFormPopup(true);
//   };

//   const tileContent = ({ date, view }) => {
//     console.log(date)
//     if (view === "month") {
//       const dateString = date.toDateString();
//       // Iterate through each booking and check if the date is scheduled
//       for (const booking of Bookings) {
//         if (booking.Scheduled_Dates) {
//           for (const scheduledDateObj of booking.Scheduled_Dates) {
//             for (const scheduledDates of scheduledDateObj) {
//                 const scheduledDate = Object.keys(scheduledDates);
//                 for (const Dates of scheduledDate) {
//                 const scheduledDateString = new Date(Dates).toDateString();
//                 if (scheduledDateString === dateString) {
//                   return <p className="bg-success text-white">L</p>;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     return null; // Return null if no match is found
//   };

//   return (
//     <>
//       <AdminNav />
//       <div className="Dash_mainPage_style">
//         <h6>Student Dashboard</h6>
//         <div className="Admin-Dash_contnet_box">
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_div_img"
//               src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Total Lectures
//             </span>
//             <span style={{ color: "grey" }}>{totalLectures}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Complete Sessions
//             </span>
//             <span style={{ color: "grey" }}>{completedSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Remaining Sessions
//             </span>
//             <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Cancelled Income
//             </span>
//             <span style={{ color: "grey" }}>{cancelledSessions}</span>
//           </div>
//         </div>
//         <div className="Admin-Dash_list_box">
//           <div className="Admin-Dash_student_list_box">
//             <h6>Meetings</h6>
//             <div className="Admin-Dash_student_list_div">
//               <table className="table  table-responsive table-borderless">
//                 <thead className="table-transparent">
//                   <tr>
//                     <th className="th">#</th>
//                     <th className="th">Teacher Name</th>
//                     <th className="th">Scheduled_Dates</th>
//                     <th className="th">Status</th>
//                     <th className="th">Join Button</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* {fillterBookingData? "":} */}
//                   {Bookings?.length > 0 ? (
//                     Bookings?.map((Booking, index) => (
//                       <tr
//                         style={{
//                           boxShadow:
//                             "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                         }}
//                         key={Booking?._id}
//                       >
//                         <td className="td">{index + 1}</td>
//                         <td className="td">
//                           {Booking?.Teacher_ID?.map((teacher, index) => {
//                             return teacher.Username;
//                           })}
//                         </td>
//                         <td className="td">
//                           {Booking?.Scheduled_Dates?.map((dateObj, index) => {
//                             const date = Object.keys(dateObj)[0]; // Extracting the date
//                             const timeSlots = dateObj[date]; // Extracting the array of time slots for the date

//                             return (
//                               <div key={index}>
//                                 {Object?.keys(timeSlots).map((date) => (
//                                   <div key={date}>
//                                     <p>Date: {date}</p>
//                                     <ul>
//                                       {timeSlots[date].map((slot, index) => (
//                                         <li key={index}>
//                                           {slot.start} - {slot.end}
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             );
//                           })}
//                         </td>
//                         <td className="td">{Booking?.Status}</td>
//                         <td className="tdexternal">
//                           <button
//                             onClick={() => roomHandler(Booking._id)}
//                             className="btn btn-outline-success meetingbtn"
//                           >
//                             Join Room
//                           </button>
//                           <button
//                             onClick={() => DispatchHandler()}
//                             className="btn btn-outline-warning meetingbtn mt-2"
//                           >
//                             Your Material
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4">No Bookings available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="Admin-Dash_student_calender_box">
//             <h6>Events - 2023 to 2024</h6>
//             <br />
//             <Calendar
//               value={date}
//               prev2Label={false}
//               next2Label={false}
//               tileContent={tileContent}
//             />
//           </div>
//         </div>
//       </div>
//       {OwncloudFormPopup && (
//         <OwncloudSignupFormPopup handleClose={closeOwncloudSignupFormPopup} />
//       )}
//     </>
//   );
// };

// export default StudentDash;

// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// import { useDispatch, useSelector } from "react-redux";
// import { GetBookingsByStudentID } from "../../store/actions/bookingActions";
// import { useNavigate } from "react-router-dom";
// import OwncloudSignupFormPopup from "./OwncloudSignupFormPopup";

// const StudentDash = () => {
//   const student = useSelector((state) => state.students.user);
//   const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
//   console.log(Bookings);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [OwncloudFormPopup, setOwncloudSignupFormPopup] = useState(false);
//   const [date, setDate] = useState(new Date()); // Define date state variable
//   const [fillterBookingData, setFillterBookingData] = useState(false);
//   const [fillterDataValue, setFillterDataValue] = useState("");
//   console.log(Bookings);

//   useEffect(() => {
//     dispatch(GetBookingsByStudentID(student._id));
//   }, [student._id, dispatch]);

//   //---------------------------------------------------------------------------------------------- Total number of lectures -----------------
//   const countTotalLectures = (Bookings) => {
//     return Bookings.reduce((total, booking) => {
//       const numberOfLectures = booking.Package_ID.Number_of_Lectures || 0;
//       return total + numberOfLectures;
//     }, 0);
//   };

//   const totalLectures = countTotalLectures(Bookings);

//   // --------------------------------------------------------------------------------------------- Completed Sessions  ----------------------
//   function countCompletedSessions(Bookings) {
//     let completedSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Completed"
//       if (Booking.Status === "Completed") {
//         completedSessionsCount++;
//       }
//     }
//     return completedSessionsCount;
//   }
//   const completedSessions = countCompletedSessions(Bookings);

//   // ---------------------------------------------------------------------------------------------- Pending Sessions -------------------------
//   function countPendingOrScheduledSessions(Bookings) {
//     let pendingOrScheduledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is either "Pending" or "Scheduled"
//       if (Booking.Status === "Pending" || Booking.Status === "Scheduled") {
//         pendingOrScheduledSessionsCount++;
//       }
//     }
//     return pendingOrScheduledSessionsCount;
//   }
//   const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

//   // ------------------------------------------------------------------------------------------------ Cancelled Sessions ----------------------
//   function countCancelledSessions(Bookings) {
//     let cancelledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Cancelled"
//       if (Booking.Status === "Cancelled") {
//         cancelledSessionsCount++;
//       }
//     }
//     return cancelledSessionsCount;
//   }
//   const cancelledSessions = countCancelledSessions(Bookings);
//   // ---------------------------------------------------------------------------------------------------------------------------------------------

//   const roomHandler = (id) => {
//     navigate(`/room/meeting/${id}`);
//   };

//   const DispatchHandler = async () => {
//     // console.log(student.hasOwncloudAccount);
//     if (student.hasOwncloudAccount) {
//       window.open("https://cloud.speakable.online/", "_blank");
//     } else {
//       openOwncloudSignupFormPopup();
//     }
//   };

//   const closeOwncloudSignupFormPopup = () => {
//     setOwncloudSignupFormPopup(false);
//   };

//   const openOwncloudSignupFormPopup = () => {
//     setOwncloudSignupFormPopup(true);
//   };

//   const tileContent = ({ date, view }) => {
//     // console.log(date);
//     // setFillterBookingData(true)
//     if (view === "month") {
//       const dateString = date?.toDateString();
//       // Iterate through each booking and check if the date is scheduled
//       for (const booking of Bookings) {
//         if (booking?.Scheduled_Dates) {
//           // console.log("----------------- Bookings -" , booking?.Scheduled_Dates);
//           if (booking?.Scheduled_Dates[0] !== null) {
//             for (const scheduledDateObj of booking?.Scheduled_Dates) {
//               for (const scheduledDates of scheduledDateObj) {
//                 const scheduledDate = Object?.keys(scheduledDates);
//                 for (const Dates of scheduledDate) {
//                   const scheduledDateString = new Date(Dates)?.toDateString();
//                   if (scheduledDateString === dateString) {
//                     return <p className="bg-success text-white">L</p>;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     return null; // Return null if no match is found
//   };

//   const handleCalendarClick = (value) => {
//     // console.log(value);
//     // setFillterBookingData(true);
//     // setFillterDataValue(value)
//     // console.log(fillterDataValue)
//     // const formattedDate = value.toLocaleDateString("en-US", {
//     //   weekday: "short",
//     //   month: "short",
//     //   day: "numeric",
//     //   year: "numeric",
//     // });

//     // console.log(formattedDate); // This will log the formatted date like "Sat May 11 2024"

//     // setFillterBookingData(true);
//     // setFillterDataValue(formattedDate);
//     const options = {
//       weekday: "short",
//       month: "short",
//       day: "2-digit", // Use "2-digit" to display day without leading zeros
//       year: "numeric",
//     };

//     const formattedDate = value.toLocaleDateString("en-US", options);

//     const formattedDateWithoutComma = formattedDate.replace(/,/g, "");

//     // console.log(formattedDateWithoutComma); // This will log the formatted date without commas like "Tue Apr 30 2024"

//     setFillterBookingData(true);
//     setFillterDataValue(formattedDateWithoutComma);
//   };

//   console.log(fillterDataValue , "selected value");

//   return (
//     <>
//       <AdminNav />
//       <div className="Dash_mainPage_style">
//         <h6>Student Dashboard</h6>
//         <div className="Admin-Dash_contnet_box">
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_div_img"
//               src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Total Lectures
//             </span>
//             <span style={{ color: "grey" }}>{totalLectures}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Complete Sessions
//             </span>
//             <span style={{ color: "grey" }}>{completedSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Remaining Sessions
//             </span>
//             <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Cancelled Income
//             </span>
//             <span style={{ color: "grey" }}>{cancelledSessions}</span>
//           </div>
//         </div>
//         <div className="Admin-Dash_list_box">
//           <div className="Admin-Dash_student_list_box">
//             <h6>Meetings</h6>
//             <div className="Admin-Dash_student_list_div">
//               <table className="table  table-responsive table-borderless">
//                 <thead className="table-transparent">
//                   <tr>
//                     <th className="th">#</th>
//                     <th className="th">Teacher Name</th>
//                     <th className="th">Scheduled_Dates</th>
//                     <th className="th">Status</th>
//                     <th className="th">Join Button</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {fillterBookingData ? (
//                     <>
//                       {/* here */}
//                       {Bookings?.length > 0 ? (
//                         Bookings?.map((Booking, index) => {
//                           const isDateMatched = Booking?.Scheduled_Dates?.some(
//                             (dateObj) => {
//                               // Iterate over the entries of dateObj
//                               for (const [key, value] of Object.entries(
//                                 dateObj
//                               )) {
//                                 console.log(value, "date");
//                                 console.log(dateObj);
//                                 //   for (const innerKey in value) {
//                                 //     console.log(value[innerKey]);
//                                 //     if (typeof value[innerKey] === "object") {
//                                 // console.log(value[innerKey] , "valuewith key");
//                                 //       // console.log(innerKey, "...keyout");
//                                 //       const dateArray = Object.keys(value);
//                                 //       console.log(dateArray, "arrdate");

//                                 //       dateArray.forEach((date) => {
//                                 //         const valueForDate = value[date];
//                                 //         if (valueForDate === fillterDataValue) {
//                                 //           console.log(date , "innerArrY"); // Log the date if value matches the filter
//                                 //         }
//                                 //         return valueForDate === fillterDataValue;
//                                 //       });

//                                 //       //     const selectedDate=dateArray.map((selectedDate) =>
//                                 //       //       console.log(selectedDate)
//                                 //       //  );

//                                 //       // if (innerKey === fillterDataValue) {
//                                 //       //   console.log(innerKey, "...key");
//                                 //       //   console.log(
//                                 //       //     fillterBookingData,
//                                 //       //     "..fillter"
//                                 //       //   );
//                                 //       // }
//                                 //       // Recursively call iterate function for nested objects
//                                 //       // iterate(obj[key]);
//                                 //     }
//                                 //     // console.log(value, "---innerkey");

//                                 //     // console.log(
//                                 //     //   fillterDataValue,
//                                 //     //   "--fillterDataselectedclicked"
//                                 //     // );
//                                 //     // return innerKey === fillterDataValue; // If key matches filterDataValue, return true
//                                 //   }
//                                 // Assuming fillterDataValue is defined elsewhere
//                                 const dateKeysArray = [];
//                                 dateObj.forEach((obj) => {
//                                   // Iterate over the keys of each object
//                                   Object.keys(obj).forEach((dateKey) => {
//                                     dateKeysArray.push(dateKey);
//                                     console.log("Date:", dateKey);
//                                     console.log("Values:", obj[dateKey]);
//                                     dateKeysArray.map((ele, index)=>{
//                                       if (ele ===fillterDataValue ){
//                                         console.log(ele)
//                                         return ele === fillterDataValue;
//                                       }
//                                     })
//                                   });
//                                 });
//                                 console.log("Date Keys Array:", dateKeysArray);

//                                       // dateKeysArray.forEach((date) => {
//                                       //   const valueForDate = value[date];
//                                       //   if (valueForDate === fillterDataValue) {
//                                       //     console.log(date, "innerArrY"); // Log the date if value matches the filter
//                                       //   }
//                                       //   return (
//                                       //     valueForDate === fillterDataValue
//                                       //   );
//                                       // });
//                               }

//                             }
//                           );
//                           console.log(isDateMatched);
//                           // If any date matches, render the booking
//                           if (isDateMatched) {
//                             return (
//                               <tr
//                                 style={{
//                                   boxShadow:
//                                     "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                                 }}
//                                 key={Booking?._id}
//                               >
//                                 <td className="td">{index + 1}</td>
//                                 <td className="td">
//                                   {Booking?.Teacher_ID?.map(
//                                     (teacher, index) => {
//                                       return teacher.Username;
//                                     }
//                                   )}
//                                 </td>
//                                 <td className="td">
//                                   {Booking?.Scheduled_Dates?.map(
//                                     (dateObj, index) => {
//                                       const date = Object.keys(dateObj)[0]; // Extracting the date
//                                       const timeSlots = dateObj[date]; // Extracting the array of time slots for the date

//                                       return (
//                                         <div key={index}>
//                                           {Object?.keys(timeSlots).map(
//                                             (date) => (
//                                               <div key={date}>
//                                                 <p>Date: {date}</p>
//                                                 <ul>
//                                                   {timeSlots[date].map(
//                                                     (slot, index) => (
//                                                       <li key={index}>
//                                                         {slot.start} -{" "}
//                                                         {slot.end}
//                                                       </li>
//                                                     )
//                                                   )}
//                                                 </ul>
//                                               </div>
//                                             )
//                                           )}
//                                         </div>
//                                       );
//                                     }
//                                   )}
//                                 </td>
//                                 <td className="td">{Booking?.Status}</td>
//                                 <td className="tdexternal">
//                                   <button
//                                     onClick={() => roomHandler(Booking._id)}
//                                     className="btn btn-outline-success meetingbtn"
//                                   >
//                                     Join Room
//                                   </button>
//                                   <button
//                                     onClick={() => DispatchHandler()}
//                                     className="btn btn-outline-warning meetingbtn mt-2"
//                                   >
//                                     Your Material
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           } else {
//                             return null; // If no date matches, return null
//                           }
//                         })
//                       ) : (
//                         <tr>
//                           <td colSpan="4">No Bookings available</td>
//                         </tr>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       {Bookings?.length > 0 ? (
//                         Bookings?.map((Booking, index) => (
//                           <tr
//                             style={{
//                               boxShadow:
//                                 "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                             }}
//                             key={Booking?._id}
//                           >
//                             <td className="td">{index + 1}</td>
//                             <td className="td">
//                               {Booking?.Teacher_ID?.map((teacher, index) => {
//                                 return teacher.Username;
//                               })}
//                             </td>
//                             <td className="td">
//                               {Booking?.Scheduled_Dates?.map(
//                                 (dateObj, index) => {
//                                   if (dateObj !== null) {
//                                     const date = Object.keys(dateObj)[0]; // Extracting the date
//                                     const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
//                                     return (
//                                       <div key={index}>
//                                         {Object?.keys(timeSlots).map((date) => (
//                                           <div key={date}>
//                                             <p>Date: {date}</p>
//                                             <ul>
//                                               {timeSlots[date].map(
//                                                 (slot, index) => (
//                                                   <li key={index}>
//                                                     {slot.start} - {slot.end}
//                                                   </li>
//                                                 )
//                                               )}
//                                             </ul>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     );
//                                   }
//                                 }
//                               )}
//                             </td>
//                             <td className="td">{Booking?.Status}</td>
//                             <td className="tdexternal">
//                               <button
//                                 onClick={() => roomHandler(Booking._id)}
//                                 className="btn btn-outline-success meetingbtn"
//                               >
//                                 Join Room
//                               </button>
//                               <button
//                                 onClick={() => DispatchHandler()}
//                                 className="btn btn-outline-warning meetingbtn mt-2"
//                               >
//                                 Your Material
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4">No Bookings available</td>
//                         </tr>
//                       )}
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="Admin-Dash_student_calender_box">
//             <h6>Events - 2023 to 2024</h6>
//             <br />
//             <Calendar
//               value={date}
//               prev2Label={false}
//               next2Label={false}
//               tileContent={tileContent}
//               onChange={handleCalendarClick}
//             />
//           </div>
//         </div>
//       </div>
//       {OwncloudFormPopup && (
//         <OwncloudSignupFormPopup handleClose={closeOwncloudSignupFormPopup} />
//       )}
//     </>
//   );
// };

// export default StudentDash;













// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// import { useDispatch, useSelector } from "react-redux";
// import { GetBookingsByStudentID } from "../../store/actions/bookingActions";
// import { useNavigate } from "react-router-dom";
// import OwncloudSignupFormPopup from "./OwncloudSignupFormPopup";

// const StudentDash = () => {
//   const student = useSelector((state) => state.students.user);
//   const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
//   console.log(Bookings);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [OwncloudFormPopup, setOwncloudSignupFormPopup] = useState(false);
//   const [date, setDate] = useState(new Date()); // Define date state variable
//   const [fillterBookingData, setFillterBookingData] = useState(false);
//   const [fillterDataValue, setFillterDataValue] = useState("");
//   console.log(Bookings);

//   useEffect(() => {
//     dispatch(GetBookingsByStudentID(student._id));
//   }, [student._id, dispatch]);

//   //---------------------------------------------------------------------------------------------- Total number of lectures -----------------
//   const countTotalLectures = (Bookings) => {
//     return Bookings.reduce((total, booking) => {
//       const numberOfLectures = booking.Package_ID.Number_of_Lectures || 0;
//       return total + numberOfLectures;
//     }, 0);
//   };

//   const totalLectures = countTotalLectures(Bookings);

//   // --------------------------------------------------------------------------------------------- Completed Sessions  ----------------------
//   function countCompletedSessions(Bookings) {
//     let completedSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Completed"
//       if (Booking.Status === "Completed") {
//         completedSessionsCount++;
//       }
//     }
//     return completedSessionsCount;
//   }
//   const completedSessions = countCompletedSessions(Bookings);

//   // ---------------------------------------------------------------------------------------------- Pending Sessions -------------------------
//   function countPendingOrScheduledSessions(Bookings) {
//     let pendingOrScheduledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is either "Pending" or "Scheduled"
//       if (Booking.Status === "Pending" || Booking.Status === "Scheduled") {
//         pendingOrScheduledSessionsCount++;
//       }
//     }
//     return pendingOrScheduledSessionsCount;
//   }
//   const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

//   // ------------------------------------------------------------------------------------------------ Cancelled Sessions ----------------------
//   function countCancelledSessions(Bookings) {
//     let cancelledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Cancelled"
//       if (Booking.Status === "Cancelled") {
//         cancelledSessionsCount++;
//       }
//     }
//     return cancelledSessionsCount;
//   }
//   const cancelledSessions = countCancelledSessions(Bookings);
//   // ---------------------------------------------------------------------------------------------------------------------------------------------

//   const roomHandler = (id) => {
//     navigate(`/room/meeting/${id}`);
//   };

//   const DispatchHandler = async () => {
//     // console.log(student.hasOwncloudAccount);
//     if (student.hasOwncloudAccount) {
//       window.open("https://cloud.speakable.online/", "_blank");
//     } else {
//       openOwncloudSignupFormPopup();
//     }
//   };

//   const closeOwncloudSignupFormPopup = () => {
//     setOwncloudSignupFormPopup(false);
//   };

//   const openOwncloudSignupFormPopup = () => {
//     setOwncloudSignupFormPopup(true);
//   };

//   const tileContent = ({ date, view }) => {
//     // console.log(date);
//     // setFillterBookingData(true)
//     if (view === "month") {
//       const dateString = date?.toDateString();
//       // Iterate through each booking and check if the date is scheduled
//       for (const booking of Bookings) {
//         if (booking?.Scheduled_Dates) {
//           // console.log("----------------- Bookings -" , booking?.Scheduled_Dates);
//           if (booking?.Scheduled_Dates[0] !== null) {
//             for (const scheduledDateObj of booking?.Scheduled_Dates) {
//               for (const scheduledDates of scheduledDateObj) {
//                 const scheduledDate = Object?.keys(scheduledDates);
//                 for (const Dates of scheduledDate) {
//                   const scheduledDateString = new Date(Dates)?.toDateString();
//                   if (scheduledDateString === dateString) {
//                     return <p className="bg-success text-white">L</p>;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     return null; // Return null if no match is found
//   };

//   const handleCalendarClick = (value) => {
//     // console.log(value);
//     // setFillterBookingData(true);
//     // setFillterDataValue(value)
//     // console.log(fillterDataValue)
//     // const formattedDate = value.toLocaleDateString("en-US", {
//     //   weekday: "short",
//     //   month: "short",
//     //   day: "numeric",
//     //   year: "numeric",
//     // });

//     // console.log(formattedDate); // This will log the formatted date like "Sat May 11 2024"

//     // setFillterBookingData(true);
//     // setFillterDataValue(formattedDate);
//     const options = {
//       weekday: "short",
//       month: "short",
//       day: "2-digit", // Use "2-digit" to display day without leading zeros
//       year: "numeric",
//     };

//     const formattedDate = value.toLocaleDateString("en-US", options);

//     const formattedDateWithoutComma = formattedDate.replace(/,/g, "");

//     // console.log(formattedDateWithoutComma); // This will log the formatted date without commas like "Tue Apr 30 2024"

//     setFillterBookingData(true);
//     setFillterDataValue(formattedDateWithoutComma);
//   };

//   console.log(fillterDataValue, "selected value");

//   return (
//     <>
//       <AdminNav />
//       <div className="Dash_mainPage_style">
//         <h6>Student Dashboard</h6>
//         <div className="Admin-Dash_contnet_box">
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_div_img"
//               src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Total Lectures
//             </span>
//             <span style={{ color: "grey" }}>{totalLectures}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Complete Sessions
//             </span>
//             <span style={{ color: "grey" }}>{completedSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Remaining Sessions
//             </span>
//             <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Cancelled Income
//             </span>
//             <span style={{ color: "grey" }}>{cancelledSessions}</span>
//           </div>
//         </div>
//         <div className="Admin-Dash_list_box">
//           <div className="Admin-Dash_student_list_box">
//             <h6>Meetings</h6>
//             <div className="Admin-Dash_student_list_div">
//               <table className="table  table-responsive table-borderless">
//                 <thead className="table-transparent">
//                   <tr>
//                     <th className="th">#</th>
//                     <th className="th">Teacher Name</th>
//                     <th className="th">Scheduled_Dates</th>
//                     <th className="th">Status</th>
//                     <th className="th">Join Button</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {fillterBookingData ? (
//                     <>
//                       {/* here */}
//                       {Bookings?.length > 0 ? (
//                         Bookings?.map((Booking, index) => {
//                              const isDateMatched =
//                                Booking?.Scheduled_Dates?.some((dateObj) => {
//                                  const dateKeysArray = [];
//                                  // Iterate over the entries of dateObj
//                                  for (const [key, value] of Object.entries(
//                                    dateObj
//                                  )) {
//                                    console.log(value, "date");
//                                    console.log(dateObj);

//                                    // Iterate over the keys of each object
//                                    Object.keys(dateObj).forEach((dateKey) => {
//                                      dateKeysArray.push(dateKey);
//                                      console.log("Date:", dateKey);
//                                      console.log("Values:", dateObj[dateKey]);
//                                    });

//                                    // Check if any value matches the filterDataValue
//                                    const isValueMatched = dateKeysArray.some(
//                                      (ele) => ele === fillterDataValue
//                                    );
//                                    console.log(
//                                      "Date Keys Array:",
//                                      dateKeysArray
//                                    );
//                                    console.log(
//                                      "Is Value Matched:",
//                                      isValueMatched
//                                    );

//                                    return isValueMatched; // Return true if any value matches the filterDataValue
//                                  }
//                                });

//                           console.log(isDateMatched);
//                           // If any date matches, render the booking
//                           if (isDateMatched) {
//                             return (
//                               <tr
//                                 style={{
//                                   boxShadow:
//                                     "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                                 }}
//                                 key={Booking?._id}
//                               >
//                                 <td className="td">{index + 1}</td>
//                                 <td className="td">
//                                   {Booking?.Teacher_ID?.map(
//                                     (teacher, index) => {
//                                       return teacher.Username;
//                                     }
//                                   )}
//                                 </td>
//                                 <td className="td">
//                                   {Booking?.Scheduled_Dates?.map(
//                                     (dateObj, index) => {
//                                       const date = Object.keys(dateObj)[0]; // Extracting the date
//                                       const timeSlots = dateObj[date]; // Extracting the array of time slots for the date

//                                       return (
//                                         <div key={index}>
//                                           {Object?.keys(timeSlots).map(
//                                             (date) => (
//                                               <div key={date}>
//                                                 <p>Date: {date}</p>
//                                                 <ul>
//                                                   {timeSlots[date].map(
//                                                     (slot, index) => (
//                                                       <li key={index}>
//                                                         {slot.start} -{" "}
//                                                         {slot.end}
//                                                       </li>
//                                                     )
//                                                   )}
//                                                 </ul>
//                                               </div>
//                                             )
//                                           )}
//                                         </div>
//                                       );
//                                     }
//                                   )}
//                                 </td>
//                                 <td className="td">{Booking?.Status}</td>
//                                 <td className="tdexternal">
//                                   <button
//                                     onClick={() => roomHandler(Booking._id)}
//                                     className="btn btn-outline-success meetingbtn"
//                                   >
//                                     Join Room
//                                   </button>
//                                   <button
//                                     onClick={() => DispatchHandler()}
//                                     className="btn btn-outline-warning meetingbtn mt-2"
//                                   >
//                                     Your Material
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           } else {
//                             return null; // If no date matches, return null
//                           }
//                         })
//                       ) : (
//                         <tr>
//                           <td colSpan="4">No Bookings available</td>
//                         </tr>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       {Bookings?.length > 0 ? (
//                         Bookings?.map((Booking, index) => (
//                           <tr
//                             style={{
//                               boxShadow:
//                                 "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                             }}
//                             key={Booking?._id}
//                           >
//                             <td className="td">{index + 1}</td>
//                             <td className="td">
//                               {Booking?.Teacher_ID?.map((teacher, index) => {
//                                 return teacher.Username;
//                               })}
//                             </td>
//                             <td className="td">
//                               {Booking?.Scheduled_Dates?.map(
//                                 (dateObj, index) => {
//                                   if (dateObj !== null) {
//                                     const date = Object.keys(dateObj)[0]; // Extracting the date
//                                     const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
//                                     return (
//                                       <div key={index}>
//                                         {Object?.keys(timeSlots).map((date) => (
//                                           <div key={date}>
//                                             <p>Date: {date}</p>
//                                             <ul>
//                                               {timeSlots[date].map(
//                                                 (slot, index) => (
//                                                   <li key={index}>
//                                                     {slot.start} - {slot.end}
//                                                   </li>
//                                                 )
//                                               )}
//                                             </ul>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     );
//                                   }
//                                 }
//                               )}
//                             </td>
//                             <td className="td">{Booking?.Status}</td>
//                             <td className="tdexternal">
//                               <button
//                                 onClick={() => roomHandler(Booking._id)}
//                                 className="btn btn-outline-success meetingbtn"
//                               >
//                                 Join Room
//                               </button>
//                               <button
//                                 onClick={() => DispatchHandler()}
//                                 className="btn btn-outline-warning meetingbtn mt-2"
//                               >
//                                 Your Material
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4">No Bookings available</td>
//                         </tr>
//                       )}
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="Admin-Dash_student_calender_box">
//             <h6>Events - 2023 to 2024</h6>
//             <br />
//             <Calendar
//               value={date}
//               prev2Label={false}
//               next2Label={false}
//               tileContent={tileContent}
//               onChange={handleCalendarClick}
//             />
//           </div>
//         </div>
//       </div>
//       {OwncloudFormPopup && (
//         <OwncloudSignupFormPopup handleClose={closeOwncloudSignupFormPopup} />
//       )}
//     </>
//   );
// };

// export default StudentDash;



























import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingsByStudentID } from "../../store/actions/bookingActions";
import { useNavigate } from "react-router-dom";
import OwncloudSignupFormPopup from "./OwncloudSignupFormPopup";

const StudentDash = () => {
  const student = useSelector((state) => state.students.user);
  const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
  console.log(Bookings);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OwncloudFormPopup, setOwncloudSignupFormPopup] = useState(false);
  const [date, setDate] = useState(new Date()); // Define date state variable
  const [fillterBookingData, setFillterBookingData] = useState(false);
  const [fillterDataValue, setFillterDataValue] = useState("");
  console.log(Bookings);

  useEffect(() => {
    dispatch(GetBookingsByStudentID(student._id));
  }, [student._id, dispatch]);

  //---------------------------------------------------------------------------------------------- Total number of lectures -----------------
  // const countTotalLectures = (Bookings) => {
  //   return Bookings.reduce((total, booking) => {
  //     const numberOfLectures = booking.Package_ID?.Number_of_Lectures || 0;
  //     return total + numberOfLectures;
  //   }, 0);
  // };

  // const totalLectures = countTotalLectures(Bookings);
  const totalLectures = Bookings.length;

  console.log(totalLectures)

  // --------------------------------------------------------------------------------------------- Completed Sessions  ----------------------
  function countCompletedSessions(Bookings) {
    let completedSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Bookings) {
      // Check if the status is "Completed"
      if (Booking.Status === "Completed") {
        completedSessionsCount++;
      }
    }
    return completedSessionsCount;
  }
  const completedSessions = countCompletedSessions(Bookings);

  // ---------------------------------------------------------------------------------------------- Pending Sessions -------------------------
  function countPendingOrScheduledSessions(Bookings) {
    let pendingOrScheduledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Bookings) {
      // Check if the status is either "Pending" or "Scheduled"
      if (Booking.Status === "Rescheduled" || Booking.Status === "Scheduled") {
        pendingOrScheduledSessionsCount++;
      }
    }
    return pendingOrScheduledSessionsCount;
  }
  const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

  // ------------------------------------------------------------------------------------------------ Cancelled Sessions ----------------------
  function countCancelledSessions(Bookings) {
    let cancelledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Bookings) {
      // Check if the status is "Cancelled"
      if (Booking.Status === "Cancelled") {
        cancelledSessionsCount++;
      }
    }
    return cancelledSessionsCount;
  }
  const cancelledSessions = countCancelledSessions(Bookings);
  // ---------------------------------------------------------------------------------------------------------------------------------------------

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
  };

  const DispatchHandler = async () => {
    // console.log(student.hasOwncloudAccount);
    if (student.hasOwncloudAccount) {
      window.open("https://cloud.speakable.online/", "_blank");
    } else {
      openOwncloudSignupFormPopup();
    }
  };

  const closeOwncloudSignupFormPopup = () => {
    setOwncloudSignupFormPopup(false);
  };

  const openOwncloudSignupFormPopup = () => {
    setOwncloudSignupFormPopup(true);
  };

  const tileContent = ({ date, view }) => {
    // console.log(date);
    // setFillterBookingData(true)
    if (view === "month") {
      const dateString = date?.toDateString();
      // Iterate through each booking and check if the date is scheduled
      for (const booking of Bookings) {
        if (booking?.Scheduled_Dates) {
          // console.log("----------------- Bookings -" , booking?.Scheduled_Dates);
          if (booking?.Scheduled_Dates[0] !== null) {
            for (const scheduledDateObj of booking?.Scheduled_Dates) {
              for (const scheduledDates of scheduledDateObj) {
                const scheduledDate = Object?.keys(scheduledDates);
                for (const Dates of scheduledDate) {
                  const scheduledDateString = new Date(Dates)?.toDateString();
                  if (scheduledDateString === dateString) {
                    return <p className="bg-success text-white">L</p>;
                  }
                }
              }
            }
          }
        }
      }
    }
    return null; // Return null if no match is found
  };

  const handleCalendarClick = (value) => {
    // console.log(value);
    // setFillterBookingData(true);
    // setFillterDataValue(value)
    // console.log(fillterDataValue)
    // const formattedDate = value.toLocaleDateString("en-US", {
    //   weekday: "short",
    //   month: "short",
    //   day: "numeric",
    //   year: "numeric",
    // });

    // console.log(formattedDate); // This will log the formatted date like "Sat May 11 2024"

    // setFillterBookingData(true);
    // setFillterDataValue(formattedDate);
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit", // Use "2-digit" to display day without leading zeros
      year: "numeric",
    };

    const formattedDate = value.toLocaleDateString("en-US", options);

    const formattedDateWithoutComma = formattedDate.replace(/,/g, "");

    console.log(formattedDateWithoutComma); // This will log the formatted date without commas like "Tue Apr 30 2024"

    setFillterBookingData(true);
    setFillterDataValue(formattedDateWithoutComma);
  };

  console.log(fillterDataValue);
  return (
    <>
      <AdminNav />
      <div className="Dash_mainPage_style">
        <h6>Student Dashboard</h6>
        <div className="Admin-Dash_contnet_box">
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Total Lectures
            </span>
            <span style={{ color: "grey" }}>{totalLectures}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Complete Sessions
            </span>
            <span style={{ color: "grey" }}>{completedSessions}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Remaining Sessions
            </span>
            <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Cancelled Income
            </span>
            <span style={{ color: "grey" }}>{cancelledSessions}</span>
          </div>
        </div>
        <div className="Admin-Dash_list_box">
          <div className="Admin-Dash_student_list_box">
            <h6>Meetings</h6>
            <div className="Admin-Dash_student_list_div">
              <table className="table  table-responsive table-borderless">
                <thead className="table-transparent">
                  <tr>
                    <th className="th">#</th>
                    <th className="th">Teacher Name</th>
                    <th className="th">Scheduled_Dates</th>
                    <th className="th">Status</th>
                    <th className="th">Join Button</th>
                  </tr>
                </thead>
                <tbody>
                  {fillterBookingData ? (
                    <>
                      {/* here */}
                      {Bookings?.length > 0 ? (
                        Bookings?.map((Booking, index) => {
                          const isDateMatched = Booking?.Scheduled_Dates?.some(
                            (dateObj) => {
                              // Iterate over the entries of dateObj
                              for (const [key, value] of Object.entries(
                                dateObj
                              )) {
                                console.log(value, "date");
                                console.log(dateObj);
                                // for (let i=0; i>)
                                // for (const key in value){
                                //   if (typeof value[key] === 'object' && !Array.isArray(value[key])) {
                                //             console.log(key,"new"); // Log the key of the immediate nested object
                                //           }
                                //         }
                                for (const innerKey in value) {
                                  // if (
                                  //   typeof value[innerKey] === "object" &&
                                  //   !Array.isArray(value[innerKey])
                                  // ) {
                                  //   console.log(innerKey, "new"); // Log the key of the immediate nested object
                                  // }
                                  console.log(value[innerKey]);
                                  if (typeof value[innerKey] === "object") {
                                    // If the key is 'a' or 'h', log the key and its value
                                    console.log(innerKey, "...keyout");
                                    if (innerKey === fillterDataValue) {
                                      console.log(innerKey, "...key");
                                      console.log(
                                        fillterBookingData,
                                        "..fillter"
                                      );
                                    }
                                    // Recursively call iterate function for nested objects
                                    // iterate(obj[key]);
                                  }
                                  console.log(value, "---innerkey");

                                  console.log(
                                    fillterDataValue,
                                    "--fillterDataselectedclicked"
                                  );
                                  return innerKey === fillterDataValue; // If key matches filterDataValue, return true
                                }
                                // Assuming fillterDataValue is defined elsewhere
                              }
                            }
                          );
                          console.log(isDateMatched);
                          // If any date matches, render the booking
                          if (isDateMatched) {
                            return (
                              <tr
                                style={{
                                  boxShadow:
                                    "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                                }}
                                key={Booking?._id}
                              >
                                <td className="td">{index + 1}</td>
                                <td className="td">
                                  {Booking?.Teacher_ID?.map(
                                    (teacher, index) => {
                                      return teacher.Username;
                                    }
                                  )}
                                </td>
                                <td className="td">
                                  {Booking?.Scheduled_Dates?.map(
                                    (dateObj, index) => {
                                      const date = Object.keys(dateObj)[0]; // Extracting the date
                                      const timeSlots = dateObj[date]; // Extracting the array of time slots for the date

                                      return (
                                        <div key={index}>
                                          {Object?.keys(timeSlots).map(
                                            (date) => (
                                              <div key={date}>
                                                <p>Date: {date}</p>
                                                <ul>
                                                  {timeSlots[date].map(
                                                    (slot, index) => (
                                                      <li key={index}>
                                                        {slot.start} -{" "}
                                                        {slot.end}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </td>
                                <td className="td">{Booking?.Status}</td>
                                <td className="tdexternal">
                                  <button
                                    onClick={() => roomHandler(Booking._id)}
                                    className="btn btn-outline-success meetingbtn"
                                  >
                                    Join Room
                                  </button>
                                  <button
                                    onClick={() => DispatchHandler()}
                                    className="btn btn-outline-warning meetingbtn mt-2"
                                  >
                                    Your Material
                                  </button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null; // If no date matches, return null
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan="4">No Bookings available</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <>
                      {Bookings?.length > 0 ? (
                        Bookings?.map((Booking, index) => (
                          <tr
                            style={{
                              boxShadow:
                                "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                            }}
                            key={Booking?._id}
                          >
                            <td className="td">{index + 1}</td>
                            <td className="td">
                              {Booking?.Teacher_ID?.map((teacher, index) => {
                                return teacher.Username;
                              })}
                            </td>
                            <td className="td">
                              {Booking?.Scheduled_Dates?.map(
                                (dateObj, index) => {
                                  if (dateObj !== null) {
                                    const date = Object.keys(dateObj)[0]; // Extracting the date
                                    const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
                                    return (
                                      <div key={index}>
                                        {Object?.keys(timeSlots).map((date) => (
                                          <div key={date}>
                                            <p>Date: {date}</p>
                                            <ul>
                                              {timeSlots[date].map(
                                                (slot, index) => (
                                                  <li key={index}>
                                                    {slot.start} - {slot.end}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </td>
                            <td className="td">{Booking?.Status}</td>
                            <td className="tdexternal">
                              <button
                                onClick={() => roomHandler(Booking._id)}
                                className="btn btn-outline-success meetingbtn"
                              >
                                Join Room
                              </button>
                              <button
                                onClick={() => DispatchHandler()}
                                className="btn btn-outline-warning meetingbtn mt-2"
                              >
                                Your Material
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No Bookings available</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Admin-Dash_student_calender_box">
            <h6>Events - 2023 to 2024</h6>
            <br />
            <Calendar
              value={date}
              prev2Label={false}
              next2Label={false}
              tileContent={tileContent}
              onChange={handleCalendarClick}
            />
          </div>
        </div>
      </div>
      {OwncloudFormPopup && (
        <OwncloudSignupFormPopup handleClose={closeOwncloudSignupFormPopup} />
      )}
    </>
  );
};

export default StudentDash;