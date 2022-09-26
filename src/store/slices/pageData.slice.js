import { createSlice } from "@reduxjs/toolkit";
import { getStat } from '../../utils'

//Save the important information from pokeAPI
const pokemonSchema = data => {
    return {
        id: data.id,
        name: data.name,
        types: data.types.map(t => t.type.name),
        hp: getStat(data, 'hp'),
        attack: getStat(data, 'attack'),
        defense: getStat(data, 'defense'),
        speed: getStat(data, 'speed'),
        image: data.sprites.other['official-artwork']['front_default']
    }
}

const pageData = createSlice({
    name: 'page_data',
    initialState: [],
    reducers: {
        appendData: (state, action) => {
            //Verify payload __proto__ if is Array
            if (action.payload.__proto__ === ([]).__proto__)
                //TODO: implement filter for repeat info
                state = state.push(...action.payload.map(itm => pokemonSchema(itm)))
            else if(action.payload.__proto__.constructor.name === 'DataSchema' ){
                if (!state.find(itm => itm.id === action.payload.id))
                    state.push(action.payload)
            }
            else{
                //Filter for do not have repeat info.
                if (!state.find(itm => itm.id === action.payload.id))
                    state.push(pokemonSchema(action.payload))
            }
            state.sort((a,b)=>a.id-b.id)
        },
        cleanData: state => {
            while (state.length > 0) {
                state.pop()
            }
        }
    }
})

export const page = state => state.pageData

export const { appendData, cleanData } = pageData.actions

export default pageData.reducer