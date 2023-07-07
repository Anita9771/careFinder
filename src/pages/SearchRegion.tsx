import React, { useState, useEffect } from "react";
import { hospitalsCol } from "../lib/controller";
import { onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { NewHospitalType } from "../types/hospitals";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Hospital, NavbarMain } from "../components";
import { CirclesWithBar } from "react-loader-spinner";


function SearchRegion() {
  const location = useLocation();
  const [hospitals, setHospitals] = useState<NewHospitalType[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<NewHospitalType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const searchedValue = location.state?.myData;

  //  const filteredHospitals = () => {

  // const filtered = hospitals.filter((hospital) => {
  //   return hospital
  //     ?.Region!.toLowerCase()
  //     .includes(searchedValue.toLowerCase());

  // });

  // console.log(filteredHospitals, "filtered hospitals");

  //  }

 

  useEffect(() => {
    setFilteredHospitals(
      hospitals.filter((hospital) => {
        const region = hospital?.Region;
        const lowercaseRegion = region?.toLowerCase() || '';
        const lowercaseSearchedValue = searchedValue?.toLowerCase() || '';
        return lowercaseRegion.includes(lowercaseSearchedValue);
      })
    );
  }, [hospitals, searchedValue]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(hospitalsCol, (snapshot: QuerySnapshot<DocumentData>) => {
      setHospitals(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  
    return () => {
      unsubscribe(); // Cleanup the snapshot listener
    };
  }, []);
  

  

  // console.log(searchedValue);
  return (
    <div className="">
      <NavbarMain />
      <div
        style={{ backgroundColor: "#E0E4EC", borderTop: "5px solid #9393f7" }}
      >
        <h1>Search Region</h1>
        {isLoading ? (
          <CirclesWithBar
          height="100"
          width="100"
          color="rgb(147, 147, 247)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel='circles-with-bar-loading'
        />
        ) : (
          <div className="">
            <div style={{fontSize: "1.2rem", fontWeight: "bolder"}} className="list">
      <span>Name</span>
            <span>Address</span>
            <span>Phone</span>
            <span>Email</span>
            <span>Region</span>
    </div>
            {filteredHospitals.length ? (
              filteredHospitals.map((hospital) => (
                // <div className="" key={hospital.id}>
                //   <h4>{hospital.Name}</h4>
                  <Hospital key={hospital.id} hospital={hospital} />
              ))
            ) : (
              <h2>No hospitals found</h2>
            )}
          </div>
         )} 
      </div>
    </div>
  );
}

export default SearchRegion;
