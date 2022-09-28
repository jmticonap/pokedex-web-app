import { inputLabelClasses } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const getRowUrlList = createAsyncThunk(
    'rowUrlList/status',
    async (state, action) => {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1200')
        return res.data.results //{results: [{name:string, url:string}, {...}]}
    }
)

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState: {
        explorByType: false,
        urlList: [],
        data: [],
        currentPage: 0,
        length: 0,
        pageLength: 20
    },
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(
                getRowUrlList.fulfilled,
                (state, action) => {
                    state.urlList.push(...action.payload)
                }
            )
    }
})

export const allNames = state => {
    return state.pokedexSlice.urlList.map(itm => itm.name)
}

export const {} = pokedexSlice.actions

export default pokedexSlice.reducer