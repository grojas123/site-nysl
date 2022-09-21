import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider } from 'reactfire';
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
ReactDOM.render(
  <BrowserRouter>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
