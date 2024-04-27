import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="bg-gray-800 border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">RecomZone</span>
                    </Link>
                    <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded={isMenuOpen ? "true" : "false"}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
                            <li>
                                <Link to="/" className={`block py-2 px-3 md:p-0 text-white rounded md:bg-transparent ${location.pathname === '/' ? 'text-white md:text-blue-500 bg-blue-600' : ''}`} aria-current={location.pathname === '/' ? "page" : undefined}>Home</Link>
                            </li>
                            {/* <li>
                                <Link to="/upload" className={`block py-2 px-3 md:p-0 text-white rounded md:bg-transparent ${location.pathname === '/upload' ? 'text-white md:text-blue-500 bg-blue-600' : ''}`} aria-current={location.pathname === '/upload' ? "page" : undefined}>Upload</Link>
                            </li> */}
                            <li>
                                <Link to="https://github.com/shubhamore" target='_blank' className="block py-2 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
