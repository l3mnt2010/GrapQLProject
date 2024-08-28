import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { findSubjectBySound } from '../../utils/api';

const FindSubject = () => {
  const user: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    try {
      if(user) { const res = await findSubjectBySound(data.firstName, user.token);
        if (res.searchSubjectByName.length > 0){
             toast.clearWaitingQueue();
             toast('Found', { type: 'success'});
        }
      }
    } catch (err) { 
      toast.clearWaitingQueue();
      toast('Not Found', { type: 'error'});
    }
  };

  return (

<div className="flex select-none items-center justify-center pl-10">
      <div className=" flex w-full pl-10 py-7 text-white">
        <div className="flex w-full !max-w-[420px] shrink-0 flex-col items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex w-full">
            <div className="flex flex-col">
              <input
                id="firstName"
                {...register('firstName', { required: true})}
                required
                type="text"
                name="firstName"
                className="h-10 w-full text-white rounded-s-md border-none bg-gray-800 p-2.5 outline-none"
                placeholder="Enter your subject name"
              />
            </div>
            <button
              type="submit"
              className="flex h-10 items-center justify-center rounded-e-md bg-brand p-2 font-medium transition ease-in hover:bg-d-brand-hover"
            >
              Check
            </button>
          </form>
        </div>
      </div>
    </div>
    
  )
}

export default FindSubject