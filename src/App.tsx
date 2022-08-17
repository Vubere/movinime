import { FC} from 'react';
import './stylesheets/App.scss';
import Navbar from './components/navbar/Navbar';
/* import TopPopularMovie from './components/body/TopPopularMovies';
import TopNewlyReleasedSection from './components/body/TopNewlyReleased';
import TopRatedSection from './components/body/TopRatedSection';
import Upcoming from './components/body/Upcoming'; */
import Jumbotron from './components/body/Jumbotron';
import Footer from './components/footer/Footer';
import SectionSingle from './components/body/features/SectionSingle';


const App: FC = () => {

  return (
    <div className="App">
      <Navbar />
      <main>
        <Jumbotron />
        <SectionSingle/>
        {/* <TopNewlyReleasedSection />
        <TopPopularMovie />
        <TopRatedSection />
        <Upcoming /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
