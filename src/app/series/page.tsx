"use server";
import React from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import { getContent } from "../queries";
import SeriesItem from "@/components/seriesItem";
import { Movie } from "@/types";

export default async function page() {
  const request = await getContent("tv-series");
  return (
    <section>
      <div className="container  p-4">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Search for series"
            className="border rounded-l-lg py-2 px-4 w-[249px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
          />
        </div>

        {""}
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
            Series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {request.docs?.map((series: Movie) => (
              <SeriesItem data={series} key={series.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
