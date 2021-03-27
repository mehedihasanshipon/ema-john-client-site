import React, { useContext } from 'react';
import { Link, Router } from 'react-router-dom';
import { UserContext } from "../../App";
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser,setUserLoggedIn] = useContext(UserContext);
    return (
        <div className = 'header'>
            
            <img src={logo} alt=""/>
            <nav>
            
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Accounts here</Link>
                <button onClick={()=>setUserLoggedIn({})}>Sign out</button>
          
            </nav>
            
        </div>
    );
};

export default Header;