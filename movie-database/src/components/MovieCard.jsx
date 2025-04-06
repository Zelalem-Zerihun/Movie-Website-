import React from "react";

function MovieCard({ movie, onSelect }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
      onClick={() => onSelect(movie.imdbID)}
    >
      {movie.Poster !== "N/A" ? (
        <img
          className="w-full h-48 object-cover"
          src={movie.Poster}
          alt={movie.Title}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Poster
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {movie.Title}
        </h3>
        <p className="text-gray-600 text-sm">Year: {movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
