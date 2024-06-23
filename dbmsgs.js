import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
    message:String,
    name : String,
    received : Boolean,
})

//collection
export default mongoose.model('messagecontents' ,  whatsappSchema) ; // messageContents is the name we gave to show in our DB collection
