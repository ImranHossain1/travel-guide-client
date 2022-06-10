import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Gallery from './Pages/Gallery/Gallery';
import TravelDestinations from './Pages/TravelDestination/TravelDestinations';
import Footer from './Pages/Shared/Footer';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='destination' element={<RequireAuth><TravelDestinations/></RequireAuth>}/>
        <Route path='gallery' element={<RequireAuth><Gallery/></RequireAuth>}/>
        <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
        <Route path='Login' element={<Login></Login>}/>
        <Route path='Register' element={<Register></Register>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
