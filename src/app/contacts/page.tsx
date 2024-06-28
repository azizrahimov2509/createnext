import React from "react";
import Image from "next/image";
import searchIcon from "../../../public/search.png";
import Movie from "../../../public/trtr.jpg";
import ImgOfMovie from "../../../public/Rectangle-fotor-2024062821919.jpg";
import Shape from "../../../public/Shape (1).png";
import Link from "next/link";

const recomendedmovies = [
  { id: 1, title: "The Great Lands", imageUrl: Movie },
  { id: 2, title: "The Diary", imageUrl: Movie },
  { id: 3, title: "Earth’s Untouched", imageUrl: Movie },
  { id: 5, title: "No Land Beyond", imageUrl: Movie },
  { id: 6, title: "During The Hunt", imageUrl: Movie },
  { id: 7, title: "Autosport The Series", imageUrl: Movie },
  { id: 8, title: "Same Answer II", imageUrl: Movie },
  { id: 9, title: "Below Echo", imageUrl: Movie },
  { id: 10, title: "No Land Beyond", imageUrl: Movie },
  { id: 11, title: "During The Hunt", imageUrl: Movie },
  { id: 12, title: "During The Hunt", imageUrl: Movie },
  { id: 13, title: "During The Hunt", imageUrl: Movie },
  { id: 14, title: "During The Hunt", imageUrl: Movie },
  { id: 15, title: "During The Hunt", imageUrl: Movie },
];

export default function page() {
  return (
    <section>
      <div className="container  p-4">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Search for TV series"
            className="border rounded-l-lg py-2 px-4 w-[249px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
          />
        </div>

        {""}
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
            TV Series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recomendedmovies.map((movie) => (
              <Link href="#">
                <div
                  key={movie.id}
                  className="bg-inherit  shadow-md rounded-lg overflow-hidden"
                >
                  <Image
                    src={movie.imageUrl}
                    alt={movie.title}
                    width={280}
                    height={174}
                  />

                  <div className="p-4">
                    <div className="flex items-center gap-2 from-neutral-400 text-[13px] mb-1">
                      <p>2019</p>
                      <span className=" w-1 h-1 bg-zinc-500 rounded-full"></span>
                      <p className="flex items-center gap-1">
                        <Image
                          src={Shape}
                          alt={movie.title}
                          width={12}
                          height={12}
                        />{" "}
                        movie
                      </p>
                      <span className=" w-1 h-1 bg-zinc-500 rounded-full"></span>
                      <p>PG</p>
                    </div>
                    <h3 className="text-lg from-neutral-400 leading-6 ">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
