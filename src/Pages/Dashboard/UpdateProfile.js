import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Zoom } from 'react-reveal';
const UpdateProfile = () => {
    const [date, setDate] = useState(new Date());
    let formattedDate = format(date, 'PP')
    let dateofBirth;
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [user, loading]= useAuthState(auth)
    const imgStrorageKey = '634b89a1202c978f0b0218c7ddea37ca'
    const {data: userData, isLoading} = useQuery(["user"], ()=>fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user.email}`,{
        method: 'GET', 
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()));
    const [editImage , setEditImage] = useState(false)
    const [editGender , setEditGender] = useState(false)
    const [editDob , setEditDob] = useState(false)
    const [editPhone , setEditPhone] = useState(false)
    const [disabledButton, setDisabledButton]= useState(false);
    const [newdisabledButton, setNewDisabledButton]= useState(true);

    /* console.log(date);
    console.log(userData.dob) */
    const handleImage=()=>{
        setEditImage(true)
        setDisabledButton(true);
    }
    const handleGender=()=>{
        setEditGender(true)
        setDisabledButton(true);
    }
    const handleDob=()=>{
        setEditDob(true)
        setDisabledButton(true);
    }
    const handlePhone=()=>{
        setEditPhone(true)
        setDisabledButton(true);
    }
    if(loading){
        <Loading></Loading>
    }
    if(isLoading){
        <Loading></Loading>
    }
    
    const onSubmit = async data =>{
        setDisabledButton(false);
        setNewDisabledButton(false)
         if(data.image){
            const image = data?.image[0];
            const formData = new FormData();
            
            formData.append('image',image);
            const url = `https://api.imgbb.com/1/upload?key=${imgStrorageKey}`;
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(res=>res.json())
            .then(result=>{
                if(result.success){
                const img = result.data.url;
                if(!editDob){
                    dateofBirth = userData.dob
                }
                const profile ={
                    gender: data.gender,
                    phone: data.phone,
                    image: img,
                    dob: dateofBirth || formattedDate
                }
                //send data to db
                fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user?.email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(profile)
                })
                .then(res=>res.json())
                .then(inserted=>{
                    // console.log(inserted)
                   if(inserted.result.modifiedCount === 1){
                       toast.success('Profile Successfully');
                       reset();
                       setDisabledButton(true);
                       setNewDisabledButton(true);
                       navigate('/dashboard');
                   }
                   else{
                       toast.error('Failed to Update Your Profile')
                       setDisabledButton(true);
                       setNewDisabledButton(true);
                   }
                })
            }
        })
        }
        else{
            if(!editDob){
                dateofBirth = userData.dob
            }
            const profile ={
                gender: data.gender,
                phone: data.phone,
                dob: dateofBirth ||  formattedDate 
            }
            fetch(`https://aqueous-dawn-43600.herokuapp.com/user/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'content-type' : 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(profile)
            })
            .then(res=>res.json())
            .then(inserted=>{
               if(inserted.result.modifiedCount === 1){
                   toast.success('Profile Successfully');
                   reset();
                   navigate('/dashboard');
                   setDisabledButton(true);
                   setNewDisabledButton(true);
               }
               else{
                   toast.error('Failed to Update Your Profile')
                   setDisabledButton(true);
                   setNewDisabledButton(true);
               }
            })
        } 
        
    }
    return (
        <div className='w-full mx-5 mb-12'>
            <h2 className='text-5xl font-bold text-primary text-center my-5'>Upload New Image</h2>
            <Zoom right cascade>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Upload Your Profile Photo</span>
                                </label>
                                <div>
                                    {
                                        !editImage ?
                                            <div className='w-75'>
                                                {
                                                    userData?.image? 
                                                        <div className='flex justify-between items-center'>
                                                            <div className="w-48 ">
                                                                <img src={userData?.image} alt="" className='rounded-lg'/>
                                                            </div>
                                                            <button onClick={()=>handleImage()} className='btn btn-primary uppercase text-gray-700 font-bold hover:btn-secondary'>Edit</button>
                                                        </div>
                                                    :
                                                    <div>
                                                        <div>
                                                            <input type="file" 
                                                                className="input input-bordered w-full max-w-xs" 
                                                                {...register("image", {
                                                                    required:{
                                                                        value: true,
                                                                        message: "Image is Required"
                                                                    }
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                            </div>:
                                                <div>
                                                    <input type="file" 
                                                        className="input input-bordered w-full max-w-xs" 
                                                        {...register("image", {
                                                            required:{
                                                                value: true,
                                                                message: "Image is Required"
                                                            }
                                                        })}
                                                    />
                                                </div>
                                    }
                                </div>
                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                                </label>
                    </div>
                    <div className="form-control w-full max-w-xs mb-5">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <div >
                                {
                                    !editGender ?
                                    <div >
                                    {
                                        userData?.gender?
                                            <div className='flex justify-between'>
                                                <div>
                                                    <input type="text" value={userData.gender} disabled className="input input-bordered w-full max-w-xs uppercase" />
                                                </div>
                                                <div>
                                                <button onClick={()=>handleGender()} className='btn btn-primary uppercase text-gray-700 font-bold hover:btn-secondary'>Edit</button>
                                                </div>
                                            </div>
                                        :
                                        <select {...register("gender")} className="select select-bordered w-full max-w-xs">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    }
                                    </div>
                                    :   
                                        <select {...register("gender")} className="select select-bordered w-full max-w-xs">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>

                                }

                            </div>
                    </div>
                    <div className="form-control w-full max-w-xs mb-5">
                        <label className="label">
                                <span className="label-text">Date Of Birth</span>
                        </label>
                        <div>
                            {
                                !editDob?
                                    <div>
                                    {
                                        userData?.dob? 
                                                <div className='flex justify-between'>
                                                    <div>
                                                    <input type="text" value={userData.dob} disabled className="input input-bordered w-full max-w-xs" />
                                                    </div>
                                                    <div>
                                                    <button onClick={()=>handleDob()} className='btn btn-primary uppercase text-gray-700 font-bold hover:btn-secondary'>Edit</button>
                                                    </div>
                                                </div>
                                        :<DatePicker
                                                mode="single"
                                                className="input input-bordered w-full max-w-xs mb-5"
                                                selected={date}
                                                onSelect={setDate}
                                                maxDate={new Date()}
                                                dateFormat="d MMMM, yyyy"
                                                closeOnScroll={true}
                                        />
                                    }
                                    </div>
                                :
                                <DatePicker
                                    mode="single"
                                    className="input input-bordered w-full max-w-xs mb-5"
                                    selected={date}
                                    onSelect={setDate}
                                    maxDate={new Date()}
                                    dateFormat="d MMMM, yyyy"
                                    closeOnScroll={true}
                                />
                            }
                        </div>
                    </div>
                    <div className='form-control w-full max-w-xs mb-5'>
                        <label>Phone Number</label>
                        <div>
                            {
                                !editPhone?
                                <div >
                                { 
                                    userData?.phone?
                                        <div className='flex justify-between'>
                                            <div>
                                            <input type="text" value={userData.phone} disabled className="input input-bordered w-full max-w-xs" />
                                            </div>
                                            <div>
                                            <button onClick={()=>handlePhone()} className='btn btn-primary uppercase text-gray-700 font-bold hover:btn-secondary'>Edit</button>
                                            </div>
                                        </div>
                                    :<>
                                        <input type='number'
                                        className='input input-bordered w-full max-w-xs'
                                        {...register("phone", {
                                            required:{
                                                value: true,
                                                message: "Phone number is Required"
                                            },
                                            minLength: {
                                                value: 11,
                                                message: 'Must be 11 character or longer' // JS only: <p>error message</p> TS only support string
                                            },
                                            maxLength: {
                                                value: 14,
                                                message: 'Invalid Phone Number' // JS only: <p>error message</p> TS only support string
                                            }
                                        })}
                                        />
                                        <label className="label">
                                            {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                            {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                            {errors.phone?.type === 'maxLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                        </label>
                                    </>
                                }
                                </div>
                                :
                                <>
                                        <input type='number'
                                        className='input input-bordered w-full max-w-xs'
                                        {...register("phone", {
                                            required:{
                                                value: true,
                                                message: "Phone number is Required"
                                            },
                                            minLength: {
                                                value: 11,
                                                message: 'Must be 11 character or longer' // JS only: <p>error message</p> TS only support string
                                            },
                                            maxLength: {
                                                value: 14,
                                                message: 'Invalid Phone Number' // JS only: <p>error message</p> TS only support string
                                            }
                                        })}
                                        />
                                        <label className="label">
                                            {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                            {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                            {errors.phone?.type === 'maxLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                        </label>
                                    </>
                            }
                        </div>
                        
                    </div>
                    {
                        (userData?.image || userData?.gender || userData?.phone || userData?.dob)?
                        <>
                            {
                                disabledButton ? <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                                : <input disabled type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                            }
                        </>
                        :
                        <>
                            {
                                newdisabledButton ? <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/> :
                                <input disabled type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                            }
                        </>
                    }
                </form>
            </Zoom>
        </div>
    );
};

export default UpdateProfile;
/* 
{
    disabledButton ? <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
    : <input disabled type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
} */