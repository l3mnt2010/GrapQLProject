import React, { useEffect, useState } from 'react';
import { deleteDetailUser, getAllUser } from '../../utils/admin/api';
import NavBar from '../Navbar/NavBar';
import { toast } from 'react-toastify';


interface User {
  id?: number;
  username?: string;
  admin?: number;
  avatar?: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = () => {
  const [users, setUsers] = useState<any>([]);
  
  const handleDeleteUser = async (id: string) => {
     const res = await deleteDetailUser(id);
     if (res?.status === 200){
      fetchUsers();
      toast.clearWaitingQueue();
      toast('Delete success!', { type: 'success' });
     } else {
        toast.clearWaitingQueue();
        toast('Delete failed!', { type: 'error' });        
     }
     
  }

  const fetchUsers = async () => {
                                        try {
                                          const response = getAllUser();
                                          setUsers(await response);
                                        } catch (err) {
                                        } finally {
                                        }
};

  useEffect(() => {
    fetchUsers();
  }, []);
  return (                              
    <div className="w-full h-full">
      <NavBar />
    <div className="block w-full overflow-x-auto pl-40 pt-28">
      <div className='flex'>
      <h1 className='text-blue-600 font-bold text-3xl mb-5'>All user</h1>
      <button
              type="submit"
              className="flex h-10 ml-[65%] items-center p-2 justify-center rounded-lg bg-brand py-2 font-medium transition ease-in hover:bg-d-brand-hover"
            >
              Add new user
            </button>
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
          {users?.users?.map((user: { id: any | null | undefined; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; admin: number; }) => (
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
                  <button onClick={()=>handleDeleteUser(user.id)}>Delete</button>
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
