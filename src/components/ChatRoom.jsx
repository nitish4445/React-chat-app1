import {React,useRef,useState} from 'react'
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
const ChatRoom = (props) => {
  const dummy=useRef();
    const messagesRef=props.firestore.collection("messages");
    const query=messagesRef.orderBy('createdAt').limit(100);
    const [messages]=useCollectionData(query,{idField:'id'});
    const [fromData,setFormdata]=useState('');
    const hendleSubmt= async (e)=>{
      e.preventDefault();
      const {uid,photoURL}=props.auth.currentUser;
      await messagesRef.add({
        text:fromData,
        createdAt:props.firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormdata('');
      dummy.current.scrollIntoView({behavior:'smooth'});
    }
    return(
      <>
      {/*messages && messages.map(msg =><ChatMessage key={msg.id} message={msg} auth={props.auth}/>)*/}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
      <div ref={dummy}></div> 
      <div className='chat-input-container'>
      
      <form onSubmit={hendleSubmt} >
        <input type="text" value={fromData} onChange={(e)=>setFormdata(e.target.value)} placeholder='Enter your message'/>
        <button type='submit' disabled={!fromData}>Message</button>
      </form>
      </div>
      </>
    )
}

export default ChatRoom
