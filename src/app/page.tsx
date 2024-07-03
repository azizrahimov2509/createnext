import Link from "next/link";
import Image from "next/image";
import searchIcon from "../../public/search.png";
import { getTopMovies } from "./queries/top";
import { getTop10Movies } from "./queries/top10";
import { Movie } from "@/types";
import Top10MoviesItem from "@/components/top10moviesItem";
import TopMoviesItem from "@/components/topmoviesItem";

export default async function Home() {
  let topMovies = { docs: [] as Movie[] };
  let top10Movies = { docs: [] as Movie[] };

  try {
    topMovies = await getTopMovies();
    top10Movies = await getTop10Movies();
  } catch (error) {
    console.error("Error fetching movies data:", error);
  }

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
        <div>
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400  pb-2">
            Trending
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 border-b-2 border-gray-400  pb-2 ">
            {top10Movies.docs.length > 0 ? (
              top10Movies.docs.map((movie: Movie) => (
                <Top10MoviesItem data={movie} key={movie.id} />
              ))
            ) : (
              <p>No trending movies available.</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <h2 className="text-3xl from-neutral-400 tracking-[-0.5px] mb-4 border-b-2 border-gray-400 pb-2 ">
            Recommended for you
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topMovies.docs.length > 0 ? (
              topMovies.docs.map((series: Movie) => (
                <TopMoviesItem data={series} key={series.id} />
              ))
            ) : (
              <p>No recommended movies available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
