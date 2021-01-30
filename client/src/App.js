import React, {useState} from "react";
import Chat from "/components/Chat/Chat"
import LoginForm from "./components/Login/LoginForm/LoginForm";
import Users from "/components/Login/Users";
import "./App.css"

const App = () =>{
  const [userData, setUserData] = useState(null);
  const [allUsers, setUsers] = useState(null);
  console.log('current user', userData);


  if(userData === null){
    return (
      <div className="container">
        <div className="container-title">Welcome to our Chat App</div>
        <LoginForm
          setUserDataForChat={setUserData}
        />
      </div>
    )
  }
  return (
    <div>
      <Users allUsers={allUsers}></Users>
      <Chat
        currentUserData={userData}
      />
    </div>
  );
}

export default App;