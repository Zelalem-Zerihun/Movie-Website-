import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const INITIAL_SEARCH_TERM = "action";

const App = () => {
  const [movies, setMovies] = useState([]);
  const queryRef = useRef(INITIAL_SEARCH_TERM);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = useCallback(async (searchQuery, pageNumber = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: API_KEY,
          s: searchQuery,
          page: pageNumber,
          type: "movie",
        },
      });

      if (response.data.Response === "True") {
        setMovies((prev) =>
          pageNumber === 1
            ? response.data.Search
            : [...prev, ...response.data.Search]
        );
        setTotalResults(parseInt(response.data.totalResults));
        setError("");
      } else {
        setError(response.data.Error || "No movies found");
        setMovies([]);
      }
    } catch (err) {
      setError(err.response?.data?.Error || "Failed to fetch movies");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(INITIAL_SEARCH_TERM);
  }, [fetchMovies]);

  const handleSearch = (query) => {
    queryRef.current = query;
    fetchMovies(query);
    fetchMovies(query);
  };

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchMovies(queryRef.current, newPage);
  };

  const fetchMovieDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: { apikey: API_KEY, i: id, plot: "full" },
      });
      setSelectedMovie(response.data);
    } catch (err) {
      setError("Failed to load movie details");
      console.error("Details Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Movie Explorer</h1>
          <SearchBar onSearch={handleSearch} />
          {error && <p className="text-red-500">{error}</p>}
        </header>

        <main className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={fetchMovieDetails}
              />
            ))}
          </div>

          {movies.length > 0 && movies.length < totalResults && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </main>

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
