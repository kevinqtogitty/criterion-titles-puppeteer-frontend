import React from 'react';
import { a, useTransition } from '@react-spring/web';
import { CriterionFilm } from '../App';

interface Props {
  randomTenFilms: CriterionFilm[] | undefined;
}

const Table: React.FC<Props> = ({ randomTenFilms }): JSX.Element => {
  const transitions = useTransition(randomTenFilms, {
    from: { transform: 'translateY(20%)', opacity: 0 },
    enter: { transform: 'translateY(0%)', opacity: 1 },
    trail: 100,
    delay: 200,
    config: { duration: 500 }
  });

  return (
    <table className="table-main">
      <thead>
        <tr className="table-categories">
          <td>Title</td>
          <td>Director</td>
          <td>Year</td>
          <td>Country</td>
        </tr>
      </thead>
      <tbody>
        {transitions((style, item) => (
          <a.a style={style} href={`${item?.link}`} target="_blank">
            <tr className="table-data-row">
              <td>
                <img src={`${item?.imgUrl}`} alt={`${item?.title}`} />
              </td>
              <td>{item?.director}</td>
              <td>{item?.year}</td>
              <td>{item?.country}</td>
            </tr>
          </a.a>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
