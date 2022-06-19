import React from 'react';

const DestinationRow = ({destination,index, refetch, setDeletingdestination }) => {
    const {destinationName, img, cost, _id, email}= destination;
    return (
        <tr>
            <th>{index+1}</th>
            <td>
                <div className="avatar">
                    <div className="w-8 rounded">
                        <img src={img} alt={destinationName} />
                    </div>
                </div>
            </td>
            <td>{destinationName}</td>
            <td>{cost}</td>
            <td>
                <label onClick={()=> setDeletingdestination(destination)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error modal-button">Delete</label>
            </td>
        </tr>
    );
};

export default DestinationRow;