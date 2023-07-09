import React, { useState, useEffect } from "react";
import { hospitalsCol } from "../lib/controller";
import { CirclesWithBar } from "react-loader-spinner";
import {
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { NewHospitalType } from "../types/hospitals";
import { Link } from "react-router-dom";
import { Hospital, NavbarSup, Pagination } from "../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { auth } from "../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import Papa from "papaparse";
import { act } from "react-dom/test-utils";
import { useUserAuth } from "../context/UserAuthContext";
import  "../styles/list.css";
// import { auth } from "../lib/firebase";

const ButtonBottom = styled.button`
  border: none;
  border-radius: 0.8rem;
  background-color: #3a75f4;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  cursor: pointer;
  width: 20%;
  margin: 2rem auto 0 2rem;
  text-align: center;
`;
function HospitalList() {
  const [hospitals, setHospitals] = useState<NewHospitalType[]>([]);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { user, logOut} = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }

    localStorage.removeItem("user");
    window.location.reload();
  };

  const csvData = Papa.unparse(
    hospitals.map((hospital) => [
      hospital.Name,
      hospital.Address?.replace(/(<([^>]+)>)/gi, ""),
      hospital.Phone,
      hospital.Email,
      hospital.Region,
    ])
  );

  // console.log(csvData)

  const fileName = "hospital_collection.csv";

  const storage = getStorage();
  const storageRef = ref(storage, `csv/${fileName}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const storedData = localStorage.getItem('signupData');


  const handleExport = () => {
    // Convert collection data to CSV string

    // const fileUrl = 'https://console.firebase.google.com/project/carefinder-bc73b/storage/carefinder-bc73b.appspot.com/files'
    uploadCSV(csvData, fileName);

    async function uploadCSV(data: any, fileName: string) {
      const handleDownload = () => {
        getDownloadURL(storageRef)
          .then((url) => {
            // Use the download URL to initiate the file download
            window.location.href = url;
          })
          .catch((error) => {
            // Handle any errors that occurred during the download URL retrieval
            console.log("Error getting download URL: ", error);
          });
      };

      try {
        await uploadString(storageRef, data, "raw");
        handleDownload();
        // Get the download URL for the file

        console.log("CSV file uploaded successfully");
      } catch (error) {
        console.error("Error uploading CSV file:", error);
      }
    }
  };

  // function handleSendOptions() {
  //   setIsVisible((prevState) => !prevState);
    
  // }

  // const handleRetrieveFile = async () => {
  //   // Retrieve the CSV file URL from Firebase Storage
  //   // const storageRef = storage.ref('path/to/your/csv/file.csv');
  //   const downloadURL = await getDownloadURL(storageRef);

  //   setFileUrl(downloadURL);
  //   setIsVisible((prevState) => !prevState);
  // };

  // const handleSendEmail = () => {
  //   // const recipientEmail = 'recipient@example.com'; // Replace with the recipient's email address
  //   if (storedData !== null) {
  //     const { email, password } = JSON.parse(storedData);
  //     setEmail(email);
  //     setPassword(password);
  //   }

  //   axios
  //     .post('http://localhost:5000/sendEmail', {
  //       fileUrl,
  //       recipientEmail,
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       // Handle success response
  //       alert('Email sent successfully!');
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error('Error sending email:', error);
  //       alert('Failed to send email.');
  //     });
  //   alert(`Sending email with attachment: ${fileUrl}`);
  // };


  let ITEMS_PER_PAGE = 10;

 

  useEffect(() => {
    const unsubscribe = onSnapshot(hospitalsCol, (snapshot: QuerySnapshot<DocumentData>) => {
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setHospitals(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      setIsLoading(false);
    });

    return () => {
      unsubscribe(); // Cleanup the snapshot listener
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  

  return (
    <div style={{}} className="">
      <NavbarSup/>
      <div
        style={{
          backgroundColor: "#E0E4EC",
          borderTop: "5px solid #9393f7",
          minHeight: "90vh",
          overflowY: "hidden",
        }}
      >
        <h1>Hospital List {email}{password}</h1>
        {isLoading ? (
          <CirclesWithBar
          height="100"
          width="100"
          color="rgb(147, 147, 247)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='circles-with-bar-loading'
        />
        ) : (
        <div className="list">
          {hospitals && hospitals.length ? (
            <div>
              <div style={{fontSize: "1.2rem", fontWeight: "bolder"}} className="list">
      <span>Name</span>
            <span>Address</span>
            <span>Phone</span>
            <span>Email</span>
            <span>Region</span>
    </div>
              {hospitals?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              .map((hospital) => (
                <Hospital key={hospital.id} hospital={hospital} />
              
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>
              There are no hospitals, you can{" "}
              <Link to="/add-hospital">add</Link> one.
            </p>
          )}
        </div>
        )}

        <div className="btns">
          <ButtonBottom>
            <FontAwesomeIcon
              icon={icon({ name: "download", style: "solid" })}
              onClick={handleExport}
            />
          </ButtonBottom>
        </div>  

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
      
    </div>
  );
}

export default HospitalList;

// <div className="send" id="sendOption">
//   Send hospitals to:
//   <input
//     type="email"
//     placeholder="Email"
//     onChange={(e) => setEmail(e.target.value)}
//   />
//   <button
//     onClick={() => {
//       sendPasswordResetEmail(auth, email)
//         .then(() => {
//           setMessage("Email sent successfully");
//         })
//         .catch((error) => {
//           setMessage(error.message);
//         });
//     }}
//   >
//     Send
//   </button>
//   <p>{message}</p>
// </div>

// Pass data to a function to tag out HTML tags

// Fetch the data to export (replace with your own data retrieval logic)
// const data = hospitals;

// // // Set the file name and path
// const fileName = "hospital-list";

// const exportType = exportFromJSON.types.csv;

// // address:arr.data.replace(/(<([^>]+)>)/ig, "")

// const sanitizedData = (dataArray: any) =>
//   dataArray.map((arr: any) => ({
//     ...arr,
//     Address: arr.Address?.replace(/(<([^>]+)>)/gi, ""),
//   }));

// console.log(sanitizedData(data));
// // Function to export as CSVfunction exportDataToCSV() {
//   function exportDataToCSV() {
//     exportFromJSON({
//       data: sanitizedData(data),
//       fileName,
//       fields: ["Region", "Phone", "Address", "Email", "Name"],
//       exportType,
//     });
// }

// async function exportAsCSV(data: string, fileName: string): Promise<string> {
//   const storage = getStorage();
//   const storageRef = ref(storage, `csv/${fileName}`);
//   const fileData = new Blob([data], { type: 'text/csv' });

//   try {
//     await uploadBytes(storageRef, fileData);
//     // const downloadUrl = await storageRef.getDownloadURL();
//     // return downloadUrl;
//   } catch (error) {
//     console.error('Error exporting CSV:', error);
//     throw error;
//   }
// }
