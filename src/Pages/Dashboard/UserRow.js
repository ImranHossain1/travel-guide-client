import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({user, refetch, index}) => {
    const {email, role, _id} = user;
    const makeAdmin =()=>{
        fetch(`http://localhost:5000/user/admin/${email}`,{
            method: 'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })        
        .then(res=>{
            if(res.status === 403){
                toast.error('Failed to make an Admin');
            }
            return res.json();
        })
        .then(data=>{
            if(data.result.modifiedCount > 0){
                refetch();
                toast.success(`Successfully made an admin`);
            }
            
        })
    }
    return (
        <tr>
            <th>{index+1}</th>
            <td>{email}</td>
            <td>{role!=='admin' && <button className="btn btn-xs" onClick={makeAdmin}>Make Admin</button>}</td>
        </tr>
    );
};

export default UserRow;