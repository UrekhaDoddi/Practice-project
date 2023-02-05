import React, { useReducer, useEffect } from "react";
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";

const MOVIE_API_URL = "https://api.themoviedb.org/3/search/movie?api_key=b56058299cbea0093f5ccfb9e43c52a4&language=en-US&query=";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);


  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies } = state;

  const retrievedMovies =
  (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="Movie Masthi" />

        <Search search={search} />
        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
