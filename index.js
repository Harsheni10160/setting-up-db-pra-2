const express = require('express');
const { resolve } = require('path');
require('dotenv').config();
const User =require('./schema')
const connectDatabase = require('./Database')

const app = express();
const port = 3010;
app.use(express.json())
app.use(express.static('static'));
connectDatabase();

app.post('/api/users', async (req,res)=>{
  try{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.status(400).json({message:"Validation error"});
    }

    const newUser = new User({name,email,password});
    await newUser.save();
    res.status(201).json({message:"User created successfully"});
  }
  catch(error){
    console.error("Error creating user",error);
    res.status(500).json({message:"InternalServer error"});
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
