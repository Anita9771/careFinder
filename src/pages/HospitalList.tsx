import React, { useState, useEffect } from "react";
import { hospitalsCol } from "../lib/controller";
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
import { Hospital, NavbarSup, SendHospitals } from "../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import exportFromJSON from "export-from-json";
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
import { EmailIcon, EmailShareButton } from "react-share";
import { useUserAuth } from "../context/UserAuthContext";
import { jsPDF } from "jspdf";
import "../styles/list.css"

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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { user, logOut } = useUserAuth();

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

  console.log(csvData)

  const fileName = "hospital_collection.csv";

  const storage = getStorage();
  const storageRef = ref(storage, `csv/${fileName}`);

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

  function handleSendOptions() {
    setIsVisible((prevState) => !prevState);
  }
 
  const sendEmailWithCSV = async (email: string, csvURL: string) => {
    try {
      // const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        // User is not authenticated
        return;
      }

      const { uid, email } = user;

      const emailContent = {
        to: email,
        message: {
          subject: "Hospital List",
          text: "Please find the attached hospital list file.",
          html: "<p>Please find the attached hospital list file</p>",
        },
        attachments: [
          {
            filename: fileName,
            path: csvURL,
            contentType: "text/csv",
          },
        ],
      };

      const db = getFirestore();
      const emailRef = collection(db, "emails");

      await addDoc(emailRef, {
        uid,
        sender: user.email,
        recipients: email,
        sentAt: new Date(),
      });

      // Send the email using Firebase email functionality
      await emailContent;

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };


  const emailAddress = email;
  const subject = "Data File Attachment";
  const body = "Please find the attached data file.";
  const attachmentData = csvData;
  const attachmentFilename = fileName;


  const csvString = csvData?.replace(/(<([^""''>]+)>)/gi, "");

  useEffect(() => {
    onSnapshot(hospitalsCol, (snapshot: QuerySnapshot<DocumentData>) => {
      setHospitals(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
    // console.log(storageRef.bucket);
    // console.log(csvData);
  }, []);

  

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
        <h1>Hospital List</h1>

        <div className="list">
          {hospitals && hospitals.length ? (
            <div>
              {/* <table>
                <thead>
                  <tr style={{ verticalAlign: "top" }}>
                    <th style={{ paddingRight: "15rem" }}>Name</th>
                    <th style={{ paddingRight: "27rem" }}>Address</th>
                    <th style={{ paddingRight: "12rem" }}>Phone</th>
                    <th style={{ paddingRight: "10rem" }}>Email</th>
                    <th>Region</th>
                  </tr>
                </thead>
              </table> */}
              <div style={{fontSize: "1.2rem", fontWeight: "bolder"}} className="list">
      <span>Name</span>
            <span>Address</span>
            <span>Phone</span>
            <span>Email</span>
            <span>Region</span>
    </div>
              {hospitals?.map((hospital) => (
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

        <div className="btns">
          <ButtonBottom>
            <FontAwesomeIcon
              icon={icon({ name: "download", style: "solid" })}
              onClick={handleExport}
            />
          </ButtonBottom>
          <ButtonBottom onClick={handleSendOptions}>
            <FontAwesomeIcon
              icon={icon({ name: "share-from-square", style: "solid" })}
            />
          </ButtonBottom>
        </div>

        {/* <button onClick={handleShare}>New Share</button> */}

        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        {/* <button onClick={downloadCSV}>send email</button> */}

        {isVisible && (
          <EmailShareButton url={""}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        )}
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
