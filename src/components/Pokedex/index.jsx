import React, { useEffect, useState } from 'react'
import {
    localDb,
    cardBackgoundStyle,
    capitalize
} from '../../utils'
import '../css/PokemonCardWrapper.css'
import '../css/PokemonCard.css'
import '../css/Pokedex.css'
import '../css/Searcher.css'
import {
    Autocomplete, Box,
    InputLabel, MenuItem,
    Select, TextField,
    Pagination, PaginationItem,
    Skeleton
} from "@mui/material";
import usePokeData from '../../hooks/usePokeData'
import usePokeDataType from '../../hooks/usePokeDataType'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'


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
            <a href={`#/pokedex/${data.name}`}>
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
        userName,
        isLoaded,
        listUrl,
        listPokeData,
        setPageNumber,
        pageIndex,
        dataLength,
        pageLength
    } = usePokeData()
    const {
        isSearching_t,
        setIsSearching_t,
        names_t, //All pokemon's name [string, string, ...]
        isLoaded_t,
        listUrl_t,
        listPokeData_t,
        setPageNumber_t,
        pageIndex_t,
        dataLength_t,
        pageLength_t,
        pokemonTypeList_t, //names of all types {name:[string], url: [string]}
        setPokemonTypeList_t,
        lookFor_t, setLookFor_t
    } = usePokeDataType()
    const navigate = useNavigate()
    const paginatorBtnStyle = { width: '5rem', height: '5rem', fontSize: '1.5rem' }


    const navigateToProfileByName = (evt, name) => {
        navigate(`/pokedex/${name}`)
    }
    const renderPokemons = () => (listPokeData.map(pokemon => (
        <PokemonCard data={pokemon} key={pokemon.name} />
    )))

    const changePokemonTypeHandler = evt => {
        if (evt.target.value == '*') {
            //Explore by All categories

        } else {
            //Explore by the given category
            setPokemonTypeList_t(evt.target.value)

        }
    }

    const renderPokemonTypeItems = () => {
        if (pokemonTypeList_t.length > 0) {
            const _pokemonTypeList = [{ name: 'Explor All', url: '*' }, ...pokemonTypeList_t]
            return _pokemonTypeList
                .map(itm => (<MenuItem key={itm.name} value={itm.url}>{itm.name}</MenuItem>))
        }
    }

    const changePageHandler = (evt, value) => {
        localDb.delete()
        setPageNumber(value)
    }

    useEffect(() => {
        if (listPokeData) {
            //console.log(listPokeData)
        }
    }, [listPokeData])

    return (
        <div className='pokedex-container'>

            <Header />
            <section className="searcher-section">
                <h2>
                    <span>Welcome {userName}</span> Here you can find your favorite pokemons!
                </h2>

                <div className="search-container">
                    <div className="search-input-container shadow">
                        <Autocomplete
                            onChange={navigateToProfileByName}
                            disablePortal={true}
                            id="combo-box-demo"
                            options={names_t}
                            sx={{ width: 300, borderRadius: 0 }}
                            renderInput={(params) => <TextField {...params} label="name" />}
                        />
                        <button
                            onClick={() => searchPokemon(pokemonSearch)}
                            className="shadow btn"
                            disabled={isSearching_t}>
                            Search
                        </button>
                    </div>
                    <Box sx={{ boxShadow: '0px 3px 10px -2px rgba(0, 0, 0, 0.44)' }}>
                        <Select
                            sx={{ width: '450px' }}
                            id="pokemon-type-select"
                            value={pokemonTypeList_t}
                            onChange={changePokemonTypeHandler}>
                            {renderPokemonTypeItems()}
                        </Select>
                    </Box>
                </div>
            </section>
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