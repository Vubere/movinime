import { useRef, useState} from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { openMoviePageModal } from "../../../modals/modalManager"
import { StateT } from "../../../Type"
import MoviePage from "./MoviePage"
import Modal from "../../../modals/Modal"
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
  width
}: StateT) {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(state=>state.modalStates.moviePageModal)
  const [innerModalCheck, setInnerModalCheck] = useState(false)
  const clickedPoster = useRef<any>()

  return (
    <div className="poster" ref={clickedPoster} >
      <img alt={`${title} imgposter`}
        src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
      <div className="open" onClick={() => {
        dispatch(openMoviePageModal(true))
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
          width
        }))
      }}>
        +
      </div>
      {innerModalCheck&&modalOpen && (<Modal>
        <MoviePage movieData={{
          title,
          overview,
          original_language,
          release_date,
          status,
          poster_path,
          id
        }} />
      </Modal>)}
    </div>
  )
}