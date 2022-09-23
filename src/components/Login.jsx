
import React from 'react';
import imgLogo from '../assets/img/pokedex.png'
import { JInputTextButton } from './Common'
import './css/login.css'

const Login = () => {
    const onSubmit = (value) => {
        console.log(value)
    }
    return (

        <div className='login'>
            <img src={imgLogo} alt='Pokedex logo' />
            <h1 className='login__title'>¡Hello trainer!</h1>
            <h2 className='login__subtitle'>to begin write our your name</h2>
            <JInputTextButton onSubmit={onSubmit} />

        </div>

    );
};

export default Login;