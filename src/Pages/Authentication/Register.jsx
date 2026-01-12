import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const axiosInstance = useAxios();
    const [profilePic, setProfilePic] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        console.log(data);

        // register 
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);
                //update userInfo in the database
                const userInfo = {
                    email: data.email,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data)

                
                // update profile user in the firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('Updated profile picture');
                        navigate(from)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imageUploadUrl, formData)
        setProfilePic(res.data.data.url);

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Register now!</h1>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Your Name</label>
                            <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                            {
                                errors.name?.type === 'required' && <P className='text-red-500'>Enter Your Name</P>
                            }
                            {/* Profile Picture */}
                            <label className="label">Profile Picture</label>
                            <input type="file"
                                onChange={handleImageUpload}
                                className="input" placeholder="Your Profile Picture" />

                            {/* Email */}
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {
                                errors.email?.type === 'required' && <P className='text-red-500'>Enter Your Email</P>
                            }
                            {/* Password  */}
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            {
                                errors.password?.type === 'required' && <p className='text-red-500'>Enter Your password</p>
                            }
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-500'>Password must have 6 characters</p>
                            }
                            <button className="btn bg-primary text-black font-extrabold mt-4">Register</button>
                        </fieldset>
                        <p>Already have an account? <Link className='underline text-yellow-200' to='/login'>Login</Link></p>
                    </div>
                </div>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;