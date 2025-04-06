 import React, { useState } from "react";
 
 const SearchBar = ({ onSearch }) => {
   const [query, setQuery] = useState("");
 
   const handleChange = (event) => {
     setQuery(event.target.value);
   };
 
   const handleSubmit = (event) => {
     event.preventDefault();
     if (query.trim()) {
       onSearch(query);
     }
   };
 
   return (
     <form onSubmit={handleSubmit} className="flex items-center">
       <input
         type="text"
         placeholder="Search for a movie..."
         value={query}
         onChange={handleChange}
         className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
       />
       <button
         type="submit"
         className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
       >
         Search
       </button>
     </form>
   );
 };
 
 export default SearchBar;
 