import { initializeApp} from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getDatabase} from 'firebase/database';
import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// const analytics = getAnalytics(app);
export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };


const firebaseSignOut = () => signOut(getAuth(firebase));


export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

const firebaseConfig = {
  apiKey: "AIzaSyDKIrUzXk5468PKOAl05fRDub2ynJiTDWM",
  authDomain: "site-nysl.firebaseapp.com",
  databaseURL: "https://site-nysl-default-rtdb.firebaseio.com",
  projectId: "site-nysl",
  storageBucket: "site-nysl.appspot.com",
  messagingSenderId: "17474263660",
  appId: "1:17474263660:web:1172327d61ab57eef69649",
  measurementId: "G-ES77RVXY38"
};

const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);
export const storage = getStorage(firebase);


export const SignOuButton = () => (
  
    <button className="btn btn-secondary btn-sm"
        onClick={() => firebaseSignOut()}>
      Sign Out
    </button>
  );

  export const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signInWithGoogle()}>
      Sign In
    </button>
  );
