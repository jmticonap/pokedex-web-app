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

export const _name = state => state.userName

export const {changeName} = userName.actions

export default userName.reducer