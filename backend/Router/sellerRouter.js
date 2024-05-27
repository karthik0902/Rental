


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const SellerRouter = express.Router();
const SellerModel = require('../models/Seller');
const { secretKey } = require('../config/config');
const InterestedModel = require('../models/Interested');

const path = require('path');
const { log } = require('console');




SellerRouter.post('/signup', async (req, res) => {
    try {
        const existingrental = await SellerModel.findOne({ email: req.body.email });
        if (existingrental) {
            return res.status(400).send('rental already registered');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newrental = new SellerModel({
            email: req.body.email,
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile: req.body.mobile,

        });

        await newrental.save();

        const token = jwt.sign({ email: newrental.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token, rental: newrental });

    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).send('Internal Server Error');
    }
});


SellerRouter.post('/login', async (req, res) => {
   
    const seller = await SellerModel.findOne({email:req.body.email}); 
    if (!seller) {
    return res.status(404).json({ error: 'Seller not found' });
    }
    try {
        const passwordMatch = await bcrypt.compare( req.body.password,seller.password);

        if (passwordMatch) {
            const token = jwt.sign({email :seller.email}, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token,seller });
        }
        
        else{
            res.status(404).json({ error: 'Incorrect password' });
        }
        } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' }); } 
});



SellerRouter.use(loggingMiddleware)



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =Date.now();
        cb(null, uniqueSuffix +file.originalname);
    }
});
const upload = multer({ storage: storage });


SellerRouter.post('/:sellerId/ads',upload.array('images', 10), async (req, res) => {
    const { sellerId } = req.params;
    const newAd = req.body;
   
    const imagePaths = req.files.map(file =>  `http://localhost:3002/${file.path}`);
    try {
        const seller = await SellerModel.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        newAd.images = imagePaths;
        seller.ad.push(newAd);
        await seller.save();
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


SellerRouter.get("/:sellerId",async (req,res)=>{
    const { sellerId } = req.params;
    try{
    let Seller = await SellerModel.findById(sellerId);
    res.send(Seller.ad);
    }
    catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


SellerRouter.put('/:sellerId/adds/:adId', upload.array('images', 10), async (req, res) => {
    const { sellerId, adId } = req.params;
    const updatedAdData = req.body;
    
    const imagePaths = req.files.map(file => `http://localhost:3002/${file.path}`);
    if (imagePaths.length > 0) {
        updatedAdData.images = imagePaths;
    }

    try {
        const seller = await SellerModel.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const ad = seller.ad.id(adId);
  
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        Object.keys(updatedAdData).forEach(key => {
            ad[key] = updatedAdData[key] || ad[key];
        });

        await seller.save();
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

SellerRouter.delete('/:sellerId/adds/:adId', async (req, res) => {
    const { sellerId, adId } = req.params;

    try {
        const seller = await SellerModel.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const adIndex = seller.ad.findIndex(ad => ad._id.equals(adId));
        if (adIndex === -1) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        seller.ad.splice(adIndex, 1); 
        await seller.save(); 

        res.status(200).json({ message: 'Ad deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});


SellerRouter.get("/Interested/:adId",async (req,res)=>{
    const { adId } = req.params;
    try{
    let ad = await InterestedModel.find();
    const filterad = ad.filter((obj)=>obj.id==adId)
    res.send(filterad);
    }
    catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





function loggingMiddleware(req, res, next) { 
    try {
        
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]:null;
    
        if (!token) {
            return res.status(401).send('Authentication token failed!');
        }
        const decodedToken = jwt.verify(token, secretKey);
        
        if(decodedToken){
            console.log('Seller Authentication Sucess!'); 

            next(); 

        }else{
            console.log(err+'Authentication failed!', 401); 
        }
        
    } catch (err) {
        console.log(err+' Authentication failed!', 401); 
        
       
        
    }
}

module.exports = SellerRouter;
