import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import userImg from '../../assets/user.png'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
const Profile = () => {
    const [user, loading] = useAuthState(auth);
    const {data: userData, isLoading} = useQuery(["user"], ()=>fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user.email}`).then(res=>res.json()));
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl mb-5">
            <figure className="px-10 pt-10">
                <img src={userData.image || userImg} alt={userData.name || user.displayName} className="rounded-lg" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title uppercase">{userData.name || user.displayName}</h2>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <tbody>
                        <tr>
                            <th>Date of Birth:</th>
                            <td>{userData.dob  || "Not Specified"}</td>
                        </tr>
                        <tr>
                            <th>Gender: </th>
                            <td className='uppercase'>{userData.gender || "Not Specified"}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>{userData.phone || "Not Specified"}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-actions">
                <button className="btn btn-primary"><Link to='/dashboard/profileUpdate'>Update Your Profile</Link></button>
                </div>
            </div>
            
        </div>
    );
};

export default Profile;