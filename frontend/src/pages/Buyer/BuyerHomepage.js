import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import img from "../../asserts/shopping.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BuyerCard from '../../component/Buyer/BuyerCard';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Slider from '@mui/material/Slider';
import {BuyerAsc,BuyerDsc,Buyerfilterprice,GetBuyer} from "../../api"
import CircularProgress from '@mui/material/CircularProgress';





const drawerWidth = 240;

export default function BuyerHomePage() {
    const nav = useNavigate();//Progress
    const [Progress,setProgress]=useState(null)
    const token = localStorage.getItem('BuyerToken')

  
    const [data,setData]=useState(null)
    const [value1, setValue1] = React.useState([10000, 80000]);

  const handleChange = (event, newValue) => {
    setValue1(newValue);

  };



  async function BUDGET1(){
    try{

        const response= await Buyerfilterprice(value1[0],value1[1],token)
        setData(response);
     
    }
    
    catch(err){
        console.log(err);
    }
    finally{
        setProgress(null)
    }

  }



  async function Asc(){
    try{

        const response= await BuyerAsc(token)
        setData(response);
     
    }
    
    catch(err){
        console.log(err);
    }
    finally{
        setProgress(null)
    }

  }
  async function Dsc(){
    try{
 
        const response= await BuyerDsc(token)
        setData(response);
     
    }
    catch(err){
        console.log(err);
    }
    

  }


    useEffect(() => {
        const fetchData = async () => {
        
        try {
            
            const response = await GetBuyer(token)
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


        const [open1, setOpen1] = React.useState(true);

        const handleClick1 = () => {
          setOpen1(!open1);
        };
   



        const [open, setOpen] = React.useState(true);

        const handleClick = () => {
          setOpen(!open);
        };


    // const [value, setValue] = React.useState('1');
    const logout=()=>{
        localStorage.setItem("Sellerlogin",false)
      localStorage.setItem("Buyerlogin",false)

        nav('/choose')
    
      }
   



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={img} style={{width:'45px',marginLeft:'5px'}} alt='hi'/>
          <Typography style={{marginLeft:'20px'}} variant="h6" noWrap component="div">
          BUYER Page        </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* Add a flex-grow box to push the Button to the right */}
      <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
       
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        
        <Box sx={{ overflow: 'auto' }}>
          
             <List style={{marginTop:'80px',marginBottom:'10px',textAlign:'center'}}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader style={{textAlign:'left'}} component="div" id="nested-list-subheader">
          Filter
        </ListSubheader>
      }
    >
      
     
      <ListItemButton onClick={handleClick}>
        
        <ListItemText primary="Sort By" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={Asc} sx={{ pl: 4 }}>
           
            <ListItemText primary="Price: Low to High" />
            {Progress? <CircularProgress />:null}
          </ListItemButton >
          <ListItemButton sx={{ pl: 4 }}>
         
           
            <ListItemText onClick={Dsc}  primary="Price: High to Low" />
            {Progress? <CircularProgress />:null}
          </ListItemButton>
        </List>
      </Collapse>
    </List>
               
            
        
          <Divider />

          <List style={{textAlign:'center'}}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      
     
      <ListItemButton onClick={handleClick1}>
        
        <ListItemText primary="BUDGET" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
      <Box sx={{ width: 170 }} style={{margin:'10%'}}>
      <Slider
        min={0}
        max={100000}
        step={1000}
        value={value1}
        onChange={handleChange}
        valueLabelDisplay="auto"
    
      />
      <Button onClick={BUDGET1}>APPLY</Button>
    </Box>
      </Collapse>
    </List>
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
        <TabContext value={'1'}>

<TabPanel value="1"><div style={{
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
                        <BuyerCard obj={obj} />
                    </div>
                );
            }) : null}
        </div></TabPanel>




</TabContext>
        </Typography>
        
      </Box>

    </Box>
  );
}



