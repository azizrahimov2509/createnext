// pages/series/page.tsx
"use client"; // Используйте "use client" для использования состояния и эффектов в клиентском коде.

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import { getContent } from "../queries";
import SeriesItem from "@/components/seriesItem";
import { Movie } from "@/types";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [series, setSeries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSeries = async (searchQuery: string) => {
    const data = await getContent("tv-series", searchQuery);
    if (data.docs) {
      setSeries(data.docs);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries(query);
  }, [query]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchSeries(query);
  };

  return (
    <section>
      <div className="container p-4">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <form onSubmit={handleSearch} className="flex flex-row">
            {" "}
            <input
              type="text"
              placeholder="Search for series"
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

        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400 pb-2">
            Series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              series.map((serie: Movie) => (
                <SeriesItem data={serie} key={serie.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
