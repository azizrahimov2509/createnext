// app/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import searchIcon from "../../public/search.png";
import { getTopMovies } from "./queries/top";
import { getTop10Movies } from "./queries/top10";
import { Movie } from "@/types";
import Top10MoviesItem from "@/components/top10moviesItem";
import TopMoviesItem from "@/components/topmoviesItem";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [top10Movies, setTop10Movies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMoviesAndTop10 = async (searchQuery: string) => {
    const movies = await getTopMovies(searchQuery);
    const top10 = await getTop10Movies();

    setTopMovies(movies);
    setTop10Movies(top10);
    setLoading(false);
  };

  useEffect(() => {
    fetchMoviesAndTop10(query);
  }, [query]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchMoviesAndTop10(query);
  };

  return (
    <section>
      <div className="container p-4">
        <div className="flex items-center mb-4">
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
        <div>
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400  pb-2">
            Trending
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 border-b-2 border-gray-400  pb-2 ">
            {top10Movies.map((movie: Movie) => (
              <Top10MoviesItem data={movie} key={movie.id} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400 pb-2 ">
            Recommended for you
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              topMovies.map((movie: Movie) => (
                <TopMoviesItem data={movie} key={movie.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
