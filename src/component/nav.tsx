import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { auth } from '../firebase';

const Nav = () => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const [isLogin, setIsLogin] = useState(false)

  let navigate = useNavigate();

  function logOut(): void {
    sessionStorage.removeItem('Auth Token');
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login')
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser)
      setEmail(currentUser?.email || "")
      setName(currentUser?.displayName || "")
      setPhoto(currentUser?.photoURL || "")
      setIsLogin(currentUser?.email || currentUser?.displayName ? true : false)
    });
  }, []);

  return <nav style={{ background: "red", display: "flex", gridGap: "30px", padding: "20px", justifyContent: "space-between" }}>
    <div className="links" style={{ display: "flex", gridGap: "10px" }}>
      <Link to="/">Главная</Link>
      <Link to="/test">Test</Link>
    </div>
    <div className="contols" style={{ display: "flex", gridGap: "10px" }}>
      {isLogin && <>
        <a href="#" onClick={logOut}>Logout</a>
        <Link to="/setting">Setting</Link>
      </>}
      {!isLogin && <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>}
      {name}
      <img src={photo} style={{ width: "50px", borderRadius: "100%" }} />
    </div>
  </nav>

}

export default Nav

