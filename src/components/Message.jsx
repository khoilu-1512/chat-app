import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

import getInitials from '../utils';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className='messageInfo'>
        <span className='messageAvatar'>
          {message.senderId === currentUser.uid
            ? getInitials(currentUser.displayName)
            : getInitials(data.user.displayName)}
        </span>
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
