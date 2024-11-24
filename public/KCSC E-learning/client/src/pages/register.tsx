import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../redux/store';
import { registerUser } from '../utils/api';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors }} = useForm<any>({ reValidateMode: 'onBlur' });
                                                                            
  const onSubmit = async (data: any) => {
    try {
        registerUser(data, dispatch, navigate, toast);
        } catch (err) {

        }
  };
return (
 <motion.div
     initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.5 }}
  >
   <div className="flex h-screen w-screen select-none items-center justify-center px-2">
      <img
        src="/images/bg.svg"
        className="absolute left-0 top-0 h-screen w-screen"
      />
      <div className="drop z-10 flex w-full max-w-[424px] gap-10 rounded bg-dark p-8 text-white shadow-xl md:max-w-[784px]">
        <div className="flex w-full !max-w-[420px] shrink-0 flex-col items-center">
          <h1 className="mb-2 text-2xl font-semibold">Let 's create your account!</h1>
          <p className="text-d-gray"> We're so happy to see you in my page!</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
            <div className="flex flex-col mb-2">
              <label
                className={`mb-2 text-xs font-bold uppercase tracking-[0.02em] text-d-gray `}
                htmlFor="username"
              >
                username{" "}               
               </label>
               <input
                id="username"
                {...register('username', { required: true })}
                required
                minLength={6}
                type="text"
                name="username"
                className="h-10 w-full rounded border-none bg-d-dark-black p-2.5 outline-none"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <label
                className={`mb-2 text-xs font-bold uppercase tracking-[0.02em] text-d-gray`}
                htmlFor="password"
              >
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                {...register('password', { required: true })}
                required
                minLength={6}
                name="password"
                className="h-10 w-full rounded border-none bg-d-dark-black p-2.5 outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex h-10 w-full mt-4 items-center justify-center rounded bg-brand py-2 font-medium transition ease-in hover:bg-d-brand-hover"
            >
              Sign up
            </button>
            <p className="mt-2.5 text-sm text-d-gray">
            You have account ?{" "}
              <Link className="text-d-blue hover:underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="ml-auto mt-6 hidden w-full max-w-[240px] shrink-0 flex-col items-center md:flex">
          <div className="relative rounded bg-white p-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/kcsc.png"
                width={50}
                height={50}
                alt="logo"
              />
            </div>
            <img
              src="/images/kcsc.png"
              width={160}
              height={160}
              alt="qr-code"
            />
          </div>
          <h1 className="mb-2 mt-8 text-2xl font-semibold">
            Login with QR Code
          </h1>
          <p className="w-full text-center text-d-gray">
            Scan this with{" "}
            <span className="font-semibold">KCSC mobile app</span> to log in
            instantly.
          </p>
        </div>
      </div>
    </div>
   </motion.div>
  )
}

export default RegisterPage