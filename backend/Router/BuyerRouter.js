const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BuyerRouter = express.Router();
const BuyerModel = require('../models/Buyer');
const SellerModel = require('../models/Seller');
const InterestedModel = require('../models/Interested');
const { secretKey } = require('../config/config');

BuyerRouter.post('/signup', async (req, res) => {
    try {
        const existingbuyer = await BuyerModel.findOne({ email: req.body.email });
        if (existingbuyer) {
            return res.status(400).send('buyer already registered');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newbuyer = new BuyerModel({
            email: req.body.email,
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile: req.body.mobile,

        });

        await newbuyer.save();

        const token = jwt.sign({ email: newbuyer.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token, buyer: newbuyer });

    } catch (error) {
        console.error('Error registering buyer:', error);
        res.status(500).send('Internal Server Error');
    }
});


BuyerRouter.post('/login', async (req, res) => {
   
    const buyer = await BuyerModel.findOne({email:req.body.email}); 
    if (!buyer) {
    return res.status(404).json({ error: 'Buyer not found' });
    }
    try {
        const passwordMatch = await bcrypt.compare( req.body.password,buyer.password);

        if (passwordMatch) {
            const token = jwt.sign({email :buyer.email}, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token,buyer });
        }
        
        else{
            res.status(404).json({ error: 'Incorrect password' });
        }
        } catch (error) {
           
        
        res.status(500).json({ error: 'Internal server error' }); } 
});


BuyerRouter.use(loggingMiddleware)



BuyerRouter.get("/",async (req,res)=>{
   
    try{
    let Seller = await SellerModel.find();
    const allAds = Seller.map(obj => obj.ad).flat();
    res.send(allAds);
    }
    catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
BuyerRouter.get("/asc",async (req,res)=>{
   
    try{
    let Seller = await SellerModel.find();
    const allAds = Seller.map(obj => obj.ad).flat();
    const sortedData = allAds.sort((a, b) => a.price - b.price);
    res.send(sortedData);
    }
    catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

BuyerRouter.get("/dsc",async (req,res)=>{
   
    try{
    let Seller = await SellerModel.find();
    const allAds = Seller.map(obj => obj.ad).flat();
    const sortedData = allAds.sort((a, b) => b.price - a.price);
    res.send(sortedData);
    }
    catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


BuyerRouter.get("/price/:min/:max",async (req,res)=>{
   
    try{
        const{ min, max } = req.params;
    

    let Seller = await SellerModel.find();
    const allAds = Seller.map(obj => obj.ad).flat();
   
    const filteredData = allAds.filter(item => item.price >= parseInt(min) && item.price <= parseInt(max));
    res.send(filteredData);
    }
    catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

BuyerRouter.post("/Interested/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const Interested = await BuyerModel.findById(id);
      const exist = await InterestedModel.find();
      const filterd = exist.filter((obj)=>obj.email==Interested.email)
      const filterid = filterd.find((obj)=>obj.id==req.body.id)
      if(!filterid){
        const newbuyer = new InterestedModel({
            email: Interested.email,
            id:req.body.id,
            first_name: Interested.first_name,
            mobile: Interested.mobile,
          });
      
          await newbuyer.save();
          res.status(201).send("Interested");
      }else{
        res.send('already exits')
      }
    } catch (error) {
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
            console.log('Buyer Authentication Sucess!'); 

            next(); 

        }else{
            console.log(err+'Authentication failed!', 401); 
        }
        
    } catch (err) {
        console.log(err+' Authentication failed!', 401); 
        
       
        
    }
}

module.exports = BuyerRouter;
