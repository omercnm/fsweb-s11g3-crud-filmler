import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from "./components/MovieHeader";
import FavoriteMovieList from "./components/FavoriteMovieList";
import AddMovieForm from "./components/AddMovieForm";
import axios from "axios";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movie/${id}`)
      .then((res) => {
        PushManager("/movies");
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToFavorites = (movie) => {
    if (!favoriteMovies.find((mov) => mov.id === movie.id)) {
      setFavoriteMovies([...favoriteMovies, movie]);
    } else {
      console.log("Zaten Favorilerde var");
    }
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/edit/:id">
              {""}
              <EditMovieForm />
            </Route>

            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>

            <Route path="/movies/:id">
              <Movie
                deleteMovieCB={deleteMovie}
                addToFavoritesCB={addToFavorites}
              />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
