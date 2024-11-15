import React, { useState } from 'react'
import Axios from 'axios'
import {Link ,useNavigate} from "react-router-dom"
import styled from 'styled-components'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const navigate =useNavigate()
  
    Axios.defaults.withCredentials =true;
    const handleSubmit =(e)=>{
      e.preventDefault();
      Axios.post('http://localhost:5000/api/v1/forgotpassword',{
        email
      }) .then(respose=>{
        if(respose.data.status){
            alert("check your email for reset password link")
          navigate('/login')
        }
       
      }).catch(err=>{
        console.log(err)
      })
    }
  return (
    <LoginStyled>
    <div className='sign-up-container'>
    <h2>Forgot Password</h2>
    <form className='form' onSubmit={handleSubmit}>
      
      <label htmlFor='email'>Email:</label>
      <input type='email' autoComplete='off' placeholder='email'
        onChange={(e) => setEmail(e.target.value)} />

      <button type='submit'>Send Email</button>

    </form>
  </div>
  </LoginStyled>
  )
}
const LoginStyled = styled.div`
.sign-up-container {
    max-width: 400px; 
    margin: 100px auto;
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
export default ForgotPassword