import React, { useRef, useState } from 'react'
import './App.css'
import Signout from "./components/Signout"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/analytics';
import {useAuthState} from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';
import SingIn from './components/SingIn';

firebase.initializeApp({
    apiKey: "AIzaSyBBkbiLZryuCHqf4vm-A_8qihWFNtj9MfA",
    authDomain: "react-chat-app-c4df5.firebaseapp.com",
    projectId: "react-chat-app-c4df5",
    databaseURL:"https:/react-chat-app-c4df5.firebaseio.com",
    storageBucket: "react-chat-app-c4df5.appspot.com",
    messagingSenderId: "302022854838",
    appId: "1:302022854838:web:ae8387808fdfa0a147fe17",
    measurementId: "G-XK3H58RK7Q"
})

const auth=firebase.auth();
const firestore=firebase.firestore();
const App = () => {
    const [user]=useAuthState(auth);//this firebase will tell me authometically that whether somebody has signed it or not...
  return (
    <div className='App'>
      <header>
        <h1>Aao baatein krein</h1>
        <Signout auth={auth}/>
      </header>
      <section>
        {user?<ChatRoom firestore={firestore} auth={auth} firebase={firebase}/>:<SingIn auth={auth} firebase={firebase}/>}
      </section>
      <DeleteAllMessages/>
    </div>
  )
}

const DeleteAllMessages = () => {
  const messagesRef = firebase.firestore().collection("messages");
  // Query for all documents in the collection
  messagesRef.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // Delete each document
        doc.ref.delete();
      });
    })
    .catch(error => {
      console.error("Error deleting messages: ", error);
    });
    return(
      <button onClick={DeleteAllMessages} className='deleteBtn'>Delete All Messages</button>
    )

};

export default App
