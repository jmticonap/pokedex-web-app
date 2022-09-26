import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const pokeData = createSlice({
    name: 'poke_data',
    initialState: {
        listUrl: [],
        listPokeData: [],
        pageIndex: 0
    },
    redurcers:{
        
    }
})