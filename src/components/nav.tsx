import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

const Nav = () => {

  let navigate = useNavigate();


  function logOut(): void {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
  }

  return <nav style={{ display: "flex", gridGap: "30px", padding: "20px" }}>
    <Link to="/">Главная</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <a href="#" onClick={logOut}>Logout</a>
  </nav>

}

export default Nav