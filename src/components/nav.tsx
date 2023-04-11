import { getAuth, signOut } from "firebase/auth";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { auth } from '../firebase';

const Nav = () => {

  let navigate = useNavigate();


  function logOut(): void {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const userEmail = auth.currentUser?.email
  const userName = auth.currentUser?.displayName

  return <nav style={{ display: "flex", gridGap: "30px", padding: "20px", justifyContent: "space-between" }}>
    <div className="links" style={{ display: "flex", gridGap: "10px" }}>
      <Link to="/">Главная</Link>

      <Link to="/test">Test</Link>
    </div>
    <div className="contols" style={{ display: "flex", gridGap: "10px" }}>
      {userEmail && <a href="#" onClick={logOut}>Logout</a>}
      {!userEmail && <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>}
      {userName}
      {userEmail}
    </div>
  </nav>

}

export default Nav