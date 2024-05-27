import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import img from "../../asserts/shopping.png"
import Button from '@mui/material/Button';

import { useTheme } from '@mui/material/styles';

import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const ADview = () => {
    const nav = useNavigate();
    const location = useLocation();
  
  const obj = queryString.parse(location.search);

  const logout=()=>{
    localStorage.setItem("Sellerlogin",false)
    localStorage.setItem("Buyerlogin",false)
    

    nav('/choose')

  }
  const back=()=>{
    

    nav('/Buyerhome')

  }

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = obj.images?obj.images.length:null;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
        <AppBar   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={img} style={{width:'45px',marginLeft:'5px'}} alt='IMGA'/>
          <Typography style={{marginLeft:'20px'}} variant="h6" noWrap component="div">
          BUYER Page        </Typography>
          <Box sx={{ flexGrow: 1 }} /> 
      <Button color="inherit" onClick={back}>Back</Button>
      <Button color="inherit" onClick={logout}>Logout</Button>

        </Toolbar>
       
      </AppBar>
      <div style={{display:'flex'}}>
        <div style={{display:'flex'}}>
        {obj.images?
      <Box sx={{ maxWidth:955, flexGrow: 1 }} style={{marginLeft:'4%',width:'45%'}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          marginTop:'9%',
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {obj.images.map((step, index) => (
          <div key={step}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 355,
                  display: 'block',
                  objectFit:'contain',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step}
                alt={step}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="progress"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
      :null}
    </div>
    <div  style={{marginTop:'8%', textAlign:'left',width:'30%'}}>
      {obj ? (
        <div>
        <div className='container1' style={{margin:'1%', backgroundColor:'#F5F5F5',padding:'4%'}}>
          
          <h1> ₹ {obj.price}</h1>
          <p>Area: {obj.length} x {obj.breadth}</p>
          <p>PlotArea: {obj.plotArea}</p>
        </div>
        <div className='container1' style={{margin:'1%',marginTop:'5%', backgroundColor:'#F5F5F5',padding:'5%'}}>
          
          <h4>  Seller Name: {obj.name}</h4>
          <h4>  Mobile: {obj.mobile}</h4>
         
        </div>
        </div>
      ) : (
        <p>No data available</p>
      )}

      </div>
      
      </div>
      <div className="container1">
    <h1 className="heading">Details</h1>
    <div className="details">
        <div className="left-column">
            <div className='detail'>
                <h4>Plot Area</h4>
                <p>{obj.plotArea}</p>
            </div>
            <div className='detail'>
                <h4>Length</h4>
                <p>{obj.length}</p>
            </div>
            <div className='detail'>
                <h4>City</h4>
                <p>{obj.city}</p>
            </div>
        </div>
        <div className="right-column">
            <div className='detail'>
                <h4>Project Name</h4>
                <p>{obj.projectName}</p>
            </div>
            <div className='detail'>
                <h4>Breadth</h4>
                <p>{obj.breadth}</p>
            </div>
            <div className='detail'>
                <h4>State</h4>
                <p>{obj.state}</p>
            </div>
        </div>
    </div>
</div>
<div className='container1'>
<h1 className="Description">Details</h1>
<p style={{textAlign:'left',lineHeight:'180%'}}>{obj.description}</p>

</div>


    </div>
  );
};

export default ADview;