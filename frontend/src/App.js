import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ChooseLoginTypePage from './pages/choose';
import {  useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import BuyerAuthPage from './pages/Buyer/buyerlogin';
import SellerAuthPage from './pages/Seller/sellerlogin';
import Seller from './component/Seller/PostAd';
import SellerHomePage from './pages/Seller/sellerhomepage';
import ADview from './component/Seller/Adview';
import ADview1 from './component/Buyer/adview';
import BuyerHomePage from './pages/Buyer/BuyerHomepage';
import NotFound from './pages/PageNotFound';
import PrivateRoute from './Private';





function App() {
  

  const Sellerlogin = localStorage.getItem('Sellerlogin');
  const Buyerlogin = localStorage.getItem('Buyerlogin');

 


  
  
  



  return (
    <Router>
    <Routes>
      <Route path="/" element={<ChooseLoginTypePage />} />
      <Route path="/choose" element={<ChooseLoginTypePage />} />
      <Route path="/buyer" element={<BuyerAuthPage />} />
      <Route path="/seller" element={<SellerAuthPage />} />
      <Route path="/sellerhome/ad" element={<ADview />} />
      <Route path="/buyerhome/ad" element={<ADview1 />} />
      <Route path="*" element={<NotFound />} />
      <Route 
        path="/sellerhome" 
        element={<PrivateRoute component={SellerHomePage} isAuthenticated={Sellerlogin} />} 
      />
      <Route 
        path="/Buyerhome" 
        element={<PrivateRoute component={BuyerHomePage} isAuthenticated={Buyerlogin} />} 
      />
    </Routes>
  </Router>
  );
}

export default App;
