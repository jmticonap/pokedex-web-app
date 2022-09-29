import React, { useEffect, useState } from 'react'

import imgBG from '../assets/img/174922.jpg'

import './css/PokemonCardWrapper.css'
import './css/PokemonCard.css'
import './css/Pokedex.css'
import './css/Searcher.css'
import {
    Autocomplete, TextField, Skeleton
} from "@mui/material";
import axios from 'axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { _name } from '../store/slices/userName.slice'


export const Search = () => {
    const [allNames, setAllNames] = useState([])
    
    // const navigateToProfileByName = (evt, value)=>{

    // }

    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1200')
            .then(res => {
                setAllNames( ...res.data.results.map(i => i.name) )
            })
    },[])

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