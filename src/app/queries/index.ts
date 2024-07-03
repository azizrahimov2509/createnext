// queries.ts
"use server";

export async function getContent(type: string, query: string = "") {
  try {
    const url = query
      ? `https://api.kinopoisk.dev/v1.4/movie/search?limit=20&type=${type}&query=${query}`
      : `https://api.kinopoisk.dev/v1.4/movie?limit=20&type=${type}`;

    const req = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "H0TQ2K2-59NME4T-K74Q5K6-XKP2NKW",
      },
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return { error: `Failed to fetch ${type}` };
  }
}
