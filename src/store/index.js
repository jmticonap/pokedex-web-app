import {configureStore} from '@reduxjs/toolkit'

import userName from './slices/userName.slice'

// import pokeList from './slices/pokeList.slice'
// import pageData from './slices/pageData.slice'
// import pageIndex from './slices/pageIndex.slice'

import pokeData from './slices/pokeData.slice'

const store = configureStore({
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     // Ignore these action types
    //     ignoredActions: ['page_data/appendData'],
    //     // Ignore these field paths in all actions
    //     //ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
    //     // Ignore these paths in the state
    //     //ignoredPaths: ['items.dates'],
    //   },
    // }),
    reducer:{
        userName,
        pokeData
    }
})

export default store