import { createSlice } from "@reduxjs/toolkit";

const userName = createSlice({
    name: 'user_name',
    initialState: '',
    reducers:{
        changeName: (state, action) => {
            return action.payload
        }
    }
})

export const {changeName} = userName.actions

export default userName.reducer