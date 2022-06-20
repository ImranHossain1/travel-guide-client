import { format } from 'date-fns';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import auth from '../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
const TravelBookingModal = ({booking, date, setDate ,setBooking, refetch}) => {
    const [user, loading, error] = useAuthState(auth);
    const formattedDate = format(date, 'PP')
    const {_id, destinationName, cost} = booking;
    const handleBooking = e =>{
        e.preventDefault();
        const confirmBooking = {
            bookingId: _id,
            bookingName: destinationName,
            date: formattedDate,
            cost: cost,
            userName: user.displayName,
            userEmail: user.email,
            phone: e.target.phone.value
        }
        fetch('https://aqueous-dawn-43600.herokuapp.com/bookedDestination', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(confirmBooking)
        })
            .then(res => res.json())
            .then(data=>{
                if(data.success){
                    toast(`Booking is set, at ${formattedDate}`)
                }
                else{
                    toast.error(`Already have an Travel Plan on ${data.confirmBooking?.date} in ${data.confirmBooking?.bookingName}`)
                }
                refetch()
                setBooking(null)
            })
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-lg text-secondary">Booking For: {destinationName}</h3>
                <form onSubmit={handleBooking}  className='grid grid-cols-1 gap-4 mt-2'>
                    <DatePicker
                            mode="single"
                            className="input input-bordered w-full max-w-xs"
                            selected={date}
                            onSelect={setDate}
                            minDate={new Date()}
                            dateFormat="d MMMM, yyyy"
                            closeOnScroll={true}
                    />
                    <input type="text" name='name' value={user.displayName}  className="input input-bordered w-full max-w-xs" />
                    <input type="email" name='email' value={user.email}  className="input input-bordered w-full max-w-xs" />
                    <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                    <input type="text" name='cost' disabled value={`$ ${cost}`} className="input input-bordered w-full max-w-xs" />
                    <input type="submit" value="Submit" className="btn btn-secondary" />
                </form>
            </div>
            </div>
        </div>
    );
};

export default TravelBookingModal;