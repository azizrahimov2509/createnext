// movies.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";

import Link from "next/link";
import { getContent } from "../queries";
import MovieItem from "@/components/movieItem";
import { Movie } from "@/types";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovies = async (searchQuery: string) => {
    const data = await getContent("movie", searchQuery);
    if (data.docs) {
      setMovies(data.docs);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchMovies(query);
  };

  return (
    <section>
      <div className="container p-4">
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <div className="flex items-center mb-4">
            {/* Search */}
            <Image src={searchIcon} alt="Search" width={24} height={24} />
            <form onSubmit={handleSearch} className="flex flex-row">
              <input
                type="text"
                placeholder="Search for movies"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded-l-lg py-2 px-4 w-[249px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-r-lg"
              >
                Search
              </button>
            </form>
          </div>
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400 pb-2">
            Movies
          </h2>

          {/* Movie Items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              movies.map((movie: Movie) => (
                <MovieItem data={movie} key={movie.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
