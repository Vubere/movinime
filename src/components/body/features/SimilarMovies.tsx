import { StateT } from "../../../Type"
import { useRef, useState, useEffect, memo } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { fetchSimilarMovie } from "./movieslice"
import Poster from "./Poster"
import { similarPage } from "./popupPageSlice"


function SimilarMoviesPages({ title, movieId }: { title: string, movieId: number}) {
  const dispatch = useAppDispatch()
  const movieStatus = useAppSelector(state => state.movie.similar.status)
  const movieObj = useAppSelector(state => state.movie.entities.similar)
  const [obj, setObj] = useState<any>({
    status: 'idle',
  })
  const data = useRef<any>()

  useEffect(
    () => {
      const toggle: () => void = async () => {
        setObj((prevstate: typeof obj) => ({ ...prevstate, status: movieStatus }))
        data.current = movieObj
      }
      if (obj.status === 'idle') {
        dispatch(fetchSimilarMovie({ page: 1, movieId: movieId }))
      }
      toggle()
    }, [obj.status, dispatch, movieStatus, movieObj, movieId]
  )
  let arr: StateT[] = []
  for (let p in data.current) {
    arr.push(data.current[p])
  }
  return (
    <div className="simMovModal">
      <h3>Similar Movies to {title}</h3>
      <div className="close" onClick={() => {
        dispatch(similarPage(false))
      }}>x</div>
      <div className="movies">
        {arr.map((data) => (<Poster key={data.id} type='simMov' {...data} />))}
      </div>
    </div >
  )
}



function SimilarMoviesBtn({ title, movieId }: { title: string, movieId: number }) {
  // const dispatch = useAppDispatch()

  const openModal = useAppSelector(state=>state.pageState.similarPage.open)
  const dispatch = useAppDispatch()

  return (
    <div className="similarMoviesContainer">
      <div className="similarMovies">
        <button className="simMovBtn" onClick={() => {
          dispatch(similarPage(true))
        }}>
          See Similar Movies...
        </button>
      </div>
      {openModal && <>
        <SimilarMoviesPages title={title} movieId={movieId} />
      </>}
    </div>
  )
}
export default memo(SimilarMoviesBtn)