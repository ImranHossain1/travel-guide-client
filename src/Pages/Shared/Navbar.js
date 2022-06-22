import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import PrimaryButton from './PrimaryButton';

const Navbar = () => {
    const [user] = useAuthState(auth);
    
    const handleSignOut = ()=>{
      signOut(auth)
    }
    const menuItems = <>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/destination'>Destination</Link></li>
                <li><Link to='/gallery'>Gallery</Link></li>
                <li><Link to='/reviews'>Reviews</Link></li>
                {
                    user && <li><Link to='/dashboard'>Dashboard</Link></li>
                }
            </>
    return (
        <div className="navbar bg-gray-300 bg-base-100 md:px-12">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menuItems}
                </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Travel Guide DE</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user? <button onClick={handleSignOut} className="btn btn-gray-700 uppercase text-gray-300 font-bold hover:btn-secondary">Logout</button> :
                    <PrimaryButton> <Link to='/login'>Login</Link></PrimaryButton>
                }
            </div>
        </div>
    );
};

export default Navbar;