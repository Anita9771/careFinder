import React from 'react'

function SendHospitals() {
  return (
    <div>SendHospitals</div>
  )
}

export default SendHospitals


// import exportFromJSON from 'export-from-json';
// import React, { useState } from 'react'
// import { EmailShareButton } from 'react-share'
// import { hospitalsCol } from '../lib/controller';
// import { HospitalList } from '../pages';
// import { NewHospitalType } from '../types/hospitals';
// import Hospital from './Hospital';
// import { stringify } from 'csv-stringify/.';

// const SendHospitals = (props: any) => {
//   const sendEmail = () => {
    
//     const pageData = props.hospitals?.map((hospital: any) => (
//               [hospital.Name, hospital.Address, hospital.Phone, hospital.Email, hospital.Region]
//     ))

//    const csvString = stringify(pageData)
//     // , (err, csvString) => {
//   // if (err) {
//   //   console.error('Error converting to CSV:', err);
//   //   return;
//   // }
// // });
   

//     const emailSubject = 'Page Data';
//     const emailBody = csvString;
//     const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
//     window.location.href = emailUrl;

//     console.log(pageData);
//   };

//   return (
//     <div>SendHospitals
//       {/* <EmailShareButton url="https://www.google.com/" /> */}

//       {/* <EmailShareButton > */}
//         <button onClick={sendEmail}>Send</button>
//       {/* </EmailShareButton> */}
//     </div>
//   )
// }

// export default SendHospitals