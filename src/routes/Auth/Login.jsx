import firebase from 'firebase/compat/app';
import { auth } from '../../config/firebase/firebase';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react';

const Login = () => {// Initialize the FirebaseUI Widget using Firebase.

  useEffect(() => {

    
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
  
    
    });
  }, [])

  return (
    <div id="firebaseui-auth-container"></div>
  )
}

export default Login