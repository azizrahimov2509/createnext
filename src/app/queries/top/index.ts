"server-only";

export async function getTopMovies() {
  try {
    const req = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10.`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "371X6GS-MS941WH-NAG4D1T-02JEN9D",
        },
      }
    );
    const res = await req.json();

    return res;
  } catch (error) {
    console.error(`Error fetching `, error);
    return { error: `Failed to fetch ` };
  }
}
