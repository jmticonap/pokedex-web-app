import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import store from '../store'
import { loadDataThunk, data, status } from '../store/slices/pokeList.slice' 

const useAPIPokemonList = () => {
    const loadStatus = useSelector(status)
    const pokeData = useSelector(data)

    useEffect(()=>{
        store.dispatch(loadDataThunk())
    },[])

    return { pokeData, loadStatus }
};

export default useAPIPokemonList;