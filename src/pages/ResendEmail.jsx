import React from 'react';
import { useLocation } from 'react-router-dom';

export function ResendEmail() {
    const location = useLocation();
    const email = location.state?.email || "your email";

    function submitHandler() {
        // Call backend API to resend email
        console.log("Resending email to:", email);
    }

    return (
        <div className='w-full min-h-[500px] flex justify-center items-center p-5'>
            <div className="w-[400px] flex flex-col justify-center gap-4">
                <h1 className='text-2xl text-[#F1F2FF] font-bold'>Check Email<sup className='text-red-500'>*</sup></h1>
                <p className='text-[18px] text-[#AFB2BF]'>
                    We have sent the reset email to {email}
                </p>
                <button className='w-full h-10 text-[#000814] font-semibold bg-[#FFD60A] rounded-md' onClick={submitHandler}>
                    Resend Email
                </button>
            </div>
        </div>
    );
}

export default ResendEmail;
