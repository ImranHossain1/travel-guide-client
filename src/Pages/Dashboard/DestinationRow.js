import React from 'react';
import { Bounce } from 'react-reveal';

const DestinationRow = ({destination,index, refetch, setDeletingdestination }) => {
    const {destinationName, img, cost}= destination;
    return (
        <tr>
            <Bounce left cascade>
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
            </Bounce>
        </tr>
    );
};

export default DestinationRow;