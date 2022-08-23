
import MoviePoster from './Poster';
import { FC, memo, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTopRatedMovie, fetchUpcomingMovie, fetchLatestMovie, fetchTopPopularMovie } from './movieslice';

type Tabtype = 'new' | 'popular' | 'rated' | 'upcoming'



const SectionSingle: FC = () => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state => state.movie)

  const [tab, setTab] = useState<Tabtype>('new')
  const [obj, setObj] = useState<any>({
    status: 'idle',
    name: 'new'
  })
  const [showMore, setShowMore] = useState<boolean>(false)
  let data = useRef<any>()
  let [pageNum, setPageNum] = useState<number>(1)

  useEffect(
    () => {
      const toggle: (arg: string, arg2: string) => void = (name, status) => {
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
      toggle(obj.name, obj.status)
    }, [obj.name, obj.status, dispatch, movie, pageNum]
  )
  const tabToggle = (name: Tabtype ) => {
    if (tab === name) {
      return
    }
    if (pageNum !== 1) {
      setPageNum(1)
    }
    setTab(name)
    setObj({ ...obj, name: name })
  }
  let num = showMore ? 20 : 12;
  let arr = []
  for (let p in data.current) {
    arr.push(data.current[p])
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
          {arr.slice(0, num).map((data, i) => {
            return <MoviePoster key={data.id} {...data} />
          })}
        </div>
        {!showMore ? '' :
          <div className="pagination">
            <div>&lt; &lt;</div>
            <div onClick={() => {
              setObj({ ...obj, status: 'idle' })
              setPageNum(1)
            }}>1</div>
            <div onClick={() => {
              setObj({ ...obj, status: 'idle' })
              setPageNum(2)
            }}>2</ div>
            <div onClick={() => {
              setObj({ ...obj, status: 'idle' })
              setPageNum(3)
            }}>3</ div>
            <div onClick={() => {
              setObj({ ...obj, status: 'idle' })
              setPageNum(4)
            }}>4</div>
            <div onClick={() => {
              setObj({ ...obj, status: 'idle' })
              setPageNum(5)
            }}>5</div>
            <div>&gt; &gt;</div>
          </div>}
        <button className='showMoreBtn' style={{ color: 'black' }}
          onClick={() => setShowMore(!showMore)}>{!showMore ? 'show more' : 'show less'}</button>
      </div>
    </div>
  )
}
export default memo(SectionSingle)