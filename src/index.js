import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import DataContextProvider from "./context/DataContextProvider.jsx";

// var firebaseConfig = {
//   apiKey: "AIzaSyDtrniINsUV9CLDGSymrdxNDa54WSEyZJQ",
//   authDomain: "split-the-bill-auth.firebaseapp.com",
//   projectId: "split-the-bill-auth",
//   storageBucket: "split-the-bill-auth.appspot.com",
//   messagingSenderId: "320837851460",
//   appId: "1:320837851460:web:827b9f61fda84bd7105f11"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <DataContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </DataContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
