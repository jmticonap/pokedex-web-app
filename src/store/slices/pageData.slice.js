import { createSlice } from "@reduxjs/toolkit";
import { getStat } from '../../utils'
import { DataSchema } from "../../utils";
import { useSelector } from "react-redux";
import { pIndex } from "./pageIndex.slice";

//Save the important information from pokeAPI
const pokemonSchema = data => {
    return new DataSchema(
        data.id,
        data.name,
        data.types.map(t => t.type.name),
        getStat(data, 'hp'),
        getStat(data, 'attack'),
        getStat(data, 'defense'),
        getStat(data, 'speed'),
        data.sprites.other['official-artwork']['front_default']
    )
}

const _cleanData = state => {
    while (state.length > 0) {
        state.pop()
    }
}

const pageData = createSlice({
    name: 'page_data',
    initialState: [],
    reducers: {
        appendData: (state, action) => {
            //Verify payload __proto__ if is Array
            if (action.payload.data.__proto__ === ([]).__proto__)
                //TODO: implement filter for repeat info
                state = state.push(...action.payload.data.map(itm => pokemonSchema(itm)))
            else if (action.payload.data.__proto__.constructor.name === 'DataSchema') {
                debugger
                const coincidents = state.find(itm => itm.id === action.data.payload.id).length
                if (coincidents==0)
                    state.push(action.payload.data)
            } else {
                
                //Filter for do not have repeat info.
                if (!state.find(itm => itm.id === action.payload.data.id)) {

                    state.push(pokemonSchema(action.payload.data))

                }
            }
            state.sort((a, b) => a.id - b.id)
            console.log("pageDataSlice");
            debugger
            if(state.length < 20)
                console.log(action.payload.index)

        },
        cleanData: _cleanData
    }
})

export const page = state => state.pageData

export const { appendData, cleanData } = pageData.actions

export default pageData.reducer