
const express = require('express')
const router=express.Router();
const { postData,updatePerson, deleteCandidate,voting,countOfVoting,candidate} = require('../Controllers/candidates');

const {jwtAuthMiddleware,generatetoken}=require('../jwt')

router.post('/',jwtAuthMiddleware,postData)
router.get('/',candidate);
router.put('/:candidateId',jwtAuthMiddleware,updatePerson);
router.delete('/:candidateId',jwtAuthMiddleware,deleteCandidate);


router.post('/vote/:candidateId',jwtAuthMiddleware,voting);
router.get('/vote/count',countOfVoting);

module.exports=router;