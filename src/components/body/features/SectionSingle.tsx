
import MoviePoster from './Poster';
import { FC, memo, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTopRatedMovie, fetchUpcomingMovie, fetchLatestMovie, fetchTopPopularMovie } from './movieslice';
import { fetchPopular, fetchNew } from '../../anime/animeSlice';

type TabtypeMovie = 'new' | 'popular' | 'rated' | 'upcoming'
type TabtypeAnime = 'airing' | 'top'




const SectionSingle: FC = () => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state => state.movie)
  const anime = useAppSelector(state => state.anime)
  const animePop = useAppSelector(state => state.anime.popular.data)
  const animeNew = useAppSelector(state => state.anime.new.data)
  const appState = useAppSelector(state => state.appState.page)
  const [movieTab, setMovieTab] = useState<TabtypeMovie>('new')
  const [animeTab, setAnimeTab] = useState<TabtypeAnime>('airing')
  const [obj, setObj] = useState<any>({
    status: 'idle',
    name: 'new'
  })
  const [animeState, setAnimeState] = useState<any>({
    status: 'idle',
    name: 'airing'
  })
  const [showMore, setShowMore] = useState<boolean>(false)
  const [pageNum, setPageNum] = useState<number>(1)
  let data = useRef<any>()

  useEffect(
    () => {
      const toggleMovies: (arg: string, arg2: string) => void = (name, status) => {
        if (name === 'popular') {
          setObj((prevstate: typeof obj) => ({ ...prevstate, status: movie.topPopular.status }))
          data.current = movie.entities.topPopular
        } else if (name === 'rated') {
          setObj((prevstate: typeof obj) => ({ ...prevstate, status: movie.topRated.status }))
          data.current = movie.entities.topRated
        } else if (name === 'new') {
          setObj((prevstate: typeof obj) => ({ ...prevstate, status: movie.latest.status }))
          data.current = movie.entities.latest
        } else if (name === 'upcoming') {
          setObj((prevstate: typeof obj) => ({ ...prevstate, status: movie.upcoming.status }))
          data.current = movie.entities.upcoming
        }
        if (obj.status === 'idle') {
          obj.name === 'popular' ?
            dispatch(fetchTopPopularMovie(pageNum)) :
            obj.name === 'rated' ?
              dispatch(fetchTopRatedMovie(pageNum)) :
              obj.name === 'new' ?
                dispatch(fetchLatestMovie(pageNum)) :
                dispatch(fetchUpcomingMovie(pageNum));
        }
      }
      const toggleAnime: (arg: string, arg2: string) => void = (name, status) => {
        if (name === 'top') {
          if (status === 'idle') {       
            dispatch(fetchPopular())
          }
          setAnimeState((prevstate: typeof obj) => ({ ...prevstate, status: anime.popular.status }))
          data.current = animePop
        } else if (name === 'airing') {
          if (status === 'idle') {
            dispatch(fetchNew())
          }
          setAnimeState((prevstate: typeof obj) => ({ ...prevstate, status: anime.new.status }))
          data.current = animeNew
        }
      }
      appState === 'anime' ?
        toggleAnime(animeState.name, animeState.status) :
        toggleMovies(obj.name, obj.status);
    }, [obj.name, obj.status, dispatch, appState, movie, animePop, animeState.name, animeState.status, animeNew, anime.new.status, anime.popular.status, pageNum]
  )
  let tabMovieToggle: (arg: TabtypeMovie) => void;
  let tabAnimeToggle: (arg: TabtypeAnime) => void;

  const arr = []
  let num = showMore ? 20 : 12;
  if (appState === 'movie') {
    tabMovieToggle = (name: TabtypeMovie) => {
      if (movieTab === name) {
        return
      }
      if (pageNum !== 1) {
        setPageNum(1)
      }
      setMovieTab(name)
      setObj({ ...obj, name: name })
    }
    tabMovieToggle(movieTab)
    for (let p in data.current) {
      arr.push(data.current[p])
    }
  } else {
    tabAnimeToggle = (name: TabtypeAnime) => {
      if (animeTab === name) {
        return
      }
      setAnimeTab(name)
      setAnimeState({ ...obj, name: name })
    }
    tabAnimeToggle(animeTab)
    if (data.current) {
      for (let q in data.current.data) {
        arr.push(data.current.data[q])
      }

    }
  }
  return (
    <div className='section single'>
      <h2>
        <ul>{appState === 'anime' ?
          <>
            <li className="airing" onClick={() => tabAnimeToggle('airing')
            }>airing</li>
            <li className="top" onClick={() => tabAnimeToggle('top')
            }>top</li>
          </> :
          <>
            <li onClick={() => tabMovieToggle('new')
            }>New</li>|
            <li onClick={() => tabMovieToggle('popular')}>Popular</li>|
            <li onClick={() => tabMovieToggle('rated')}>Top Rated</li>|
            <li onClick={() => tabMovieToggle('upcoming')}>Upcoming</li>
          </>}
        </ul>
      </h2>
      <div className="container">
        <div className="moviesContainer">
          {appState === 'movie' ? arr.slice(0, num).map((data, i) => {
            return <MoviePoster key={data.id} {...data} />
          }) :
            arr.slice(0, num).map((data) => {
              return <MoviePoster key={data.mal_id}
                title={data.title}
                poster_path={data.images.jpg.image_url}
                overview={data.synopsis}
                status={data.status}
                id={data.mal_id}
                original_language={['ja']}
                release_date={data.year}
                episodeLength={data.episodes}
                popularity={data.popularity}
                vote_average={data.score}
              />
            })
          }
        </div>
        {!showMore ? '' :
          <div className="pagination">
            <div onClick={() => {
              if (pageNum === 1) return
              setObj({ ...obj, status: 'idle' })
              setPageNum(1)
            }}>&lt; &lt;</div>
            <div>{pageNum}</div>
            <div onClick={() => {
              if (pageNum + 1 > 10) return
              setObj({ ...obj, status: 'idle' })
              setPageNum(pageNum + 1)

            }}>{pageNum + 1 > 10 ? '' : pageNum + 1}</ div>
            <div onClick={() => {
              if (pageNum + 2 > 10) return
              setObj({ ...obj, status: 'idle' })
              setPageNum(pageNum + 2)
            }}>{pageNum + 2 > 10 ? '' : pageNum + 2}</ div>
          </div>}
        <button className='showMoreBtn' style={{ color: 'black' }}
          onClick={() => setShowMore(!showMore)}>{!showMore ? 'show more' : 'show less'}</button>
      </div>
    </div>
  )
}
export default memo(SectionSingle)