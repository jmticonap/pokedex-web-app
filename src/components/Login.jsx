
import React, {useEffect} from 'react';
import imgLogo from '../assets/img/pokedex.png'
import { JInputTextButton } from './Common'
import './css/login.css'
import { changeName } from '../store/slices/userName.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (value) => {
        dispatch( changeName(value) )
        navigate('/pokedex')
    }

    return (

        <div className='login'>
            <div className='login__card'>
                <img src={imgLogo} alt='Pokedex logo' />
                <div className='login__titles'>
                    <h1 className='login__title'>¡Hello trainer!</h1>
                    <h2 className='login__subtitle'>to begin write our your name</h2>
                </div>
                <JInputTextButton onSubmit={onSubmit} />
            </div>

            <svg className='footer__cicle' width="117" height="117" version="1.1" viewBox="0 0 117 117" xmlns="http://www.w3.org/2000/svg">
                <circle cx="58.5" cy="58.5" r="52.5" fill="#fff" stroke="#000" strokeWidth="12" />
                <circle cx="58.5" cy="58.5" r="25.5" fill="#212121" stroke="#000" strokeWidth="12" />
            </svg>
            <div className='footer__strips'></div>
        </div>

    );
};

export default Login;