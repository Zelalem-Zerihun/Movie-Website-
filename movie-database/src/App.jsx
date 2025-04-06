import React, { useState } from "react";
/* import SearchBar from "./components/SearchBar"; */
import MovieList from "./components/MovieList";
/* import MovieDetails from "./components/MovieDetails"; */

function App() {
   
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   

  const handleSelectMovie = async (imdbID) => {
    setSelectedMovie(null);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=YOUR_OMDB_API_KEY&plot=full`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError(data.Error || "Failed to fetch movie details.");
      }
    } catch (err) {
      setError(
        "Failed to fetch movie details. Please check your network connection."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Movie Database
        </h1>
  

        {loading && (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {!selectedMovie && !loading && movies.length > 0 && (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}

 

         
      </div>
    </div>
  );
}

export default App;
