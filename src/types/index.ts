export type Movie = {
  id: number;
  name?: string;
  year: number;
  backdrop?: {
    url: string;
  };
  poster?: { url: string };
  description: string;
  type: string;
  alternativeName: string;
  genres: [{ name: string }];
  countries: [{ name: string }];
  rating?: { kp: string | number; imdb: string | number };
};
