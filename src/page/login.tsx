import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import { auth } from '../firebase';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  let navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // @ts-ignore
        console.log("!!!", response.user.accessToken)
        // @ts-ignore
        sessionStorage.setItem('Auth Token', response.user.accessToken)
        navigate('/')

        // sessionStorage.setItem('Auth Token', response.user.refreshToken)
        // sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)

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

  const singInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('result', result);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        sessionStorage.setItem('Auth Token', `${accessToken}`)
        navigate('/')
      }).catch((error) => {
        console.log('error', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }


  const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        sessionStorage.setItem('Auth Token', `${token}`)
        navigate('/')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return <>
    Login
    <form onSubmit={(e) => onSubmit(e)} style={{ display: "flex", flexDirection: "column", width: "600px", margin: "auto" }}>
      <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <button onClick={singInWithGoogle}>Google</button>
      <button onClick={singInWithFacebook}>Facebook</button>
    </form>
  </>

}

export default Login