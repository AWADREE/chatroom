import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useSound from "use-sound";

import { auth, firestore } from "../firebase";
import nSound from "../pop.mp3";

import ChatMessage from "./ChatMessage";

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages"); //referanceing a firebase collection
  const query = messagesRef.orderBy("createdAt").limit(1000); //query documents in the collection while ordering them by the "createdAt" time stamp,

  // const query = messagesRef.orderBy("createdAt", "desc").limit(25); //query documents in the collection while ordering them by the "createdAt" time stamp,
  // in desending order and limiting them to a max of 25, we will reverse them before mapping later but we had to get them in decending order now,
  //to be able to get the last 25 instead of the first 25
  // let orderedMessages;

  const [messages, loading] = useCollectionData(query, {
    idField: "id",
  }); //listening to the data in real time,
  // it returns an array of objects where each object is the chat message and the database
  //and it returns a boolian while is true untill its finished loading

  //a custome hook to get the previuse value
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  //using the custome hook
  const prevMessages = usePrevious(messages);

  // if (!loading) {
  //   orderedMessages = messages.reverse();
  // }

  const [formValue, setFormValue] = useState("");

  //this function takes the event given to it by the onSubmit
  const sendMessage = async (e) => {
    e.preventDefault(); //to prevent page refresh on submit
    //destructuring the user id from the currently logedin user
    const { uid, photoURL } = auth.currentUser;
    //creating a new document in firestore, the add function takes an object

    //this if statment will add a message to the db only if the text is not just spaces
    if (formValue.trim() === "") {
      return;
    } else {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), //this is how to get the server timestamp of the message
        uid,
        photoURL,
      });
    }
    //this will reslove when the document is created

    setFormValue("");
    scrollToBottom();
  };

  //this function playes a sound
  const [play] = useSound(nSound);

  //when the component renders and whenever the components updates scroll to the bottom
  useEffect(() => {
    if (messages === prevMessages) {
      return;
    } else {
      scrollToBottom();
      console.log("scrolling down");
    }
  }, [messages]);

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }

  //   if (messages === prevMessages) {
  //     return;
  //   } else {
  //     play();
  //   }
  // });

  // React.useEffect(() => {
  //   console.log("MOUNTED");
  //   return () => console.log("UNMOUNTED");
  // });

  //when messages change play a notification sound
  useEffect(() => {
    if (messages === prevMessages) {
      return;
    } else {
      play();
      console.log("sound played");
    }
  }, [messages]);

  //we added an empty div at the bottom of the messages and referanced it and scrolling to it after sending a message
  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        {/* bind the state to the form input, whenever the value of the input changes , the form value state will be set to the value of the input */}

        <button type="submit" disabled={!formValue || formValue.trim() === ""}>
          {/* disabling the button if there is no text or if the text was just spaces */}
          Send
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
