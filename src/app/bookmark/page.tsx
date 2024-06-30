"use client";

import React, { useState } from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import Shape from "../../../public/Shape (1).png";
import Link from "next/link";

// Mock data
const recomendedmovies = [
  {
    id: 1,
    title: "Movie 1",
    imageUrl: "/path/to/movie1.jpg",
  },
  {
    id: 2,
    title: "Movie 2",
    imageUrl: "/path/to/movie2.jpg",
  },
  // Add more movie objects here
];

const markbookedmovies = [
  {
    id: 3,
    title: "Series 1",
    imageUrl: "/path/to/series1.jpg",
  },
  {
    id: 4,
    title: "Series 2",
    imageUrl: "/path/to/series2.jpg",
  },
  // Add more series objects here
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredRecommendedMovies = recomendedmovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMarkbookedMovies = markbookedmovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <section>
      <div className="container p-4">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Search for bookmarked shows"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-l-lg py-2 px-4 w-[321px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
          />
        </div>

        {/* Bookmarked Movies */}
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
            Bookmarked Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRecommendedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-inherit shadow-md rounded-lg overflow-hidden relative"
              >
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  width={280}
                  height={174}
                />
                <button
                  className={`absolute top-2 right-2 p-3 rounded-full ${
                    favorites.includes(movie.id) ? "bg-red-500" : "bg-white"
                  } text-black shadow-lg hover:bg-red-600 transition duration-300 ease-in-out`}
                  onClick={() => toggleFavorite(movie.id)}
                >
                  {favorites.includes(movie.id) ? (
                    <svg
                      className="w-8 h-8 text-white" // Increase the size of the heart icon
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 text-black" // Increase the size of the heart icon
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </button>
                <Link href={`/movies/${movie.id}`}>
                  <div className="p-4">
                    <div className="flex items-center gap-2 from-neutral-400 text-[13px] mb-1">
                      <p>2019</p>
                      <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
                      <p className="flex items-center gap-1">
                        <Image
                          src={Shape}
                          alt={movie.title}
                          width={12}
                          height={12}
                        />{" "}
                        movie
                      </p>
                      <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
                      <p>PG</p>
                    </div>
                    <h3 className="text-lg from-neutral-400 leading-6 ">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarked TV Series */}
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
            Bookmarked TV Series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMarkbookedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-inherit shadow-md rounded-lg overflow-hidden relative"
              >
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  width={280}
                  height={174}
                />
                <button
                  className={`absolute top-2 right-2 p-3 rounded-full ${
                    favorites.includes(movie.id) ? "bg-red-500" : "bg-white"
                  } text-black shadow-lg hover:bg-red-600 transition duration-300 ease-in-out`}
                  onClick={() => toggleFavorite(movie.id)}
                >
                  {favorites.includes(movie.id) ? (
                    <svg
                      className="w-8 h-8 text-white" // Increase the size of the heart icon
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 text-black" // Increase the size of the heart icon
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </button>
                <Link href={`/movies/${movie.id}`}>
                  <div className="p-4">
                    <div className="flex items-center gap-2 from-neutral-400 text-[13px] mb-1">
                      <p>2019</p>
                      <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
                      <p className="flex items-center gap-1">
                        <Image
                          src={Shape}
                          alt={movie.title}
                          width={12}
                          height={12}
                        />{" "}
                        movie
                      </p>
                      <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
                      <p>PG</p>
                    </div>
                    <h3 className="text-lg from-neutral-400 leading-6 ">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
