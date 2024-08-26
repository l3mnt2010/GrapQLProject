import React, { useEffect, useState } from 'react';
import { deleteDetailUser, getAllUser } from '../../utils/admin/api';
import NavBar from '../Navbar/NavBar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


interface User {
  id?: number;
  username?: string;
  admin?: number;
  avatar?: string;
}

const UserTable = () => {
  const currentUser: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  const [users, setAllUsers] = useState<any>([]);
  const navigate = useNavigate();
  const handleDeleteUser = async (id: string, token: string) => {
     const res = await deleteDetailUser(id, token);
     if (res.deleteUser.success === true){
      fetchUsers(currentUser.token);
      toast.clearWaitingQueue();
      toast('Delete success!', { type: 'success' });
     } else {
        toast.clearWaitingQueue();
        toast('Delete failed!', { type: 'error' });        
     }
     
  }

  const fetchUsers = async (token: string) => {
     try {
     const response = getAllUser(token);
     setAllUsers(await response);
     } catch (err) {
     } finally {
     }
};

  useEffect(() => {
   if(currentUser){ fetchUsers(currentUser.token)}
   else{
    navigate("/login")
   };
  }, []);

  return (                              
    <div className="w-full h-full">
      <NavBar />
    <div className="block w-full h-4/5 overflow-y-scroll pl-40">
      <div className='flex'>
      <h1 className='text-blue-600 font-bold text-3xl mb-5'>All user</h1>
      {/* <button
              type="submit"
              className="flex h-10 ml-[65%] items-center p-2 justify-center rounded-lg bg-brand py-2 font-medium transition ease-in hover:bg-d-brand-hover"
            >
              Add new user
            </button> */}
      </div>
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">id</th>
            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">username</th>
            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">admin</th>
            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">Edit</th>
            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users?.users?.map((user: any) => (
            <tr key={user.id} className="text-gray-500">
              <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">{user.id}</th>
              <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">{user.username}</th>
              <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                {user.admin === 0 ? 'user' : 'admin'}
              </td>
              <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                <a className="btn bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium uppercase py-2 px-4 rounded transition duration-200" href={`/edit_user.php?edit_user_id_ad=${user.id}`}>Edit</a>
              </td>
              <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                <button className="btn bg-red-600 hover:bg-red-700 text-white text-sm font-medium uppercase py-2 px-4 rounded transition duration-200">
                  <button onClick={()=>handleDeleteUser(user.id, currentUser.token)}>Delete</button>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </div>
  );
}

export default UserTable;
