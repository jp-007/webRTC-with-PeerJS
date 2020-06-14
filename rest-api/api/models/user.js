const mongoose=require('mongoose')

//users schema
const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    age:Number,
    Address:String,
    Rating:Number
})

module.exports=mongoose.model("User",userSchema)