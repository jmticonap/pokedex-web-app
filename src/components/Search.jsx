import React, { useEffect, useState } from 'react'

import imgBG from '../assets/img/174922.jpg'

import './css/PokemonCardWrapper.css'
import './css/PokemonCard.css'
import './css/Pokedex.css'
import './css/Searcher.css'
import {
    Autocomplete, TextField, Skeleton
} from "@mui/material";

import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { _name } from '../store/slices/userName.slice'
import { allNames } from '../store/slices/pokedex.slice'


export const Search = () => {
    const pokemonNames = useSelector(allNames)
    
    // const navigateToProfileByName = (evt, value)=>{

    // }

    useEffect(()=>{
        console.log(pokemonNames)
    },[pokemonNames])

    return (
        <div className='pokedex-container'>

            <Header />
            <section className="searcher-section">
                <h2>
                    <span>Welcome {_name}</span> Here you can find your favorite pokemons!
                </h2>

                <div className="search-container">
                    {/* <div className="search-input-container shadow">
                        <Autocomplete
                            onChange={navigateToProfileByName}
                            disablePortal={true}
                            id="combo-box-demo"
                            options={pokemonNames}
                            sx={{ width: 300, borderRadius: 0 }}
                            renderInput={(params) => <TextField {...params} label="name" />}
                        />
                        <button
                            onClick={() => searchPokemon(pokemonSearch)}
                            className="shadow btn">
                            Search
                        </button>
                    </div> */}
                    
                </div>
            </section>
            <div>
                <img src={imgBG} alt="Background Pokemon characters" />
            </div>
        </div>
    );
};