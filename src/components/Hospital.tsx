import React from "react";
import { NewHospitalType } from "../types/hospitals";
import "../styles/list.css"

interface IProps {
  hospital: NewHospitalType;
}
function Hospital({ hospital }: IProps) {
  return (
    <div className="">
      <div className="list">
      <span>{hospital.Name}</span>
            <span><div dangerouslySetInnerHTML={{ __html: hospital.Address as any }}></div></span>
            <span>{hospital.Phone}</span>
            <span>{hospital.Email}</span>
            <span>{hospital.Region}</span>
            {/* <hr /> */}
    </div>
    <hr />
    </div>
  );
}

export default Hospital;
