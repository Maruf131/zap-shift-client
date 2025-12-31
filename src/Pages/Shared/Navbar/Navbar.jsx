import React from 'react';
import { NavLink } from 'react-router';
import ProFastLogo from '../Logo/ProFastLogo';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const handleSignOut = () => {
        logOut()
            .then(result => {
                console.log(result.user);

            })
            .catch(error => {
                console.error(error)
            })
    }
    const navItem = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        {
            user && <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
        }

        <li><NavLink to='/beARider'>Be a Rider</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItem}
                    </ul>
                </div>
                <ProFastLogo></ProFastLogo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <NavLink onClick={handleSignOut} className='btn bg-primary text-black font-extrabold hover:bg-white'>Sign Out</NavLink> :
                        <>
                            <NavLink to='/register' className='btn bg-primary text-black font-extrabold hover:bg-white'>Register</NavLink>
                            <NavLink to='/login' className='btn bg-primary text-black font-extrabold hover:bg-white ml-4'>Login</NavLink>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;