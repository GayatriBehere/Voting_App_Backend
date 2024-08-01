const User=require('./../models/user')
const {jwtAuthMiddleware,generatetoken}=require('./../jwt');
const { response } = require('express');

const postData=async(req,res)=>{
    try{
      const data=req.body

       // Check if the role is 'admin'
    if (data.role === 'admin') {
      // Query the database to see if an admin already exists
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        // If an admin already exists, respond with an error message
        return res.status(400).json({ error: 'An admin already exists.' });
      }
    }
    const newUser=new User(data);
    const response= await newUser.save();
    console.log('data saved');
    const payload={
      id:response.id
    }

    const token=generatetoken(payload);
    

    
    res.status(200).json({response:response,token:token});
    }catch(err){
      console.log(err);
      res.status(500).json({error:'inernal server error'});
  
    }
  }


const login=async(req,res)=>{
    try {
      //extract adhar number and password      
      const{adhar_card,password}=req.body;

      //find user by adhar number
      const user=await User.findOne({adhar_card:adhar_card});

      //if user does not exist and password does not  match

      if(!user ||!(await user.comparePassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
        }


        //generate tokenn
        const payload={
            id:user.id
        }
    
       const token=generatetoken(payload)
         //resturn token as respose
         res.json({token})


    } catch (error) {
      console.log(error)
      res.status(500).json({error:'internal server error'})
    }
  }

  
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // extract the id from token
        const {currentPassword,newPassword}=req.body
        const user=await User.findById(userId)
        
        
        //if password does not match
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //update the user password
        user.password=newPassword;
        await user.save()

       
        
        console.log(`password updated`);
        res.status(200).json({message:'Pasword change successfuly'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
};





  module.exports={postData,changePassword,login}