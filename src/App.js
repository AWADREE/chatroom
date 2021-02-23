import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./App.css";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Room</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignOut() {
  //checking to see if we have a current user if we do we return a button, this button when clicked it called the signout method from auth
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
