import { createPortal } from "react-dom"
//import { createRoot, Root } from "react-dom/client"

/* const root = createRoot(document.getElementById('modalRoot') as Element) */
const body = document.querySelector('body') as HTMLBodyElement

export function Modal({ children }: any) {
  return (
    createPortal(children, document.getElementById('modalRoot') as Element)
  )
}

export default function MoviePage({ setModalOpen, movieData }: any) {
  const {
    title,
    overview,
    original_language,
    release_date,
    status,
    poster_path,
  } = movieData
  return (
    <>
      <div className="moviePage">
        <div className="container">
          <div className="close" onClick={() =>{
            setModalOpen(false)
            body.style.overflow = 'auto'
          }}>x</div>
          <div className="movieDetails">
            <div className="img" >
              <img alt={`${title} movie poster`} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
            </div>
            <div className="details">
              <ul className="detailsList">
                <li className="overview">overview:<br/>{overview}</li>
                <li className="releaseStatus">status:<br/>{status}</li>
                <li className="releaseDate">Release Date:<br/>{release_date}</li>
                <li className="genres">{original_language}</li>
              </ul>
            </div>
            <div className="movieCast"></div>
          </div>
          <div className="similarMovies"></div>
        </div>
      </div>
    </>
  )
}