import React from 'react';
import classes from "../Start2.module.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import axios from "axios";
import {Link, NavLink, Redirect, Route, Switch} from "react-router-dom";
import Film from "../FIlm/Film";

const SliderDiv = (props) => {
    // const state = {
    //     results: [
    //         {
    //             "id": "tt0404978",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BNmIyMWY1YTUtMjQ0ZC00MzE4LTlmNmYtNzRhZjU5NTNhN2VjXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Gambit",
    //             "description": "(I) (2012)"
    //         },
    //         {
    //             "id": "tt0060445",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BOTEwYzIxODEtMDBjNS00MjQ3LWJkMjEtMmYxYTg3YmIxNWVkXkEyXkFqcGdeQXVyMDUyOTUyNQ@@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Gambit",
    //             "description": "(1966)"
    //         },
    //         {
    //             "id": "tt7097262",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BOWUyMDFlZDAtZWM0ZC00ZWZhLWEyODAtMTU4ZGQxNjc1NGE4XkEyXkFqcGdeQXVyMjEzNzM1MDQ@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Gambit",
    //             "description": "(2017) (Video)"
    //         },
    //         {
    //             "id": "tt10048342",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BM2EwMmRhMmUtMzBmMS00ZDQ3LTg4OGEtNjlkODk3ZTMxMmJlXkEyXkFqcGdeQXVyMjM5ODk1NDU@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "The Queen's Gambit",
    //             "description": "(2020) (TV Mini-Series)"
    //         },
    //         {
    //             "id": "tt9297074",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BYTFkYjg3N2UtNzQzNi00YzQ5LThkMmMtNTU5M2E2ODliZmFkXkEyXkFqcGdeQXVyOTU1ODc3NDc@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Gambit: Playing for Keeps",
    //             "description": "(2020) (TV Short)"
    //         },
    //         {
    //             "id": "tt0374298",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BYWE3ZjE4OTUtZGY1Yi00NWFkLTg4MTctZjYxOWU5OTYwYmM4XkEyXkFqcGdeQXVyMzQzNDc4NTQ@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Türkisches Gambit: 1877 - Die Schlacht am Bosporus",
    //             "description": "(2005)"
    //         },
    //         {
    //             "id": "tt13292332",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BNzk3ZTVlMmYtNmM3YS00YzVjLWFlNzUtYzMxZDE5MGI1N2ZmXkEyXkFqcGdeQXVyMTA4MTIzMTY4._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Gambit",
    //             "description": "(2020) (Short)"
    //         },
    //         {
    //             "id": "tt4346056",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BNGY2NWU5MGEtZGE1Zi00NjMwLThlY2YtMGEyMTUxMjJlNWJjXkEyXkFqcGdeQXVyMjQ0NzQxNTE@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Gambit Origins",
    //             "description": "(2014) (Short)"
    //         },
    //         {
    //             "id": "tt9319680",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BN2JmOTUzMWYtNjQwZS00YjhlLTgwZDYtODBjZmYzZGY1MDExXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_Ratio0.7273_AL_.jpg",
    //             "title": "Ambitions",
    //             "description": "(2019) (TV Series)"
    //         },
    //         {
    //             "id": "tt0315009",
    //             "resultType": "Title",
    //             "image": "https://imdb-api.com/images/original/MV5BNTMwMzRmZGQtNDNiMy00YzRiLTk0NTAtMDRhYzIyMjQzY2M5XkEyXkFqcGdeQXVyMTQ0OTk2ODk@._V1_Ratio1.4091_AL_.jpg",
    //             "title": "Gambit",
    //             "description": "(1975) (TV Series)"
    //         }
    //     ]
    // }

    return (
        <Swiper spaceBetween={30}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}>
            {/*{console.log(props)}*/}
            {props.films.map((film, id) => (

                <SwiperSlide key={id}
                    src={film.id} style={{cursor: "pointer", marginLeft: "15px"}}>
                    <NavLink to={{
                        pathname: "/film/" +film.id,
                        filmId: film.id
                    }}
                             style={{color: "#FFF", textDecoration: "none"}}>
                        <div className={classes.filmWrapper}>
                            <div>
                                <img src={film.image}/>
                            </div>
                            <div className={classes.descriptionWrapper}>
                                <p className={classes.title}>{film.title}</p>
                                {film.imDbRating
                                    ? <>
                                        <span>
                                        <div style={{ width: "60px", fontSize: '10px',
                                            backgroundColor:"#FAC539",
                                            padding: '4px 0',
                                            textAlign: "center",
                                            color: "black",
                                            fontWeight: 700,
                                            borderRadius: "5px"}}>
                                            IMDb {film.imDbRating}</div>
                                        <br/> {film.genres} | {film.year} </span>
                                    </>
                                    : <span>{film.description}</span> }
                            </div>
                        </div>
                    </NavLink>
                </SwiperSlide>


            ))}
        </Swiper>
    );
};

export default SliderDiv;