import React, { useEffect, useState } from 'react'
import {
    localDb,
    cardBackgoundStyle,
    capitalize
} from '../../utils'
import '../css/PokemonCardWrapper.css'
import '../css/PokemonCard.css'
import '../css/Pokedex.css'
import { Pagination, PaginationItem, Skeleton } from '@mui/material';
import usePokeData from '../../hooks/usePokeData'
import Header from '../Header'


export const PokemonCardWrapper = (props) => {
    return (
        <div className={`cards-wrapper ${props.className || ''}`}>
            {props.children}
        </div>
    );
};

export const PokemonCard = ({ data }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    //key = [background, head, color]
    const getStyleByKey = (key) => {
        if (data) {
            return cardBackgoundStyle[data.types[0]][key]
        } else {
            return cardBackgoundStyle['normal'][key]
        }
    }

    useEffect(() => {
        var pokeImg = new Image
        pokeImg.src = data.image

        pokeImg.onload = function () {
            setTimeout(() => {
                setImgLoaded(true)
            }, 250);
            //imgContainer.innerHTML = "<img src='images/test.png'>";
        };
    }, [])

    return (
        <section className={`card-container__border ${getStyleByKey('background')}`}>
            <a href={`#/pokedex/${data.id}`}>
                <div className='card-container'>
                    <div className={`card__header ${getStyleByKey('head')}`}>
                        <div className='card__header-inner'>
                            {
                                imgLoaded ?
                                    <img src={data.image} alt="imagen" /> :
                                    <Skeleton variant="circular" width={140} height={140} sx={{ bgcolor: 'grey.400' }} />
                            }

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
        isLoaded,
        listUrl,
        listPokeData,
        setPageNumber,
        pageIndex,
        dataLength,
        pageLength
    } = usePokeData()
    const paginatorBtnStyle = { width: '5rem', height: '5rem', fontSize: '1.5rem' }

    const renderPokemons = () => (listPokeData.map(pokemon => (
        <PokemonCard data={pokemon} key={pokemon.name} />
    )))

    const changePageHandler = (evt, value) => {
        localDb.delete()
        setPageNumber(value)
    }

    useEffect(() => {
        if (listPokeData) {
            console.log(listPokeData)
        }
    }, [listPokeData])

    return (
        <div className='pokedex-container'>
            
            <Header />
            <PokemonCardWrapper>
                {isLoaded ? renderPokemons() : <h1>LOADING...</h1>}
            </PokemonCardWrapper>
            <Pagination
                renderItem={item => (<PaginationItem sx={paginatorBtnStyle} {...item} />)}
                onChange={changePageHandler}
                defaultPage={1}
                page={pageIndex ?? 1}
                color='rojo'
                count={Math.ceil(dataLength / pageLength)}
                shape="rounded" />
        </div>
    );
};