import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzRAllWdb86LqtR6Ws7756-6Qn5IT2fJ0",
  authDomain: "my-react-blog-4ae33.firebaseapp.com",
  projectId: "my-react-blog-4ae33",
  storageBucket: "my-react-blog-4ae33.appspot.com",
  messagingSenderId: "808528899903",
  appId: "1:808528899903:web:6ddf6b3aef577aa673ad8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
