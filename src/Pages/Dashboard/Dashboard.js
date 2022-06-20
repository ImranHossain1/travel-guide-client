import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import userImg from '../../assets/user.png'
import useAdmin from '../../hooks/useAdmin';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const {data: userData, isLoading, refetch} = useQuery(["user"], ()=>fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user.email}`).then(res=>res.json()));
    if(isLoading){
        return <Loading></Loading>
    }
    //console.log(user)
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content  mt-5 ml-2">
                {/* <!-- Page content here --> */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Menu</label>
                <div className='flex justify-center '>
                    <Outlet></Outlet>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                {/* <!-- Sidebar content here --> */}
                <div className="avatar flex flex-col items-center">
                    <div className="w-24 rounded-full">
                        <img src={userData?.image  || userImg} />
                    </div>
                    <p><li>{user.displayName}</li></p>
                </div>
                    
                    <li><Link to='/dashboard'>My Profile</Link></li>
                    <li><Link to='/dashboard/booking'>My Bookings</Link></li>
                    <li><Link to='/dashboard/addImage'>Add Image</Link></li>
                    <li><Link to='/dashboard/addReview'>Add Review</Link></li>
                    {admin && <>
                        <li><Link to='/dashboard/users'>Users</Link></li>
                        <li><Link to='/dashboard/addDestination'>Add New Destinations</Link></li>
                        <li><Link to='/dashboard/manageDestinations'>Manage Destinations</Link></li>
                    </>}
                </ul>            
            </div>
    </div>
    );
};

export default Dashboard;