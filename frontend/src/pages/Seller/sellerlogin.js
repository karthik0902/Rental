

import React, { useState } from 'react';
import './seller.css'
import {SellerLogin,SellerSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';




const SellerAuthPage = () => {
    const[email,setemail]=useState('')
    const[password,setPassword]=useState('')
    const[email1,setemail1]=useState('')
    const[password1,setPassword1]=useState('')
    const[Mobile,setMobile]=useState('')
    const[first_name,setname]=useState('')
    const[last_name,setname1]=useState('')

    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

    const nav = useNavigate();
    
  

 

    const handleLoginSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await SellerLogin({email:email,password:password});
        console.log(response);

        localStorage.setItem("Sellerlogin",true)
        localStorage.setItem("SellerId",response.seller._id)
        localStorage.setItem("SellerToken",response.token)
        nav('/Sellerhome');
        } catch (error) {
            console.log(error);
            setLoginError(error.response.data.error);
        }
      
        
   
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await SellerSignup({ first_name: first_name,last_name:last_name, email:email1 , password: password1,mobile:Mobile});
            console.log(response);
        localStorage.setItem("SellerToken",response.token)
        localStorage.setItem("Sellerlogin",true)
        localStorage.setItem("SellerId",response.rental._id)
            nav('/Sellerhome');
        } catch (error) {
            console.log(error);
            setSignupError(error.message);
        }
   
       
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                <TextField  style={{margin:"10px"}} onChange={(e)=>setemail(e.target.value)} label="Email" variant="standard" name="email"  required />
                <TextField  style={{margin:"10px"}} onChange={(e)=>setPassword(e.target.value)} label="Password" variant="standard" type="password" name="password"   required />


                    <button style={{margin:"20px"}} type="submit">Login</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                <TextField  style={{margin:"10px"}} label="First name" variant="standard" type="text" name="name" onChange={(e)=>setname(e.target.value)}  />
                <TextField  style={{margin:"10px"}} label="Last name" variant="standard" type="text" name="name" onChange={(e)=>setname1(e.target.value)}  />
                <TextField  style={{margin:"10px"}} label="Email" variant="standard"  type="text" name="email" onChange={(e)=>setemail1(e.target.value)}  required  />
                <TextField  style={{margin:"10px"}} label="Mobile" variant="standard" type="number" name="Mobile" onChange={(e)=>setMobile(e.target.value)}  required  />
                <TextField  style={{margin:"10px"}} label="password" variant="standard" type="password" name="password" onChange={(e)=>setPassword1(e.target.value)}  required />


                    <button style={{margin:"20px"}} type="submit">Sign Up</button>
                    {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
                </form>
            </div>
        </div>
    );
};

export default SellerAuthPage;
