import React from "react";
import landscape from '../../assets/images/landscape5.gif'
import PrimaryButton from "../Shared/PrimaryButton";

const Contact = () => {
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
      <div className='grid grid-cols-1 justify-items-center gap-5'>
        <input
          type='text'
          placeholder='Email Address'
          className='input w-full max-w-md'
        />
        <input
          type='text'
          placeholder='Subject'
          className='input w-full max-w-md'
        />
        <textarea
          className='textarea w-full max-w-md'
          placeholder='Your message'
          rows={6}
        ></textarea>
        <PrimaryButton>Submit</PrimaryButton>
      </div>
    </div>
  );
};

export default Contact;