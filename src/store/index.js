import { configureStore } from '@reduxjs/toolkit'

import userName from './slices/userName.slice'
import pokeData from './slices/pokeData.slice'
import pokedexSlice from './slices/pokedex.slice'

const store = configureStore({
    reducer: {
        userName,
        pokeData,
        pokedexSlice
    }
})

export default store