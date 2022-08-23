import { useRef, useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { StateT } from "../../../Type"
import { fetchSimilarMovie } from "./movieslice"

import Poster from "./Poster"

const body = document.querySelector('body') as HTMLBodyElement

function SimilarMovies({ movieId }: { movieId: number }) {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state => state.movie)
  const [obj, setObj] = useState<any>({
    status: 'idle',
    name: 'new'
  })
  const data = useRef<any>()

  useEffect(
    () => {
      const toggle: (arg: string, arg2: string) => void = async (name, status) => {
        setObj((prevstate: typeof obj) => ({ ...prevstate, status: movie.similar.status }))
        data.current = movie.entities.similar
      }
      if (obj.status === 'idle') {
        dispatch(fetchSimilarMovie({ page: 1, movieId: movieId }))
      }
      toggle(obj.name, obj.status)
    }, [obj.name, obj.status, dispatch, movie, movieId]
  )
  let arr: StateT[] = []
  for (let p in data.current) {
    arr.push(data.current[p])
  }
  return (
    <div className="similarMoviesContainer">
      <h3>Similar Movies</h3>
      <div className="similarMovies">
        {arr.splice(0, 10).map((data, i) => (<Poster key={i} {...data} />))}
      </div>
    </div>
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
    id
  } = movieData
  return (
    <>
      <div className="moviePage">
        <div className="container">
          <div className="close" onClick={() => {
            setModalOpen(false)
            body.style.overflow = 'auto'
          }}>x</div>
          <div className="movieDetails">
            <div className="img" >
              <img alt={`${title} movie poster`} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
            </div>
            <div className="details">
              <ul className="detailsList">
                <li className="title">title:<br />{title}</li>
                <li className="overview">overview:<br />{overview}</li>
                <li className="releaseStatus">status:<br />{status ? status : 'N/A'}</li>
                <li className="releaseDate">Release Date:<br />{release_date}</li>
                <li className="lang">Language:<br />{original_language ? original_language : 'N/A'} </li>
              </ul>
            </div>
            <div className="movieCast"></div>
          </div>
          <SimilarMovies movieId={id} />
        </div>
      </div>
    </>
  )
}