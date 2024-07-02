"use server"; //server side
import React from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";

import Link from "next/link";
import { getContent } from "../queries";
import MovieItem from "@/components/movieItem";
import { log } from "console";
import { Movie } from "@/types";

export default async function page() {
  const request = await getContent("movie");

  log(request.docs[0]);

  return (
    <section>
      <div className="container  p-4">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Search for movies"
            className="border rounded-l-lg py-2 px-4 w-[249px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
          />
        </div>

        {""}
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400 pb-2">
            Movies
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {request.docs?.map((movie: Movie) => (
              <MovieItem data={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
