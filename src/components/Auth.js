import '../styles/auth.css'

import { useState } from 'react';
import { auth, provider } from '../Firebase-config'
import { signInWithPopup, signOut } from 'firebase/auth';

import Cookies from 'universal-cookie';

// to let the user logged in in case of any network error we can use cookies
// to keep track of the user
const cookies = new Cookies();





export default function Auth(props) {

  const { setIsAuth } = props;

  const signinWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);

      cookies.set('auth-token', response.user.refreshToken);
      setIsAuth(true)

    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = async () => {
    try {
      let res = await signOut(auth);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='auth'>

      <p>Sign In With Google To Continue</p>
      <button onClick={signinWithGoogle}>
        Sign In With Google
      </button>

      {/* <button onClick={handleLogout}>
        Log Out
      </button> */}
    </div>
  )
}
