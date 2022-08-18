import {FC} from 'react';
import './stylesheets/App.scss';
import Navbar from './components/navbar/Navbar';
import Jumbotron from './components/body/features/Jumbotron';
import Footer from './components/footer/Footer';
import SectionSingle from './components/body/features/SectionSingle';


const App: FC = () => {

  return (
    <div className="App">
      <Navbar />
      <main>
        <Jumbotron />
        <SectionSingle/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
