import { useState } from "react"
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const Register = () => {

  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const onSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate('/')
        // @ts-ignore
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.error('Email Already in Use');
        }
      })
  }

  return <>
    Register
    <form>
      <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button type="button" onClick={onSubmit}>Register</button>
    </form>
  </>

}

export default Register

