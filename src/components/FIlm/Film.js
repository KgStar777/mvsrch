import React, {useEffect, useState} from 'react';
import * as axios from 'axios';
import classes from './Film.module.css';
import Search from "../../assets/img/search.png"
import SliderDiv from "../Slider/Slider";
import {apiKey} from "../../api/api";
import SearchInput from "../SearchInput/SearchInput";
import {Link, NavLink, Redirect, Route} from "react-router-dom";
import Start2 from "../Start2";
import Trailer from "../Trailer/Trailer";

const Film = ({match, location}) => {
    // console.log('match, location: ', match, location)
    const [films, setFilms] = useState([])
    const [trailer, setTrailer] = useState([])
    const [trailerBool, setTrailerBool] = useState(false)

    const {params: {filmId}} = match;

    const [inp, setInp] = useState('')

    useEffect(() => {
        axios.get(`https://imdb-api.com/en/API/Title/${apiKey}/${filmId}`)
            .then(resp => {
                setFilms(resp.data)
                // console.log("films", films)
            })
    }, [])

    const onKeyDown = e => setInp(e.target.value)

    const getTrailer = () => {
        axios.get(`https://imdb-api.com/en/API/YouTubeTrailer/${apiKey}/${filmId}`)
            .then(response => {
                console.log(response)
                setTrailer(response.data);
                setTrailerBool(true);
            })
    }

    return (
        <div className={classes.wrapperBox}>
            {trailerBool === true
                ? <Trailer state={trailer}
                           setTrailerBool={setTrailerBool}/>
                : null
            }
            <div className={classes.searchBox}>
                <h3>Richbee Shows</h3>
                <div className={classes.inputWrapper}>
                    <img className={classes.searchImg} src={Search}/>
                    <input placeholder="write film's name..."
                           onChange={onKeyDown}
                           className={classes.filmInput}
                           value={inp}
                    />
                    <NavLink to={{
                        pathname: "/",
                        inp:{inp}
                    }}>
                        <button className={classes.btn}>Search</button>
                    </NavLink>
                    {/*<SearchInput className={classes.filmInput} />*/}
                </div>
            </div>
            <img src={films.image}
                 style={{
                     margin: "0", padding: '0', width: '100%',
                     height: "100vh", position: "absolute", zIndex: "-2",
                     objectFit: 'cover', objectPosition: "0 0"
                 }}/>
            <div style={{
                margin: "0", padding: '0', width: '100%',
                height: "100vh", position: "absolute", objectPosition: "0 0",
                backgroundImage: "linear-gradient(to right, black 15%, transparent 100%)"
            }}>
                <section className={classes.title}>
                    <h1>{films.title}</h1>
                    <div className={classes.subscription}>
                        <span className={classes.rating}>IMDb {films.imDbRating}</span>
                        <span className={classes.subscriptionText}>{films.genres}</span>|
                        <span className={classes.subscriptionText}>{films.type}</span>|
                        <span className={classes.subscriptionText}>{films.year}</span>
                    </div>

                    <button className={classes.watch}
                            onClick={getTrailer}>Watch
                    </button>

                    <p className={classes.awards}>{films.awards}</p>
                </section>
                <section className={classes.about}>
                    <h2>Watch "{films.title}" on Richbee Shows</h2>
                    <p>{films.plot}</p>

                    {films.similars ?
                        <>
                            <h4>You may also like</h4>
                            <div className={classes.sliderWrapper}>
                                <SliderDiv films={films.similars}/>
                            </div>
                        </>
                        : null
                    }
                </section>
                <footer>
                    <p>Richbee Shows</p>
                </footer>
            </div>
        </div>
    );
};

export default Film;