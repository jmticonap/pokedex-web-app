import React from 'react'
import pokedexLogoText from '../assets/img/pokedex.png'
import pokedexLogoImg from '../assets/img/poke_circle.svg'
import './css/Header.css'

const Header = () => {
  return (
    <header className='header-pokedex'>
        <img src={pokedexLogoText} className='img-pokedex-header' alt='Pokedex Logo' />
        <img src={pokedexLogoImg} className='pokedex__header__logo-img' alt='Pokedex Logo' />
    </header>
  );
};

export default Header;