import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=330160d9";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null); // State to track the selected movie

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  // Function to handle click on a movie card
  const handleMovieClick = async (movie) => {
    const response = await fetch(`${API_URL}&i=${movie.imdbID}&plot=full`);
    const data = await response.json();

    setSelectedMovie(data);
  };

  return (
    <>
      <div className="app">
        <h1>MovieSpace</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {selectedMovie ? ( // Render movie details if a movie is selected
          <div className="selected-movie">
            <div className="poster">
              <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            </div>
            <div className="info">
              <h2>{selectedMovie.Title}</h2>
              <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
              <p><strong>Director:</strong> {selectedMovie.Director}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
              <button onClick={() => setSelectedMovie(null)}>Close</button>
            </div>
          </div>
        ) : (
          movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onClick={() => handleMovieClick(movie)} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;
