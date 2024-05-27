import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    let nav = useNavigate();
    


    const logout=()=>{
    

      
  
      localStorage.setItem("Sellerlogin",false)
      localStorage.setItem("Buyerlogin",false)
      nav('/choose')
      
    }
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p style={{color:'red'}}>The page you are attempting to access does not exist. Please ensure that you properly log out of any other pages before proceeding.</p>
     
      <button onClick={logout}>logout</button>

    </div>
  );
};

export default NotFound;
