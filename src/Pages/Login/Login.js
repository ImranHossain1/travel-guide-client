import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginbg from '../../assets/images/login3.jpg';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';
import PageTitle from '../Shared/PageTitle';
const Login = () => {
    const {register, handleSubmit, watch, formState: { errors }}= useForm();
    let signInErrorMessage;
    const [signInWithGoogle, guser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user || guser)
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    useEffect(()=>{
        if(token){
            navigate(from, { replace: true });
        }
    },[token, from, navigate])
    if(loading || gLoading){
        return <Loading></Loading>
    }
    if(error || gError){
        signInErrorMessage = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <PageTitle title="Login"></PageTitle>
            <div className='hidden sm:block'>
                <img src={loginbg} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' >
                    <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Email</label>
                        <input type='email' 
                        className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        {...register("email", {
                            required:{
                                value: true,
                                message: "Email is Required"
                            },
                            pattern: {
                              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                              message: 'Provide a valid Email'
                            }
                          })}
                        />
                        <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input type='password' 
                        className='p-2 rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        {...register("password", {
                            required:{
                                value: true,
                                message: "Password is Required"
                            },
                            minLength: {
                                value: 6,
                                message: 'Must be 6 character or longer' // JS only: <p>error message</p> TS only support string
                              }
                          })}
                        />
                        <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>
                    <div className='flex justify-between text-gray-400 py-2'>
                        <p className='flex items-center'><input className='mr-2 ' type="checkbox" />Remember me</p>
                        <p ><Link to='/resetPassword'>Forget Parword?</Link></p>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500  hover:bg-teal-800 text-white font-semibold rounded-lg'>Sign In</button>
                    <div className='flex justify-center text-gray-400 py-2'>
                        <p className='flex items-center'><Link to='/register'>Don't have any account? Please Register</Link></p>
                    </div>
                    <button
                    onClick={() => signInWithGoogle()}
                    className='w-full my-5 py-2 bg-white text-green-900  hover:bg-green-800 hover:text-white font-semibold rounded-lg'>GOOGLE SIGN IN</button>
                </form>
            </div>

        </div>
    );
};

export default Login;