import {FC} from 'react';
import './stylesheets/App.scss';
import Navbar from './components/navbar/Navbar';
import Jumbotron from './components/body/features/Jumbotron';
import Footer from './components/body/footer/Footer';
import SectionSingle from './components/body/features/SectionSingle';
import MoviePage from './components/body/features/MoviePage';
import { useAppSelector } from './app/hooks';

const App: FC = () => {
  const moviePageOpen = useAppSelector(state=>state.pageState.moviePage.open)

  return (
    <div className="App">
      <Navbar />
      <main>
        <Jumbotron />
        <SectionSingle/>
        {moviePageOpen&&<MoviePage/>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
