import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Nav from './component/nav';
import './index.css';
import Home from './page/home';
import Login from './page/login';
import Setting from './page/setting';
import Register from './register';
import reportWebVitals from './reportWebVitals';
import Test from './test';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/test' element={<Test />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
