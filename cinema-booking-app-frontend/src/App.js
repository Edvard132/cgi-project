import NavBar from './navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Footer from './footer/Footer';
import './index.css';
import LandingPage from './pages/LandingPage';
import SingleMovie from './pages/SingleMovie';
import Trailer from './components/Trailer';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route path='/movie/:id' element={<SingleMovie />}></Route>
        <Route path='/Trailer/:trailerId' element={<Trailer />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
