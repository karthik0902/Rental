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
import img from "../../asserts/person.png"
import PostAd from '../../component/Seller/PostAd';
import { useNavigate } from 'react-router-dom';
import Properties from '../../component/Seller/Properties';




const drawerWidth = 240;

export default function SellerHomePage() {
    const nav = useNavigate();


  
   



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const [value, setValue] = React.useState('1');
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
          SELLER Page        </Typography>
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
          <List style={{marginTop:'80px',marginBottom:'10px',textAlign:'center'}}>
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>setValue('1')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}}  primary="Post AD" />
                </ListItemButton>
               
              </ListItem>
              
              <ListItemButton onClick={()=>setValue('2')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Properties"/>
                </ListItemButton>
               
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
        <TabContext value={value}>

<TabPanel value="1"><PostAd /></TabPanel>
<TabPanel value="2"><Properties  /></TabPanel>




</TabContext>
        </Typography>
        
      </Box>

    </Box>
  );
}



