import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import store from '../store'
import {
    loadDataThunk, 
    results, 
    status,
    STATE_LOAD
} from '../store/slices/pokeList.slice' 

const useAPIPokemonList = () => {
    const loadStatus = useSelector(status)
    const pokeList = useSelector(results)
    
    useEffect(()=>{
        store.dispatch(loadDataThunk())
    },[])
    useEffect(()=>{
        
        console.log(loadStatus);
        
    },[loadStatus])

    return { pokeList }
};

export default useAPIPokemonList;