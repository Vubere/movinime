
import MoviePoster from './Poster';
import { FC, memo, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTopRatedMovie, fetchUpcomingMovie, fetchLatestMovie, fetchTopPopularMovie } from './movieslice';
import { fetchPopular, fetchNew } from '../../anime/animeSlice';
import { takeCoverage } from 'v8';

type Tabtype = 'new' | 'popular' | 'rated' | 'upcoming'



const SectionSingle: FC = () => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state => state.movie)
  const anime = useAppSelector(state => state.anime)
  const animePop = useAppSelector(state => state.anime.popular.data)
  const animeNew = useAppSelector(state => state.anime.new.data)
  const appState = useAppSelector(state => state.appState.page)
  const [tab, setTab] = useState<Tabtype>('new')
  const [obj, setObj] = useState<any>({
    status: 'idle',
    name: 'new'
  })
  const [showMore, setShowMore] = useState<boolean>(false)
  const [pageNum, setPageNum] = useState<number>(1)
  let data = useRef<any>()
  let dataSet;

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
        if (name === 'popular') {
          setObj((prevstate: typeof obj) => ({ ...prevstate, status: anime.popular.status }))
          data.current = animePop
          if (obj.status === 'idle') {
            dispatch(fetchPopular())
          }
        }else if(name==='new'){
          setObj((prevstate: typeof obj) => ({ ...prevstate, status: anime.new.status }))
          data.current = animeNew
          if (obj.status === 'idle') {
            dispatch(fetchNew())
          }
        }
      }
      appState === 'anime' ?
        toggleAnime(obj.name, obj.status) :
        toggleMovies(obj.name, obj.status);
    }, [obj.name, obj.status, dispatch, appState, movie, animePop, animeNew, anime.new.status, anime.popular.status, pageNum]
  )
  let tabToggle: (name: Tabtype) => void
  const arr = []
  let num = showMore ? 20 : 12;
  if (appState === 'movie') {
    tabToggle = (name: Tabtype) => {
      if (tab === name) {
        return
      }
      if (pageNum !== 1) {
        setPageNum(1)
      }
      setTab(name)
      setObj({ ...obj, name: name })
    }
    tabToggle(tab)
    for (let p in data.current) {
      arr.push(data.current[p])
    }
  } else {
    tabToggle = (name: Tabtype) => {
      if (tab === name) {
        return
      }
      setTab(name)
      setObj({ ...obj, name: name })
    }
    tabToggle(tab)
    if (data.current) {
        for (let q in data.current.data) {
          arr.push(data.current.data[q])
          console.log(data.current.data[q])
        }
      
    }
  }
  return (
    <div className='section single'>
      <h2>
        <ul>
          <li onClick={() => tabToggle('new')
          }>New</li>|
          <li onClick={() => tabToggle('popular')}>Popular</li>|
          <li onClick={() => tabToggle('rated')}>Top Rated</li>|
          <li onClick={() => tabToggle('upcoming')}>Upcoming</li>
        </ul>
      </h2>
      <div className="container">
        <div className="moviesContainer">
          {appState === 'movie' ? arr.slice(0, num).map((data, i) => {
            return <MoviePoster key={data.id} {...data} />
          }) :
            arr.slice(0, num).map((data) => {
              console.log(data)
              return <MoviePoster key={data.id}
                title={data.attributes.canonicalTitle}
                poster_path={data.attributes.posterImage.small}
                overview={data.attributes.synopsis}
                status={data.attributes.status}
                id={data.id}
                original_language={['ja']}
                release_date={data.attributes.startDate}
                episodeLength={data.attributes.episodeLength}
                popularity={data.attributes.popularity}
                vote_average={data.attributes.ratingRank}
              />
            })
          }
        </div>
        {!showMore ? '' :
          <div className="pagination">
            <div onClick={()=>{
              if(pageNum===1) return
              setObj({ ...obj, status: 'idle' })
              setPageNum(1)
            }}>&lt; &lt;</div>
            <div>{pageNum}</div>
            <div onClick={() => {
              if(pageNum+1>10) return
              setObj({ ...obj, status: 'idle' })
              setPageNum(pageNum+1)
              
            }}>{pageNum+1>10?'':pageNum+1}</ div>
            <div onClick={() => {
              if(pageNum+2>10) return
              setObj({ ...obj, status: 'idle' })
              setPageNum(pageNum+2)
            }}>{pageNum+2 > 10 ? '' : pageNum+2}</ div>
          </div>}
        <button className='showMoreBtn' style={{ color: 'black' }}
          onClick={() => setShowMore(!showMore)}>{!showMore ? 'show more' : 'show less'}</button>
      </div>
    </div>
  )
}
export default memo(SectionSingle)