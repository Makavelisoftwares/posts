require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Message=require('./models/message');
const bodyParser=require('body-parser');

// connecting mongodb database 
mongoose.connect(process.env.dbURI)
    .then((result)=>{
        console.log('mongodb connected');
        app.listen(3000,()=>{
            console.log('listening to requests')
        })
                
    })
    .catch((err)=>{
        console.log(err)
    })


// setting the view template and enabling the static files
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// Home router
app.get('/',(req,res)=>{
    Message.find()
    .then((result)=>{
        res.render('index',{posts:result});
    })
})

// POSTING ROUTE
app.post('/',(req,res)=>{
    const Post=new Message(req.body);
    Post.save()
        .then(()=>{
            res.status(200).json({msg:"successfully posted"});
        }) 
        .catch((err)=>console.log(err)); 
})