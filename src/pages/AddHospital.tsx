import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserAuth } from "../context/UserAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addHospital } from "../lib/controller";
import "../styles/add.css"
import { NavbarSup } from "../components";
// import Quill from 'quill'
// import QuillMarkdown from 'quilljs-markdown'
// import 'quilljs-markdown/dist/quilljs-markdown-common-style.css'

const Button = styled.button`
  border: none;
  border-radius: 0.8rem;
  background-color: #3a75f4;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  cursor: pointer;
  margin: 1rem auto;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
  }
`;

// const ListItem = styled.li`
//   list-style: none;
//   margin-left: 2rem;
//   font-size: 1.2rem;

//   @media screen and (max-width: 480px) {
//     font-size: 1rem;
//     margin-left: 1rem;
//   }
// `;

// const UnList = styled.ul`
//   display: flex;

//   @media screen and (max-width: 480px) {
//     flex-direction: column;
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 2rem 0 0.5rem 0;

//   @media screen and (max-width: 767px) {
//     flex-direction: column;
//     align-items: flex-start;
//     padding: 1rem 0;
//   }
// `;

// const NavH2 = styled.h2`
//   color: #08087f;
//   font-size: 1.8rem;

//   @media screen and (max-width: 480px) {
//     font-size: 1.5rem;
//   }
// `;

// const NavContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 1rem;

//   @media screen and (max-width: 1024px) {
//     padding: 0 2rem;
//   }
// `;
function AddHospital() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalRegion, setHospitalRegion] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");

  const { user } = useUserAuth();

  const navigate = useNavigate();

  var toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["link", "image"],                                        // remove formatting button
  ];

  

  

  const addNewHospital = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addHospital({
      Name: hospitalName,
      Region: hospitalRegion,
      Phone: hospitalPhone,
      Email: hospitalEmail,
      Address: hospitalAddress,
    });
    alert("Hospital added successfully");
    navigate("/hospital-list");
  };

  return (
    <div className="">
      <NavbarSup />
      <div style={{ backgroundColor: "#E0E4EC", borderTop: "5px solid #9393f7", minHeight: "90vh", overflowY: "hidden"  }} className="container">
  {/* <h4 className="hospital-address">{hospitalAddress}</h4> */}
  <h1>Add a new hospital</h1>
  <p>Thank you <span className="user-email">{user && user.email}</span>, your input is appreciated.</p>

  <form className="hospital-form" onSubmit={(e) => addNewHospital(e)}>
    <div className="form-group">
      <label htmlFor="hospitalName">Hospital Name:</label>
      <input
        onChange={(e) => setHospitalName(e.target.value)}
        value={hospitalName}
        type="text"
        required
        name="hospitalName"
        id="hospitalName"
      />
    </div>

    <div className="form-group">
      <label htmlFor="hospitalRegion">Hospital Region:</label>
      <input
        onChange={(e) => setHospitalRegion(e.target.value)}
        value={hospitalRegion}
        type="text"
        required
        name="hospitalRegion"
        id="hospitalRegion"
      />
    </div>

    <div className="form-group">
      <label htmlFor="hospitalPhone">Hospital Phone:</label>
      <input
        onChange={(e) => setHospitalPhone(e.target.value)}
        value={hospitalPhone}
        type="text"
        required
        name="hospitalPhone"
        id="hospitalPhone"
      />
    </div>

    <div className="form-group">
      <label htmlFor="hospitalEmail">Hospital Email:</label>
      <input
        onChange={(e) => setHospitalEmail(e.target.value)}
        value={hospitalEmail}
        type="text"
        required
        name="hospitalEmail"
        id="hospitalEmail"
      />
    </div>

    <ReactQuill
      className="address-input"
      modules={{ toolbar: toolbarOptions }}
      theme="snow"
      value={hospitalAddress}
      onChange={setHospitalAddress}
      placeholder="Input the address here..."
    />

    <Button type="submit">
      <FontAwesomeIcon icon={icon({ name: "plus", style: "solid" })} />
    </Button>
  </form>
</div>

    </div>
  );
}

export default AddHospital;
