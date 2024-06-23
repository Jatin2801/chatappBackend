// impoting 
import express from 'express'
import mongoose from 'mongoose';
import Messages from './dbmsgs.js'
import Pusher from 'pusher'

// app config 
const app = express()
const port = process.env.PORT || 7000;

const pusher = new Pusher({ //got these codes from pusher site 
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


// Pusher (This is our Changestream)

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB is connected'); // This will run once the connection is open

    const msgCollection = db.collection('messagecontents'); // Use your desired collection name
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('Change in DB:', change); // Log changes in the database

        if(change.operationType === 'insert'){ // operationType is in watch and we console logged it too 
            const msgDetails = change.fullDocument; // fullDocument is field in change in watch() and we saved it in msgDetails
            pusher.trigger('messages','inserted', // trigger pusher here and messages is a channel of pusher
                {
                    name: msgDetails.user,
                    message: msgDetails.message
                }
            )
        }else{
                console.log('error triggering pusher')
            }
    });
});



//api routes
app.get('/', (req, res) => res.status(200).send("hello"));

app.get('/messages/sync', async (req, res) => { // to store all data 
    try {
        const data = await Messages.find(); // find db names Messages 
        res.status(200).send(data); // Send all the data of DB 
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/messages/new', async (req, res) => { // this is to post the msgs to the db 
    const dbMessage = req.body; 
    try{
        await Messages.create(dbMessage); // Assuming Messages is your Mongoose model
        res.status(201).send(req.body); //
    } catch (error) {
        console.error(`Error creating message: ${error}`);
        res.status(500).send('Error creating message'); // Updated response
    }
});

 
// listener 
app.listen(port,()=>console.log(`listening on localhost:${port}`))