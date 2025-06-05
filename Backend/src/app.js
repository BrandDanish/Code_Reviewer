require('dotenv').config();
const express=require('express');
const app=express();
const cors = require('cors');
const aiRouter = require('./routers/router');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.use(express.json());
app.use('/ai', aiRouter);
module.exports=app;