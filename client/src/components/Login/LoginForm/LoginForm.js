import React, {useRef, useState} from "react";
import {TextField, Fab, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loader from "react-loader-spinner";
import axios from "axios";

const LoginForm = ({setUserDataForChat}) => {
  const [loading, setLoading] = useState(false);
  const userNameInput = useRef("");

  const enterChatClick = () =>{
    setUserName();
  }

  let getRandomNumber = ()=>  {
    let min = Math.ceil(1);
    let max = Math.floor(100);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }

  const setUserName = () =>{
    let userName = "";
    let suffix = getRandomNumber();
    userName = "anon" + suffix;
    setLoading(true);
    console.log(userName);
      try{
        setUserDataForChat({
          user_name: userName,
        });
      }catch (e) {

      }
    }


  return loading ? (<Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />) : (
    <form className="login-form" autoComplete="off">
      {/* <TextField
        id="chat-username"
        label="Enter Username"
        margin="normal"
        fullWidth
        rows="1"
        inputRef={userNameInput}
        onKeyDown={event => {
          if(event.key === "Enter"){
            event.preventDefault();
            setUserName(event.target.value);
          }
        }}
      /> */}
      <Button
        variant="contained"
        color="primary"
        onClick={enterChatClick}
      >
        Enter Chat
      </Button>
    </form>
  )
}

export default LoginForm;