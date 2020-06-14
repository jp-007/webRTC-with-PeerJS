//ROUTE HANDLER FOR USERS
const express=require('express')
const router=express.Router()

//Models
const mongoose=require('mongoose')
const Users=require('../models/user')

//GET
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'users access!'
    })
})

//POST
/***************************************************************************/

router.post('/',(req,res,next)=>{

            const user=new Users({
                _id:new mongoose.Types.ObjectId,
                name:req.body.name,
                age:req.body.age,
                address:req.body.address,
                rating:0
            })

            user.save()
            .then(result =>{
                res.status(200).json({
                    message:'user saved!',
                })
            })
            .catch(err=>{
                res.status(200).json({
                message:err,
            })}) 
})

//POST USER ID
router.post('/:userId',(req,res,next)=>{
    const id=req.params.userId
 
     if(id === 'special'){
         res.status(200).json({
             message:'users access!'
         })
     }else{
         res.status(404).json({
             message:'Not Found!'
         })
     }
 
 })

/***************************************************************************/


//EXPORTS
module.exports=router