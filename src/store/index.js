import { configureStore } from '@reduxjs/toolkit'

import userName from './slices/userName.slice'
import pokeData from './slices/pokeData.slice'
import pokemonNamesSlice from './slices/pokemonNamesSlice'

const store = configureStore({
    reducer: {
        userName,
        pokeData,
        pokemonNamesSlice
    }
})

export default store