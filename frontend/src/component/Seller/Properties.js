import axios from 'axios';
import React from 'react';
import {useState,useEffect} from 'react'
import Propertycard from './PropertyCard';
import { useNavigate } from 'react-router-dom';
import {getSellerAd} from "../../api"




const Properties = () => {
    const nav = useNavigate();
    const [data,setData]=useState(null)
    const SellerId = localStorage.getItem('SellerId')
    const token = localStorage.getItem('SellerToken')

    

    useEffect(() => {
        const fetchData = async () => {
        
        try {
            
            const response = await getSellerAd(SellerId,token);
            setData(response);
           
  
 
            }
            catch(error) {
                console.log(error);
                setData(null);
            }
        }
        const fetchDataAfterDelay = () => {
            setTimeout(fetchData, 500); 
          };
          fetchDataAfterDelay(); 
          
        },[setData]);  

       
    return (
        <div style={{
            backgroundColor: "lightblue",
            paddingBottom: "4%",
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '5%',
            margin: '3%',
            borderRadius: '25px'
        }}>
            {data ? data.map((obj, index) => {
                return (
                    <div key={index} style={{
                        margin: "15px",
                        flex: '0 7 45%', 
                        marginLeft: index % 2 !== 0 ? '2%' : '0' 
                    }}>
                        <Propertycard obj={obj} />
                    </div>
                );
            }) : null}
        </div>
    
    );
};

export default Properties;