import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';
 
import { Link } from 'react-router-dom';
import { Zoom } from 'react-reveal';
const TravelDestination = ({destination}) => {
    const {destinationName,description, cost, img, _id} = destination;
    return (
        <Zoom top cascade>
            <div className="card lg:max-w-lg bg-base-100 md:shadow-xl gallery">
                <figure className="px-10 pt-10 ">
                    <img src={img} alt="Shoes" className="rounded-xl h-72 pics" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-orange-500 text-3xl">{destinationName}</h2>
                    <p>{description}</p>
                    <p>Cost: ${cost}</p>
                    <div className="tooltip tooltip-danger" data-tip={`Book now ${destinationName} as your travel destination`}>
                        <PrimaryButton><Link to={`/destination/${_id}`}>Book now</Link></PrimaryButton>
                    </div>
                </div>
            </div>
        </Zoom>
    );
};

export default TravelDestination;