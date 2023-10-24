import { Dispatch, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper as Slider, SwiperSlide } from 'swiper/react';

import { IFilm, ISimularMovie } from '@models/IFilm';
import { FilmTypeDictionary } from '@models/FilmTypeDictionary';
import { ImageWithLoading } from './ImageWithLoading';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import classes from "./Slider.module.css";

interface ISliderProps {
  films: IFilm[] | ISimularMovie[];
  getNext?: Dispatch<void>;
}

const breakpoints = {
  400: {
    width: 400,
    slidesPerView: 2,
  },
  640: {
    width: 640,
    slidesPerView: 3,
  },
  768: {
    width: 768,
    slidesPerView: 5,
  },
};

function getIFilmNode(obj: IFilm): ReactNode {
  return (
    <div className={classes.opts}>
      <p>{obj.year}<span> | </span>{FilmTypeDictionary[obj?.type]}</p>
      <p>
        {
          obj.countries.map((country, idx) => {
            const current = typeof country === "string" ? country : country.name;
            return idx !== obj.countries.length - 1 ? current + ", ": current;
          })
        }
      </p>
    </div>
  )
}

function getISimularMovieNode(obj: ISimularMovie): ReactNode {
  return obj.type !== undefined && (
    <div className={classes.opts}>
      <p>{FilmTypeDictionary[obj?.type]}</p>
    </div>
  )
}

function getDescriptionNodeByObjType(obj: IFilm | ISimularMovie): ReactNode {
  if ("year" in obj) {
    return getIFilmNode(obj as IFilm);
  }
  return getISimularMovieNode(obj as ISimularMovie);
}

export const Slide = (props: ISliderProps) => {
  return !props.films ? null : (
    <Slider
      breakpoints={breakpoints}
      onReachEnd={() => {
        props?.getNext !== undefined && props.getNext();
      }}
      className={classes.slider}
      spaceBetween={30}
    >
      {props.films.map((film, idx) => (
        <SwiperSlide key={idx} className={classes.slide}>
          <NavLink
            key={idx}
            state={{ film }}
            style={{ color: "#FFF", textDecoration: "none", borderRadius: "24px" }}
            to={{ pathname: "/film/" + film.id }}
          >
            <div className={classes.filmWrapper}>
              {film.poster
                ? <ImageWithLoading src={typeof film.poster === "string" ? film.poster : film.poster.url} />
                : <div className={classes.noFilm} />
              }
              <div className={classes.descriptionWrapper}>
                <h4 className={classes.title}>{film.name}</h4>
                {
                  getDescriptionNodeByObjType(film)
                }
              </div>
            </div>
          </NavLink>
        </SwiperSlide>
      ))}
    </Slider>
  )
}