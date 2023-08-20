import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { debounce } from "lodash";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
    debouncedSearch.cancel();
  }, []);

  const debouncedSearch = debounce(async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  }, 300);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={i}>
          <div className="Movie-wrapper">
            <div className="Movie-title">{movie.title}</div>
            <img
              className="Movie-image"
              src={
                movie.poster_path
                  ? `${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`
                  : "url_gambar_default.jpg"
              }
            />
            <div className="Movie-date">release: {movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        <h1>FILM ALEX API</h1>
        <input
          placeholder="search"
          className="Movie-search"
          onChange={({ target }) => debouncedSearch(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
