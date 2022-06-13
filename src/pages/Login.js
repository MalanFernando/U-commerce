import React from 'react';
import "../css/login.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const submit = (data)=>{
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res=> {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userName", res.data.data.user.firstName + " " + res.data.data.user.lastName);
                navigate("/userlogged");
            })
    }

    return (
        <section className='content-login content'>
            <div className='login-info'>
                <p className='info-instructions'>Welcome! Enter your email and password to continue</p>
                <div className='info-test'>
                    <h3>Test data</h3>
                    <p><i className="fa-solid fa-envelope"></i>admin-user@gmail.com</p>
                    <p><i className="fa-solid fa-lock"></i>userdev1234</p>
                </div>
            </div>
            <form className='login-form' action="" onSubmit={handleSubmit(submit)}>
                <label className='form-label' htmlFor="email">
                    Email
                    <input 
                        className='form-input' 
                        type="email" 
                        placeholder='Email' 
                        id='email'
                        required
                        {...register("email")}
                    />
                </label>
                <label className='form-label' htmlFor="password">
                    Password
                    <input 
                        className='form-input' 
                        type="password" 
                        placeholder='Password' 
                        id='password'
                        required
                        {...register("password")}
                    />
                </label>
                <button id='form-btn' className='btns'>Login</button>
            </form>
        </section>
    );
};

export default Login;