import { createSlice } from "@reduxjs/toolkit";

const pageData = createSlice({
    name: 'page_data',
    initialState: {
        page: 0,
        pageLength: 20,
        data: []
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPageLength: (state, action) => {
            state.pageLength = action.payload
        },
        appendData: (state, action) => {
            //Verify payload __proto__ if is Array
            if (action.payload.__proto__ === ([]).__proto__)
                state.data = state.data.push(...action.payload)
            else
                state.data = state.data.push(action.payload)
        }
    }
})

export const page = state => state.pageData

export const { setPage, setPageLength, appendData } = pageData.actions

export default pageData.reducer