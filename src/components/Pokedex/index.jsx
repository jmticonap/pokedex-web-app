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
    Skeleton,
    FormControl
} from "@mui/material";
import usePokeData from '../../hooks/usePokeData'
import usePokeDataType from '../../hooks/usePokeDataType'
import Header from '../Header'
import { useNavigate, useParams } from 'react-router-dom'


import { useDispatch } from 'react-redux'
import { 
    changeExploreBy, 
    loadlistTypeUrlThunk, 
    loadListUrlThunk,
    changePageIndex,
    loadPokeDataThunk
} from '../../store/slices/pokeData.slice'
import { useSelector } from 'react-redux' 


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
    const imgLoadedHandler = (evt)=>{
        setImgLoaded(evt.target.complete)
        setTimeout(() => {
            evt.target.style.position = 'inherit'            
        }, 250);
    }

    return (
        <section className={`card-container__border ${getStyleByKey('background')}`}>
            <a href={`#/pokedex/${data.name}`}>
                <div className='card-container'>
                    <div className={`card__header ${getStyleByKey('head')}`}>
                        <div className='card__header-inner'>
                            
                                    <img
                                        onLoad={imgLoadedHandler} 
                                        src={data.image} 
                                        alt="imagen" />
                                    {
                                        imgLoaded || <Skeleton 
                                            variant="circular" 
                                            width={140} 
                                            height={140} 
                                            sx={{ bgcolor: 'grey.400' }} />
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
    const userName = useParams('name').name
    const dispatch = useDispatch()
    const exploreBy = useSelector(state => state.pokeData.exploreBy)
    const listTypeUrl = useSelector( state => state.pokeData.listTypeUrl )
    const pageIndex = useSelector( state => state.pokeData.pageIndex )
    const dataLength = useSelector( state => state.pokeData.dataLength )
    const pageLength = useSelector( state => state.pokeData.pageLength )

    const [isLoaded, setIsLoaded] = useState(false)
 
    const navigate = useNavigate()
    const paginatorBtnStyle = { width: '5rem', height: '5rem', fontSize: '1.5rem' }


    const navigateToProfileByName = (evt, name) => {
        navigate(`/pokedex/${name}`)
    }
    const renderPokemons = () =>{

        listPokeData.map(pokemon => (
            <PokemonCard data={pokemon} key={pokemon.name} />
        ))

    } 

    const changePokemonTypeHandler = evt => {
        if (evt.target.value == '*') {
            //Explore by All categories

        } else {
            //Explore by the given category
            //setPokemonTypeList_t(evt.target.value)

        }
    }

    const renderPokemonTypeItems = () => {
        if (listTypeUrl?.length > 0) {
            const _pokemonTypeList = [{ name: 'Explor All', url: '*' }, ...listTypeUrl]
            return _pokemonTypeList
                .map(itm => (<MenuItem key={itm.name} value={itm.url}>{itm.name}</MenuItem>))
        }
    }

    const changePageHandler = (evt, value) => {
        dispatch(changePageIndex(value))
        setPageNumber(value)
    }

    useEffect(()=>{
        dispatch(loadlistTypeUrlThunk())
        
        //Load data for cards
        dispatch(loadPokeDataThunk())
    },[])
    useEffect(()=>{
        
        dispatch(loadListUrlThunk(1))
    },[exploreBy])

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
                            options={['Ada','Segundo','Mia','Donovan']}
                            sx={{ width: 300, borderRadius: 0 }}
                            renderInput={(params) => <TextField {...params} label="name" />}
                        />
                        <button
                            onClick={() => searchPokemon(pokemonSearch)}
                            className="shadow btn"
                            >
                            Search
                        </button>
                    </div>
                    <Box sx={{ boxShadow: '0px 3px 10px -2px rgba(0, 0, 0, 0.44)' }}>
                    <FormControl fullWidth>
                        <InputLabel id="type-select-label">Pokemon type</InputLabel>
                            <Select
                                sx={{ width: '450px' }}
                                id="pokemon-type-select"
                                labelId='type-select-label'
                                label='Pokemon Type'
                                value={'*'}                              
                                onChange={changePokemonTypeHandler}>
                                {renderPokemonTypeItems()}
                            </Select>
                        </FormControl>
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
                count={Math.ceil(dataLength / pageLength) || 1}
                shape="rounded" />
        </div>
    );
};