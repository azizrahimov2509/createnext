"server-only";

import { log } from "console";

export async function getContent(type: string) {
  try {
    const req = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie?limit=20&type=${type}`,
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
    console.error(`Error fetching ${type}:`, error);
    return { error: `Failed to fetch ${type}` };
  }
}
