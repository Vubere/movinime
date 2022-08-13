
import MoviePoster from './Poster'
import {StateT} from '../../../Type'
import { FC } from 'react';
import Filter from '../filter/Filter';

interface PropType{
  Title: string;
  className: string; 
  datas: StateT[];
}

const Section:FC<PropType> = ({Title, className, datas}) =>{
  return(
    <div className={className}>
      <h2>{Title}</h2>
      <Filter/>
      <div className="container">
        {datas.map((data, i)=>{
          return <MoviePoster key={i} {...data}/>
          })} 
      </div>
    </div>
  )
}
export default Section