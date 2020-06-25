import React, { useState, useEffect } from 'react';
import Home from './components/home/Home';
import Login from './components/login/Login';
import firebase from './components/config/firebase-config';

function App() {

  const [currentUser, setCurrentUser] = useState<any>(null);
 
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('user', user.uid);
      } else {
        setCurrentUser(null);
        localStorage.removeItem('user');
      }
    })
  }

  useEffect(() => {
    authListener();
  }, []);

  return (
       <div className="App">
          {currentUser ? (<Home />) : (<Login />)}
      </div>
  );
}

export default App;
