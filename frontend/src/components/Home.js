import React from 'react';
import Navbar from './Navbar';
import MyHome from './forms/MyHome';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, CalendarIcon, TicketIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    name: 'AI-Powered Support',
    description: 'Get immediate answers to your IT questions without waiting for human support. Our AI system provides quick, accurate solutions.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure & Private',
    description: 'Your questions and technical data are protected with enterprise-grade security. All communications are encrypted and private.',
    icon: LockClosedIcon,
  },
  {
    name: 'Smart Knowledge Base',
    description: 'Access a comprehensive database of IT solutions that grows smarter with each interaction, providing better answers over time.',
    icon: ServerIcon,
  },
  {
    name: 'Case Management',
    description: 'Submit IT support cases and receive automated ticket numbers for easy tracking and follow-up.',
    icon: TicketIcon,
  },
  {
    name: 'Appointment Scheduling',
    description: 'Schedule in-person IT support meetings with flexible time slots.',
    icon: CalendarIcon,
  },
];

const developer = {
  name: 'Mohamed Taous',
  role: 'Full Stack Developer',
  imageUrl: '/Developer.jpg',
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MyHome />
      
      {/* Features Section */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">IT Support Simplified</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  A smarter way to solve IT issues
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Experience instant IT support powered by advanced AI. Get solutions to your technical problems in seconds, not hours.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              src="/About.jpg"
              alt="IT Support Dashboard"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the Developer</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Dedicated to creating innovative solutions that make IT support more accessible and efficient.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src={developer.imageUrl} alt="" />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{developer.name}</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">{developer.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-gray-400">© 2023 IT Support Assistant. All rights reserved.</p>
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
};

export default Home;
