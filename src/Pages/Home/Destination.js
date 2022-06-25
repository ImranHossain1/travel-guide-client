import React from 'react';
import { Roll, Zoom } from 'react-reveal';
import { Link } from 'react-router-dom';
import PrimaryButton from '../Shared/PrimaryButton';

const Destination = ({destination}) => {
    const {destinationName,description, cost, img, _id} = destination;
    return (
        <div className="card lg:max-w-lg bg-base-100 md:shadow-xl">
            <Zoom top cascade>
                <figure className="px-10 pt-10 pics">
                    <img src={img} alt="Shoes" className="rounded-xl h-72" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-orange-500 text-3xl">{destinationName}</h2>
                    <p>{description}</p>
                    <p>Cost: ${cost}</p>
                    <div className="tooltip tooltip-danger" data-tip={`Book now ${destinationName} as your travel destination`}>
                        <PrimaryButton><Link to={`/destination/${_id}`}>Book now</Link></PrimaryButton>
                    </div>
                </div>
            </Zoom>
        </div>
    );
};

export default Destination;