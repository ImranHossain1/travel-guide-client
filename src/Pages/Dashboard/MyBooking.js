import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import BookingDeleteModal from './BookingDeleteModal';


const MyBooking = () => {
    //const [bookings, setBookings] = useState([]);
    const [deleteBooking, setDeleteBooking]= useState(null)
    const [user, loading] = useAuthState(auth);

    //const navigate = useNavigate();
    const {data: bookings, isLoading, refetch} = useQuery(["booking"], ()=>fetch(`https://aqueous-dawn-43600.herokuapp.com/booking/${user.email}`,{
        method: 'GET', 
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()));
    if(loading || isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-full mx-5 mb-12'>
            <PageTitle title="My Bookings"></PageTitle>
            <h2 className='text-5xl font-bold text-primary text-center my-5'>My Destinations</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index)=> <tr key={booking._id}>
                            <th>{index+1}</th>
                            <td>{booking.userName}</td>
                            <td>{booking.date}</td>
                            <td>{booking.bookingName}</td>
                            <td>{booking.cost}</td>
                            <td>
                                {/* {(booking.cost && !booking.paid) && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>} */}
                                {(booking.cost && !booking.paid) &&<button className='btn btn-xs btn-success'>Pay</button>}
                                {(booking.cost && booking.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        <p>Transaction id: <span className='text-success'>{booking.transactionId}</span></p>
                                </div>}
                            </td>
                            <td>
                            {(booking.cost && !booking.paid) &&  <label onClick={()=> setDeleteBooking(booking)} htmlFor="delete-booking-modal" className="btn btn-xs btn-error modal-button">Delete</label>}
                            </td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
            {   deleteBooking  && <BookingDeleteModal 
                    deleteBooking = {deleteBooking}
                    setDeleteBooking= {setDeleteBooking}
                    refetch= {refetch}
                ></BookingDeleteModal>}
        </div>
    );
};

export default MyBooking;