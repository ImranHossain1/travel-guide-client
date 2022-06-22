import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const AddDestination = () => {
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [disabledButton, setDisabledButton]= useState(true);
    const imgStrorageKey = '634b89a1202c978f0b0218c7ddea37ca'
    
    const onSubmit = data =>{
        setDisabledButton(false)
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
                fetch('https://aqueous-dawn-43600.herokuapp.com/destination', {
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
                       setDisabledButton(true)
                   }
                   else{
                       toast.error('Failed to add this Destination')
                       setDisabledButton(true)
                   }
                })
            }
            //console.log('imgBB', result)
        })
        //console.log(location)
    }
    return (
        <div className='mb-12'>
            <h2 className='text-5xl font-bold text-primary text-center my-5'>Add a New Destination</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
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
                    {
                        disabledButton ? <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                        : <input disabled type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                    }
                </form>
        </div>
    );
};

export default AddDestination;