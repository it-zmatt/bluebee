import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="animate-pulse mt-16">
      <div className="rounded-lg shadow-sm p-8">
        {/* Title skeleton */}
        <div className="flex justify-center mb-6">
          <div className="h-8 bg-gray-200 rounded-md w-3/4 max-w-md"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          {/* Paragraph blocks */}
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-10/12"></div>
          
          {/* Sub-heading */}
          <div className="h-6 bg-gray-300 rounded-md w-1/3 mt-6"></div>
          
          {/* List items with indentation */}
          <div className="pl-5 space-y-3 mt-4">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-gray-300 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-gray-300 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-10/12"></div>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-gray-300 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
          
          {/* Another paragraph block */}
          <div className="h-4 bg-gray-200 rounded-md w-full mt-4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
        </div>
        
        {/* Meeting section skeleton */}
        <div className="mt-8 border-t pt-8">
          <div className="h-6 bg-gray-300 rounded-md w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-md w-40"></div>
          
          {/* Time slots grid skeleton */}
          <div className="mt-6">
            <div className="h-5 bg-gray-300 rounded-md w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-12 bg-gray-200 rounded-md w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading; 