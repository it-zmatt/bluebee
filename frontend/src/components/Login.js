import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api'; // Import your custom axios instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import MyTextField from './forms/MyTextField'; // Ensure the path is correct
import Navbar from './Navbar';
const Login = () => {
    const { control, handleSubmit, setError } = useForm();
    const navigate = useNavigate(); // Use navigate for redirection after login

    const handleLogin = async (data) => {
        const { email, password } = data;

        try {
            const response = await axiosInstance.post('/login/', {
                username: email, // username should be email (as expected by the backend)
                password,
            });

            // Save the tokens if needed (access and refresh tokens)
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            const user = response.user;
            // After successful login
            localStorage.setItem('user', JSON.stringify(user)); // or just set an indicator like `localStorage.setItem('isLoggedIn', 'true')`

            // Redirect to the profile page
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 401) {
                setError('non_field_errors', {
                    type: 'manual',
                    message: 'Invalid username or password.',
                });
            } else {
                alert("Error logging in. Please try again later.");
            }
        }
    };

    return (

        <div className="bg-white">
            <Navbar />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="mx-auto max-w-2xl py-32 ">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl mb-8">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-6 max-w-md mx-auto">
                            <div>
                                <MyTextField
                                    label="Email"
                                    placeholder="Enter your email"
                                    name="email"
                                    control={control}
                                    width="100%"
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <MyTextField
                                    label="Password"
                                    placeholder="Enter your password"
                                    name="password"
                                    control={control}
                                    width="100%"
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Login
                                </button>
                            </div>

                            <p className="mt-4 text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Sign up now
                                </a>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
