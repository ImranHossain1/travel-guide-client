import { async } from '@firebase/util';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import useDestinations from '../../hooks/useDestinations';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
const AddImage = () => {
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [user, loading]= useAuthState(auth)
    const [destinations, isLoading] = useDestinations();
    const imgStrorageKey = '634b89a1202c978f0b0218c7ddea37ca'
    if(loading){
        <Loading></Loading>
    }
    const onSubmit = async data =>{
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
                    uploadedBy: data.name,
                    place: location,
                    image: img
                }
                //send data to db
                fetch('http://localhost:5000/photos', {
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
                   }
                   else{
                       toast.error('Failed to add this Image')
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
                        

                    <input type="submit" className='btn w-full max-w-xs' value='SUBMIT'/>
                </form>
        </div>
    );
};

export default AddImage;