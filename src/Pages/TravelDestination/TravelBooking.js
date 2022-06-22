import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import 'react-day-picker/dist/style.css';
import TravelBookingModal from './TravelBookingModal';
import PageTitle from '../Shared/PageTitle';
const TravelBooking = () => {
    const [date, setDate] = useState(new Date());
    const [booking, setBooking]=useState(null);
    const {id} = useParams();
    const url= `https://aqueous-dawn-43600.herokuapp.com/destination/${id}`;
    const {data:destination, isLoading, refetch} = useQuery(['destination', id], ()=>fetch(url,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        return <Loading></Loading>
    }    
    
    return (
        <div className="hero min-h-screen bg-base-200">
            <PageTitle title="Booking"></PageTitle>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={destination.img} alt="" className="max-w-xs rounded-lg shadow-2xl pics" />
                <div>
                <h1 className="text-5xl font-bold">{destination.destinationName}</h1>
                <p className="py-6">{destination.description}</p>
                <h2>Cost: {destination.cost}</h2>
                <div className="tooltip tooltip-danger mt-5" data-tip={`Confirm your Booking for ${destination.destinationName}`}>
                    <label 
                        onClick={()=>setBooking(destination)} 
                        htmlFor="booking-modal" className="btn btn-primary">
                            CONFIRM BOOKING
                    </label>
                </div>
                
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

