import React, { useContext, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { AuthContext, ChatContext } from "../context";
import { db } from "../firebase";

const Input = () => {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const inputRef = useRef(null);
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text) {
        handleSend();
      }
    }
  };
  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  return (
    <div className="input">
      <input
        ref={inputRef}
        type="text"
        onKeyDown={onKeyDown}
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="input__send">
        {text ? (
          <button onClick={handleSend}>Send</button>
        ) : (
          <button disabled onClick={handleSend}>
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
