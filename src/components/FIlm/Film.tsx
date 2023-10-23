import { Fragment, useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

import Search from "@assets/img/search.png";
import { Slide } from "@components/Slider";
import { FilmService } from "@services/FilmServices";
import { IFilm, ISimularMovie } from "@models/IFilm";
import { FilmTypeDictionary } from '@models/FilmTypeDictionary';

import { SubscriptionListByName } from "./SubscriptionListByName";
import { SubscriptionItem } from "./SubscriptionItem";
import { PersonList } from "./PersonList";
import { Trailer } from "./Trailer";
import { Info } from "./Info";

import classes from "./Film.module.css";

export function Film() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [film, setFilm] = useState<IFilm | null>(null);
  const [films, setFilms] = useState<ISimularMovie[]>([]);
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate("/", {
        state: { search: text }
      });
    }
  };

  useEffect(() => {
    FilmService.getFilmById(id as string)
      .then(response => {
        setFilm(response.data);
        setFilms(response.data.similarMovies)
      })
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [id]);

  return (
    <>
      <div className={classes.wrapperBox} style={isModalOpen ? {overflow: "hidden"} : undefined}>
        <div className={classes.searchBox}>
          <nav>
            <NavLink to="/">
              <h3><span>Кино</span>Лента</h3>
            </NavLink>
            <div className={classes.inputWrapper}>
              <img className={classes.searchImg} src={Search}/>
              <input
                placeholder="введите название..."
                onChange={handleInputChange}
                onKeyDown={onKeyDown}
                className={classes.filmInput}
                value={text}
              />
              <NavLink
                state={{ search: text }}
                to={{ pathname: "/" }}
                className={classes.btn}
              >
                Поиск
              </NavLink>
            </div>
          </nav>      
        </div>

        {!film ? null : (
          <>
            <Info
              film={film}
              actions={[(
                <button
                  children="Смотреть"
                  onClick={onOpenModal}
                  className={classes.watch}
                />
              ),
            ]}>
              <SubscriptionItem objectName="imdb" rating={film.rating} className="rating">
                IMDb&nbsp;
              </SubscriptionItem>
              <SubscriptionListByName objectName="name" items={film.genres} />
              <SubscriptionListByName objectName="name" items={film.countries} />
              <span className="subscriptionText">{FilmTypeDictionary[film.type]}</span>|
              <span className="subscriptionText">{film.year}</span>
            </Info>

            <section className={classes.about}>
              <h2>"{film.name}" на КиноЛенте</h2>
              <div className={classes.awardsBox}>
                <p className={classes.awards}>{film.description}</p>
              </div>
            </section>
            
            <PersonList list={film.persons} />

            <section className={classes.about}>
              {films.length > 0 && (
                <Fragment>
                  <h4 className={classes.sectionTitle}>Похожие фильмы</h4>
                  <div
                    style={{ width: document.documentElement.scrollWidth }}
                    className={classes.sliderWrapper}
                  >
                    <Slide films={films} />
                  </div>
                </Fragment>
              )}
            </section>
            </>
          )}

        <footer className={classes.searchBox}>
          <h3><span>Кино</span>Лента</h3>
        </footer>
      </div>
      {isModalOpen && createPortal(
        <Trailer
          onClose={onCloseModal}
          watchability={film?.watchability?.items ?? []}
          trailers={film?.videos?.trailers ?? []}
        />,
        document.getElementById("modal-root") as HTMLElement,
      )}
    </>
  )
}
