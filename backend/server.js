const express = require('express');
const server = express()
const cors =require("cors")
const path = require('path');



const BuyerRouter =require("./Router/BuyerRouter")
const SellerRouter =require("./Router/sellerRouter")


server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use(express.json())
server.use(cors())


server.use("/buyerUsers",BuyerRouter)
server.use("/sellerUsers",SellerRouter)







port = 3002;
server.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})
