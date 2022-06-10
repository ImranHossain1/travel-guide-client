import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary uppercase text-gray-700 font-bold hover:btn-secondary">{children}</button>
    );
};

export default PrimaryButton;