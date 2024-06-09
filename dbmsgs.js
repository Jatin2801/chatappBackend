import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
    message:String,
    name : String,
    received : Boolean,
})

export default mongoose.model('messageContent' ,  whatsappSchema) ; // messageContent is the name we gave to show in our DB collection
