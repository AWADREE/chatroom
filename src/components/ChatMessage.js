import React from "react";

import { auth } from "../firebase";

const ChatMessage = (props) => {
  //destructureing the text, and the uid from the message prop
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"; //compareing if the uid is equal to the current user uid, if so then messageclass is sent,
  //if not then messageClass is received

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
