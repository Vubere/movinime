import { useState } from "react"
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
  const snippet = overview.slice(0, 130)
  const descpElm = (<div className="description">
    <h4>Overview:</h4>
    <p>{snippet + '...'}</p>
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

  return (
    <div className="poster">
      <img alt={`${title} imgposter`}
        src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
      <h3>{title}</h3>
      {!open && <div className="bool" onClick={() => setOpen(!open)}>see details...</div>}
      {open && descpElm}
      {open&&<div className="bool" onClick={()=>setOpen(!open)}>...close</div>}
    </div>
  )
}