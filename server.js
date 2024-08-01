const express = require('express')
const app = express();
const db=require('./db')
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT||3000;
    

const userRoutes=require('./Routes/userRoutes')
const candidateRoutes=require('./Routes/candidatesRoutes')


app.get('/',function (req,res){
    res.send('welcome to Voting app');

})



app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)




app.listen(PORT,()=>{
    console.log("Listnening on port 3000")
})