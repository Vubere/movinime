import { FC, memo, useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchJumMovie} from "./movieslice"
import { fetchAnimeJumb } from "../../anime/animeSlice"

const Jumbotron: FC = () => {
  const dispatch = useAppDispatch()
  const movieStatus:string = useAppSelector(state => state.movie.jum.status)
  const movie: any = useAppSelector(state => state.movie.entities.jum)
  const appState:string = useAppSelector(state=>state.appState.page)
  const anime:any = useAppSelector((state)=>state.anime.jum.data)
  const animeStatus:string = useAppSelector(state=>state.anime.jum.status)
  const num = Math.floor(Math.random()*20)

  let data = appState==='movie'?movie:anime.data
  console.log(data)
  let status = appState==='movie'?movieStatus:animeStatus
  console.log(status)
  useEffect(
    () => {
      if (status === 'idle')
        appState==='movie'?
          dispatch(fetchJumMovie()):
          dispatch(fetchAnimeJumb())
    }, [appState, dispatch, status]
  )
  return (data&&

    <div className="jumbotron">
      {status !== 'succeeded' ? <div>loading</div> :
        <>
          <div className="poster">
            <img alt={`${data[num].title} poster`}
              src={appState === 'movie' ? `https://image.tmdb.org/t/p/w500${data[num].poster_path}`:data[num].images.jpg.large_image_url} />
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