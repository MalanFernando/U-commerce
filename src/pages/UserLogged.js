import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/userlogged.css'
import avatar from '../images/robot.png'

const UserLogged = () => {

    const navigate = useNavigate()

    const logOut = ()=>{
        localStorage.setItem("token", "")
        localStorage.setItem("userName", "")
        navigate("/login")
    }

    return (
        <section className='content-user content'>
            <div className='user-profile'>
                <div className='profile-content_img'>
                    <img className='img-user' src={avatar} alt="" />
                </div>
                <h3 className='profile-name'>{localStorage.getItem("userName")}</h3>
            </div>
            <button id='user-btn' className='btns' onClick={logOut}>
                Log out
            </button>
        </section>
    );
};

export default UserLogged;