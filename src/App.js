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
import Profile from './Pages/Dashboard/Profile';
import MyBooking from './Pages/Dashboard/MyBooking';
import TravelBooking from './Pages/TravelDestination/TravelBooking';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './Pages/Dashboard/Payment';
import AddImage from './Pages/Dashboard/AddImage';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';
import ManageDestinations from './Pages/Dashboard/ManageDestinations';
import AddDestination from './Pages/Dashboard/AddDestination';
import UpdateProfile from './Pages/Dashboard/UpdateProfile';
import AddReview from './Pages/Dashboard/AddReview';
import Reviews from './Pages/Reviews/Reviews';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='destination' element={<TravelDestinations/>}/>
        <Route path='reviews' element={<Reviews/>}/>
        <Route path='destination/:id' element={<RequireAuth><TravelBooking/></RequireAuth>}/>
        <Route path='gallery' element={<RequireAuth><Gallery/></RequireAuth>}/>
        <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
          <Route index element={<Profile></Profile>}></Route>
          <Route path='profileUpdate' element={<UpdateProfile></UpdateProfile>}></Route>
          <Route path='booking' element={<MyBooking></MyBooking>}></Route>
          <Route path='addImage' element={<AddImage></AddImage>}></Route>
          <Route path='addReview' element={<AddReview></AddReview>}></Route>
          <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          <Route path='addDestination' element={<RequireAdmin><AddDestination></AddDestination></RequireAdmin>}></Route>
          <Route path='manageDestinations' element={<RequireAdmin><ManageDestinations></ManageDestinations></RequireAdmin>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
        </Route>
        <Route path='Login' element={<Login></Login>}/>
        <Route path='Register' element={<Register></Register>}/>
      </Routes>
      <Footer></Footer>
      <ToastContainer/>
    </div>
  );
}

export default App;
