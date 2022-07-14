const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const messageSchema=new Schema({
    message:{
        type:String,
        required:true
    }
},{timestamps:true});


const message=mongoose.model('message',messageSchema);
module.exports=message;





