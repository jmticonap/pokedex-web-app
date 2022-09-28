import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import {
    _exploreBy,
    changeExploreBy,
    clearListUrl,
    appendListUrl,
    clearListPokeData,
    appendListPokeData,
    changePageIndex,
    setDataLength,
    lstUrl,
    lstPokeData,
    pIndex,
    dLength,
    pLength
} from '../store/slices/pokeData.slice'

const usePokeDataType = () => {
    const dispatch = useDispatch()
    const exploreBy = useSelector(_exploreBy)
    const pageIndex_t = useSelector(pIndex)
    const dataLength_t = useSelector(dLength)
    const pageLength_t = useSelector(pLength)
    const listUrl_t = useSelector(lstUrl)
    const listPokeData_t = useSelector(lstPokeData)
    const [isLoaded_t, setIsLoaded_t] = useState(false)
    const [lookFor_t, setLookFor_t] = useState('*')
    const [pageNumber_t, setPageNumber_t] = useState(0)

    //====================================================
    const [isSearching_t, setIsSearching_t] = useState(false);
    const [pokemonSearch_t, setPokemonSearch_t] = useState("");
    const [pokemonTypeList_t, setPokemonTypeList_t] = useState([])
    const [names_t, setNames_t] = useState([]);

    
    const getPageUrlList = () => {

    }
    const loadPokemonTypeList = async () => {
        const res = await axios.get('https://pokeapi.co/api/v2/type/')
        setPokemonTypeList_t([...res.data.results])
    }
    const loadPokemonAllNames = () => {
        if (localStorage.getItem("arrayPokes")) {
            // cargamos los pokes desde el localStorage
            const LOCALPOKES = localStorage.getItem("arrayPokes");
            setNames_t(JSON.parse(LOCALPOKES));
        } else {
            // hacemos la petición a la api por primera vez
            axios
                .get(`https://pokeapi.co/api/v2/pokemon?limit=1200`)
                .then((res) => {
                    const f = res.data.results.map((item) => item.name);
                    localStorage.setItem("arrayPokes", JSON.stringify(f));
                    setNames_t([...f]);
                });
        }
    }
    const getUrlList = async () => {
        if (pageIndex_t > 0) {
            const response = await axios.get(lookFor_t)

            dispatch(appendListUrl(response.data.pokemon.map(itm => itm.pokemon)))
            dispatch(setDataLength(response.data.pokemon.length))
        }
    }
    const getPokeDataList = () => {
        listUrl_t.forEach(obj => {
            if (obj)
                axios.get(obj.url)
                    .then(res => {
                        dispatch(appendListPokeData({
                            id:res.data.id,
                            name:res.data.name, 
                            types:res.data.types.map(t => t.type.name),                            
                            hp:res.data.stats.find(stat=>stat.stat.name == 'hp').base_stat, 
                            attack:res.data.stats.find(stat=>stat.stat.name == 'attack').base_stat, 
                            defense:res.data.stats.find(stat=>stat.stat.name == 'defense').base_stat, 
                            speed:res.data.stats.find(stat=>stat.stat.name == 'speed').base_stat, 
                            'special-defense':res.data.stats.find(stat=>stat.stat.name == 'special-defense').base_stat,
                            'special-attack':res.data.stats.find(stat=>stat.stat.name == 'special-attack').base_stat,
                            image:res.data.sprites.other['official-artwork']['front_default']
                        })) 
                    })
        })
        setTimeout(() => {
            setIsLoaded_t(true)            
        }, 250);
    }

    useEffect(()=>{
        loadPokemonAllNames() //load -> names_t
        loadPokemonTypeList() //load -> pokemonTypeList_t
        if(exploreBy!= '*'){
            loadPokemonTypeList()
        }
    },[])
    //01
    useEffect(() => {
        if(exploreBy!= '*'){
            if(!isLoaded_t) loadPokemonTypeList()
            setPageNumber_t(1)
        }
    }, [pokemonTypeList_t])
    //02
    useEffect(() => {
        if(exploreBy!= '*'){
            dispatch(changePageIndex(pageNumber_t))
            setIsLoaded_t(false)
        }
    }, [pageNumber_t])
    //03
    useEffect(() => {
        if(exploreBy!= '*'){
            console.log(pageIndex_t)
            //load page urls
            dispatch(clearListUrl())
            //getPageUrlList()






        }
    }, [pageIndex_t])
    useEffect(() => {
        if(exploreBy!= '*'){
            //load lstPokeData
            dispatch(clearListPokeData())
            getPokeDataList()

        }
    }, [listUrl_t])
    useEffect(()=>{
        if(exploreBy!= '*'){
            getUrlList()

        }
    },[lookFor_t])
    useEffect(()=>{
        if(exploreBy!= '*'){
            dispatch(changeExploreBy(lookFor_t))
        }
    },[lookFor_t])
    useEffect(()=>{
        if(exploreBy!= '*'){
            console.log(exploreBy)

        }
    },[exploreBy])

    return {
        isSearching_t,
        setIsSearching_t,
        names_t, //All pokemon's name
        isLoaded_t,
        listUrl_t,
        listPokeData_t,
        setPageNumber_t,
        pageIndex_t,
        dataLength_t,
        pageLength_t,
        pokemonTypeList_t, //names of all types {name:[string], url: [string]}
        setPokemonTypeList_t,
        lookFor_t, setLookFor_t
    }
}

export default usePokeDataType;