import React, { useState } from "react";
import { SignUpBg } from "../components";
import "../styles/sign-up.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/images/devicon_google.png";
import { useUserAuth } from "../context/UserAuthContext";
import Validation from "../context/Validation";

const Button = styled.button`
  border: none;
  border-radius: 0.8rem;
  background-color: #3a75f4;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  cursor: pointer;
  width: 40%;
  margin: 2rem auto 0 auto;
`;

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { signUp, googleSignIn } = useUserAuth();

  const navigate = useNavigate();

  const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const password_pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/; //qwehytysa1!A
  // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    console.log(password)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (name === " ") {
      setError("Name is required");
      return;
    }

    if (!password_pattern.test(password)) {
      setError(`Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter,
    one digit, and one special character`);
      return;
    }
    if (!email_pattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    console.log("clicked");

    try {
      await signUp(email, password, name);
      localStorage.setItem('signupData', JSON.stringify({ email, password }));
      // setInputValue('');
      setError('');
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
      // alert(error);
    }

    
    console.log(localStorage)

    
  };

  const handleGoogleSignIn = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/add-hospital");
    } catch (err: any) {
      setError(err.message);
      // alert(error);
    }
  };

  return (
    <div>
      <SignUpBg />

      <div className="sign-up">
        <h1>Create an Account</h1>

        <form action="" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="">Name</label>
            <input
              required
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </section>

          <section>
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              placeholder="Enter Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>

          <section>
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </section>

          <p>{error}</p>

          <Button type="submit">Create Account</Button>
        </form>

        <div className="bottom">
          <p>
            <b>OR</b>
          </p>

          <section
            style={{ border: "none", cursor: "pointer" }}
            onClick={handleGoogleSignIn}
          >
            <img src={Google} alt="google icon" />
          </section>

          <p>
            Already have an account?{" "}
            <Link className="itl" to="/login">
              <i>Login!</i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
