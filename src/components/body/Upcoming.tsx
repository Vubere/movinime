import Section from "./features/Section";
import { FC, useEffect } from "react"
import { fetchUpcomingMovie } from './features/movieslice'
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const Upcoming: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.movie.upcoming.status)
  const data = useAppSelector(state => state.movie.entities.upcoming)
  useEffect(
    () => {
      if (status === 'idle')
        dispatch(fetchUpcomingMovie(2))
    }, [dispatch, status]
  )
  return (
    <>
      {status === 'loading' ? <div>loading</div> :
        <Section Title='Upcoming' className="section section4" datas={data} />
      }
    </>
  )
}

export default Upcoming