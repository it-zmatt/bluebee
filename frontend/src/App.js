import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Question from './components/Question';
import Profile from './components/Profile';
import History from './components/History';
import Record from './components/Record';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Correct imports
import { Helmet } from 'react-helmet';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import About from 'components/About';




function App() {
    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
                />
            </Helmet>
            <div className="App" style={{ fontFamily: '"Baloo Bhaijaan 2", sans-serif', fontWeight: 500 }} >
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/about" element={<About />} />
                        <Route 
                            path="/profile" 
                            element={<PrivateRoute><Profile /></PrivateRoute>} 
                        /> {/* Protected Route */}
                        <Route 
                            path="/create" 
                            element={<PrivateRoute><Question /></PrivateRoute>} 
                        /> {/* Protected Route */}

                        <Route 
                            path="/history" 
                            element={<PrivateRoute><History /></PrivateRoute>} 
                        /> {/* Protected Route */}
                        <Route 
                            path="/record/:id" 
                            element={<PrivateRoute><Record /></PrivateRoute>} 
                        />
                    </Routes>
                </Router>
            </div>
        
        
        </>
       
    );
}

export default App;
