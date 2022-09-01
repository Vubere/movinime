import { useRef, useState} from "react"
import { useAppDispatch, useAppSelector} from "../../../app/hooks"
import { StateT } from "../../../Type"
import MoviePage from "./MoviePage"
import { addItem } from "../../navbar/watchlistslice"



export default function Poster({
  title,
  id,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
  popularity,
  vote_average
}: StateT) {
  const [innerModalCheck, setInnerModalCheck] = useState(false)
  const appState = useAppSelector(state => state.appState.page)
  const clickedPoster = useRef<any>()
  const dispatch = useAppDispatch()

  let url = appState === 'movie' ? `https://image.tmdb.org/t/p/w300${poster_path}`:
  poster_path;

  return (
    <div className="poster" ref={clickedPoster} >
      <img alt={`${title} imgposter`}
        src={url} />
      <div className="open" onClick={() => {
        setInnerModalCheck(true)
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
      {innerModalCheck&&(<>
        <MoviePage movieData={{
          title,
          overview,
          original_language,
          release_date,
          status,
          poster_path,
          id,
          vote_average
        }}
        setInnerModalCheck={setInnerModalCheck}
        />
      </>)}
    </div>
  )
}