import { Dispatch, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";

import { ITrailerItem, IWatchabilityItem } from "@models/IFilm";

import classes from "./Trailer.module.css";

interface ITrailerProps {
  watchability: IWatchabilityItem[];
  trailers: ITrailerItem[];
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const Trailer = ({
  trailers,
  ...props
}: ITrailerProps) => {
  const [trailerIdx, setTrailerIdx] = useState<number | null>(trailers?.length > 0 ? 0 : null);

  const onChangeTrailer = (current: number) => {
    setTrailerIdx(current);
  }

  return (
    <div className={classes.modal}>
      <div className={classes.trailerWrapper}>
        <button
          className={classes.closeButton}
          onClick={() => props.onClose(false)}
        />
        {
          trailerIdx !== null && (
            <div>{trailers[trailerIdx].name}</div>
          )
        }
        <ul>
          {
            trailers?.length > 0
              ? Array.from({ length: trailers.length }).map((_, idx) => (
                <li
                  key={idx}
                  onClick={() => onChangeTrailer(idx)}
                  className={classes.trailer}
                  style={trailerIdx ? {} : undefined}
                >
                  Трейлер {idx + 1}
                </li>
              ))
            : <div>Нет доступных трейлеров</div>
          }
        </ul>
        {
          trailerIdx !== null && (
            <>
              <ReactPlayer
                url={trailers[trailerIdx].url}
                controls={true}
                width="100%"
                height="100%"
              />
              <div className={classes.linkBox}>
                Смотреть на: 
                {props.watchability.map((item, idx) => (
                  <NavLink to={item.url} key={idx}>
                    <img title={item.name} width={30} height={30} src={item.logo.url} />
                   </NavLink>
                ))}
              </div>
            </>
          )
        }
      </div>
    </div>
  )
};
