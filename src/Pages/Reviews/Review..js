import React from 'react';

import Rating from 'react-rating';
const Review = ({review}) => {
    const {name,comment, rating} = review;
    return (
        <div className="card lg:max-w-lg bg-base-100 md:shadow-xl gallery">

            <div className="card-body items-center text-center">
                <p className='card-title text-orange-500 text-xl'>Comment: {comment}</p>
                <p className='card-title text-yellow-500 text-xl'>Rating: 
                        <Rating 
                                emptySymbol="far fa-star fa-x"
                                fullSymbol="fas fa-star fa-x"
                                readonly  
                                initialRating= {rating}                              
                        />
                </p>
                <h2 className="card-title text-primary text-xl">Rated By: {name}</h2>
            </div>
        </div>
    );
};

export default Review;