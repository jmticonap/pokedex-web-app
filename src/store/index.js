import {configureStore} from '@reduxjs/toolkit'
import userName from './slices/userName.slice'

const store = configureStore({
    reducer:{
        userName
    }
})

export default store