import {configureStore} from '@reduxjs/toolkit'
import userName from './slices/userName.slice'
import pokeList from './slices/pokeList.slice'

const store = configureStore({
    reducer:{
        userName,
        pokeList
    }
})

export default store