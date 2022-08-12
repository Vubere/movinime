import { StateT } from "../../App"

export default function MoviePoster({
  title,
  overview,
  spoken_language,
  release_date,
  status,
  poster_path,
}:StateT){
  const snippet = overview.slice(0, 130)
  return(
    <div className="moviePoster">
      <h3>{title}</h3>
      <img alt={`${title} movie poster`} 
      src={`https://image.tmdb.org/t/p/w200${poster_path}`}/>
      <div>
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
            Languages: {/* spoken_language.map((i)=>{
               return <div>{i}</div>
            }) */}
          </li>
          <li>
            Production Companies: {}
          </li>
        </ul>
      </div>
    </div>
  )
}