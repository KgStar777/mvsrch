import React from 'react';
import classes from "../Start2.module.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import { NavLink } from "react-router-dom";

const SliderDiv = (props) => {
    function calc() {
        const windowSize = window.innerWidth
        if(windowSize < 700) return 3
        if(windowSize >= 700) return 4
    }

    return (
        <Swiper spaceBetween={30}
                slidesPerView={calc()}
                // onSlideChange={}
                // onSwiper={}
        >
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
                                <img style={{maxWidth: "95px", height: '141px'}} src={film.image}/>
                            </div>
                            <div className={classes.descriptionWrapper}>
                                <p className={classes.title}>{film.title}</p>
                                {film.imDbRating
                                    ? <>
                                        <span>
                                        <div style={{ maxWidth: "60px", fontSize: '8px',
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