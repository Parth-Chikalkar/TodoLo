const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const userModel = require('./Models/UserModel.js'); 
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const port = process.env.PORT;
const jwtSecret = process.env.JWT;

const cors = require('cors')
    app.use(express.json());
    app.use(express.urlencoded({extended : true}))
    app.use(cors());
 app.get("/api/token",(req,res)=>{
    const token = "";
    res.json({token});
 })
app.post('/api/create',async (req,res)=>{
    const {username,email,password} = req.body;
    const exists = await userModel.find({username});
    if(exists.length>0){
        return res.status(201).json({message : "Username Already Exists !"});
    }
    const saltRounds =10;
    const salt =  bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password,salt);
    const user = await userModel.create({
        username,
        email,
        password:hash,

    })
    const token = jwt.sign({username},'SecretOfTodolo');
    
    return res.status(200).json({message : `${username} created Succesfully !`,token});
})
app.post("/api/checkUser",async (req,res)=>{
    const {username,password} = req.body;
    const exist = await userModel.find({username});
    if(exist.length>0){
        const saltRounds =10;
        const salt =  bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password,salt);
        const bool = bcrypt.compareSync(password, hash);
        if(bool){
            const token = jwt.sign({username},'SecretOfTodolo');
            return res.status(200).json({message :`Welcome ${username}`,token});
        }
        return res.json({message : "Invalid Credentials"})
    }
    return res.json({message :"Invalid Credentials !"})
})
app.post('/api/Data',async (req,res)=>{
const {token} = req.body;
const username =  jwt.verify(token,'SecretOfTodolo');
const us = username.username;
const data = await userModel.findOne({username : us});
res.json({data});


})
app.post('/api/edit',async (req,res)=>{
    const {title,des,date,token}= req.body;
    const us = jwt.verify(token,'SecretOfTodolo').username;
    const newTask = {
        taskTitle : title,
        taskDescription: des,
        DueDate : date
    };
    const useer =await userModel.findOneAndUpdate({username:us},{$push:{Tasks : newTask}},{new:true});
    return res.status(200).json({message:"Task Created Succesfully !"})
})
app.post('/api/deleteTask',async (req,res)=>{
const {id,token} = req.body;
const username = jwt.verify(token,'SecretOfTodolo').username;
const userm = await userModel.findOneAndUpdate({username},{$pull :{Tasks : {_id : id}}},{new: true});
return res.json({message : "Task Deleted !"});  


})
app.post('/api/completed',async (req,res)=>{
    const{id,token} = req.body;
    const username = jwt.verify(token,'SecretOfTodolo').username;
    const use = await userModel.findOneAndUpdate({username,"Tasks._id" : id},{$set : {
        "Tasks.$.isCompleted": true,
    }},{new : true});
   return res.json({message : "Hurrah ! Task Completed 🎊"})
})
app.post('/api/editTask',async (req,res)=>{
    const {
        id,
        token,
        newTitle,
        newDesc,
        newDueDate,
      } = req.body;
    
      
      const us = jwt.verify(token,'SecretOfTodolo').username;
      const a = await userModel.findOneAndUpdate({username : us,"Tasks._id":id},{$set : {
        "Tasks.$.taskTitle": newTitle,
        "Tasks.$.taskDescription" : newDesc,
        "Tasks.$.DueDate" : newDueDate,

      }},{new:true});
      return res.json({message :"Task Edited Succesfully !"});
})
app.listen(3000);