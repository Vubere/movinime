import Section from "./features/Section";
import { FC, useEffect } from "react"
import { fetchTopPopularMovie } from './features/movieslice'
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const TopPopular: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.movie.topPopular.status)
  const data = useAppSelector(state => state.movie.entities.topPopular)
  useEffect(
    () => {
      if (status === 'idle')
        dispatch(fetchTopPopularMovie(1))
    }, [status, dispatch]
  )
  return (
    <Section Title='Top Popular' className="section section2" datas={data} />
  )
}

export default TopPopular