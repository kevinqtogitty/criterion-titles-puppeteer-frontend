import React, { useEffect, useState } from 'react';

interface CriterionFilm {
  title: string;
  director: string;
  year: string;
  country: string;
  imgUrl: string;
  link: string;
}
function App() {
  const [allCriterionFilms, setAllCriterionFilms] = useState<CriterionFilm[]>();

  useEffect(() => {
    fetchCriterionFilmData();
  }, []);

  const fetchCriterionFilmData = async () => {
    const response = await fetch('http://localhost:8080/films');
    const data = await response.json();
    setAllCriterionFilms(data);
  };
  return <div>Hello</div>;
}

export default App;
