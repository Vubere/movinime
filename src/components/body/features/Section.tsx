
import MoviePoster from './MoviePoster'
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
        {datas.map((data)=>{
          return <MoviePoster {...data}/>
          })} 
      </div>
    </div>
  )
}
export default Section