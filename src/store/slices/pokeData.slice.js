import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const _clearList = list => {
    while(list.length>0){
        list.pop()
    }
}

const pokeData = createSlice({
    name: 'poke_data',
    initialState: {
        exploreBy: '*',
        listUrl: [''],
        listPokeData: [],
        pageIndex: 0,
        dataLength: 0,
        pageLength: 20
    },
    reducers:{
        changeExploreBy: (state, action) => {
            if(action.payload)
                state.exploreBy = action.payload
        },
        clearListUrl: state => {
            _clearList(state.listUrl)
        },
        appendListUrl: (state, action) => {
            console.log(`Largo de listUrl: ${state.listUrl.length}`)
            if(action.payload)
                state.listUrl.push(...action.payload)
        },
        clearListPokeData: state => {
            _clearList(state.listPokeData)
        },
        appendListPokeData: (state, action) => {
            if(action.payload){
                state.listPokeData.push(action.payload)
            }
            state.listPokeData.sort((a,b)=> a.id-b.id)
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

//TODO: verify async in concat functions
export const loadUrlListThunk = (index) => async(dispatch, getState) => {
    const state = getState().pokeData
    
    const url = state.exploreBy === '*'?
        'https://pokeapi.co/api/v2/pokemon?limit=1200':
        `https://pokeapi.co/api/v2/type/${index}/`
    
    const res = await axios.get(url)
    if(state.exploreBy === '*'){
        //All data urls
        console.log(res.data)
    } else {
        //Data filter by TYPE
        console.log(res.data)
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
    clearListPokeData, 
    appendListPokeData, 
    changePageIndex,
    setDataLength,
    setPageLength
} = pokeData.actions

export default pokeData.reducer