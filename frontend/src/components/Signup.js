import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api'; // Import your custom axios instance
import { useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import MyTextField from './forms/MyTextField'; // Ensure the path is correct
import Navbar from './Navbar';

const Signup = () => {
    const { control, handleSubmit, formState: { errors }, setError, watch } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const password = watch("password");

    const validationRules = {
        firstName: {
            required: "First name is required",
            minLength: {
                value: 2,
                message: "First name must be at least 2 characters"
            }
        },
        lastName: {
            required: "Last name is required",
            minLength: {
                value: 2,
                message: "Last name must be at least 2 characters"
            }
        },
        username: {
            required: "Username is required",
            minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
            },
            pattern: {
                value: /^[a-zA-Z0-9_]*$/,
                message: "Username can only contain letters, numbers, and underscores"
            }
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            }
        }
    };

    const handleServerErrors = (error) => {
        const errorData = error.response?.data;
        
        // Clear previous server error
        setServerError('');

        if (typeof errorData === 'object') {
            // Handle field-specific errors
            Object.keys(errorData).forEach(field => {
                const message = Array.isArray(errorData[field]) 
                    ? errorData[field].join(' ') 
                    : errorData[field];
                
                // Map backend field names to frontend field names
                const fieldMapping = {
                    'first_name': 'firstName',
                    'last_name': 'lastName',
                    'username': 'username',
                    'email': 'email',
                    'password': 'password'
                };

                const frontendField = fieldMapping[field] || field;
                
                setError(frontendField, {
                    type: 'server',
                    message: message
                });
            });
        } else if (Array.isArray(errorData?.detail)) {
            // Handle array of error messages
            setServerError(errorData.detail.join(' '));
        } else if (errorData?.detail) {
            // Handle single error message
            setServerError(errorData.detail);
        } else {
            // Fallback error message
            setServerError('An error occurred during signup. Please try again.');
        }
    };

    const onSubmit = async (data) => {
        try {
            setServerError('');
            const response = await axiosInstance.post('signup/', {
                username: data.username,
                email: data.email,
                password: data.password,
                first_name: data.firstName,
                last_name: data.lastName
            });

            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/');
            }
        } catch (error) {
            console.error('Signup error:', error);
            handleServerErrors(error);
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

                <div className="mx-auto max-w-2xl py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl mb-8">
                            Create Account
                        </h1>
                        {serverError && (
                            <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                {serverError}
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 max-w-md mx-auto">
                            <div className="space-y-4">
                                <MyTextField
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    name="firstName"
                                    control={control}
                                    rules={validationRules.firstName}
                                    width="100%"
                                    type="text"
                                    className="w-full"
                                />
                                <MyTextField
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    name="lastName"
                                    width="100%"
                                    control={control}
                                    rules={validationRules.lastName}
                                    type="text"
                                    className="w-full"
                                />
                                <MyTextField
                                    label="Username"
                                    placeholder="Choose a username"
                                    name="username"
                                    width="100%"
                                    control={control}
                                    rules={validationRules.username}
                                    type="text"
                                    className="w-full"
                                />
                                <MyTextField
                                    label="Email"
                                    placeholder="Enter your email"
                                    name="email"
                                    width="100%"
                                    control={control}
                                    rules={validationRules.email}
                                    type="email"
                                    className="w-full"
                                />
                                <MyTextField
                                    label="Password"
                                    placeholder="Create a password"
                                    name="password"
                                    width="100%"
                                    control={control}
                                    rules={validationRules.password}
                                    type="password"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>

                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Log in
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

export default Signup;
