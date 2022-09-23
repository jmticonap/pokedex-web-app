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
    async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        return response.data
    }
)

const pokeList = createSlice({
    name: 'poke_list',
    initialState: {
        stateLoad: STATE_LOAD.DEAD,
        data: {}
    },
    reducers: {
        setData: (state, action) => {
            return { ...state, ...action.payload }
        },
        //Set the load slice state
        setLoad: (state, action) => {
            return { ...state, stateLoad: action.payload }
        }
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
                }
            )
            .addCase(
                loadDataThunk.rejected,
                (state,action) => {
                    state.stateLoad = STATE_LOAD.FAILED
                }
            )
    }
})

export const results = state => state.data?.results||[]
export const status = state => state.stateLoad

export const { setLoad, setData } = pokeList.actions

export default pokeList.reducer