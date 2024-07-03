"server-only";

export async function getTop10Movies() {
  try {
    const req = await fetch(
      "https://api.kinopoisk.dev/v1.4/movie?rating.imdb=7-10&limit=3&genres.name=комедия",
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "ZZT4WX1-QZYMBYF-QF5KNM3-0Y7T9MF",
        },
      }
    );
    const res = await req.json();
    return res.docs;
  } catch (error) {
    console.error(error);
    return [];
  }
}
