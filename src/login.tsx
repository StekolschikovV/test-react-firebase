import { useState } from "react"
import { auth } from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  let navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate('/')
        // @ts-ignore
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/wrong-password') {
          console.error('Please check the Password');
        }
        if (error.code === 'auth/user-not-found') {
          console.error('Please check the Email');
        }
      })
  }

  return <>
    Login
    <form onSubmit={(e) => onSubmit(e)}>
      <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  </>

}

export default Login