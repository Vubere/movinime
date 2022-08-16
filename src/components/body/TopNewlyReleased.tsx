import Section from "./features/Section";
import { FC, useEffect } from "react"
import { fetchLatestMovie } from './features/movieslice'
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const TopNewlyReleasedSection: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.movie.latest.status)
  const data = useAppSelector(state => state.movie.entities.latest)
  console.log(data)
  useEffect(
    () => {
      if (status === 'idle')
        dispatch(fetchLatestMovie())
    }, [status, dispatch]
  )
  return (
    <>
      {status === 'loading' ? <div>loading</div> :
        <Section Title='New' className="section section1" datas={data} />
      }
    </>
  )
}


export default TopNewlyReleasedSection