import React from "react";
import SignUpBgImg from "../assets/images/sign-up-bg-three.png";
import SignUpBgImgTwo from "../assets/images/sign-up-bg-two.png";
import "../styles/sign-up-bg.css";
function SignUpBg() {
  return (
    <div className="sign-up-bg">
      <div className="left">
        <img src={SignUpBgImg} alt="img" />
      </div>

      <div className="right">
        <div className="top">
        <h1>CareFinder</h1>
        <h2>Join Our Community</h2>

        <p>
          <b>Enjoy seamless access to medical services.</b>
        </p>
        </div>
        <img src={SignUpBgImgTwo} alt="img" />
      </div>
    </div>
  );
}

export default SignUpBg;
