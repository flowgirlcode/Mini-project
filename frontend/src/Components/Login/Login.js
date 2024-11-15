import React, { useState } from 'react'
import Axios from 'axios'
import styled from 'styled-components';
import bg from '../../img/calci.jpg'
import { Link, useNavigate } from "react-router-dom"
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  async function handleSubmit(e) {
    e.preventDefault();
    await Axios.post('http://localhost:5000/api/v1/login', {
      email,
      password
    }).then(respose => {
      if (respose.data.status) {
        console.log(respose.data.token)
        console.log(respose.data)
        navigate('/home')
      }else{
        alert("Wrong Email or Password")

      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <LoginStyled>
     
      
      <div className='bg'>
        <div className='sign-up-container'>
          <h2>Login</h2>
          <form className='form' onSubmit={handleSubmit}>

            <label htmlFor='email'>Email:</label>
            <input type='email' autoComplete='off' placeholder='email'
              onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor='password'>Password:</label>
            <input type='password' autoComplete='off' placeholder=''
              onChange={(e) => setPassword(e.target.value)} />

            <button type='submit'>Login</button>
            <Link to="/forgotpassword">Forgot Password</Link>
            <p>Don't have an Account?<Link to="/signup">SignUp</Link></p>

          </form>
        </div>
      </div>
    </LoginStyled>
  )
}
const LoginStyled = styled.div`
.bg{
background-image: url(${bg});
opacity: 0.9;
background-size: cover;
background-repeat: none;
height: 100vh;
padding: 150px;

}


.sign-up-container {
  /* background-image: url(${bg}); */
  background-color: var(--color-grey);


    max-width: 400px;   
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
  }
   h2{
    text-align: center;
    background-color: #f9f9f9;

}
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .form label{
    padding: 5px;
  }
  
  .form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 5px 0px;
  }
  
  .form button:hover {
    background-color: #0056b3;
  }
  
  .form p {
    margin-top: 20px;
    text-align: center;
    color: #676767;
  }
  
  .form p a {
    color: #007bff;
    text-decoration: none;
  }
  
  .form p a:hover {
    text-decoration: underline;
  }
  
`
export default Login
