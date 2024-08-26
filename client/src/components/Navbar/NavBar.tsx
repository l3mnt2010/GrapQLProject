import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { RootState } from '../../redux/store';

const NavBar = () => {
  const user: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  return (
                                        <header className="sticky top-0 z-10">
                                        <nav className="bg-white border-gray-200 lg:px-6 py-3">
                                            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                                                <div className="flex lg:order-2">
                                                    {!user && <Link to="/login" className="text-black dark:text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link>}
                                                    {!user && <Link to="/register" className="text-black dark:text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Register</Link>}
                                                    <div className='h-full w-full content-center font-serif text-cyan-400 mr-10'>{user?.userInformation.username}</div>
                                                    {user && <DropDown username={user.userInformation.username} token={user.token} />}
                                                </div>
                                                <div className="hidden justify-between items-center w-full mx-auto lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                                                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                                        <li>
                                                            <Link to="/" className="block py-2 pr-4 pl-3 hover:underline text-xl text-black font-bold rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-black" aria-current="page">Home</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/services" className="block py-2 pr-4 pl-3 hover:underline text-xl text-black font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-black lg:dark:hover:text-black dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/aboutus" className="block py-2 pr-4 pl-3 hover:underline text-xl text-black font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-black lg:dark:hover:text-black dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent dark:border-gray-700">AboutUs</Link>
                                                        </li>
                                                       
                                                    </ul>
                                                </div>
                                            </div>
                                        </nav>
                                    </header>
  )
}

export default NavBar