import React from "react";

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative text-black">
        {" "}
        {/* Added text-black here */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
        <div className="flex gap-4">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300"
            }
            alt={movie.Title}
            className="w-48 h-64 object-cover"
          />
          <div>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Cast:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Ratings:</strong>{" "}
              {Array.isArray(movie.Ratings) &&
                movie.Ratings.map((rating, i) => (
                  <span key={i}>
                    {rating.Source}: {rating.Value}{" "}
                  </span>
                ))}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
