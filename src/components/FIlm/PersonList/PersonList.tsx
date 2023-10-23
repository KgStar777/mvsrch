import { useCallback, useState } from "react";

import { IPersonItemList } from "@models/IFilm";
import { splitArray } from "@helpers/splitArray";

import classes from "./PersonList.module.css";

interface IPersonListProps {
  list: IPersonItemList[];
}

const ToggleButton = (props: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    className={classes.toggleButton}
    onClick={props.onClick}>
      {props.isOpen ? "Развернуть" : "Свернуть"}
  </div>
)

export const ListItem = ({
  person
}: {
  person: IPersonItemList
}) => {
  return (
    <article className={classes.person}>
      <img className={classes.personPhoto} src={person.photo} />
      <div className={classes.personDescription}>
        <h4>{person.name ?? person.enName}</h4>
        <p>{person.profession}</p>
        <p>{person.description}</p>
      </div>
    </article>
  )
}

export function PersonList(props: IPersonListProps) {
  const [isShortList, setIsShortList] = useState<boolean>(false);

  const toggleListLength = useCallback(() => {
    setIsShortList(!isShortList);
  }, [isShortList]);

   return props.list?.length > 0 && (
    <section className={classes.personsBox}>
      <div className={classes.persons}>
        <h2>Над фильмом работали</h2>
          <div className={classes.listArray}>
            {
              props.list.length > 10 &&
              splitArray(props.list
                .slice(0, !isShortList
                  ? 10
                  : props.list.length), 2)
                .map((i, index) => (
                  <div key={index} className={classes.list}>
                    {
                      i.map((person, idx) => (
                        <ListItem person={person} key={idx} />
                      ))
                    }
                  </div>
            ))}
          </div>
          <ToggleButton isOpen={!isShortList} onClick={toggleListLength} />
      </div>
    </section>
  )
}