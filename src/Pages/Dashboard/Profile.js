import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import userImg from '../../assets/user.png'
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';
import { Zoom } from 'react-reveal';
import { signOut } from 'firebase/auth';
const Profile = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
        fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user.email}`,{
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>{
            //console.log('res',res);
            if(res.status === 401 || res.status===403){
                signOut(auth);
                localStorage.removeItem('accessToken')
                navigate('/');
            }
            return res.json()
        })
        .then(data=>{
            setUserData(data)
        })
        } 
    },[user])
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl mb-5">
            <PageTitle title={user.displayName}></PageTitle>
            <Zoom top cascade>
            <figure className="px-10 pt-10 pics">
                <img src={userData.image || userImg} alt={userData.name || user.displayName} className="rounded-lg " />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title uppercase">{userData.name || user.displayName}</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <tbody>
                        <tr>
                            <th>Date of Birth:</th>
                            <td className='uppercase'>{userData.dob  || "Not Specified"}</td>
                        </tr>
                        <tr>
                            <th>Gender: </th>
                            <td className='uppercase'>{userData.gender || "Not Specified"}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td className='uppercase'>{userData.phone || "Not Specified"}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-actions">
                <button className="btn btn-primary"><Link to='/dashboard/profileUpdate'>Update Your Profile</Link></button>
                </div>
            </div>
            </Zoom>
        </div>
    );
};

export default Profile;