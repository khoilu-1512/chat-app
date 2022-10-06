import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';

import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import getInitials from '../utils';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className='navbar__logo'>Gossip Chat</span>
      <div className='navbar__user'>
        <span className='navbar__user-avatar'>
          {getInitials(currentUser.displayName)}
        </span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
