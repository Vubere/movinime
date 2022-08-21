import { useRef, useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { StateT } from "../../../Type"
import MoviePage, { Modal } from "./MoviePage"
import { addItem } from "../../navbar/watchlistslice"

const body = document.querySelector('body') as HTMLBodyElement

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
  const [modalOpen, setModalOpen] = useState(false)
  const clickedPoster = useRef<any>()
  const dispatch = useAppDispatch()

  return (
    <div className="poster" ref={clickedPoster} >
      <img alt={`${title} imgposter`}
        src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
      <div className="open" onClick={() => {
        setModalOpen(!modalOpen)
        body.style.overflow = 'hidden'
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
        Add to watch list
      </div>
      {modalOpen && (<Modal>
        <MoviePage setModalOpen={setModalOpen} movieData={{
          title,
          overview,
          original_language,
          release_date,
          status,
          poster_path,
        }} />
      </Modal>)}
    </div>
  )
}