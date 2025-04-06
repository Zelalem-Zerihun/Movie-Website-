import React from "react";
 

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300";

const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMAGE;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick(movie.imdbID)}
      onKeyDown={(e) => e.key === "Enter" && onClick(movie.imdbID)}
      className="group relative cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="aspect-w-2 aspect-h-3">
        <img
          src={posterUrl}
          alt={`Poster for ${movie.Title}`}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate text-gray-900">
          {movie.Title}
        </h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div className="text-white space-y-1">
          <h4 className="font-bold text-xl">{movie.Title}</h4>
          {movie.Genre && (
            <p className="text-sm font-medium text-gray-300">
              {movie.Genre.split(",").join(" • ")}
            </p>
          )}
          <p className="text-sm text-gray-400 mt-2">Click for details</p>
        </div>
      </div>
    </article>
  );
};

 

export default MovieCard;
