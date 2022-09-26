import { useEffect, useState } from 'react'
import { localDb } from '../utils'
import { useSelector } from 'react-redux';
import { pIndex } from '../store/slices/pageIndex.slice'
import store from '../store'
import { loadDataThunk, data, status } from '../store/slices/pokeList.slice'

const useAPIPokemonList = () => {
    const rdIndex = useSelector(pIndex)
    const loadStatus = useSelector(status)
    const pokeData = useSelector(data)
    const [pageIndex, setPageIndex] = useState(1)

    useEffect(() => {
        //console.log(`Cargar pagina: ${pageIndex}`)
        //Looking for previus data loaded

        //if (!pokeData.hasOwnProperty('results'))
        
        console.log("useAPIPokemonList")
        
        store.dispatch(loadDataThunk(rdIndex > pageIndex?rdIndex:pageIndex))
    }, [pageIndex])

    return { pokeData, loadStatus, setPageIndex }
};

export default useAPIPokemonList;