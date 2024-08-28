import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createBlackNote, viewContentCreated } from '../../utils/admin/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { verifyAdmin } from '../../utils/help';

const BlackNote = () => {
  const currentUser: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    try {
      if(currentUser) { const res = await createBlackNote(data.content, currentUser.token);
        if (res === 200){
             toast.clearWaitingQueue();
             toast('Okelalalala', { type: 'success'});
        }
      }
    } catch (err) { 
      toast.clearWaitingQueue();
      toast('Something wrong', { type: 'error'});
    }
  };

  const viewContent = async (token: string) => {
     // only local can see
    await viewContentCreated(token);
    toast.clearWaitingQueue();
    toast('You will see in local', { type: 'success' });
  }

  useEffect(() => {
    if(currentUser && verifyAdmin(currentUser.token)){
     toast.clearWaitingQueue();
     toast('Well come admin', { type: 'success' });
    }
    else{
     toast.clearWaitingQueue();
     toast('You not have permission to Access this page', { type: 'error' });
     navigate("/dashboard/course")
    };
   }, []);
  return (

<div className="flex h-screen w-screen select-none items-center justify-center px-2">
      <img
        src="/images/bg.svg"
        className="absolute left-0 top-0 h-screen w-screen"
      />
      <div className="z-10 flex w-full max-w-[424px] rounded bg-dark p-8 text-white shadow-xl">
        <div className="flex w-full !max-w-[420px] shrink-0 flex-col items-center">
          <h1 className="mb-2 text-2xl font-semibold">Hello admin</h1>
          <p className="text-d-gray">Create some content to get more viewer!</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
            <div className="flex flex-col">
              <label
                className={`mb-2 text-xs font-bold uppercase tracking-[0.02em] text-d-gray `}
                htmlFor="content"
              >
                content creator{" "}
               </label>
              <input
                id="content"
                {...register('content', { required: true })}
                required
                type="text"
                name="content"
                className="h-10 w-full rounded border-none bg-d-dark-black p-2.5 outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center mt-3 rounded bg-brand py-2 font-medium transition ease-in hover:bg-d-brand-hover"
            >
              Create
            </button>
            <p className="mt-2.5 text-sm text-d-gray">
              Create black note to capture the flag
            </p>
            <button
              onClick={()=>viewContent(currentUser.token)}
              className="flex h-10 w-20 mx-auto px-2 items-center justify-center mt-3 rounded bg-green-400 py-2 font-medium transition ease-in hover:bg-d-brand-hover"
            >
              See
            </button>
            <p className="z-10 mt-2.5 text-sm text-d-gray">
            Return course ?{" "}
              <Link className="text-d-blue hover:underline" to="/dashboard/course">
                Course
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    
  )
}

export default BlackNote