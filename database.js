const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/practicekaroCurd')
.then(()=>{
console.log('Ho gaya')
})
.catch((err)=>{
    console.log('Error',err)
})

// create schema
const Schema1=new mongoose.Schema(
    {
        name:String,email:String,password:String
    }
)

const usermodel=mongoose.model('User',Schema1)

module.exports=usermodel