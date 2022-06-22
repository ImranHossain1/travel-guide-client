import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import loginbg from '../../assets/images/login3.jpg';
import auth from '../../firebase.init';
import { useSendPasswordResetEmail} from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import PageTitle from '../Shared/PageTitle';
const ResetPassword = () => {
    const {register, handleSubmit, formState: { errors }}= useForm();
    let signInErrorMessage;
    let navigate = useNavigate();
    const [sendPasswordResetEmail, sending, loading, error,] = useSendPasswordResetEmail(auth);
    if (loading || sending) {
        return <Loading></Loading>
    }
    if(error){
        signInErrorMessage = <p className='text-red-500'><small>{error?.message}</small></p>
    }
    const onSubmit =async data => {
        if (data.email) {
            await sendPasswordResetEmail(data.email);
            toast('Sent email');
            navigate('/login')
        }
        else{
            toast.error('please enter your email address');
        }
    };
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <PageTitle title="Password Reset"></PageTitle>
            <div className='hidden sm:block'>
                <img src={loginbg} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' >
                    <h2 className='text-4xl text-white font-bold text-center'>Password Reset</h2>
                    <div className='flex flex-col text-gray-400 py-2 mt-5'>
                        <label className='text-center'>Please Enter Your Email</label>
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
                    {signInErrorMessage}
                    <button className='w-full my-5 py-2 bg-teal-500  hover:bg-teal-800 text-white font-semibold rounded-lg'>Reset Password</button>
                    <div className='flex justify-center text-gray-400 py-2'>
                        <p className='flex items-center'><Link to='/login'>Go Back to Login</Link></p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ResetPassword;