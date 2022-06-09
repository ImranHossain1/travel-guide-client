import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';
import '../Home/Gallery.css'
const TravelDestination = ({destination}) => {
    const {destinationName,description, cost, img} = destination;
    return (
        <div className="card lg:max-w-lg bg-base-100 md:shadow-xl gallery">
            <figure className="px-10 pt-10 pics">
                <img src={img} alt="Shoes" className="rounded-xl h-72" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-orange-500 text-3xl">{destinationName}</h2>
                <p>{description}</p>
                <p>Cost: ${cost}</p>
                <PrimaryButton>Book now</PrimaryButton>
            </div>
        </div>
    );
};

export default TravelDestination;