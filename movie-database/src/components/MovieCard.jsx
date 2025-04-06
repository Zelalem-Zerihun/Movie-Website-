import React from "react";

const MovieCard = ({ movie, onClick }) => {
  const posterUrl =
    movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300";

  return (
    <div
      onClick={() => onClick(movie.imdbID)}
      className="group relative cursor-pointer bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
    >
      <div className="w-full h-72 overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>
      <div className="p-4 text-black">
        {" "}
        {/* Added text-black here */}
        <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
        <p className="text-gray-600 text-sm">{movie.Year}</p>{" "}
        {/* Keeping gray for less emphasis */}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-white text-center font-semibold text-xl mb-2">
          {movie.Title}
        </h4>
        <p className="text-gray-white text-sm mb-1 px-4 truncate">
          {movie.Genre}
        </p>
        <p className="text-gray-300 text-sm text-center px-4">
          Click for details
        </p>{" "}
        {/* Keeping gray for less emphasis */}
      </div>
    </div>
  );
};

export default MovieCard;
