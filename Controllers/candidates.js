const User=require('../models/user')
const Candidate=require('../models/candidate')
const {jwtAuthMiddleware,generatetoken}=require('../jwt');



const checkAdminRole=async(userId)=>{
    try {
      const user=await User.findById(userId);
      return user.role ==='admin';
    } catch (error) {
       
      return false
      
    }

}


const postData=async(req,res)=>{
    try{

      if(!(await checkAdminRole(req.user.id))){
        return res.status(403).json({message:'user has not admin role'})
      }
      const data=req.body
    const newCandidate=new Candidate(data);
    const response= await newCandidate.save();
    console.log('data saved');
      
    res.status(200).json({response:response});
    }catch(err){
      console.log(err);
      res.status(500).json({error:'inernal server error'});
  
    }
  }

  
  const updatePerson = async (req, res) => {
    try {
      if(!checkAdminRole(req.user.id)){
        return res.status(403).json({message:'user has not admin role'})
      }

        const candidateId = req.params.candidateId; // id from URL parameter
        const updatedcandidatedata = req.body; // Fields to be updated
        
        // Find person by the current name and update with new values
        const updatedPerson = await Person.findOneAndUpdate(candidateId,updatedcandidatedata,{
          new:true,
          runValidators:true
        });
        
        // If no person is found, return 404
        if (!response) {
            return res.status(404).json({ error: 'candidate not found' });
        }
        
        console.log(`candidate data5 updated`);
        res.status(200).json(updatedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const deleteCandidate= async (req, res) => {
  try {
    if(!checkAdminRole(req.user.id)){
      return res.status(403).json({message:'user has not admin role'})
    }

      const candidateId = req.params.candidateId; // id from URL parameter
      
      // Find person by the current name and update with new values
      const updatedPerson = await Person.findByIdAndDelete(candidateId);
      
      // If no person is found, return 404
      if (!response) {
          return res.status(404).json({ error: 'candidate not found' });
      }
      
      console.log(`candidate deleted`);
      res.status(200).json(updatedPerson);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'internal server error' });
  }
};

const voting=async(req,res)=>{
  //no admin can vote
  //user can only vote once
   candidateId=req.params.candidateId;
   userID=req.user.id
   try {
    const candidate=await Candidate.findById(candidateId)
    if(!candidate){
      return res.status(404).json({message:'Candiadtes not found'});

    }
    const user=await User.findById(userID)
    if(!user){
      return res.status(404).json({message:'user not found'});
    }


    if(user.isVoted){
      return res.status(400).json({message:'you have already voted'});
      
    }

    if(user.role=='admin'){
      return res.status(403).json({message:'you have already voted'});

    }

    candidate.votes.push({user:userID})
    candidate.voteCount++;
    await candidate.save();

    //update the user document
    user.isVoted=true
    await user.save();
    return res.status(200).json({message:'vote recorded succesfully'});

   } catch (error) {

    console.log(error);
    res.status(500).json({error:'inernal server error'});

    
   }


  }

 const countOfVoting=async(req,res)=>{

  try {

    const candidate=await Candidate.find().sort({voteCount:'desc'});

    const Voterecord=candidate.map((data)=>{
      return {
        party:data.party,
        count:data.voteCount

      }
    })



    res.status(200).json(Voterecord);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'inernal server error'});
    
  }
 }

 const candidate=async(req,res)=>{

  try {
    const candidate=await Candidate.find()

    res.status(200).json(candidate);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'inernal server error'});
    
  }
 }




  module.exports={postData,updatePerson,deleteCandidate,voting,countOfVoting,candidate}