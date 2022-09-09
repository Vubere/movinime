import { FC, lazy, Suspense } from 'react';
import './stylesheets/App.scss';
import Navbar from './components/navbar/Navbar';
import Footer from './components/body/footer/Footer';
import MoviePage from './components/body/features/MoviePage';
import { useAppSelector } from './app/hooks';

const Jumbotron = lazy(() => import('./components/body/features/Jumbotron'))
const SectionSingle = lazy(()=>
 import('./components/body/features/SectionSingle'))

const App: FC = () => {
  const moviePageOpen = useAppSelector(state => state.pageState.moviePage.open)

  return (
    <div className="App">
      <Navbar />
      <main>
        <Suspense fallback={<div>...</div>}>
          <Jumbotron />
          <SectionSingle />
          {moviePageOpen && <MoviePage />}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
