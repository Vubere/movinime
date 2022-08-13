

export type StateT = {
  title: string;
  overview: string;
  spoken_language: string[];
  release_date:  string;
  status: string;
  poster_path: string;
}
export  type Site = 'movie'|'anime'