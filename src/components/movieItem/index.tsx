"use client";

import React, { useState } from "react";
import Image from "next/image";
import Shape from "../../../public/Shape (1).png";
import kinoimg from "../../../public/kinopoisk.jpg";
import { Movie } from "@/types";
import Link from "next/link";

export default function MovieItem({ data }: { data: Movie }) {
  const {
    id,
    name,
    year,
    backdrop,
    poster,
    description,
    type,
    alternativeName,
    countries,
    genres,
    rating,
  } = data;

  return (
    <section
      key={id}
      onClick={() =>
        (
          document.getElementById(`modal_${id}`) as HTMLDialogElement
        ).showModal()
      }
      className="cursor-pointer"
    >
      <div className="bg-inherit shadow-md rounded-lg overflow-hidden">
        <Image
          className="object-cover object-center w-[280px] h-[420px]"
          src={poster?.url ?? kinoimg}
          alt={name ?? alternativeName}
          width={280}
          height={420}
        />
        <div className="p-4">
          <div className="flex items-center gap-2 from-neutral-400 text-[13px] mb-1">
            <p>{year}</p>
            <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
            <p className="flex items-center gap-1">
              <Image
                src={Shape}
                alt={name ?? alternativeName}
                width={12}
                height={12}
              />{" "}
              {type}
            </p>
            <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
            <p>PG</p>
          </div>
          <h3 className="text-lg from-neutral-400 leading-6">
            {name ?? alternativeName}
          </h3>
        </div>
      </div>

      <dialog id={`modal_${id}`} className="modal">
        <div className="modal-box flex flex-col ">
          <div className="flex flex-row items-center justify-center">
            <Image
              className="object-cover object-center w-[280px] h-[420px]"
              src={poster?.url ?? kinoimg}
              alt={name ?? alternativeName}
              width={280}
              height={420}
            />
          </div>

          <h3 className="font-bold text-lg">Name: {name ?? alternativeName}</h3>
          <h3 className="py-4 ">
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
  );
}
