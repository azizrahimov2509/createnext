import Link from "next/link";
import Image from "next/image";
import searchIcon from "../../public/search.png";
import { getTopMovies } from "./queries/top";
import { Movie } from "@/types";
import TopMoviesItem from "@/components/topmoviesItem";
import { getTop10Movies } from "./queries/top10";
import Top10MoviesItem from "@/components/top10moviesItem";

export default async function Home() {
  const topMovies = await getTopMovies();
  const top10Movies = await getTop10Movies();
  return (
    <section>
      <div className="container p-4">
        <div className="flex items-center mb-4">
          <Image src={searchIcon} alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Search for series"
            className="border rounded-l-lg py-2 px-4 w-[249px] h-[32] outline-none bg-inherit border-none text-xl caret-red-800"
          />
        </div>
        <h2 className="text-3xl from-neutral-400 mb-4">Trending</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {top10Movies.map((movie: Movie) => (
            <Top10MoviesItem data={movie} key={movie.id} />
          ))}
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4">
            Series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topMovies.docs?.map((series: Movie) => (
              <TopMoviesItem data={series} key={series.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
