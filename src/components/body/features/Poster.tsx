import { useRef, useState } from "react"
import { StateT } from "../../../Type"
import MoviePage, { Modal } from "./MoviePage"

const body = document.querySelector('body') as HTMLBodyElement

export default function Poster({
  title,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
}: StateT) {
  const [modalOpen, setModalOpen] = useState(false)
  const clickedPoster = useRef<any>()

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