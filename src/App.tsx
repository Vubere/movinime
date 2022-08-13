import React, { useEffect, FC, useState } from 'react';
import { StateT } from './Type';
import './stylesheets/App.scss';
import Navbar from './components/navbar/Navbar';
import MoviePoster from './components/body/features/MoviePoster'
import TopPopularMovie from './components/body/TopPopularMovies';
import TopNewlyReleasedSection from './components/body/TopNewlyReleased';
import TopRatedSection from './components/body/TopRatedSection';
import Upcoming from './components/body/Upcoming';
import Jumbotron from './components/body/Jumbotron';
import Footer from './components/footer/Footer';


async function fetchMovie(setState: (value: any) => void) {
  const api = await fetch('https://api.themoviedb.org/3/movie/550?api_key=e94220f94f8d82077bb28ea0824fd429')
  const res = await api.json()
  setState(res)
}

const App: FC = () => {
  const [state, setState] = useState<StateT>({} as StateT)
  const [done, setDone] = useState<boolean>(false)

  useEffect(
    () => {
      (async () => {
        await fetchMovie(setState)
        setDone(true)
      })()
    }, [])
  return (
    <div className="App">
      <Navbar />
      {done &&
        <MoviePoster {...state} />
      }
      <main>
        <Jumbotron />
        <TopNewlyReleasedSection />
        <TopPopularMovie />
        <TopRatedSection />
        <Upcoming />
      </main>
      <Footer />
    </div>
  );
}

export default App;
