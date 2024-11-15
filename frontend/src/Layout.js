import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import App from './App';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/RestPassword';
const Layout = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<SignUp/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
            <Route path='/resetpassword' element={<ResetPassword/>}></Route>
            <Route path='/home' element={<App/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Layout