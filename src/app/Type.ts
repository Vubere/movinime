

export type StateT = {
  title: string;
  id: number;
  overview: string;
  original_language: string[];
  release_date:  string;
  status: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  episodeLength?: number;
}

export  type Site = 'movie'|'anime'
