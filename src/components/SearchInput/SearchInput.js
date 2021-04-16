import React, { useState } from 'react';
import {apiKey} from "../../api/api";
import classes from './SearchInput.module.css'

const SearchInput = () => {
    const [searchString, setSearchString] = useState('')
    const [responseArr, setResponseArr] = useState([])

    const onChangeSearch = e => {
        const { value } = e.target
        setSearchString(value)
        if (value.length > 0) fetchList(value)
    }

    const fetchList = (val) => {
        const url = `https://imdb-api.com/en/API/SearchTitle/${apiKey}/`;
        fetch(url + val)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // console.log(data)
                setResponseArr(data)
                // console.log("respArr: ", responseArr);
            })
    };

    const handleSearchFilm = (e) => {
        const filmList = document.getElementById("filmList");
        let filmListValue = filmList.options[filmList.selectedIndex];
        console.log(filmListValue)
    }

    return (
        <>
            <input type="text"
                   list="filmList"
                   value={searchString}
                   onChange={onChangeSearch}
                   className={classes.filmInput}/>
            <datalist id="filmList" className={classes.respInput} onChange={handleSearchFilm.bind(this)}>
                {(responseArr.results) ? responseArr.results.map(resp => {
                        return <option key={resp.id}>
                            {resp.title} | {resp.description}
                        </option>
                    })
                    : null
                }
            </datalist>
        </>
    );
};



export default SearchInput;