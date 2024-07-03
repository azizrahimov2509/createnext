// queries/top.ts
"use server";

export async function getTopMovies(query: string = "") {
  try {
    const url = query
      ? `https://api.kinopoisk.dev/v1.4/movie/search?limit=10&query=${query}&rating.imdb=8-10`
      : `https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10`;

    const req = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "ZZT4WX1-QZYMBYF-QF5KNM3-0Y7T9MF",
      },
    });
    const res = await req.json();
    return res.docs;
  } catch (error) {
    console.error(`Error fetching top movies:`, error);
    return [];
  }
}
