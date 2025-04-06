 import React from "react";
 import MovieCard from "./MovieCard";

 function MovieList({ movies, onSelectMovie }) {
   return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       {movies.map((movie) => (
         <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelectMovie} />
       ))}
     </div>
   );
 }

 export default MovieList;