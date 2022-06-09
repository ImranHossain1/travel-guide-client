import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Gallery from './Pages/Gallery/Gallery';
import TravelDestinations from './Pages/TravelDestination/TravelDestinations';
import Footer from './Pages/Shared/Footer';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/gallery' element={<Gallery></Gallery>}/>
        <Route path='/destination' element={<TravelDestinations></TravelDestinations>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
