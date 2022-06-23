import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import userImg from '../../assets/user.png'
import useAdmin from '../../hooks/useAdmin';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import useNotifications from '../../hooks/useNotifications';
import { Bounce, Zoom } from 'react-reveal';
const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [messages , isLoading1]= useNotifications();
    const [admin] = useAdmin(user)
    let count = 0;
    const {data: userData, isLoading} = useQuery(["loggedUser"], ()=>fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user.email}`,{
        method: 'GET',
        headers: {
            'content-type' : 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()));
    if(isLoading ){
        return <Loading></Loading>
    }
    if(isLoading1){
        return <Loading></Loading>
    }

    messages.forEach(message => {
        if(message.unread){
            count++
        }
    });
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
                    <Zoom top cascade>
                        <div className="w-24 rounded-full pics">
                            <img src={userData?.image  || userImg} alt={user.displayName} />
                        </div>
                    </Zoom>
                    <Bounce left cascade>
                        <p><li>{user.displayName}</li></p>
                    </Bounce>
                </div>
                <Bounce left cascade>
                    <li><Link to='/dashboard'>My Profile</Link></li>
                    <li><Link to='/dashboard/booking'>My Bookings</Link></li>
                    <li><Link to='/dashboard/addImage'>Add Image</Link></li>
                    <li><Link to='/dashboard/addReview'>Add Review</Link></li>
                </Bounce>
                    {admin && <>
                        <Bounce right cascade>
                        <li><Link to='/dashboard/users'>Users</Link></li>
                        <li><Link to='/dashboard/addDestination'>Add New Destinations</Link></li>
                        <li><Link to='/dashboard/manageDestinations'>Manage Destinations</Link></li>
                        <li><Link to='/dashboard/notifications'>Notifications {(count !==0) && <span className='text-red-500'>({count})</span>}</Link></li>
                        </Bounce>
                    </>}
                </ul>            
            </div>
    </div>
    );
};

export default Dashboard;