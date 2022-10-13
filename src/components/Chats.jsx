import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext, ChatContext } from '../context';
import { db } from '../firebase';
import getInitials from '../utils';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        console.log('unsub', unsub());
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  return (
    <div className='chats'>
      {console.log('chats', chats)}
      {Object.entries(chats)
        ?.sort((oldChat, newChat) => newChat[1].date - oldChat[1].date)
        .map((chat) => (
          <div
            className='user-chat'
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <span className='user-chat__avatar'>
              {getInitials(chat[1].userInfo.displayName)}
            </span>
            <div className='user-chat__info'>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
