const mongoose = require('mongoose');
require('dotenv').config();
const mongourl = process.env.MONGO_URL;
mongoose.connect(mongourl);

const taskSchema = new mongoose.Schema({
    taskTitle :{
        type : String,
        required : true
    },
    taskDescription : String,
    DueDate : Date,
    isCompleted :{
        type : Boolean,
        default : false
    },
    createdAt :{
        type : Date,
        default : Date.now
 
    } 
})
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    Tasks : [taskSchema]
})
module.exports = mongoose.model('ToDoLoUsers',userSchema);