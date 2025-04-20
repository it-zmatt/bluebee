import React, { useState } from "react";
import Navbar from "./Navbar";
import SkeletonLoading from "./SkeletonLoading";

const SkeletonLoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  // Sample content that matches the skeleton structure
  const sampleContent = (
    <div className="mt-16">
      <div className="rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Ticket Type: Software Issue
        </h2>
        
        <div className="prose prose-lg prose-indigo max-w-none">
          <h3 className="text-xl font-semibold mt-3">Problem Analysis</h3>
          <p className="mt-2 leading-relaxed">
            Based on your description, it looks like you're experiencing issues with your software application crashing during startup. This is a common issue that can be caused by several factors.
          </p>
          
          <h3 className="text-xl font-semibold mt-4">Potential Solutions</h3>
          <ul className="list-disc pl-5 mt-2">
            <li className="mb-1">Try restarting your computer to clear any temporary memory issues</li>
            <li className="mb-1">Check if the software has any pending updates that need to be installed</li>
            <li className="mb-1">Verify that your system meets the minimum requirements for running the application</li>
            <li className="mb-1">Consider reinstalling the application if all else fails</li>
          </ul>
          
          <p className="mt-3 leading-relaxed">
            If these suggestions don't resolve your issue, our IT support team would be happy to provide more personalized assistance.
          </p>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule a Meeting</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Skeleton Loading Demo
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Toggle between skeleton and content
          </p>
        </div>
        
        <div className="flex justify-center mb-16">
          <button
            onClick={toggleLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            {isLoading ? "Show Content" : "Show Skeleton"}
          </button>
        </div>
        
        {isLoading ? <SkeletonLoading /> : sampleContent}
        
        <div className="mt-16 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">About Skeleton Loading</h2>
          <p className="text-gray-700 mb-4">
            Skeleton screens provide a better user experience by showing a preview of the content structure before the actual content loads.
          </p>
          <p className="text-gray-700">
            Key benefits include:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-700">
            <li>Reduced perceived loading time</li>
            <li>Minimized layout shifts when content loads</li>
            <li>Clear indication of what content will appear</li>
            <li>Better user experience than traditional spinners</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingDemo; 