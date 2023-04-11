import { useState, useEffect } from 'react';
import '../styles/chat.css'
import {  
  addDoc, collection, 
  serverTimestamp, onSnapshot, 
  query, where, orderBy
} from 'firebase/firestore';
import { db, auth } from '../Firebase-config';

export default function Chat(props) {

  // destructuring the props
  const { room } = props;

  // states for keeping track of the messages typed
  const [ newMessage, setNewMessage ] = useState('');

  // chats in the form of array to display in the chat box
  const [messages, setMessages] = useState([]);

  // getting chats from the same room
  useEffect(() => {
    // when we are mapping in the chat the chats are not in order to view it in order we are 
    // using this orderBy from firestore which has different rules in firebase
    const queryMessages = query(messagesRef, where('room', '==', room), orderBy('createdAt'));
    const unSubscribe = onSnapshot(queryMessages, (snapShot) => {
      let messages = [];
      snapShot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      })

      setMessages(messages)
    })

    // to clean the useEffect
    return () => unSubscribe();
  }, []);


  // this is a message reference to store in the database
  const messagesRef = collection(db, 'messages');

  // handle form submission to send the messages
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if(newMessage === '') return;

    await addDoc(messagesRef, {
      text : newMessage,
      createdAt : serverTimestamp(),
      user : auth.currentUser.displayName,
      room, // if data exists with same name then this can be written
    })

    setNewMessage('');  
  }


  return (
    <div className="chat-app">
      <div className='header'>
        <h3>Welcome to : {room}</h3>
      </div>
      <div className='messages'>
        {messages.map((message) => (
          <div className='messages' key={message.id}>
            <span className='user'>
              {message.user}
              👉 
              {message.text}
            </span>  
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='new-message-form'>
        <input 
          className='new-message-input' 
          placeholder='Type message here...' 
          onChange={(e)=>setNewMessage(e.target.value)}
        />
        <button className='send-button'>Send</button>
      </form>

      
    </div>
  )
}
