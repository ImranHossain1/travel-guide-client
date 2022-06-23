import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import useDestinations from '../../hooks/useDestinations';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import PageTitle from '../Shared/PageTitle';
import { Fade, Zoom } from 'react-reveal';
const AddImage = () => {
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [disabledButton, setDisabledButton]= useState(true);
    const [user, loading]= useAuthState(auth)
    const [destinations] = useDestinations();
    const imgStrorageKey = '634b89a1202c978f0b0218c7ddea37ca'
    if(loading){
        <Loading></Loading>
    }
    const onSubmit = data =>{
        setDisabledButton(false)
        let location;
        if(data.location){
            location = data.location
        }else{
            location = "Berlin"
        }
        const image = data.image[0];
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
                const photo ={
                    uploadedBy: user.displayName,
                    uploadedUser: user.email,
                    place: location,
                    image: img
                }
                //send data to db
                fetch('https://aqueous-dawn-43600.herokuapp.com/photos', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(photo)
                })
                .then(res=>res.json())
                .then(inserted=>{
                   if(inserted.insertedId){
                       toast.success('Image Added Successfully');
                       reset();
                       setDisabledButton(true)
                   }
                   else{
                       toast.error('Failed to add this Image');
                       setDisabledButton(true)
                   }
                })
            }
            //console.log('imgBB', result)
        })
        //console.log(location)
    }
    return (
        <div>
            <PageTitle title="Upload Image"></PageTitle>
            <Fade top cascade>
                <h2 className='text-5xl font-bold text-primary text-center my-5'>Upload New Image</h2>
            </Fade>
            <Zoom right cascade>
                <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col items-center">
                        <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <select {...register("location")} className="select select-bordered w-full max-w-xs">
                                    {
                                        destinations?.map(destination=> <option
                                            key={destination._id}
                                            defaultValue={destination.destinationName}
                                        >{destination.destinationName}</option>)
                                    }
                                </select>

                        </div>
                        <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Uploaded by</span>
                                </label>
                                <input type="text" 
                                    className="input input-bordered w-full max-w-xs" 
                                    {...register("name")}
                                    defaultValue={user.displayName}
                                />
                            </div>
                        <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Browse Photos</span>
                                </label>
                                <input type="file" 
                                    className="input input-bordered w-full max-w-xs" 
                                    {...register("image", {
                                        required:{
                                            value: true,
                                            message: "Image is Required"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                                </label>
                        </div>
                        {
                            disabledButton ? <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                            : <input disabled type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                        }
                    </form>
            </Zoom>
        </div>
    );
};

export default AddImage;