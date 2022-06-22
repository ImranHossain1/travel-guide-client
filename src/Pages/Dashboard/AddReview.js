import { async } from '@firebase/util';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import Rating from 'react-rating';
import { useState } from 'react';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [user, loading]= useAuthState(auth)
    const [rating, setRating] = useState(2);
    const [disabledButton, setDisabledButton]= useState(true);
    if(loading){
        <Loading></Loading>
    }
    const handleRatingChange=(value) =>{
        setRating(value)
        //here set your state for rating
    }
    const onSubmit = async data =>{
            setDisabledButton(false)
            const review ={
                name: user.displayName,
                comment: data.comment,
                rating: rating
            }
            fetch('https://aqueous-dawn-43600.herokuapp.com/review', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(review)
                })
                .then(res=>res.json())
                .then(inserted=>{
                   if(inserted.insertedId){
                       toast.success('Review Added Successfully');
                       reset();
                       setRating(2)
                       setDisabledButton(true);
                   }
                   else{
                       toast.error('Failed to add this Review');
                       setDisabledButton(true);
                   }

                })
    }
    return (
        <div>
            <h2 className='text-5xl font-bold text-primary text-center my-5'>Please Give us a Review</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                    <div className="form-control w-full max-w-xs " >
                            <label className="label">
                                <span className="label-text">Review by</span>
                            </label>
                            <input type="text" 
                                disabled
                                className="input input-bordered w-full max-w-xs" 
                                {...register("name")}
                                defaultValue={user.displayName}
                            />
                    </div>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Comment:</span>
                            </label>
                            <input type="text" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("comment", {
                                    required:{
                                        value: true,
                                        message: "Comment is Required"
                                    }
                                  })}
                            />
                            <label className="label">
                                {errors.comment?.type === 'required' && <span className="label-text-alt text-red-500">{errors.comment.message}</span>}
                            </label>
                    </div>
                    <div className="form-control w-full max-w-xs mb-5">
                            <label className="label">
                                <span className="label-text">Rate Your Jurney:</span>
                            </label>
                            <Rating 
                                emptySymbol="far fa-star fa-2x"
                                fullSymbol="fas fa-star fa-2x"
                                onClick={handleRatingChange}   
                                initialRating= {rating}                              
                            />
                    </div>
                    {
                        disabledButton ? <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                        : <input disabled type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                    }
                </form>
        </div>
    );
};

export default AddReview;