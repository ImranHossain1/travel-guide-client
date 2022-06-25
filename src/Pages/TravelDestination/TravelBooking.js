import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import 'react-day-picker/dist/style.css';
import TravelBookingModal from './TravelBookingModal';
import germany from "../../assets/germany.jpg"
import PageTitle from '../Shared/PageTitle';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import TravelGallery from './TravelGallery';
import { Fade, Zoom } from 'react-reveal';
const TravelBooking = () => {
    const [date, setDate] = useState(new Date());
    const [booking, setBooking]=useState(null);
    const [images, setImages] = useState([])
    const {id} = useParams();
    const url= `https://aqueous-dawn-43600.herokuapp.com/destination/${id}`;
    const url2= `https://aqueous-dawn-43600.herokuapp.com/photo/${id}`;
    const {data:destination, isLoading, refetch} = useQuery(['destination', id], ()=>fetch(url,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        return <Loading></Loading>
    }  
    return (
        <>
        <div style={{
            background: `url(${germany})`
        }} className="hero min-h-screen bg-no-repeat">
            <div className="hero-overlay bg-opacity-60 "></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <Zoom bottom>
                    <div className=''>
                        <img src={destination.img} className="max-w-xs rounded-lg shadow-2xl pics" />        
                    </div>
                </Zoom>
                <div className='flex flex-col items-center'>
                    <Fade left cascade>
                    <h1 className="text-5xl font-bold text-orange-500 uppercase">{destination.destinationName}</h1>
                    <p className="py-6 text-2xl text-gray-300 ">{destination.description}</p>
                    <p className="py-6 text-2xl text-white "> Travel fee: <span className='text-orange-300 font-bold'>{destination.cost}</span></p>
                    <div className="tooltip tooltip-danger mt-5" data-tip={`Confirm your Booking for ${destination.destinationName}`}>
                        <label 
                            onClick={()=>setBooking(destination)} 
                            htmlFor="booking-modal" className="btn btn-primary">
                                CONFIRM BOOKING
                        </label>
                    </div>
                    </Fade>
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
        <div>
            <TravelGallery
                destinationName= {destination.destinationName}
            ></TravelGallery>
        </div>
        </>
    );
};

export default TravelBooking;

