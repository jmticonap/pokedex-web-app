import React, { useEffect, useState } from 'react'
import {
    localDb,
    cardBackgoundStyle,
    capitalize
} from '../../utils'
import '../css/PokemonCardWrapper.css'
import '../css/PokemonCard.css'
import '../css/Pokedex.css'
import { Pagination, PaginationItem } from '@mui/material';
import usePokeData from '../../hooks/usePokeData'


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
    const {
        listUrl,
        listPokeData,
        setPageNumber,
        pageIndex,
        dataLength,
        pageLength
    } = usePokeData()
    const paginatorBtnStyle = { width: '5rem', height: '5rem', fontSize: '1.5rem' }

    const renderPokemons = () => {
        
        return listPokeData.map(pokemon => (
            <PokemonCard data={pokemon} key={pokemon.name} />
        ))
    }

    const changePageHandler = (evt, value) => {
        localDb.delete()
        setPageNumber(value)
    }

    useEffect(() => {
        if (localDb.loadData().page.data.length > 0) {

        }
    }, [])

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
                page={pageIndex??1}
                color='rojo'
                count={Math.ceil(dataLength/pageLength)}
                shape="rounded" />
        </div>
    );
};