import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import {
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
import { DataSchema } from '../utils'

const usePokeData = () => {
    const dispatch = useDispatch()
    const pageIndex = useSelector(pIndex)
    const dataLength = useSelector(dLength)
    const pageLength = useSelector(pLength)
    const listUrl = useSelector(lstUrl)
    const listPokeData = useSelector(lstPokeData)

    const [pageNumber, setPageNumber] = useState(0)
    const [passData, setPassData] = useState([])

    const getPageUrlList = async () => {
        if (pageIndex > 0) {
            const response = await axios
                .get(`https://pokeapi.co/api/v2/pokemon/?offset=${(pageIndex - 1) * pageLength}&limit=${pageLength}`)

            dispatch(appendListUrl(response.data.results))
            dispatch(setDataLength(response.data.count))
        }
    }
    const getPokeDataList = () => {
        listUrl.forEach(obj => {
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
    }

    //01
    useEffect(() => {
        setPageNumber(1)
    }, [])
    //02
    useEffect(() => {

        dispatch(changePageIndex(pageNumber))
        console.log(pIndex)

    }, [pageNumber])
    //03
    useEffect(() => {
        console.log(pageIndex)
        //load page urls
        dispatch(clearListUrl())
        getPageUrlList()
    }, [pageIndex])
    useEffect(() => {
        //load lstPokeData
        dispatch(clearListPokeData())
        getPokeDataList()
    }, [listUrl])

    return {
        listUrl,
        listPokeData,
        setPageNumber,
        pageIndex,
        dataLength,
        pageLength
    }
};

export default usePokeData;