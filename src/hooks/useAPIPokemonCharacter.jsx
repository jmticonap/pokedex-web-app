import React, { useState, useEffect } from 'react';
import { localDb } from '../utils'
import axios from 'axios'

import { appendData, page, cleanData } from '../store/slices/pageData.slice'
import {pIndex, setIndex} from '../store/slices/pageIndex.slice'
import { useSelector, useDispatch } from 'react-redux';

const useAPIPokemonCharacter = () => {
    const [pageIndex, setPageIndex] = useState(1)
    const currentIndex = useSelector(pIndex)
    const dispatch = useDispatch()
    const dataList = useSelector(page)
    const [urlList, setUrlList] = useState([])

    useEffect(() => {
        const _urls = urlList
        console.log("useAPIPokemonCharacter")
        dispatch(cleanData())
        if (pageIndex != currentIndex || localDb.loadData().page.data.length===0) {
            if (urlList.length > 0){
                urlList.forEach(url => {
                    axios
                        .get(url)
                        .then(res => dispatch(appendData({index:pageIndex, data: res.data})))
                })
                
            }

        } else {
            console.log("Cargando datos desde local")
            localDb.page.data.forEach(itm => {
                dispatch(appendData({index: pageIndex, data: itm}))
            })
        }
    }, [urlList])


    return { dataList, setUrlList, setPageIndex }
};

export default useAPIPokemonCharacter;