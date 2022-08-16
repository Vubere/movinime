import Section from "./features/Section";
import { FC, useEffect } from "react"
//import data from "./FakeData";
import { fetchTopRatedMovie } from './features/movieslice'
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const TopRatedSection:FC = () => {
  const dispatch = useAppDispatch()
   const status = useAppSelector(state=>state.movie.topRated.status)
   const data = useAppSelector(state=>state.movie.entities.topRated)
  useEffect(
    ()=>{
      if(status==='idle')
      dispatch(fetchTopRatedMovie(1))
    }, [dispatch, status]
  )
  return (
    <Section Title='Top Rated' className="section section3" datas={data} />
  )
}

export default TopRatedSection