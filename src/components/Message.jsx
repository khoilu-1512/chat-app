import React, { useContext, useEffect, useRef } from 'react';

import { AuthContext, ChatContext } from '../context';
import getInitials from '../utils';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const loggedInUserID = message.senderId === currentUser.uid;

  return (
    <div ref={ref} className={`message ${loggedInUserID && 'owner'}`}>
      <div className='message__info'>
        <span className='message__avatar'>
          {loggedInUserID
            ? getInitials(currentUser.displayName)
            : getInitials(data.user.displayName)}
        </span>
        <span>just now</span>
      </div>
      <div className='message__content'>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
