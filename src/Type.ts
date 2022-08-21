import { NoSubstitutionTemplateLiteral } from "typescript";


export type StateT = {
  title: string;
  id: number;
  overview: string;
  original_language: string[];
  release_date:  string;
  status: string;
  poster_path: string;
  popularity: number;
  width: NoSubstitutionTemplateLiteral
}
export  type Site = 'movie'|'anime'