import React from 'react';
import classes from "../Start2.module.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import { NavLink } from "react-router-dom";

const SliderDiv = (props) => {
    const windowSize = window.innerWidth
    function calcSlides() {
        if(windowSize <= 500) return 2
        if(windowSize < 700 && windowSize> 500) return 3
        if(windowSize >= 700) return 4
    }
    const calcSpace = () => {
        if (windowSize > 800) return 30
        if (windowSize > 500 && windowSize <= 800) return 20
        else return 10
    }

    return (
        <Swiper spaceBetween={calcSpace()}
                slidesPerView={calcSlides()}
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
                                <img style={{maxWidth: "95px", height: '16vh'}} src={film.image}/>
                            </div>
                            <div className={classes.descriptionWrapper}>
                                <p style={{ padding: 0, fontSize: '.9em', margin: '0.7em 0 0 0', cursor: 'pointer'}} className={classes.title}>{film.title}</p>
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