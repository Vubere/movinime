import React, { useEffect, FC, useState } from 'react';

import './stylesheets/App.scss';
import Navbar from './components/navbar/Navbar';
import MoviePoster from './components/body/MoviePoster'

async function fetchMovie(setState:(value:any)=>void) {
  const api = await fetch('https://api.themoviedb.org/3/movie/550?api_key=e94220f94f8d82077bb28ea0824fd429')
  const res = await api.json()
  setState(res)
}
export type StateT = {
  title: string;
  overview: string;
  spoken_language: string[];
  release_date:  string;
  status: string;
  poster_path: string;
}

const App:FC = () => {
  const [state, setState] = useState<StateT>({} as StateT)
  const [done, setDone] = useState<boolean>(false)
  
  useEffect( 
    () => {
      (async () =>{
        await fetchMovie(setState)
        setDone(true)
      })()
    }, [])
  return (
    <div className="App">
      <Navbar/>
      {done&&
      <MoviePoster {...state}/>
      }
        
    </div>
  );
}

export default App;
