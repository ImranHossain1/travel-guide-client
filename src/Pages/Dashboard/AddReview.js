import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import useDestinations from '../../hooks/useDestinations';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [user, loading]= useAuthState(auth)
    const handleClick = value => {
        setCurrentValue(value)
      }
    
      const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
      };
    
      const handleMouseLeave = () => {
        setHoverValue(undefined)
      }
    if(loading){
        <Loading></Loading>
    }
    const onSubmit = async data =>{
            console.log(data)
            const review ={
                name: data.name,
                comment: data.comment
            }
    }
    return (
        <div>
            <h2 className='text-center'>Please Give us a Review how you Felt your Trip</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Reviewd by</span>
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
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Rate Your Jurney:</span>
                            </label>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    />
                                )
                            })}
                    </div>
                        

                    <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                </form>
        </div>
    );
};

export default AddReview;