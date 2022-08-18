import { useRef, useState } from "react"
import { StateT } from "../../../Type"

export default function Poster({
  title,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
}: StateT) {
  const [open, setOpen] = useState<boolean>(false)
  const descpElm = (<div className="description">
    <h4>Overview:</h4>
    <p>{overview}</p>
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
        Production Companies: { }
      </li>
    </ul>
  </div>)
  const clickedPoster = useRef<any>()

  return (
    <div className="poster" ref={clickedPoster} >
      <img alt={`${title} imgposter`}
        src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
      <h3>{title}</h3>
      <div className="open">
       i
      </div>
    </div>
  )
}