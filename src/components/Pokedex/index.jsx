import React, {useEffect} from 'react'
import { STATE_LOAD } from '../../store/slices/pokeList.slice' 
import useAPIPokemonList from '../../hooks/useAPIPokemonList'

export const Pokedex = () => {
    const {pokeData, loadStatus} = useAPIPokemonList()
    
    const renderPokemons = () => {
        if(loadStatus === STATE_LOAD.SUCCEEDED)
            return pokeData?.results.map(pokemon => (
                <div key={pokemon.name}><a href={pokemon.url}>{pokemon.name}</a></div>
            ))
    }

    return (
        <div>
            <h1>Pokedex</h1>
            {
                renderPokemons()
            }
        </div>
    );
};
