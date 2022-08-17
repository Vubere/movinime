
import MoviePoster from './Poster';
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTopRatedMovie, fetchUpcomingMovie, fetchLatestMovie, fetchTopPopularMovie } from './movieslice';






const SectionSingle: FC = () => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state => state.movie)
  const movied = useAppSelector(state => state.movie.entities)
 
  const [obj, setObj] = useState<any>({
    status:'idle',
    name: 'new'
  })
  let data = useRef<any>()


  const toggle: (arg: string, arg2:string) => void = (name, status) => {
    if (name === 'popular') {
      setObj({...obj, status:movie.topPopular.status})
      data.current = movie.entities.topPopular
    } else if (name === 'rated') {
      setObj({
        ...obj, status: movie.topRated.status})
      data.current = movie.entities.topRated
    } else if (name === 'new') {
      setObj({
        ...obj, status: movie.latest.status})
      data.current = movie.entities.latest
    } else if (name === 'upcoming') {
      setObj({
        ...obj, status: movie.upcoming.status})
      data.current = movie.entities.upcoming
    }
    console.log(data.current, status)
  }
  useEffect(
    () => {
      if (obj.status === 'idle') {
        obj.name === 'popular' ?
        dispatch(fetchTopPopularMovie(1)) :
        obj.name === 'rated' ?
        dispatch(fetchTopRatedMovie(1)) :
        obj.name === 'new' ?
        dispatch(fetchLatestMovie(1)) :
        dispatch(fetchUpcomingMovie(1));
      }
      toggle(obj.name, obj.status)
    }, [obj.name, obj.status, dispatch]
  )

  let arr = []
  for (let p in data.current) {
    arr.push(data.current[p])
  }
  return (
    <div className='section single'>
      <h2>
        <ul>
          <li onClick={() => {
           setObj({...obj, name: 'new'}) 
          }
          }>New</li>|
          <li onClick={() => {
            setObj({ ...obj, name: 'popular' }) 
          }
          }>Popular</li>|
          <li onClick={() => setObj({ ...obj, name: 'rated' })}>Top Rated</li>|
          <li onClick={() => setObj({ ...obj, name: 'upcoming' })}>Upcoming</li>
        </ul>
      </h2>
      <div className="container">
        {arr.slice(0, 10).map((data, i) => {
          return <MoviePoster key={i} {...data} />
        })}
      </div>
    </div>
  )
}
export default SectionSingle