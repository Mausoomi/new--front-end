// import React, { useEffect, useState } from "react";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// import { useLocation, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPackage } from "../../store/actions/packagesActions";
// import { Create_Payment } from "../../store/actions/paymentActions";

// const CheckDetails = () => {
//   const { Package_ID } = useParams();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [totalAmount,settotalAmount] = useState();
//   const user = useSelector((state) => state.students.user);
//   const pack = useSelector((state) => state.packages.currentPackage);
//   console.log(pack);
  

//   const location = useLocation();
//   const totalCount = location.state;
  
//   const calculateTotalAmount = async () => {
//     let Course_Amount;
//     if (pack.length > 0) {
//       await Promise.all(pack.Course_IDs.map(async (course) => {
//         Course_Amount = course.Purchase_Price;
//       }));
//     }
//     const total_Amount = totalCount * Course_Amount;
//     // console.log(totalAmount);
//     settotalAmount(total_Amount)
//   };



//   const paymentResponseUrl = useSelector(
//     (state) => state.payments.paymentResponseUrl
//   );

//   const Desciption = pack?.Package_Name;
//   const Email = user?.Email;
//   const Phone = user?.Phone_Number;
//   const StudentName = user?.Username;

//   useEffect(() => {
//     const fetchPackageData = async () => {
//       try {
//         await dispatch(fetchPackage(Package_ID));
//         await calculateTotalAmount()
//       } catch (error) {
//         console.error("Error fetching package:", error.message);
//       }
//     };
//     fetchPackageData();
//   }, [Package_ID, dispatch]);

//   useEffect(() => {
//     if (paymentResponseUrl.length > 0) {
//       setLoading(false);
//       window.location.href = paymentResponseUrl;
//     }
//   }, [paymentResponseUrl]);

//   const submitHandler = async () => {
//     try {
//       await setLoading(true);
//       await dispatch(
//         Create_Payment({
//           Package_ID,
//           Desciption,
//           totalAmount,
//           Email,
//           Phone,
//           StudentName,
//         })
//       );
//     } catch (error) {
//       console.error("Payment failed:", error.message);
//     } finally {
//       await setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AdminNav />
//       <div className="Student_mainPage_style">
//         <div>
//           <h2>Order Details</h2>
//           <p>
//             <strong>Description:</strong> {Desciption}
//           </p>
//           <p>
//             <strong>Total Amount:</strong> {totalAmount}
//           </p>
//         </div>

//         <div>
//           <h2>Buyer Information</h2>
//           <p>
//             <strong>Email:</strong> {Email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {Phone}
//           </p>
//           <p>
//             <strong>Username:</strong> {StudentName}
//           </p>
//         </div>

//         <div>
//           <h2>Product Information</h2>
//           <p>
//             <strong>Package ID:</strong> {Package_ID}
//           </p>
//           <p>
//             <strong>Name:</strong> {Desciption}
//           </p>
//           <p>
//             <strong>Unit Price:</strong> {totalAmount}
//           </p>
//         </div>

//         <button
//           onClick={submitHandler}
//           className={`btn btn-outline-success ${loading ? "loading" : ""}`}
//           disabled={loading}
//         >
//           {loading ? "Confirming..." : "Confirm"}
//         </button>
//       </div>
//     </>
//   );
// };

// export default CheckDetails;

import React, { useEffect, useState } from "react";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackage } from "../../store/actions/packagesActions";
import { Create_Payment } from "../../store/actions/paymentActions";

const CheckDetails = () => {
  const { Package_ID } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Initialize with 0
  const user = useSelector((state) => state.students.user);
  const pack = useSelector((state) => state.packages.currentPackage);
  
  const location = useLocation();
  const totalCount = location.state;

  const calculateTotalAmount = async () => {
    let total_Amount = 0;
    if (pack && pack.Course_IDs && pack.Course_IDs.length > 0) {
      await Promise.all(pack.Course_IDs.map(async (course) => {
        if (!isNaN(course.Purchase_Price)) { // Check if Purchase_Price is not NaN
          total_Amount += course.Purchase_Price;
        }
      }));
    }
    total_Amount *= totalCount; // Multiply by totalCount
    setTotalAmount(total_Amount);
  };

  const paymentResponseUrl = useSelector(
    (state) => state.payments.paymentResponseUrl
  );

  const Desciption = pack?.Package_Name;
  const Email = user?.Email;
  const Phone = user?.Phone_Number;
  const StudentName = user?.Username;

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        await dispatch(fetchPackage(Package_ID));
        await calculateTotalAmount();
      } catch (error) {
        console.error("Error fetching package:", error.message);
      }
    };
    fetchPackageData();
  }, [Package_ID, dispatch]);

  useEffect(() => {
    if (paymentResponseUrl.length > 0) {
      setLoading(false);
      window.location.href = paymentResponseUrl;
    }
  }, [paymentResponseUrl]);

  const submitHandler = async () => {
    try {
      setLoading(true);
      await dispatch(
        Create_Payment({
          Package_ID,
          Desciption,
          totalAmount,
          Email,
          Phone,
          StudentName,
        })
      );
    } catch (error) {
      console.error("Payment failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div>
          <h2>Order Details</h2>
          <p>
            <strong>Description:</strong> {Desciption}
          </p>
          <p>
            <strong>Total Amount:</strong> {totalAmount}
          </p>
        </div>

        <div>
          <h2>Buyer Information</h2>
          <p>
            <strong>Email:</strong> {Email}
          </p>
          <p>
            <strong>Phone:</strong> {Phone}
          </p>
          <p>
            <strong>Username:</strong> {StudentName}
          </p>
        </div>

        <div>
          <h2>Product Information</h2>
          <p>
            <strong>Package ID:</strong> {Package_ID}
          </p>
          <p>
            <strong>Name:</strong> {Desciption}
          </p>
          <p>
            <strong>Unit Price:</strong> {totalAmount}
          </p>
        </div>

        <button
          onClick={submitHandler}
          className={`btn btn-outline-success ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </>
  );
};

export default CheckDetails;

