import { configureStore } from '@reduxjs/toolkit'

import userName from './slices/userName.slice'
import pokeData from './slices/pokeData.slice'

const store = configureStore({
    reducer: {
        userName,
        pokeData
    }
})

export default store