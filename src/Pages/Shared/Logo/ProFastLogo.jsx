import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <h2 className='text-2xl font-extrabold -ml-3'>Profast</h2>
        </div>
    );
};

export default ProFastLogo;