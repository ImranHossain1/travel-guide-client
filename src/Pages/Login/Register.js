import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Zoom } from 'react-reveal';
import { Link, useNavigate } from 'react-router-dom';
import loginbg from '../../assets/images/login3.jpg'
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
const Register = () => {
    const {register, handleSubmit, formState: { errors }}= useForm();
    const [agree, setAgree] = useState(false);
    let signInErrorMessage;
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth , {sendEmailVerification: true});
    let navigate = useNavigate();
    const [signInWithGoogle, guser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user || guser)
    if(loading || gLoading || updating){
        return <Loading></Loading>
    }
    if(error || gError|| updateError){
        signInErrorMessage = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }
    if(token){
        navigate('/dashboard');
    }
    const onSubmit =async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <PageTitle title="Register"></PageTitle>
            <div className='hidden sm:block'>
                <Zoom right cascade>
                <img src={loginbg} alt="" className='w-full h-full object-cover'/>
                </Zoom>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <Zoom cascade>
                    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' >
                        <h2 className='text-4xl text-white font-bold text-center'>SIGN UP</h2>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label>Name</label>
                            <input type='text' 
                            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            {...register("name", {
                                required:{
                                    value: true,
                                    message: "Name is Required"
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Name should be atleast 3 character long' // JS only: <p>error message</p> TS only support string
                                }
                            })}
                            />
                            <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
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
                        <div className='text-gray-400 py-2 flex justify-between items-center'>
                            <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" className=' me-2'/>
                            <label className={`${agree ? '' : 'text-red-500'}`} htmlFor="terms">Accept Travel Guide DE Terms and Conditions</label>
                        </div>
                        
                        {signInErrorMessage}
                            <button disabled={!agree} 
                            className={`${!agree ? 'w-full my-5 py-2 bg-gray-700 text-white font-semibold rounded-lg' :
                            'w-full my-5 py-2 bg-teal-500  hover:bg-teal-800 text-white font-semibold rounded-lg'}`}>SIGN UP</button>
                        <div className='flex justify-center text-gray-400 py-2'>
                            <p className='flex items-center'><Link to='/login'>Already Have an Accoount? Please login</Link></p>
                        </div>
                        <div className="divider text-gray-400">OR</div>
                        <button 
                            disabled={!agree}
                            onClick={() => signInWithGoogle()}
                            className={`${!agree ? 'w-full my-5 py-2 bg-gray-700 text-white font-semibold rounded-lg' :
                            'w-full my-5 py-2 bg-white text-green-900  hover:bg-green-800 hover:text-white font-semibold rounded-lg'}`}>
                                GOOGLE SIGN IN
                        </button>
                    </form>
                </Zoom>
            </div>

        </div>
    );
};

export default Register;