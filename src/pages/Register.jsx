import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      //Create user
      setErr(false);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Update user profile
      await updateProfile(res.user, {
        displayName,
      });

      //create user on firestore
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, 'userChats', res.user.uid), {});
      navigate('/login');
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Gossip Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type='text' placeholder='Display name' />
          <input required type='email' placeholder='Email' />
          <input required type='password' placeholder='Password' />
          <button>Sign up</button>
          {err && <span className='error'>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
