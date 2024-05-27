import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {SellerputAd,Sellerdeletead} from "../../api"
import Alert from '@mui/material/Alert';




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


const Facing = [
  { value: 'East', label: 'East' },
  { value: 'North', label: 'North' },
  { value: 'South', label: 'South' },
  { value: 'West', label: 'West' },
  { value: 'North-East', label: 'North-East' },
  { value: 'North-West', label: 'North-West' },
  { value: 'South-East', label: 'South-East' },
  { value: 'South-West', label: 'South-West' },
];

function Propertycard({ obj }) {
  const nav = useNavigate();
  const query = queryString.stringify(obj); 
  const adid =localStorage.getItem('SellerId')
  const token = localStorage.getItem('SellerToken')

  const [formData, setFormData] = useState({
    plotArea: '',
    length: '',
    breadth: '',
    facing: '',
    projectName: '',
    adTitle: '',
    description: '',
    price: '',
    state: '',
    city: '',
    name: '',
    mobile: '',
  });

  const [images, setImages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id,Setid] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      const response = await SellerputAd(adid,id,data,token)
      console.log('Ad submitted successfully:', response);
      handleClose()
      alert('Product updated successfully')

    } catch (error) {
      console.error('Error submitting ad:', error);
    }
  };


  const handleClose = () => setOpen(false);
  const handleClickOpen = (id) => {
    Setid(id)
    setOpen(true);
};

  const handleDelete = async (id) => {
    try {
      const response = await Sellerdeletead(adid,id,token)
      console.log('Product deleted successfully:', response);
      alert('Product deleted successfully')
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

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
                <Link to={`/sellerhome/ad?${query}`} >
              <Img alt="complex" src={obj.images[0]} />
              </Link>
            </ButtonBase>
          </Grid>
          <Grid style={{ textAlign: 'left' }} item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Link to={`/Sellerhome/ad?${query}`} style={{ textDecoration: 'none' }}>
                  <Typography style={{color:'black'}} gutterBottom variant="subtitle1" component="p">
                  ₹  {obj.price}
                  </Typography>
                  <Typography  style={{color:'black'}}variant="body2" gutterBottom>
                    {`Area:    ${obj.length} x ${obj.breadth}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Plot:{obj.plotArea}
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="contained" style={{ marginLeft: '10px' }} onClick={()=>handleClickOpen(obj._id)} size="medium">
                  EDIT
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: '10px' }}
                  onClick={()=>handleDelete(obj._id)}
                  size="medium"
                >
                  DELETE
                </Button>
               
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle  style={{textAlign:'center'}}>EDIT YOUR AD</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '65ch' } }}
                        style={{marginLeft:'11%'}}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <TextField name="plotArea" label="Plot" variant="outlined" onChange={handleInputChange} value={formData.plotArea} required /> <br />
                        <TextField type='number' name="length" label="Length" variant="outlined" onChange={handleInputChange} value={formData.length} /> <br />
                        <TextField type='number' name="breadth" label="Breadth" variant="outlined" onChange={handleInputChange} value={formData.breadth} /> <br />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Facing"
                            name="facing"
                            value={formData.facing}
                            style={{ textAlign: 'left' }}
                            onChange={handleInputChange}
                        >
                            {Facing.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField><br />
                        <TextField name="projectName" label="Project Name" variant="outlined" onChange={handleInputChange} value={formData.projectName} /> <br />
                        <TextField name="adTitle" label="Ad title" variant="outlined" onChange={handleInputChange} value={formData.adTitle} required /> <br />
                        <TextField name="description" label="Description" variant="outlined" onChange={handleInputChange} value={formData.description} multiline rows={4} /> <br />
                        <h4 style={{ textAlign: 'left' }}>UPLOAD AT LEAST 5 PHOTOS</h4>
                        <input type="file" id="image-input" name="images" multiple accept="image/*" onChange={handleFileChange} />
                        <h4 style={{ textAlign: 'left' }}>SET A PRICE</h4>
                        <TextField name="price" label="Price" variant="outlined" onChange={handleInputChange} value={formData.price} /> <br />
                        <h4 style={{ textAlign: 'left' }}>CONFIRM YOUR LOCATION</h4>
                        <TextField name="state" label="State" variant="outlined" onChange={handleInputChange} value={formData.state} required /> <br />
                        <TextField name="city" label="City" variant="outlined" onChange={handleInputChange} value={formData.city} required /> <br />
                        <h4 style={{ textAlign: 'left' }}>REVIEW YOUR DETAILS</h4>
                        <TextField name="name" label="Name" variant="outlined" onChange={handleInputChange} value={formData.name} required /> <br />
                        <TextField name="mobile" label="Mobile" variant="outlined" onChange={handleInputChange} value={formData.mobile} required /> <br />
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                APPLY
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
                
              </Grid>
            </Grid>
            
          </Grid>
          </Grid>
        </Paper>
      </div>
  );
}

export default Propertycard;