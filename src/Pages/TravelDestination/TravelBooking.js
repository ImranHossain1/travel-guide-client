import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import 'react-day-picker/dist/style.css';
//import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import TravelBookingModal from './TravelBookingModal';
const TravelBooking = () => {
    const [date, setDate] = useState(new Date());
    const [booking, setBooking]=useState(null);
    //const formattedDate = format(date, 'PP')
    const today = new Date();
    const {id} = useParams();
    const url= `http://localhost:5000/destination/${id}`;
    const {data:destination, isLoading, refetch} = useQuery(['destination', id], ()=>fetch(url,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        return <Loading></Loading>
    }    
    
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={destination.img} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                <h1 className="text-5xl font-bold">{destination.destinationName}</h1>
                <p className="py-6">{destination.description}</p>
                <h2>Cost: {destination.cost}</h2>
                <label 
                    onClick={()=>setBooking(destination)} 
                    htmlFor="booking-modal" className="btn btn-primary">
                        CONFIRM BOOKING
                </label>
                
                </div>
            </div>
            {
                booking && <TravelBookingModal
                    booking={booking}
                    setBooking = {setBooking}
                    date={date}
                    setDate = {setDate}
                    refetch ={refetch}
                ></TravelBookingModal>
            }
        </div>
    );
};

export default TravelBooking;



/*
                 <DatePicker
                        mode="single"
                        className='rounded-lg ml-2 px-2'
                        selected={date}
                        onSelect={setDate}
                        minDate={new Date()}
                        dateFormat="d MMMM, yyyy"
                        closeOnScroll={true}
                    />
*/