import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";
import Button from "@material-ui/core/Button";


const sendMessageClick = () =>{

  const messageObject = {
    user_name: props.userData.currentUserData.user_name,
    user_avatar: props.userData.currentUserData.user_avatar,
    message: messageRef.current.value
  }
  props.onSendMessage(messageObject);
}

const Chat = (currentUserData) => {

  const {messages, sendMessage} = useChat();
  return (
    <div>
      <Messages
        messages={messages}
      />
      <MessageBox
        userData={currentUserData}
        onSendMessage={message => {
          sendMessage(message);
        }}
      />
    </div>
  );
};

export default Chat;