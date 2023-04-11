import { useState, useRef } from "react";
import Auth from "./components/Auth";
import './styles/chat.css'

import Cookies from 'universal-cookie';
import Chat from "./components/Chat";

import { signOut } from "firebase/auth";
import { auth } from "./Firebase-config";


const cookies = new Cookies();

function App() {

  const [ isAuth, setIsAuth ] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState('');

  // when we start typing room id using onChange function the page will move 
  // to chat component to overcome this we can use useRef hook
  const roomInputRef = useRef(null);
  
  // sigining out the user
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  }
  
  // if user is not authenticated
  if(!isAuth) {
    return (
      <>
      <Auth setIsAuth={setIsAuth} />
      </>
    );
  }

  // generating random room id
  const generateRandomValue = () => {
    const length = 10;
    let strings = 'abcdefghijklmnopABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

    let randomValue = ''
    for(let i=0; i<length; i++) {
      randomValue += strings.charAt(Math.floor(Math.random() * strings.length));
    }

    setRoomId(randomValue);
    console.log(randomValue);

  }
  

  const copyToClipboard = () => {

  }


  return <>
    {room ? <Chat room={room} /> : (
     <div className='room'>
        <label>
          Generate Room ID : 
          <button onClick={generateRandomValue}>Generate</button>
          <button onClick={copyToClipboard}>Copy Id</button>
        </label> 
        <input ref={roomInputRef} value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
        <button onClick={() => setRoom(roomInputRef.current.value)}>
          Enter Chat
        </button>
     </div>
    )}

    <div className="sign-out">
      <button onClick={signUserOut}>SignOut</button>
    </div>

  </>
}

export default App;
