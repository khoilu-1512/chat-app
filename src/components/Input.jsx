import React, { useContext, useState } from 'react';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { AuthContext, ChatContext } from '../context';
import { db } from '../firebase';

const Input = () => {
  const [text, setText] = useState('');

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
  };
  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='input__send'>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
