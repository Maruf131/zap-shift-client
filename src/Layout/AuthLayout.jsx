import React from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'
import ProFastLogo from '../Pages/Shared/Logo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className=" lg:p-12 p-5 bg-base-200 ">
            <div>
                <ProFastLogo></ProFastLogo>
            </div>
            <div className="lg:hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                    className='w-full'
                        src={authImage}
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;