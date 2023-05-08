import React, { useEffect, useState } from 'react';

export interface CriterionFilm {
  title: string;
  director: string;
  year: string;
  country: string;
  imgUrl: string;
  link: string;
}
function App() {
  const [allCriterionFilms, setAllCriterionFilms] = useState<CriterionFilm[]>();
  const [randomTenFilms, setRandomTenFilms] = useState<CriterionFilm[]>();
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  console.log(randomTenFilms, allCriterionFilms);

  useEffect(() => {
    fetchCriterionFilmData();
  }, []);

  useEffect(() => {
    if (allCriterionFilms && !sessionStorage.getItem('savedTen')) {
      generateRandomTen();
    } else {
      const data: CriterionFilm[] = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sessionStorage.getItem('savedTen')!
      );
      setRandomTenFilms(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCriterionFilms]);

  const fetchCriterionFilmData = async () => {
    try {
      const response = await fetch('http://localhost:8080/films');
      const data = await response.json();
      setAllCriterionFilms(data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomTen = () => {
    const randomFilms: CriterionFilm[] = [];
    if (allCriterionFilms) {
      for (let i = 0; i < 10; i++) {
        const generatedNumber = randomInteger(0, allCriterionFilms.length);
        if (randomFilms.includes(allCriterionFilms[generatedNumber])) {
          i--;
        } else {
          randomFilms.push(allCriterionFilms[generatedNumber]);
        }
      }
    }
    sessionStorage.setItem('savedTen', JSON.stringify(randomFilms));
    setRandomTenFilms(randomFilms);
  };

  return (
    <div className="main-container">
      <h1>Random Criterion</h1>
      <button onClick={generateRandomTen}>New list</button>

      {isFetching ? (
        <div>Fetching criterion films</div>
      ) : (
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
            {randomTenFilms?.map((film) => (
              <a href={`${film.link}`} target="_blank">
                <tr className="table-data-row">
                  <td>
                    <img src={`${film.imgUrl}`} alt={`${film.title}`} />
                  </td>
                  <td>{film.director}</td>
                  <td>{film.year}</td>
                  <td>{film.country}</td>
                </tr>
              </a>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
