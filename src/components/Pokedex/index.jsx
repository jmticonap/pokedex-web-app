import React, { useEffect, useState } from 'react'

import '../css/PokemonCardWrapper.css'
import '../css/PokemonCard.css'

import axios from 'axios'
import Skeleton from '@mui/material/Skeleton';

import { STATE_LOAD } from '../../store/slices/pokeList.slice'
import useAPIPokemonList from '../../hooks/useAPIPokemonList'


import { cardBackgoundStyle, capitalize } from '../../utils'




export const PokemonCardWrapper = (props) => {
    return (
        <div className='cards-wrapper'>
            {props.children}
        </div>
    );
};

export const PokemonCard = ({ url }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState(null)

    //key = [background, head, color]
    const getStyleByKey = (key) => {
        if (data) {
            return cardBackgoundStyle[data?.types[0].type.name][key]
        } else {
            return cardBackgoundStyle['normal'][key]
        }
    }
    //speed, defense, hp, attack
    const getStat = (stat_name) => (
        data?.stats
            .find(itm => itm.stat.name === stat_name)['base_stat']
    )

    useEffect(() => {
        axios
            .get(url)
            .then(res => setData(res.data))
            .finally(() => setIsLoaded(true))
    }, [])

    return (
        <section className={`card-container__border ${getStyleByKey('background')}`}>
            <a href=''>
                <div className='card-container'>
                    <div className={`card__header ${getStyleByKey('head')}`}>
                        <div className='card__header-inner'>
                            {
                                isLoaded ? (
                                    <img src={data?.sprites.other['official-artwork']['front_default']} alt="imagen" />
                                ) : (
                                    <Skeleton
                                        sx={{ backgroundColor: 'rgba(136,136,136,0.75)' }}
                                        animation="pulse"
                                        variant="circular"
                                        width={120} height={120} />
                                )
                            }

                        </div>
                    </div>
                    <div className='card__body'>
                        <div>
                            <h2 className={getStyleByKey('color')}>{capitalize(data?.name)}</h2>
                            {/* Join type name with format [name / name / ...] */}
                            <p>{data?.types.map(t => t.type.name).join(' / ')}</p>
                            <small className='subtitle_color'>type</small>
                        </div>
                        <div>
                            <div className='card__body__grid'>
                                <div>
                                    <h6 className='subtitle_color'>HP</h6>
                                    <h3 className={getStyleByKey('color')}>{getStat('hp')}</h3>
                                </div >
                                <div>
                                    <h6 className='subtitle_color'>ATTACK</h6>
                                    <h3 className={getStyleByKey('color')}>{getStat('attack')}</h3>
                                </div>
                                <div>
                                    <h6 className='subtitle_color'>DEFENSE</h6>
                                    <h3 className={getStyleByKey('color')}>{getStat('defense')}</h3>
                                </div>
                                <div>
                                    <h6 className='subtitle_color'>SPEED</h6>
                                    <h3 className={getStyleByKey('color')}>{getStat('speed')}</h3>
                                </div>
                            </div >
                        </div >
                    </div >
                </div >
            </a>
        </section >
    );
}


export const Pokedex = () => {
    const { pokeData, loadStatus } = useAPIPokemonList()

    const renderPokemons = () => {
        if (loadStatus === STATE_LOAD.SUCCEEDED)
            return pokeData?.results.map(pokemon => (
                <PokemonCard url={pokemon.url} key={pokemon.name} />
            ))
    }

    return (
        <div>
            <h1>Pokedex</h1>
            <PokemonCardWrapper>
                {renderPokemons()}
            </PokemonCardWrapper>
        </div>
    );
};