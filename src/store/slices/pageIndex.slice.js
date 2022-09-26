import { createSlice } from "@reduxjs/toolkit";

const pageIndex = createSlice({
    name:'page_index',
    initialState: 1,
    reducers:{
        setIndex:(state, action) => action.payload
    }
})

export const pIndex = state => state.pageIndex

export const {setIndex} = pageIndex.actions

export default pageIndex.reducer