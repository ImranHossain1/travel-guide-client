import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary uppercase text-gray-600 font-bold bg-gradient-to-r from-secondary to-primary ">{children}</button>
    );
};

export default PrimaryButton;