import React, { useState, useEffect } from 'react';
import axiosInstance from '../api'; // Import your custom axios instance
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';

const History = () => {

    const [userHistory, setUserHistory] = useState([]); // Default to empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Start with null for no error
    const navigate = useNavigate(); // Hook to navigate to another route

    useEffect(() => {

        const fetchHistory = async () => {

            const token = localStorage.getItem('access_token');

            if (!token) {
                setError('No Access Token was found. Please Login');
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get('/api/questions/history/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserHistory(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile data');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>; // Display any errors that occurred
    }

    // Define the columns for the DataGrid
    const columns = [
        { 
            field: 'number', 
            headerName: 'ID', 
            flex: 0.1,
            renderCell: (params) => (
                <button
                    onClick={() => navigate(`/record/${params.row.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                >
                    {params.value}
                </button>
            ),
        },
        { field: 'question', headerName: 'Question', flex: 0.3 },
        { field: 'ticket', headerName: 'Ticket', flex: 0.2 },
        { field: 'created_at', headerName: 'Created At', flex: 0.1 },
        { field: 'answer', headerName: 'Answer', flex: 0.3 },
    ];

    // Format the rows
    const rows = userHistory.map((item, index) => ({
        id: item.q_id, // Use the actual ID from the backend if available
        number: index + 1,
        question: item.question,
        ticket: item.ticket,
        created_at: dayjs(item.created_at).format('YYYY-MM-DD'),
        answer: item.answer,

    }));

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

                <div className="mx-auto max-w-7xl py-24">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                            History
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            View all your previous questions and answers
                        </p>
                    </div>

                    <div className="mt-8  rounded-lg shadow-sm">
                        {userHistory.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No questions found in your history</p>
                                <button
                                    onClick={() => navigate('/create')}
                                    className="mt-4 bg-indigo-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Ask a Question
                                </button>
                            </div>
                        ) : (
                            <DataGrid
                                sx={{
                                    border: 'none',
                                    '& .MuiDataGrid-cell': {
                                        borderBottom: '1px solid #f0f0f0',
                                    },
                                    '& .MuiDataGrid-columnHeaders': {
                                        borderBottom: 'none',
                                    },
                                    '& .MuiDataGrid-virtualScroller': {
                                    },
                                    '& .MuiDataGrid-footerContainer': {
                                        borderTop: 'none',
                                    },
                                    '& .MuiDataGrid-toolbarContainer': {
                                        padding: '1rem',
                                    },
                                }}
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                autoHeight
                                disableSelectionOnClick
                                slots={{
                                    toolbar: GridToolbar,
                                }}
                            />
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

export default History;
