import React, { useState, useEffect } from "react";
import { hospitalsCol } from "../lib/controller";
import { onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { NewHospitalType } from "../types/hospitals";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Hospital, NavbarMain, Pagination } from "../components";
import { CirclesWithBar } from "react-loader-spinner";

function SearchRegion() {
  const location = useLocation();
  const [hospitals, setHospitals] = useState<NewHospitalType[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<NewHospitalType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const searchedValue = location.state?.myData;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setFilteredHospitals(
      hospitals.filter((hospital) => {
        const region = hospital?.Region;
        const lowercaseRegion = region?.toLowerCase() || "";
        const lowercaseSearchedValue = searchedValue?.toLowerCase() || "";
        return lowercaseRegion.includes(lowercaseSearchedValue);
      })
    );
  }, [hospitals, searchedValue]);

  let ITEMS_PER_PAGE = 5;

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

  // console.log(searchedValue);
  return (
    <div className="">
      <NavbarMain />
      <div
        style={{ backgroundColor: "#E0E4EC", borderTop: "5px solid #9393f7" }}
      >
         <div className="">
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
            ariaLabel="circles-with-bar-loading"
          />
        ) : (
          <div className="">
            <div
              style={{ fontSize: "1.2rem", fontWeight: "bolder" }}
              className="list"
            >
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

       
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
        </div>
      </div>
    </div>
  );
}

export default SearchRegion;
