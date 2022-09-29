import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const _clearList = list => {
    while (list.length > 0) {
        list.pop()
    }
}

const pokeData = createSlice({
    name: 'poke_data',
    initialState: {
        exploreBy: '*',
        listUrl: [],
        listTypeUrl: [],
        listPokeData: [],
        pageIndex: 0,
        dataLength: 0,
        pageLength: 10
    },
    reducers: {
        changeExploreBy: (state, action) => {
            if (action.payload)
                state.exploreBy = action.payload
        },
        clearListUrl: state => {
            _clearList(state.listUrl)
            console.log(state.listUrl)
        },
        appendListUrl: (state, action) => {
            if (action.payload && action.payload.__proto__ === ([]).__proto__)
                //Verifying if action.payload have an array
                return {
                    ...state, listUrl: action.payload
                }
        },
        appendListTypeUrl: (state, action) => {
            if (action.payload && action.payload.__proto__ === ([]).__proto__)
                //Verifying if action.payload have an array
                return {
                    ...state, listTypeUrl: action.payload
                }
        },
        clearListPokeData: state => {
            _clearList(state.listPokeData)
        },
        appendListPokeData: (state, action) => {
            console.log(state.exploreBy)
            if (action.payload) {
                return {
                    ...state,
                    listPokeData: [...action.payload].sort((a, b) => a.id - b.id)
                }
            }
        },
        changePageIndex: (state, action) => {
            state.pageIndex = action.payload
        },
        setDataLength: (state, action) => {
            state.dataLength = action.payload
        },
        setPageLength: (state, action) => {
            state.pageLength = action.payload
        }
    }
})

//Get data of pokemos by page
export const loadPokeDataThunk = () => async (dispatch, getState) => {
    const state = getState().pokeData
    
    if (state.listUrl.length > 0) {
        const pi = state.pageIndex
        const pl = state.pageLength
        const dl = state.dataLength

        const from = (pi - 1) * pl
        //Make sure the last page is not complete
        const to = (from + pl - 1) > dl ? dl : from + pl - 1

        const result = []

        for (let i = from; i <= to; i++) {
            const res = await axios.get(state.listUrl[i]['url'])

            result.push({
                id: res.data.id,
                name: res.data.name,
                types: res.data.types.map(itm => itm.type.name),
                stats: res.data.stats.map(itm => ({ name: itm.stat.name, value: itm.base_stat })),
                image: res.data.sprites.other['home']['front_default']
            })
        }
        
        dispatch(appendListPokeData(result))
    }


}

//Get all types of pokemons
export const loadlistTypeUrlThunk = () => async (dispatch, getState) => {
    const res = await axios.get("https://pokeapi.co/api/v2/type/")
    dispatch(appendListTypeUrl(res.data.results))
}

//Get list of pokemons from generic list or filtered by type
export const loadListUrlThunk = (url) => async (dispatch, getState) => {
    const state = getState().pokeData

    if(state.exploreBy === '*'){
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1200')
        //All data urls
        dispatch(appendListUrl(res.data.results))
        dispatch(setDataLength(res.data.count))    
    } else {
        const res = await axios.get(url)
        //All data urls
        dispatch(appendListUrl(res.data.pokemon.map(i => i.pokemon)))
        dispatch(setDataLength(res.data.pokemon.length))
    }
}

export const _exploreBy = state => state.pokeData.exploreBy
export const lstUrl = state => state.pokeData.listUrl
export const lstPokeData = state => state.pokeData.listPokeData
export const pIndex = state => state.pokeData.pageIndex
export const dLength = state => state.pokeData.dataLength
export const pLength = state => state.pokeData.pageLength

export const {
    changeExploreBy,
    clearListUrl,
    appendListUrl,
    appendListTypeUrl,
    clearListPokeData,
    appendListPokeData,
    changePageIndex,
    setDataLength,
    setPageLength
} = pokeData.actions

export default pokeData.reducer