import React, { useState, useRef } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import MyMultiline from "./forms/MyMultiline";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import axiosInstance from "../api";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import SkeletonLoading from "./SkeletonLoading";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function Create() {
  const defaultValues = {
    question: "",
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
    mode: "onChange",
  });

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
  
  
  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };
  
  const handleSubmitTicket = async () => {
    try {
        setIsLoading(true); // Show loading screen
        // Here you would typically make an API call to submit the ticket
        console.log('Submitting ticket for time slot:', selectedTimeSlot);
        // Add your API call here
        
        // Simulate network delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Appointment scheduled successfully!');
        setShowTimeSlots(false);
        setSelectedTimeSlot(null);
    } catch (error) {
        console.error('Error submitting ticket:', error);
        alert('Failed to schedule appointment. Please try again.');
    } finally {
        setIsLoading(false); // Hide loading screen
    }
  };
  

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [predictedType, setPredictedType] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const messageRef = useRef(null);

  const onSubmit = (data) => {
    setIsAnswerLoading(true); // Start skeleton loading for the answer section
    setFormSubmitted(true); // Show the answer section with skeleton loading
    
    axiosInstance
      .post(
        "/api/questions/",
        { question: data.question },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Question submitted:", response.data);
        setPredictedType(response.data.ticket);
        setGeneratedAnswer(response.data.answer);
        setIsAnswerLoading(false); // Stop skeleton loading
        reset();
        window.scrollBy({
          top: window.innerHeight / 2 + window.innerHeight / 4,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        console.error(
          "Error submitting question:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to submit your question. Please try again.");
        setFormSubmitted(false); // Hide the answer section on error
        setIsAnswerLoading(false); // Stop skeleton loading
      });
  };

  return (
    <div className="bg-white">
      {isLoading && <LoadingScreen />}
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Ask Your Question
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get instant answers to your IT-related questions
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex gap-4">
              <MyMultiline
                name="question"
                label="Question"
                width="100%"
                placeholder="Enter your question here"
                control={control}
                className="flex-1"
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-6  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Answer Section with Skeleton Loading */}
          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              {isAnswerLoading ? (
                <SkeletonLoading />
              ) : (
                <div className="rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-center">
                    Ticket Type: {predictedType}
                  </h2>
                
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
                      {typeof generatedAnswer === "string" ? generatedAnswer : JSON.stringify(generatedAnswer)}
                    </ReactMarkdown>
                  </div>
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
                  </div>
                </div>
              )}
            </motion.div>
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
}

export default Create;
