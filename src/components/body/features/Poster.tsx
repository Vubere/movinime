import { StateT } from "../../../Type"

export default function Poster({
  title,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
}:StateT){
  const snippet = overview.slice(0, 130)
  return(
    <div className="poster">
      <img alt={`${title} imgposter`} 
      src={`https://image.tmdb.org/t/p/w300${poster_path}`}/>
      <h3>{title}</h3>
      <div className="description">
        <h4>Overview:</h4>
        <p>{snippet+' ...'}</p>
        <ul>
          <li>
            Status: {status}
          </li>
          <li>
          Release date: {release_date}
          </li>
          <li>
            Language: {original_language}
          </li>
          <li>
            Production Companies: {}
          </li>
        </ul>
      </div>
    </div>
  )
}