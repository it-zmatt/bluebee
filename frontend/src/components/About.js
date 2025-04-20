import React from 'react';
import Navbar from './Navbar';
import { CheckCircleIcon, UserGroupIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const values = [
  {
    name: 'Innovation First',
    description: 'We leverage cutting-edge AI technology to provide instant, accurate IT support solutions.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Customer-Centric',
    description: 'Your success is our priority. We ensure every interaction is helpful and meaningful.',
    icon: UserGroupIcon,
  },
  {
    name: '24/7 Availability',
    description: 'IT issues dont wait for business hours, and neither do we. Round-the-clock support when you need it.',
    icon: ClockIcon,
  },
  {
    name: 'Quality Assured',
    description: 'Every solution is verified and tested to ensure you get the best possible support.',
    icon: CheckCircleIcon,
  },
];

const benefits = [
  {
    name: 'Instant Solutions',
    description: 'Get immediate answers to your IT questions through our AI-powered system.',
  },
  {
    name: 'Expert Support',
    description: 'Access to skilled IT professionals for complex issues.',
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book in-person support at your convenience with our easy scheduling system.',
  },
  {
    name: 'Knowledge Base',
    description: 'Access our growing database of IT solutions and best practices.',
  },
];

const stats = [
  { name: 'Active Users', value: '10,000+' },
  { name: 'Issues Resolved', value: '50,000+' },
  { name: 'Response Time', value: '< 1 min' },
  { name: 'Satisfaction Rate', value: '99%' },
];

export default function About() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 w-[70vw] mx-auto">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Revolutionizing IT Support
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're on a mission to make IT support accessible, efficient, and intelligent. Our AI-powered platform 
              combines cutting-edge technology with human expertise to deliver exceptional support experiences.
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-16">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-indigo-600 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Values Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Our Values</h2>
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.name} className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <value.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{value.name}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 text-center">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              Why Choose Us
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.name} className="relative flex flex-col gap-6 sm:flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <CheckCircleIcon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{benefit.name}</h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-gray-400">© 2024 IT Support Assistant. All rights reserved.</p>
            <div className="mt-4 flex space-x-6 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 