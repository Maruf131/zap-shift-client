import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img src={logo} alt="" />
                <h2 className='text-2xl font-extrabold -ml-3'>Profast</h2>
            </div>
        </Link>
    );
};

export default ProFastLogo;