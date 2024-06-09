// impoting 
import express from 'express'
import mongoose from 'mongoose';
import Messages from './dbmsgs.js'
import pusher from 'pusher'

// app config 
const app = express()
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1816428",
    key: "97a29d2e7342b672ad5a",
    secret: "d805ee973ce0754c6467",
    cluster: "ap2",
    useTLS: true
  });

//middleware 
app.use(express.json())

//DB config
const connection_url = 'mongodb+srv://jatinjaat2801:wP8LY0uxl44hNrfH@cluster0.crzdpgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(connection_url,{

})
// ???

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/messages/new', async (req, res) => {
    const dbMessage = req.body;

    try{
        await Messages.create(dbMessage); // Assuming Messages is your Mongoose model
        res.status(201).send('Message created');
    } catch (error) {
        console.error(`Error creating message: ${error}`);
        res.status(500).send('Error creating message'); // Updated response
    }
});

 
// listener 
app.listen(port,()=>console.log(`listening on localhost:${port}`))