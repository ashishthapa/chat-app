import socketIO from "socket.io";
import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

import mongoConnect from './config/mongo';
import Message from './models/message';

const io = socketIO(process.env.SOCKET_PORT);
const app = express();

io.on("connection", (socket) =>{
  console.log("Connection established");


  getMostRecentMessages()
    .then(results => {
      console.log('latestmostRecentMessagesUsers', results);
      socket.emit("mostRecentMessages", results.reverse());
    })
    .catch(error => {
      socket.emit("mostRecentMessages", []);
    });

  getLatestUsers()
  .then(results => {
    console.log('latestUsers', results);
    socket.emit("latestUsers", results.reverse());
  })
  .catch(error => {
    socket.emit("latestUsers", []);
  });



  socket.on("newChatMessage",(data) => {
    console.log('new chat message', data);
    //send event to every single connected socket
    try{
      const message = new Message(
        {
          user_name: data.user_name,
          message_text: data.message,
        }
      )
      message.save().then(()=>{
        io.emit("newChatMessage",{user_name: data.user_name, message_text: data.message});
      }).catch(error => console.log("error: "+error))
    }catch (e) {
      console.log("error: "+e);
    }
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });
});

/**
 * get 10 last messages
 * @returns {Promise<Model[]>}
 */
async function getMostRecentMessages (){
  return await Message
    .find()
    .sort({_id:-1})
    .limit(10);
}

async function getUsers (){
  console.log('getting users')
  return await Message.user_name
    .find()
    .sort({_id:-1})
    .limit();
}

app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods','POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  //allow request to continue and be handled by routes
  next();
});

//sending json data
app.use(bodyParser.json());

/**
 *
 * @returns {Promise<void>}
 */
const initApp = async () =>{
  try{
    await mongoConnect();
    console.log("DB connection established");
    app.listen(process.env.HTTP_PORT,()=>console.log(`HTTP Server listening on ${process.env.HTTP_PORT}`));
  }catch (e) {
    throw e;
  }
}

initApp().catch(err => console.log(`Error on startup! ${err}`));