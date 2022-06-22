import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const RequireAuth = ({children}) => {
    const [user, loading, error] = useAuthState(auth);
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    if (user.providerData[0]?.providerId ==='password' && !user.emailVerified) {
        return <div className="card w-96 bg-neutral text-neutral-content shadow-xl mb-5 border-2 mx-auto my-12">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Your Email is not verified!!</h2>
                    <p>Please Verify your email address</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" 
                            onClick={async () => {
                                await sendEmailVerification();
                                toast('Sent email');
                            }}
                        >Send Verification Email Again</button>
                    </div>
                </div>
      </div>
    }
    return children;
};

export default RequireAuth;