import React, { useState } from "react";
import styled from "styled-components";
import "../styles/landing.css";
import HeroImg from "../assets/images/nurse-n-patient.png";
import CheckeredMan from "../assets/images/blue.png";
import DoctorChecking from "../assets/images/doctor-bp.png";
import HospitalIcon from "../assets/images/hospital-icon.png";
import FindHospital from "../assets/images/appointment.png";
import ShareHospital from "../assets/images/share.png";
import VisitHospital from "../assets/images/visit.png";
import Sarah from "../assets/images/sarah.png";
import John from "../assets/images/john.png";
import Emily from "../assets/images/emily.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import { NewHospitalType } from "../types/hospitals";
import { NavbarMain } from "../components";

const Button = styled.button`
  border: none;
  /* border-radius: 0.8rem; */
  background-color: white;
  color: black;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const MainHeroDiv = styled.div`
  background-color: #e0e4ec;
  border-top: 5px solid #9393f7;
  min-height: 90vh;
  font-family: "Inter", sans-serif;
`;

const geofire = require("geofire-common");

function Landing() {
  const [search, setSearch] = useState<string>("");
  // const [hospitals, setHospitals] = useState<NewHospitalType[]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) {
      alert("Input a region/state");
      return;
    } else {
      navigate("/search-region", { state: { myData: search } });
    }
  };
  

  return (
    <div id="home" className="landing">
      <div className="">
        {/* <button onClick={updateGeohashesForHospitals(hospitals)} >Geohash</button> */}
      </div>
      <NavbarMain />

      <MainHeroDiv className="hero">
        <section className="hero-top">
          <section className="hero-left">
            <h1>Find the nearest hospital to you</h1>
            <h4>
              Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
            </h4>

            <section className="hero-left-cta">
              <Button>
                <a href="#services">Get Started</a>
              </Button>
              {/* <a href="#works" className="learn">
                Learn more{" "}
                <FontAwesomeIcon
                  icon={icon({ name: "arrow-right", style: "solid" })}
                />
              </a> */}
            </section>
          </section>

          <section className="hero-right">
            <div className="hero-img">
              <img src={HeroImg} alt="nurse and patient" />
            </div>
          </section>
        </section>

        <section id="search" className="hero-bottom">
          <h4>Search for hospitals by region</h4>
          <input
            type="search"
            name=""
            id=""
            placeholder="Type your Region"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {/* <FontAwesomeIcon
            icon={icon({ name: "location-dot", style: "solid" })}
            className="map-icon"
          /> */}
        
            <FontAwesomeIcon
            onClick={handleSearch} 
            style={{ color: "black", border:"1px solid grey", padding: "1rem", borderRadius: "0.2rem", opacity: "0.7", marginBottom:"1rem" }}
              icon={icon({ name: "magnifying-glass", style: "solid" })}
              className="search-icon"
            />
          <p>
            None in your region?{" "}
            <Link to="/hospital-list">
              <i>Check cities around you</i>
            </Link>{" "}
          </p>
        </section>
      </MainHeroDiv>

      <div id="about" className="about">
        <section className="about-left">
          <img
            src={CheckeredMan}
            alt="a man wearing blue checkered shirt with a phone in hand"
            className="blue"
          />
          <img
            src={DoctorChecking}
            alt="doctor checking the blood pressure of a patient"
            className="doctor"
          />
        </section>

        <section className="about-right">
          <h2>
            Welcome to <br /> <b>CareFinder</b>{" "}
          </h2>

          <p>
            Access to healthcare in Nigeria can be very difficult and
            painstaking. Quite absurd being that the first thing to living is
            being healthy. CareFinder is a simple tool that aims to help any
            user find, export, and share hospitals within the region.
          </p>

          <Button>OUR SERVICES</Button>
        </section>
      </div>

      <div id="services" className="services cards">
        <div className="card">
          <Link to="/locate-hospital">
            <div className="card-icon">
            <FontAwesomeIcon
            icon={icon({ name: "location-dot", style: "solid" })}
            className="map-icon"
          />
            </div>
            <h4>Locate Hospitals</h4>
            <p>Effortlessly find the hospitals within your current location</p>
          </Link>
        </div>

        <div className="card">
          <Link to="/add-hospital">
            <div className="card-icon">
              <img src={HospitalIcon} alt="icon" />
            </div>
            <h4>Add Hospitals</h4>
            <p>Add a hospital to our database to help other users</p>
          </Link>
        </div>

        <div className="card">
          <Link to="/hospital-list">
            <div className="card-icon">
            <img src={HospitalIcon} alt="icon" />
            </div>
            <h4>View All Hospitals</h4>
            <p>View all hospitals available on our platform or in a region</p>
          </Link>
        </div>

        <div className="card">
          <a href="#search">
            <div className="card-icon">
            <FontAwesomeIcon
            onClick={handleSearch} 
            style={{ color: "black" }}
              icon={icon({ name: "magnifying-glass", style: "solid" })}
              className="search-icon"
            />
            </div>
            <h4>Search Region</h4>
            <p>Search for a hospital in a particular region</p>
          </a>
        </div>
      </div>

      <div id="works" className="works-main">
        <div className="works-heading">
          <h2>How It Works</h2>
        </div>
        <div className="works">
          <div className="work work-one">
            <h2>1</h2>
            <div className="work-img">
              <img src={FindHospital} alt="img" />
            </div>
            <h4>Find Hospitals</h4>
            <p>
              Find the hospitals near you or in a region, our efficient search
              engine provides you with the best results.
            </p>
          </div>

          <div className="work work-two">
            <h2>2</h2>
            <div className="work-img">
              <img src={ShareHospital} alt="img" />
            </div>
            <h4>Save or share hospital</h4>
            <p>
              Carefinder allows users to save and share the list of hospitals
              with others. Users can share the information via email.
            </p>
          </div>

          <div className="work work-three">
            <h2>3</h2>
            <div className="work-img">
              <img src={VisitHospital} alt="img" />
            </div>
            <h4>Make a visit</h4>
            <p>Then make a visit to your selected hospital </p>
          </div>
        </div>
      </div>

      <div className="testimonials">
        <h3>Testimonials</h3>
        <h2>What Our Users Say</h2>

        <div className="test-cards">
          <div className="test-card">
            <p>
              Finding the right hospital has never been easier! With this
              website, I was able to locate a nearby hospital quickly and
              efficiently. The search feature is user-friendly, and it provided
              me with all the essential information I needed. Highly recommended
            </p>
            <p className="star-rating"></p>
            <section className="user">
              <img src={Sarah} alt="img" className="user-img" />
              <b>Sarah M.</b>
            </section>
          </div>

          <div className="test-card">
            <p>
              I can’t express how grateful I am for carefinder website. When i
              needed urgent medical care while travelling, it helped me locate
              the nearest hospital in a matter of seconds. The accurate results
              and detailed directions saved me valuable time and ensured i
              received the care i needed
            </p>
            <p className="star-rating"></p>
            <section className="user">
              <img src={John} alt="img" className="user-img" />
              <b>John D.</b>
            </section>
          </div>

          <div className="test-card">
            <p>
              I recently moved to a new city and had no idea where to go for
              medical assistance, my friend shared me some hospital details
              using the carefinder website. It made my life easier, i was able
              to fine reputable hospitals near me effortlessly. The website’s is
              user friendly interface and comprehnsive search gave me peace of
              mind. I highly recommend.
            </p>
            <p className="star-rating"></p>
            <section className="user">
              <img src={Emily} alt="img" className="user-img" />
              <b>Emily T.</b>
            </section>
          </div>
        </div>
      </div>

      <footer id="footer">
        <section className="one">
          <b>CareFinder</b>
          <p>Plot 42, Akinza Street, Victoria island, Lagos +2349167351788</p>
        </section>

        <section className="two">
          <b>About Us</b>
          <ul>
            <li>
              <Link to="/hospital-list">Hospital list</Link>
            </li>
            <li>
              <a href="#footer">Contact Us</a>
            </li>
          </ul>
        </section>

        <section className="three">
          <b>Quick Links</b>
          <ul>
            <li>
              <Link to="/hospital-list">View hospitals</Link>
            </li>
            <li>
              <Link to="/add-hospital">Add a hospital</Link>
            </li>
            <li>
              <Link to="/search-region">Search location</Link>
            </li>
          </ul>
        </section>
      </footer>
    </div>
  );
}

export default Landing;


// function async(id: any, arg1: string, hashToStore: any) {
//   throw new Error("Function not implemented.");
// }


// useEffect(() => {
  //   onSnapshot(hospitalsCol, (snapshot: QuerySnapshot<DocumentData>) => {
  //     setHospitals(
  //       snapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       })
  //     );
  //   });

  //   const updateGeohashForHospitals = async (hospitals: string | any[]) => {
  //     const updateNextHospital = async (index: number) => {
  //       if (index >= hospitals.length) {
  //       //   // All hospitals have been updated
  //       //   console.log("Geohashes updated for all hospitals");
  //         return;
  //       }

  //       const hospital = hospitals[index];
  //       let lat = hospital?.lat;
  //       let lng = hospital?.lng;
  //       const id = hospital?.id;

  //       console.log(lat, lng, id);

  //       const hashToStore = geofire?.geohashForLocation([+lat, +lng]);
  //       console.log("Updating geohash for hospital:", id);

  //       try {
  //         const docRef = doc(collection(db, "hospitals"), id);
  //         const docSnapshot = await getDoc(docRef);

  //         if (docSnapshot.exists()) {
  //           await updateDoc(docRef, { geohash: hashToStore });
  //           console.log("Geohash updated successfully for hospital:", id);
  //         } else {
  //           console.log("Hospital document not found:", id);
  //         }
  //       } catch (error) {
  //         console.error("Error updating geohash:", error);
  //       }

  //       // Update the next hospital
  //       await updateNextHospital(index + 1);
  //     };

  //     // Start updating the first hospital
  //     await updateNextHospital(0);
  //   };

  //   // setTimeout(() => {
  //   updateGeohashForHospitals(hospitals);
  //   // alert("please")
  //   // }, 5000);
  // }, []);
  // console.log(hospitals)