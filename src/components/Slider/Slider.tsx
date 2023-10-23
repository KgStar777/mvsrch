import { Dispatch, ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { Swiper as Slider, SwiperSlide } from 'swiper/react';

import { IFilm, ISimularMovie } from '@models/IFilm';
import { FilmTypeDictionary } from '@models/FilmTypeDictionary';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import classes from "./Slider.module.css";

interface ISliderProps {
  films: IFilm[] | ISimularMovie[];
  getNext?: Dispatch<void>;
}

function ImageWithLoading({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className={classes.loadingImage}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="60"
            visible={loading}
          />
        </div>
      )}
      <img
        src={src}
        alt="Image"
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={handleImageLoad}
      />
    </>
  );
}

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

function getSimularMovieNode(obj: ISimularMovie): ReactNode {
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
  return getSimularMovieNode(obj as ISimularMovie);

}

export const Slide = (props: ISliderProps) => {
  return !props.films ? null : (
    <Slider
    onReachEnd={() => {
      props?.getNext !== undefined && props.getNext();
    }}
      className={classes.slider}
      spaceBetween={30}
      slidesPerView={5}
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