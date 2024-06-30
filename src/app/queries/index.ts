"server-only";

import { log } from "console";

export async function getContent(type: string) {
  try {
    const req = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie?limit=20&type=${type}`,
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
    console.error(`Error fetching ${type}:`, error);
    return { error: `Failed to fetch ${type}` };
  }
}
