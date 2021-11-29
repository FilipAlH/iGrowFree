import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <nav className="h-20 bg-white shadow-lg">
            <div className="mt-2 mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div className="flex items-center py-4 px-2">
                            <Link className="text-light" to="/">
                                <h1 className="font-bold text-gray-500 text-lg">iGrowFree    </h1>
                            </Link>
                            <p className="font-semibold text-gray-500 text-lg">......Shape your life better.</p>
                        </div>
                        <div className="md:flex items-center space-x-1">
                            <Link className="py-4 px-2 text-blue-500 font-semibold hover:text-green-500 transition duration-300" to="/">Home</Link>
                            <Link className="py-4 px-2 text-blue-500 font-semibold hover:text-green-500 transition duration-300" to="/threads">Blog</Link>
                        </div>
                    </div>
                    <div className="md:flex items-center space-x-3">
                        {Auth.loggedIn() ? (
                            <>
                                <span className="font-semibold text-gray-500 text-lg">Hey there, {Auth.getProfile().data.username}!</span>
                                <button className="py-2 px-2 font-medium text-white bg-gray-500 rounded hover:bg-red-400 transition duration-300" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300" to="/login">
                                    Login
                                </Link>
                                <Link className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300" to="/signup">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;