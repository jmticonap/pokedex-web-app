import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const STATE_LOAD = { //idle' | 'loading' | 'succeeded' | 'failed'
    IDLE: 0,
    LOADING: 1,
    SUCCEEDED: 2,
    FAILED: 3
}
export const loadDataThunk = createAsyncThunk(
    'pokelist/loadDataStatus',
    async (value) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(value-1)*20}&limit=20`)
        console.log("pokeList:loadDataThunk");
        return response.data
    }
)

const pokeList = createSlice({
    name: 'poke_list',
    initialState: {
        stateLoad: STATE_LOAD.IDLE,
        data: {}
    },
    reducers: {
    },
    extraReducers(builder){
        builder
            .addCase(
                loadDataThunk.pending,
                (state,action) => {
                    state.stateLoad = STATE_LOAD.LOADING
                }
            )
            .addCase(
                loadDataThunk.fulfilled,
                (state,action) => {                    
                    state.stateLoad = STATE_LOAD.SUCCEEDED
                    state.data = {...state.data, ...action.payload}
                    //
                    return state
                }
            )
    }
})

export const data = state => state.pokeList.data
export const status = state => state.pokeList.stateLoad

export const { } = pokeList.actions

export default pokeList.reducer