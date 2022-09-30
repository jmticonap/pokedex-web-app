import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const pokemonNamesSlice = createSlice({
  name: "pokename",
  initialState: [],
  reducers: {
    pushNames: (state, action) => {
      if (action.payload) return action.payload;
    },
  },
});

export const loadNamesThunk = () => async (dispatch) => {

    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1200')
    dispatch(pushNames(res.data.results.map(item=>item.name)))
};

export const { pushNames } = pokemonNamesSlice.actions;

export default pokemonNamesSlice.reducer;