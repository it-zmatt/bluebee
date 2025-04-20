import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";

const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate an API call
  const simulateApiCall = () => {
    setIsLoading(true);
    
    // Simulate a network request with a timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
  };

  return (
    <div className="bg-white min-h-screen">
      {isLoading && <LoadingScreen />}
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Loading Screen Demo
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Test the loading screen component
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-8">
          <button
            onClick={simulateApiCall}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Simulate API Call
          </button>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-sm w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">About this demo</h2>
            <p className="text-gray-700">
              Click the button above to simulate a 3-second API call that will display the loading screen. The loading screen includes:
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
              <li>A full-screen overlay with semi-transparent background</li>
              <li>A custom spinner animation built with Tailwind CSS</li>
              <li>A pulsing "Loading..." text</li>
              <li>A smooth fade-in animation powered by Framer Motion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo; 