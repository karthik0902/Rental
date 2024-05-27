import React from 'react';
import './choose.css'; 
import { useNavigate } from 'react-router-dom';

const studentImageSrc2 = require('../asserts/person.png')
const studentImageSrc3 = require('../asserts/shopping.png');


const ChooseLoginTypePage = () => {
    const nav = useNavigate();
    return (
        <div className="choose-login-type-page" >
            <h1>Choose Your Login</h1>
            <div className="login-options" style={{display:'flex'}}>
                
                <button onClick={()=>{nav("/Seller")}} className="login-button ">
                <img className='img' src={studentImageSrc2}/>Seller</button>
                <button onClick={()=>{nav("/Buyer")}} className="login-button ">
                <img className='img' src={studentImageSrc3}/>Buyer</button>
            </div>
        </div>
    );
};

export default ChooseLoginTypePage;