"use client";

import React, { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import Shape from "../../../public/Shape (1).png";
import kinoimg from "../../../public/kinopoisk.jpg";
import { Movie } from "@/types";
import Link from "next/link";

export default function Top10MoviesItem({ data }: { data: Movie }) {
  const [fav, setFav] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const favs =
      JSON.parse(window.localStorage.getItem("favoritesSeries") as string) ??
      [];
    setFav(favs);
  }, [refresh]);

  const addToFavorites = (e: MouseEvent) => {
    e.stopPropagation();

    const status = fav.findIndex((item) => item.id === data.id);
    if (status === -1) {
      window.localStorage.setItem(
        "favoritesSeries",
        JSON.stringify([
          ...(JSON.parse(
            window.localStorage.getItem("favoritesSeries") as string
          ) ?? []),
          data,
        ])
      );
    } else {
      window?.localStorage.setItem(
        "favoritesSeries",
        JSON.stringify(
          JSON.parse(
            window.localStorage.getItem("favoritesSeries") as string
          ).filter((item: Movie) => item.id !== fav[status].id)
        )
      );
    }

    setRefresh((prev) => !prev);
  };

  return (
    <>
      <section
        className="cursor-pointer flex flex-col items-center justify-center mb-3"
        onClick={() =>
          (
            document.getElementById(`modal_${data.id}`) as HTMLDialogElement
          ).showModal()
        }
      >
        <div className=" bg-inherit shadow-md rounded-lg overflow-hidden flex flex-col items-center justify-between  cursor-pointer w-[327px] h-[570px]">
          <div className="relative  flex justify-center items-center w-fit">
            <Image
              className="object-cover object-center w-[280px] h-[420px] cursor-pointer"
              src={data.poster?.url ?? kinoimg}
              alt={data.name ?? data.alternativeName}
              width={280}
              height={420}
            />
            <span
              className="absolute top-3 right-3 p-2 bg-[#fff] rounded-full cursor-pointer border-2 border-red-600"
              onClick={addToFavorites}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current hover:fill-[red] hover:stroke-[red]"
                style={
                  fav.findIndex((item) => item.id === data.id) !== -1
                    ? { fill: "red", stroke: "red" }
                    : {}
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  stroke="red"
                ></path>
              </svg>
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1 from-neutral-400 text-[15px] text-slate-50 ">
              <p>{data.year}</p>
              <span className="w-1 h-1 bg-slate-50 rounded-full"></span>
              <p className="flex items-center gap-1">
                <Image
                  src={Shape}
                  alt={data.name ?? data.alternativeName}
                  width={12}
                  height={12}
                />{" "}
                {data.type}
              </p>
              <span className="w-1 h-1 bg-slate-50 rounded-full"></span>
              <p>PG</p>
            </div>
            <h3 className="text-2xl from-neutral-400 leading-6">
              {data.name ?? data.alternativeName}
            </h3>
          </div>
        </div>
        {""}
        <dialog id={`modal_${data.id}`} className="modal">
          <div className="modal-box flex flex-col">
            <div className="modal-action mb-3">
              <form method="dialog">
                <button className="btn btn-error">Close❌</button>
              </form>
            </div>
            <div className="flex flex-row items-center justify-center">
              <Image
                className="object-cover object-center w-[280px] h-[420px]"
                src={data.poster?.url ?? kinoimg}
                alt={data.name ?? data.alternativeName}
                width={280}
                height={420}
              />
            </div>

            <h3 className="font-bold text-lg">
              Name: {data.name ?? data.alternativeName}
            </h3>
            <h3 className="py-4">
              • <span className="from-neutral-800">Description:</span>{" "}
              {data.description ??
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat alias cum ad id dolorem dicta deserunt fugiat voluptatum ducimus?"}{" "}
            </h3>
            <h3 className="pb-1">
              {" "}
              • <span className="from-neutral-800">Year: </span>
              {data.year}
            </h3>
            <h3 className="pb-1">
              • <span className="from-neutral-800">Type: </span>
              {data.type}
            </h3>

            <h3 className="pb-4">
              • <span className="from-neutral-800">Country: </span>
              {data.countries?.[0]?.name ?? "N/A"}
            </h3>
            <h3 className="pb-4">
              • <span className="from-neutral-800">Rating: </span>
              {`${data.rating?.imdb ? data.rating?.imdb : data.rating?.kp} ⭐`}
            </h3>
            <Link
              target="blank"
              href={`https://www.kinopoisk.ru/film/${data.id}/`}
              className="btn btn-info"
            >
              Watch🎥
            </Link>
          </div>
        </dialog>
      </section>
    </>
  );
}
