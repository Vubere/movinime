import { FC, useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchTopPopularMovie } from "./movieslice"

const Jumbotron: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.movie.topPopular.status)
  const data: any = useAppSelector(state => state.movie.entities.topPopular)
  useEffect(
    () => {
      if (status === 'idle')
        dispatch(fetchTopPopularMovie(1))
    }, [status, dispatch]
  )
  return (

    <div className="jumbotron">
      {status !== 'succeeded' ? <div>loading</div> :
        <>
          <div className="poster">
            <img alt={`${data[0].title} poster`}
              src={`https://image.tmdb.org/t/p/w500${data[0].poster_path}`} />
            <div className="open">
              <h3>{data[0].title}</h3>
              <div className="open">
                <div className="description">
                  <p>{data[0].overview}</p>
                  <ul>
                    <li>
                      Status: {data[0].status}
                    </li>
                    <li>
                      Release date: {data[0].release_date}
                    </li>
                    <li>
                      Language: {data[0].original_language}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Jumbotron