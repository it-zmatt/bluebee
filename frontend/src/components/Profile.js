import React, { useState, useEffect } from 'react';
import axiosInstance from '../api'; // Import your custom axios instance
import { useNavigate } from 'react-router-dom';
import MyProfile from './forms/MyProfile'; // Ensure the path is correct
import Navbar from './Navbar';


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to navigate to another route

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                setError('No access token found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get('/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                navigate('/login');
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        // Remove tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Redirect to login page
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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

                <div className="mx-auto width-100 max-w-2xl py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl mb-8">
                            Personal Information
                        </h1>
                        {userData && (
                            <div className="mt-8 space-y-6 max-w-2xl mx-auto text-left rounded-lg shadow-sm p-8">
                                <div>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">First Name</label>
                                            <p className="mt-1 text-base text-gray-900">{userData.first_name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Last Name</label>
                                            <p className="mt-1 text-base text-gray-900">{userData.last_name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Username</label>
                                            <p className="mt-1 text-base text-gray-900">{userData.username}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <button
                                        onClick={() => navigate('/create')}
                                        className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4"
                                    >
                                        Ask a Question
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
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

export default Profile;
