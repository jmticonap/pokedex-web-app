import React, { useEffect, useState } from 'react'
import {localDb} from '../../utils'

import '../css/PokemonCardWrapper.css'
import '../css/PokemonCard.css'
import '../css/Pokedex.css'

import { Pagination, PaginationItem } from '@mui/material';

import pokeListSlice,{ STATE_LOAD } from '../../store/slices/pokeList.slice'
import useAPIPokemonList from '../../hooks/useAPIPokemonList'
import { cardBackgoundStyle, capitalize } from '../../utils'

import useAPIPokemonCharacter from '../../hooks/useAPIPokemonCharacter'


export const PokemonCardWrapper = (props) => {
    return (
        <div className={`cards-wrapper ${props.className || ''}`}>
            {props.children}
        </div>
    );
};

export const PokemonCard = ({ data }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    //key = [background, head, color]
    const getStyleByKey = (key) => {
        if (data) {
            return cardBackgoundStyle[data.types[0]][key]
        } else {
            return cardBackgoundStyle['normal'][key]
        }
    }

    return (
        <section className={`card-container__border ${getStyleByKey('background')}`}>
            <a href={`#/pokedex/${data.id}`}>
                <div className='card-container'>
                    <div className={`card__header ${getStyleByKey('head')}`}>
                        <div className='card__header-inner'>
                            <img src={data.image} alt="imagen" />
                        </div>
                    </div>
                    <div className='card__body'>
                        <div>
                            <h2 className={getStyleByKey('color')}>{capitalize(data.name)}</h2>
                            {/* Join type name with format [name / name / ...] */}
                            <p>{data.types.join(' / ')}</p>
                            <small className='subtitle_color'>type</small>
                        </div>
                        <div>
                            <div className='card__body__grid'>
                                <div>
                                    <h6 className='subtitle_color'>HP</h6>
                                    <h3 className={getStyleByKey('color')}>{data.hp}</h3>
                                </div >
                                <div>
                                    <h6 className='subtitle_color'>ATTACK</h6>
                                    <h3 className={getStyleByKey('color')}>{data.attack}</h3>
                                </div>
                                <div>
                                    <h6 className='subtitle_color'>DEFENSE</h6>
                                    <h3 className={getStyleByKey('color')}>{data.defense}</h3>
                                </div>
                                <div>
                                    <h6 className='subtitle_color'>SPEED</h6>
                                    <h3 className={getStyleByKey('color')}>{data.speed}</h3>
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
    const { dataList, setUrlList, setPageIndex:piChar } = useAPIPokemonCharacter()
    const { pokeData, loadStatus, setPageIndex:piList } = useAPIPokemonList()
    const [pageLength, setPageLength] = useState(20)
    const [dataLength, setDataLength] = useState(0)
    const paginatorBtnStyle = { width: '5rem', height: '5rem', fontSize: '1.5rem' }


    const renderPokemons = () => {
        if (loadStatus === STATE_LOAD.SUCCEEDED) {
            return dataList.map(pokemon => (
                <PokemonCard data={pokemon} key={pokemon.name} />
            ))
        }
    }

    const changePageHandler = (evt, value) => {
        localDb.delete()
        piList(value)
        piChar(value)
        //setPageIndex(value)
    }

    useEffect(() => {
        if (pokeData.results) {
            const urls = pokeData.results.map(pokemon => pokemon.url)
            setUrlList([...urls])
            setPageLength(20)
            setDataLength(pokeData.count)
        }
    }, [pokeData])

    return (
        <div className='pokedex-container'>
            <h1>Pokedex</h1>
            <PokemonCardWrapper>
                {renderPokemons()}
            </PokemonCardWrapper>
            <Pagination
                renderItem={item => (<PaginationItem sx={paginatorBtnStyle} {...item} />)}
                onChange={changePageHandler}
                defaultPage={1}
                color='rojo'
                count={Math.ceil(dataLength / pageLength)}
                shape="rounded" />
        </div>
    );
};