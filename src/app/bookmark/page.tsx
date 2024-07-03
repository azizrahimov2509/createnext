"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import Link from "next/link";
import MovieItem from "@/components/movieItem";
import { Movie } from "@/types";
import SeriesItem from "@/components/seriesItem";

export default function Page() {
  const [data, setData] = useState<Movie[] | []>([]);
  const [dataSeries, setDataSeries] = useState<Movie[] | []>([]);
  const [refresh, setUpdate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("favorites") as string) ?? [];
    setData(value);
  }, [refresh]);

  useEffect(() => {
    const value =
      JSON.parse(localStorage.getItem("favoritesSeries") as string) ?? [];
    setDataSeries(value);
  }, [refresh]);

  const filteredMovies = data.filter((item) =>
    (item.name ?? item.alternativeName)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredSeries = dataSeries.filter((item) =>
    (item.name ?? item.alternativeName)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="container p-5">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Search for bookmarked shows"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-l-lg py-2 px-4 w-[321px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
          />
        </div>

        {/* Bookmarked Movies */}
        <div className="mt-5 flex flex-col items-start justify-between gap-5">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
            Bookmarked Movies
          </h2>
          <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4">
            {!!filteredMovies.length ? (
              filteredMovies.map((item) => {
                return (
                  <MovieItem
                    data={{ ...item, setUpdate: setUpdate }}
                    key={item.id}
                  />
                );
              })
            ) : (
              <h2 className="text-2xl text-red-600 text-center">
                There is no movie :(
              </h2>
            )}
          </div>
        </div>

        {/* Bookmarked TV Series */}
        <div className="mt-5 flex flex-col items-start justify-between gap-5">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 mt-4">
            Bookmarked TV Series
          </h2>
          <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4">
            {!!filteredSeries.length ? (
              filteredSeries.map((item) => {
                return (
                  <SeriesItem
                    data={{ ...item, setUpdate: setUpdate }}
                    key={item.id}
                  />
                );
              })
            ) : (
              <h2 className="text-2xl text-red-600 text-center">
                There is no tv-series :(
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
