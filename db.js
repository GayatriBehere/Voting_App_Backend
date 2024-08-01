const mongoose=require('mongoose');
require('dotenv').config();
//const mongoURL=process.env.mongoDB_URL_Local;
const mongoURL=process.env.mongoDB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Conected to monoDB server")
})

module.exports=db;