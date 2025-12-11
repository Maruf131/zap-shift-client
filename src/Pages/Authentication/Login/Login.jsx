import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);

        // sign in
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);

            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            {
                                errors.password?.type === 'required' && <p className='text-red-500'>Enter Your password</p>
                            }
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-500'>Password must have 6 characters</p>
                            }
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn bg-primary text-black font-extrabold mt-4">Login</button>
                        </fieldset>
                        <p>New to this website? <Link className='underline text-yellow-200' to='/register'>Register</Link></p>
                    </div>
                </div>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;