import React from 'react'
import useAPIPokemonList from '../../hooks/useAPIPokemonList';

export const Pokedex = () => {
    const {pokeList} = useAPIPokemonList()
    
    return (
        <div>
            <h1>Pokedex</h1>
            
        </div>
    );
};
