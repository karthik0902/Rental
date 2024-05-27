import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {SellerPostAd} from "../../api";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';



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

const PostAd = () => {
    const nav = useNavigate();
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
        mobile: ''
    });
    const SellerId = localStorage.getItem('SellerId')
    const token = localStorage.getItem('SellerToken')


    const [images, setImages] = useState([]);

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
            const response = await SellerPostAd(SellerId,data,token)
            console.log('Ad submitted successfully:', response);
            alert('Ad submitted successfully')

        } catch (error) {
            console.error('Error submitting ad:', error);
        }
    };

    return (
        <div className="Postad">
            <h1>Post YOUR AD</h1>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
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
                <Button variant="contained" type="submit" size="medium">
                    Post
                </Button>
            </Box>
        </div>
    );
};

export default PostAd;
