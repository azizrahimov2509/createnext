"server-only";

export async function getTop10Movies() {
  try {
    const req = await fetch(
      "https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10&limit=3",
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "H0TQ2K2-59NME4T-K74Q5K6-XKP2NKW",
        },
      }
    );
    const res = await req.json();
    return res;
  } catch (error) {
    console.error(error);
    return { docs: [] };
  }
}
