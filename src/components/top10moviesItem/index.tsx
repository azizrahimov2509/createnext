"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Shape from "../../../public/Shape (1).png";
import kinoimg from "../../../public/kinopoisk.jpg";
import { Movie } from "@/types";
import Link from "next/link";

export default function Top10MoviesItem({ data }: { data: Movie }) {
  const {
    id,
    name,
    year,
    poster,
    description,
    type,
    alternativeName,
    countries,
    genres,
    rating,
  } = data;

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.includes(id);
  });

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    } else {
      const updatedFavorites = favorites.filter(
        (favId: number) => favId !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }, [isFavorite, id]);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      {/* Favorite Button */}

      <section className="relative">
        <Link
          href="/bookmark"
          className={`absolute top-2 right-2 p-3 rounded-full transition-colors duration-300 ease-in-out ${
            isFavorite ? "bg-red-500" : "bg-white"
          } text-black shadow-lg hover:bg-red-600`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <svg
              className="w-8 h-8 text-[red]" // Increase the size of the heart icon
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
        </Link>{" "}
        <div className=" bg-inherit shadow-md rounded-lg overflow-hidden flex flex-col items-center justify-between border-b-2 border-white cursor-pointer">
          <Image
            onClick={() =>
              (
                document.getElementById(`modal_${id}`) as HTMLDialogElement
              ).showModal()
            }
            className="object-cover object-center w-[280px] h-[420px]"
            src={poster?.url ?? kinoimg}
            alt={name ?? alternativeName}
            width={280}
            height={420}
          />
          <div className="p-4">
            <div className="flex items-center gap-1 from-neutral-400 text-[15px] text-slate-50 ">
              <p>{year}</p>
              <span className="w-1 h-1 bg-slate-50 rounded-full"></span>
              <p className="flex items-center gap-1">
                <Image
                  src={Shape}
                  alt={name ?? alternativeName}
                  width={12}
                  height={12}
                />{" "}
                {type}
              </p>
              <span className="w-1 h-1 bg-slate-50 rounded-full"></span>
              <p>PG</p>
            </div>
            <h3 className="text-2xl from-neutral-400 leading-6">
              {name ?? alternativeName}
            </h3>
          </div>
        </div>
        <dialog id={`modal_${id}`} className="modal">
          <div className="modal-box flex flex-col">
            <div className="flex flex-row items-center justify-center">
              <Image
                className="object-cover object-center w-[280px] h-[420px]"
                src={poster?.url ?? kinoimg}
                alt={name ?? alternativeName}
                width={280}
                height={420}
              />
            </div>

            <h3 className="font-bold text-lg">
              Name: {name ?? alternativeName}
            </h3>
            <h3 className="py-4">
              • <span className="from-neutral-800">Description:</span>{" "}
              {description ??
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat alias cum ad id dolorem dicta deserunt fugiat voluptatum ducimus?"}{" "}
            </h3>
            <h3 className="pb-1">
              {" "}
              • <span className="from-neutral-800">Year: </span>
              {year}
            </h3>
            <h3 className="pb-1">
              • <span className="from-neutral-800">Type: </span>
              {type}
            </h3>
            <h3 className="pb-1">
              • <span className="from-neutral-800">Genre: </span>
              {genres.map((genre, index) => (
                <span key={index}>
                  {genre.name}
                  {index < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </h3>

            <h3 className="pb-4">
              • <span className="from-neutral-800">Country: </span>
              {countries[0].name}
            </h3>
            <h3 className="pb-4">
              • <span className="from-neutral-800">Rating: </span>
              {`${rating?.imdb ? rating?.imdb : rating?.kp} ⭐`}
            </h3>
            <Link
              target="blank"
              href={`https://www.kinopoisk.ru/film/${id}/`}
              className="btn btn-info"
            >
              Watch🎥
            </Link>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-error">Close❌</button>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
}
