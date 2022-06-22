import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/navBar.css'
import logo from '../images/logo-e.png'
import avatar from '../images/robot.png'
import Cart from './Cart';

const NavBar = () => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const counter = useSelector(state=> state.counter)

    const showCart = ()=>{
        if(localStorage.getItem("token")){
            setShow(!show);
        } else {
            navigate("/login")
        };
    }

    return (
        <div className='head'>
            <nav className='head-nav-bar'>
                <div className='bar content'>
                    <a className='bar-logo' href="/#/">
                        <div className='logo-img_content'>
                            <img className='logo-img' src={logo} alt="" />
                        </div>
                        <h6 className='logo-title'>U-COMMERCE</h6>
                    </a>
                    <div className='bar-btns'>
                        <button className="btns btn-cart" onClick={showCart}>
                            <i className="fa-solid fa-cart-shopping"></i><span className='cart-count'>{counter}</span>
                        </button>
                        <a href="/#/userlogged" className='btns btn-user'><img className='btn-img' src={avatar} alt="" /></a>
                    </div>
                </div>
            </nav>
            <section className={`cart ${show ? 'open' : ''}`}>
                <Cart/>
            </section>
            <div className='head-purchases'>
                <a href="/#/purchases" className='purchases-btn'><i className="fa-solid fa-bag-shopping"></i> Purchases</a>
            </div>
        </div>
    );
};

export default NavBar;