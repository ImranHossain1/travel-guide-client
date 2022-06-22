import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import landscape from '../../assets/images/landscape5.gif'
import PrimaryButton from "../Shared/PrimaryButton";

const Contact = () => {
  const { register, formState: { errors }, handleSubmit , reset} = useForm();
  const onSubmit =async data => {
      const mail ={
        senderEmail: data.senderEmail,
        subject: data.subject,
        body: data.body,
        unread: true
      }
      console.log(mail)
      fetch(' https://aqueous-dawn-43600.herokuapp.com/email',{
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(mail)
      })
      .then(res=>res.json())
      .then(inserted=> {
        if(inserted.insertedId){
          toast.success('Email send Successfully');
          reset()
        }
        else{
            toast.error('Failed to send email')
        }
      })
  }
  return (
    <div className='px-10 py-14  my-12 w-full bg-no-repeat bg-center' style={{
        background:`url(${landscape})`
    }} >
      <div className='text-center pb-14 text-gray-300'>
        <p className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-secondary to-primary'>
          Contact Us
        </p>
        <h1 className='text-4xl'>Stay connected with us</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 justify-items-center gap-5'>
        <input
          type="email"
          placeholder='Email Address'
          className='input w-full max-w-md'
          {...register("senderEmail", {
            required:{
                value: true,
                message: "Email is Required"
            },
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'Provide a valid Email' // JS only: <p>error message</p> TS only support string
            }
          })}
        />
        {
          errors.email &&
            <label className="label w-full max-w-md rounded-lg bg-gray-700 pl-5 font-semibold justify-center ">
              {errors.senderEmail?.type === 'required' && <span className="label-text-alt text-red-500">{errors.senderEmail.message}</span>}
              {errors.senderEmail?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.senderEmail.message}</span>}
            </label>
        }
        <input
          type='text'
          placeholder='Subject'
          className='input w-full max-w-md'
          {...register("subject", {
            required:{
                value: true,
                message: "Subject is Required"
            }
          })}
        />
        {
          errors.subject && 
            <label className="label w-full max-w-md rounded-lg bg-gray-700 pl-5 font-semibold justify-center">
                {errors.subject?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.subject.message}</span>}
            </label>
        }
        <textarea
          className='textarea w-full max-w-md'
          placeholder='Your message'
          rows={6}
          {...register("body", {
            required:{
                value: true,
                message: "Message is Required"
            }
          })}
        ></textarea>
        {
          errors.body &&
          <label className="label w-full max-w-md rounded-lg bg-gray-700 pl-5 font-semibold justify-center">
              {errors.body?.type === 'required' && <span className="label-text-alt text-red-500">{errors.body.message}</span>}
          </label>
        }
        <PrimaryButton>Submit</PrimaryButton>
      </form>
    </div>
  );
};

export default Contact;