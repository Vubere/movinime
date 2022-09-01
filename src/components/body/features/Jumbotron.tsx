import { FC, memo, useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchJumMovie} from "./movieslice"

const Jumbotron: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.movie.jum.status)
  const data: any = useAppSelector(state => state.movie.entities.jum)
  const anime = useAppSelector((state)=>state.anime)
  const num = Math.floor(Math.random()*20)


  useEffect(
    () => {
      if (status === 'idle')
        dispatch(fetchJumMovie())
    }, [status, dispatch]
  )
  return (data&&

    <div className="jumbotron">
      {status !== 'succeeded' ? <div>loading</div> :
        <>
          <div className="poster">
            <img alt={`${data[num].title} poster`}
              src={`https://image.tmdb.org/t/p/w500${data[num].poster_path}`} />
            <div className="open">
              <h3>{data[num].title}</h3>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default memo(Jumbotron)