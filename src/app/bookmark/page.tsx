"use client";

import React, { useEffect, useState } from "react";
import MovieItem from "@/components/movieItem";
import { Movie } from "@/types";

export default function BookmarkPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);

    async function fetchMovies() {
      const response = await fetch(
        "https://api.kinopoisk.dev/v1.4/movie?limit=20",
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "H0TQ2K2-59NME4T-K74Q5K6-XKP2NKW",
          },
        }
      );
      const data = await response.json();
      setMovies(data.docs || []);
    }

    fetchMovies();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const newIsFavorite = !prevFavorites.includes(id);
      const updatedFavorites = newIsFavorite
        ? [...prevFavorites, id]
        : prevFavorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <section>
      <div className="container p-4">
        <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
          Bookmarked Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies
            .filter((movie) => favorites.includes(movie.id))
            .map((movie: Movie) => (
              <MovieItem
                data={movie}
                key={movie.id}
                isFavorite={favorites.includes(movie.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
