const mongoose=require('mongoose');

const bcrypt=require('bcrypt');


const userScema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
        
    },
    email:{
        type:String,
       
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    adhar_card:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

userScema.pre('save',async function(next){
    const person=this
     //
    if(!person.isModified('password')) return next();
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(person.password,salt)
        person.password=hashPass;

        next();
    } catch (error) {
        return next(error);
        
    }
})

userScema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch;


    }catch(err){
        throw err;

    }
}

const User=mongoose.model('User',userScema);

module.exports=User;