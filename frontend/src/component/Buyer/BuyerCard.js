import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {buyerInterested} from "../../api"





import {
  Paper,
  Grid,
  ButtonBase,
  Typography,
  Button,
  TextField,
  MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});




function BuyerCard({ obj }) {
  const nav = useNavigate();
  const query = queryString.stringify(obj); 
  const adid =localStorage.getItem('SellerId')
   const [Interested1,SetInterested]= useState(null);
   const BuyerID = localStorage.getItem('BuyerID')
   const token = localStorage.getItem('BuyerToken')

  




   
  async function Interested (id){
    SetInterested(true)
    try{
        const response = await buyerInterested(BuyerID,id,token)
        console.log(response);
    }
    catch(err){
        console.log(err);

    }

  }

 


 
 

  return (
    <div style={{ margin: '1%',marginLeft:'6%' }}>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase  sx={{ width: 128, height: 128 }}>
                <Link to={`/buyerhome/ad?${query}`} >
              <Img alt="complex" src={obj.images[0]} />
              </Link>
            </ButtonBase>
          </Grid>
          <Grid style={{ textAlign: 'left' }} item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Link to={`/buyerhome/ad?${query}`} style={{ textDecoration: 'none' }}>
                  <Typography style={{color:'black'}} gutterBottom variant="subtitle1" component="p">
                  ₹  {obj.price}
                  </Typography>
                  <Typography  style={{color:'black'}}variant="body2" gutterBottom>
                    {`Area:    ${obj.length} x ${obj.breadth}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  PlotArea:{obj.plotArea}
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="contained"  onClick={()=> Interested(obj._id)} size="medium">
                I'm Interested
                </Button>
                {Interested1?<p> Name: {obj.name} Mobile: {obj.mobile}</p>

                :null}
                
               
            
                
              </Grid>
            </Grid>
            
          </Grid>
          </Grid>
        </Paper>
      </div>
  );
}

export default BuyerCard;