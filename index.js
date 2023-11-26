const express=require('express')
const app=express()
const user=require('./database.js')
const bodyParser = require('body-parser')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
    const users=await user.find({});
    res.render('index',{
        title:"Home Page",
        text:"user Page",
        users:users
    })
})

app.post('/register',async(req,res)=>{
    

    const {name,email,password}=req.body;
    const newUser=new user({
        name,email,password
    })
    await newUser.save()
    res.redirect('/register')
})

app.get('/register',(req,res)=>{
    res.render('register',{title:'register'})
})


app.get('/edit/:id',async(req,res)=>{
    const id=req.params.id;
    const user1=await user.findById({_id:id});
    if(user1==null){
        res.redirect('/')
    }else{
        
        res.render('edit',{user:user1})
    }
})

app.post('/update/:id',async(req,res)=>{
    const {id}=req.params;
    const {name,email,password}=req.body;
    const updateuser=await user.findByIdAndUpdate({_id:id},{name,email,password},{new:true})
    res.redirect('/')
})



app.get('/delete/:id',async(req,res)=>{
    const {id}=req.params
    const deleteuser=await user.findByIdAndDelete({_id:id})
    res.redirect('/')
})


app.listen(5000,(req,res)=>{
    console.log('server listening on port no : 5000')
})