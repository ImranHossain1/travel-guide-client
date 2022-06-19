import { async } from '@firebase/util';
import React from 'react';
//import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
//import auth from '../../firebase.init';

import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
const AddDestination = () => {
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    //const [user, loading]= useAuthState(auth)
    const imgStrorageKey = '634b89a1202c978f0b0218c7ddea37ca'
    
    const onSubmit = async data =>{
        //console.log(data);
        let location;
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
                const destination ={
                    destinationName: data.destinationName,
                    description: data.destinationDetails,
                    cost: data.cost,
                    img: img
                }
                //send data to db
                fetch('http://localhost:5000/destination', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(destination)
                })
                .then(res=>res.json())
                .then(inserted=>{
                   if(inserted.insertedId){
                       toast.success('New Travel Destination Added Successfully');
                       reset();
                   }
                   else{
                       toast.error('Failed to add this Destination')
                   }
                })
            }
            //console.log('imgBB', result)
        })
        //console.log(location)
    }
    return (
        <div>
            <h2 className='text-center'>Upload New Image</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Destination Name</span>
                            </label>
                            <input type="text" 
                                placeholder="New Destination Name" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("destinationName", {
                                    required:{
                                        value: true,
                                        message: "Destination Name is Required"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: 'Destination Name Invalid' // JS only: <p>error message</p> TS only support string
                                      }
                                  })}
                            />
                            <label className="label">
                                {errors.destinationName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.destinationName.message}</span>}
                                {errors.destinationName?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.destinationName.message}</span>}
                            </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Destination Description</span>
                            </label>
                            <input type="text" 
                                placeholder="Destination Details" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("destinationDetails", {
                                    required:{
                                        value: true,
                                        message: "Destination Detail is Required"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: 'Destination Details Invalid' // JS only: <p>error message</p> TS only support string
                                      }
                                  })}
                            />
                            <label className="label">
                                {errors.destinationDetails?.type === 'required' && <span className="label-text-alt text-red-500">{errors.destinationDetails.message}</span>}
                                {errors.destinationDetails?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.destinationDetails.message}</span>}
                            </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Cost</span>
                            </label>
                            <input type="number" 
                                placeholder="Travel Cost" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("cost", {
                                    required:{
                                        value: true,
                                        message: "Cost is Required"
                                    }
                                  })}
                            />
                            <label className="label">
                                {errors.cost?.type === 'required' && <span className="label-text-alt text-red-500">{errors.cost.message}</span>}
                            </label>
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
                        

                    <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                </form>
        </div>
    );
};

export default AddDestination;