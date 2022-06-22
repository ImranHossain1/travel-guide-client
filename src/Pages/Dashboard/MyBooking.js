import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
        fetch(`https://aqueous-dawn-43600.herokuapp.com/booking?userEmail=${user.email}`,{
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>{
            if(res.status === 401 || res.status===403){
                signOut(auth);
                localStorage.removeItem('accessToken')
                navigate('/');
            }
            return res.json()
        })
        .then(data=>{           
            setBookings(data)
        })
        } 
    },[user])

    if(loading){
        <Loading></Loading>
    }
    return (
        <div className='w-full mx-5 mb-12'>
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
                                {(booking.cost && !booking.paid) && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                                {(booking.cost && booking.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        <p>Transaction id: <span className='text-success'>{booking.transactionId}</span></p>
                                    </div>}
                            </td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;