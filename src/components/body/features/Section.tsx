
import MoviePoster from './Poster';
import { FC } from 'react';
import Filter from '../filter/Filter';


interface PropType{
  Title: string;
  className: string; 
  datas: any;
}

const Section:FC<PropType> = ({Title, className, datas}) =>{
  let arr = []
  for(let p in datas){
    arr.push(datas[p])
  }
  return(
    <div className={className}>
      <h2>{Title}</h2>
      <Filter/>
      <div className="container">
        {arr.map((data, i)=>{
          return <MoviePoster key={i} {...data}/>
          })} 
      </div>
    </div>
  )
}
export default Section