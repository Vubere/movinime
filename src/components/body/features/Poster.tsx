import { useRef} from "react"
import { useAppDispatch, useAppSelector} from "../../../app/hooks"
import { StateT } from "../../../Type"
import { addItem } from "../../navbar/watchlistslice"
import { moviePage, similarPage } from "./popupPageSlice"

type extra = {
  type?: string
}

export default function Poster({
  title,
  id,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
  popularity,
  vote_average,
  type
}: StateT&extra) {

  const appState = useAppSelector(state => state.appState.page)
  const dispatch = useAppDispatch() 

  const clickedPoster = useRef<any>()
  const movieData = {
    title,
    id,
    overview,
    original_language,
    release_date,
    status,
    poster_path,
    popularity,
    vote_average
  }

  let url = appState === 'movie' ? `https://image.tmdb.org/t/p/w300${poster_path}`:
  poster_path;

  return (
    <div className="poster" ref={clickedPoster} >
      <img alt={`${title} imgposter`}
        src={url} />
      <div className="open" onClick={() => {
        dispatch(moviePage({open:true, data:movieData}))
        if(type!==undefined){
          if(type==='simMov'){
            dispatch(similarPage(false))
          }
        }
      }}>
        i
      </div>
      <div className="addToWL" onClick={() => {
        dispatch(addItem({
          title,
          id,
          overview,
          original_language,
          release_date,
          status,
          poster_path,
          popularity,
          vote_average
        }))
      }}>
        +
      </div>
    </div>
  )
}