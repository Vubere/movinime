

export type StateT = {
  title: string;
  overview: string;
  original_language: string[];
  release_date:  string;
  status: string;
  poster_path: string;
  popularity: number;
}
export  type Site = 'movie'|'anime'