import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

import { FilmService } from '@services/FilmServices';
import { IFilm } from "@models/IFilm";
import AWAKENING from "@assets/video/AWAKENING.mp4";
import Poster from "@assets/img/poster4.png"
import { Slide } from "./Slider";

import classes from './Start.module.css';

const startOptions = {
  page: 1,
  limit: 10,
};

export const Start = () => {
  const location = useLocation();
  const [ text, setText ] = useState<string>(location.state?.search ?? "");
  const [ films, setFilms ] = useState<IFilm[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ total, setTotal ] = useState<number>(0);
  const [ paginateOptions, setPaginateOptions ] = useState(startOptions);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleSearch =  useCallback(async(requestReceivingType: "new" | "next") => {
    setIsLoading(true);
    FilmService.getFilmsByText(requestReceivingType === "new"
      ? { ...startOptions, text: text }
      : {
          limit: paginateOptions.limit,
          page: paginateOptions.page + 1,
          text: text
      })
      .then((response) => {
        error && setError(null);
        requestReceivingType === "new"
          ? setFilms(response?.data?.docs)
          : setFilms(prev => [...prev, ...response?.data?.docs as IFilm[]]);
        setTotal(response?.data?.total);
        setPaginateOptions({
          limit: response.data.limit,
          page: response.data.page
        });
        return response;
      })
      .catch((error) => {
        setError(error);
        setTotal(0);
        setFilms([]);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [text, paginateOptions, error]);

  const getNext = useCallback(() => {
    if (paginateOptions.page * paginateOptions.limit < total) {
      handleSearch("next");
    }
  }, [paginateOptions, total, handleSearch])

  useEffect(() => {
    if (text !== "" && location.state?.search === text && films.length === 0) {
      handleSearch("new");
    }
    /* eslint-disable-next-line */
  }, [text]);

  return (
    <div className={classes.videoBg}>
      <video poster={Poster} width="720" height="540" loop autoPlay muted>
        <source src={AWAKENING}/>
      </video>
      <div className={classes.effects}/>
      <div className={classes.mainPageGrid}>
        <div className={classes.mainHeader}>
          <h3>Погрузись в магию кино</h3>
          <p>Раскрой мир историй</p>
          <div className={classes.inputWrapper}>
            <input
              placeholder="введите название..."
              value={text}
              onChange={handleChange}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  handleSearch("new");
                }
              }}
            />
            <button
              disabled={isLoading}
              onClick={() => handleSearch("new")}
            >
              {!isLoading
                ? "Поиск" 
                : (
                  <RotatingLines           
                    strokeColor="#ffffff"
                    strokeWidth="5"
                    animationDuration="0.85"
                    width="24"
                    visible={isLoading}
                  />
                )
              }
            </button>
          </div>
        </div>
        {!error ? (
          <div
            style={{ width: document.documentElement.scrollWidth }}
            className={classes.filmsWrapper}
          >
            <Slide getNext={getNext} films={films} />
          </div>
          )
        : (
          <div
            style={{ width: document.documentElement.scrollWidth }}
            className={classes.errorWrapper}
            >
              <article>
                <div className={classes.messageBox}>
                  <p>{error}</p>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
  )
}