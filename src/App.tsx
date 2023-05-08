import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import Loader from './components/Loader';

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

  /* ON MOUNT */
  useEffect(() => {
    if (!allCriterionFilms) fetchCriterionFilmData();
    return;
  }, []);

  useEffect(() => {
    // If we've retrieved the data but havent saved it in session storage yet
    if (allCriterionFilms && !sessionStorage.getItem('savedTen')) {
      generateRandomTen();
    } else {
      const data: CriterionFilm[] = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sessionStorage.getItem('savedTen')!
      );
      setRandomTenFilms(data);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCriterionFilms]);

  /* FUNCTIONS */
  const fetchCriterionFilmData = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://criterion-backend.onrender.com/films'
      );
      const data = await response.json();
      setAllCriterionFilms(data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomTen = (): void => {
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
      {isFetching ? null : (
        <div className="hero-button-container">
          <button onClick={generateRandomTen}>New list</button>
        </div>
      )}

      {isFetching ? <Loader /> : <Table randomTenFilms={randomTenFilms} />}
    </div>
  );
}

export default App;
