import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=movie`
        );
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          setError("");
        } else {
          setError(response.data.Error || "No movies found.");
          setMovies([]);
        }
      } catch (err) {
        setError("An error occurred while fetching initial movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  const searchMovies = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setError(response.data.Error || "No movies found.");
        setMovies([]);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      console.log("Fetched Movie Details:", response.data); // For debugging
      setSelectedMovie(response.data);
    } catch (err) {
      setError("An error occurred while fetching movie details.");
      console.error("Error fetching movie details:", err); // For debugging
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full w-full bg-gray-100 p-4 text-black">
      <div className="h-full flex flex-col w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Movie Database</h1>
        <div className="max-w-md mx-auto mb-8 w-full px-4">
          <SearchBar onSearch={searchMovies} />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex-grow w-full relative">
          {" "}
          {/* Added relative positioning */}
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-80 z-10">
              {" "}
              {/* Overlay for loading */}
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          )}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ${
              isLoading ? "opacity-0" : ""
            }`}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={fetchMovieDetails}
              />
            ))}
          </div>
        </div>
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
