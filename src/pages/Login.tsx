import React, { useState, useEffect } from 'react'
import { SignUpBg } from '../components'
import '../styles/login.css'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Google from "../assets/images/devicon_google.png";
import { useUserAuth } from '../context/UserAuthContext';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  const [error, setError] = useState('');

  const {logIn, googleSignIn, resetPassword} = useUserAuth();

  const navigate = useNavigate();
  const storedData = localStorage.getItem('signupData');

  useEffect(() => {
    // Retrieve data from local storage on component mount
    

    if (storedData !== null) {
      const { email, password } = JSON.parse(storedData);
      setEmail(email);
      setPassword(password);
    }

    console.log(storedData)
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    try {
      await logIn(email, password);
      navigate('/hospital-list');
    } catch (err: any) {
      setError(err.message);
      alert(error);
    }


    
    // localStorage.removeItem('signupData');
  }

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/add-hospital');
    } catch (err: any) {
      setError(err.message);
      // alert(error);
    }
  }

  const handleResetPassword = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert('Check your email for further instructions');
    } catch (err: any) {
      setError(err.message);
      // alert(error);
    }
  }

  return (
    <div className='wrapper'>
        <SignUpBg />

        <div className="login">
          {/* <p>{storedData}</p> */}
          <h1>Welcome Back</h1>
          <p>Login using correct details!
</p>

          <form action="" onSubmit={handleSubmit} >

          <section>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email address' onChange={(e) => setEmail(e.target.value)}  />
            </section>

            <section>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}  />
            </section>

            <Button>Login</Button>
          </form>

          <div className="bottom">
          <p><b>OR</b></p>

          <p>Login using</p>

<section style={{ border: "none", cursor: "pointer"}}  onClick={handleGoogleSignIn}><img src={Google} alt="google icon"  /></section>
    

<p className='last' >Do not have an account? <Link className='itl' to="/signup"><i >Sign Up!</i></Link></p>
<p className='last' >Forgot Password? <span style={{ border: "none"}}  onClick={handleResetPassword} ><i>Reset Password!</i></span></p>
          </div>
        </div>
    </div>
  )
}

export default Login