import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import avt from './../../assets/images/Rectangle41.png'
import { logOutUser } from '../../utils/api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/store';
import { loginFailure } from '../../redux/slide/authSlide';

interface PropsUserName {
    username: string;
    img?: string;
    token: string;
}

const DropDown:React.FC<PropsUserName> = ({ username, token }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenDropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
      setDropDown(!isOpenDropDown);
  }

  const handleLogout = async (token: string) => {
    try {
      const response: any = await logOutUser(token, navigate);
      if (await response.success) {
        dispatch(loginFailure());
        toast.clearWaitingQueue();
        toast('Logout success!', { type: 'success' });
        navigate("/login");
      }
    } catch (err) {
        
    }
  }
  return (
    <div className=''>
    <button onClick={handleDropDown} id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-12 h-12 font-medium rounded-full text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      <img src={avt} className='w-full h-full' />
    </button>
    <div id="dropdownInformation" className={`z-10 ${isOpenDropDown ? '' : 'hidden'} bg-white divide-y divide-gray-100 absolute right-10 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{username}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
          </li>
          <li>
            <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
          </li>
        </ul>
        <div className="py-2">
          <button onClick={()=>handleLogout(token)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
        </div>
    </div>
    </div>
  )
}

export default DropDown