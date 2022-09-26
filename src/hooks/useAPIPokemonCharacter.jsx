import React, { useState, useEffect } from 'react';
import { localDb } from '../utils'
import axios from 'axios'

import { appendData, page } from '../store/slices/pageData.slice'
import { useSelector, useDispatch } from 'react-redux';

const useAPIPokemonCharacter = () => {
    const dispatch = useDispatch()
    const dataList = useSelector(page)
    const [urlList, setUrlList] = useState([])

    useEffect(() => {
        if (localDb.loadData().data.length == 0) {
            if (urlList.length > 0){
                urlList.forEach(url => {
                    axios
                        .get(url)
                        .then(res => dispatch(appendData(res.data)))
                })
                localDb.loadData().append(dataList)
            }

        } else {
            console.log("Cargando datos desde local")
            localDb.data.forEach(itm => {
                dispatch(appendData(itm))
            })
        }
    }, [urlList])


    return { dataList, setUrlList }
};

export default useAPIPokemonCharacter;