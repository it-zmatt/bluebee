import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import Navbar from './Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const generateTimeSlots = () => {
    const slots = [];
    let hour = 7; // Start at 7 AM
    let minute = 0;
    
    while (hour < 19) { // Until 7 PM
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        const timeString = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        slots.push(timeString);
        
        minute += 45; // Add 45 minutes
        if (minute >= 60) {
            hour += 1;
            minute = 0;
        }
    }
    
    return slots;
};

const Record = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [ticketNumber, setTicketNumber] = useState(null);

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await axiosInstance.get(`/api/questions/history/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setRecord(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching record:', err);
                setError('Failed to load record');
                setLoading(false);
            }
        };

        fetchRecord();
    }, [id]);

    const handleTimeSlotSelect = (slot) => {
        setSelectedTimeSlot(slot);
    };

    const handleSubmitTicket = async () => {
        try {
            // Generate ticket number (in production this should come from backend)
            const newTicketNumber = 'IT' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
            setTicketNumber(newTicketNumber);
            
            // Here you would typically make an API call to submit the ticket
            console.log('Submitting ticket:', {
                timeSlot: selectedTimeSlot,
                ticketNumber: newTicketNumber
            });
            
            // Show success message with ticket number
            alert(`Appointment scheduled successfully!\nYour ticket number is: ${newTicketNumber}`);
            setShowTimeSlots(false);
            setSelectedTimeSlot(null);
        } catch (error) {
            console.error('Error submitting ticket:', error);
            alert('Failed to schedule appointment. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="">
            <Navbar />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="mx-auto max-w-4xl py-24">
                    {record && (
                        <div className="rounded-lg shadow-sm p-8">
                            <div className="mb-8">
                                <button
                                    onClick={() => navigate('/history')}
                                    className="text-indigo-600 hover:text-indigo-500 flex items-center"
                                >
                                    ← Back to History
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Question</h2>
                                    <p className="text-gray-700">{record.question}</p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Type</h2>
                                    <p className="text-gray-700">{record.ticket}</p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Answer</h2>
                                    <div className="prose prose-lg prose-indigo max-w-none">
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
                                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                                h2: ({ children }) => <h2 className="text-2xl font-bold mt-4">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-xl font-semibold mt-3">{children}</h3>,
                                                p: ({ children }) => <p className="mt-2 leading-relaxed">{children}</p>,
                                                strong: ({ children }) => <strong className="font-semibold text-indigo-700">{children}</strong>,
                                            }}
                                        >
                                            {record.answer}
                                        </ReactMarkdown>
                                    </div>
                                </div>

                                {/* Submit Ticket Section */}
                                <div className="mt-8 border-t pt-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule a Meeting</h2>
                                    <button
                                        onClick={() => setShowTimeSlots(!showTimeSlots)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Submit Ticket
                                    </button>

                                    {showTimeSlots && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold mb-4">Select a Time Slot</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {generateTimeSlots().map((slot, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleTimeSlotSelect(slot)}
                                                        className={`p-3 text-sm rounded-md border ${
                                                            selectedTimeSlot === slot
                                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                                                        }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                            {selectedTimeSlot && (
                                                <div className="mt-6">
                                                    <button
                                                        onClick={handleSubmitTicket}
                                                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                                                    >
                                                        Confirm Appointment
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {ticketNumber && (
                                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                            <h3 className="text-lg font-semibold text-green-800">Appointment Confirmed!</h3>
                                            <p className="text-green-700 mt-2">Your ticket number is: <span className="font-bold">{ticketNumber}</span></p>
                                            <p className="text-green-700 mt-1">Selected time: <span className="font-semibold">{selectedTimeSlot}</span></p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Created At</h2>
                                    <p className="text-gray-700">
                                        {new Date(record.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
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

export default Record; 