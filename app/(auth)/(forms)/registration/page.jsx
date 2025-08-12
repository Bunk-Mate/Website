'use client';

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/api_constants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@/app/_contexts/user_name';
import { useNotifications } from '@/app/_contexts/notification';
import Eye from '@/components/svg/eye';
import EyeSlash from '@/components/svg/eye_slash';
import { NOTIF_TYPE } from '@/app/_enums/notification';
import { PASSWORD_STRENGTH } from '@/app/_enums/auth';
import { checkPasswordStrength } from '@/app/_utils/helpers';
//axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function RegistrationForm() {
   const [state, setState] = useState({
      username: '',
      password: '',
      confirmpassword: '',
      successMessage: null,
   });
   const { setUserID } = useContext(UserContext);
   const router = useRouter();
   const { addNotification } = useNotifications();
   const [passwordStrength, setPasswordStrength] = useState(
      PASSWORD_STRENGTH.FAIL.LENGTH
   );
   const [passwordVisible, setPasswordVisible] = useState({
      password: false,
      confirmPassword: false,
   });

   const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
         ...prevState,
         [id]: value,
      }));
      if (id == 'password') {
         setPasswordStrength(checkPasswordStrength(value));
      }
   };

   const sendDetailsToServer = () => {
      if (
         state.username.length &&
         state.password.length &&
         state.confirmpassword.length
      ) {
         addNotification('Registration request sent. Please wait.');
         const payload = {
            username: state.username,
            password: state.password,
         };

         axios
            .post(API_BASE_URL + '/register', payload)
            .then((response) => {
               if (response.status === 201) {
                  setState((prevState) => ({
                     ...prevState,
                     succesMessage:
                        'Registration successful. Redirecting to homepage',
                  }));
                  addNotification(
                     'Registration successful. Logging you in.',
                     NOTIF_TYPE.SUCCESS
                  );
                  handleLogin({ state, addNotification, router, setUserID });
               } else {
                  addNotification(
                     'Registration failed. Please try again.',
                     NOTIF_TYPE.ERROR
                  );
               }
            })
            .catch((error) => {
               if (error.response) {
                  if (error.response.status == 400) {
                     if (error.response?.data) {
                        ['username', 'password'].forEach((field) => {
                           const messages = error.response.data[field];
                           if (Array.isArray(messages)) {
                              messages.forEach((msg) =>
                                 addNotification(msg, NOTIF_TYPE.ERROR)
                              );
                           }
                        });
                     }
                  } else {
                     addNotification(
                        'Something went wrong. Please try again.',
                        NOTIF_TYPE.ERROR
                     );
                  }
               } else {
                  addNotification(
                     'Request failed. Please try again.',
                     NOTIF_TYPE.ERROR
                  );
               }
            });
      }
   };

   const handleSubmitClick = (e) => {
      e.preventDefault();
      if (state.password === state.confirmpassword) {
         sendDetailsToServer();
      } else {
         addNotification('Passwords do not match.');
      }
   };

   return (
      <div className="flex flex-1 items-center justify-center">
         <div className="flex-1 p-[14vw] md:p-[9vw]">
            <p className="text-[40px]">Welcome</p>
            <div className="mb-[50px]">
               <p className="">
                  Already have an account?{' '}
                  <Link href={'/login'}>
                     <b>
                        <u>Login here</u>
                     </b>
                  </Link>
               </p>
            </div>
            <form onSubmit={handleSubmitClick}>
               <div className="flex flex-col">
                  <label htmlFor="Username1">Username</label>
                  <input
                     type="text"
                     id="username"
                     placeholder="Enter username"
                     value={state.username}
                     onChange={handleChange}
                     required
                     className="min-h-[50px] rounded-[30px] border border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-violet-500"
                  />
               </div>
               <div className="flex flex-col">
                  <div className="mt-[20px] flex">
                     <label className="flex-1" htmlFor="exampleInputPassword1">
                        Password
                     </label>
                     <p
                        className={`${passwordStrength == PASSWORD_STRENGTH.WEAK ? 'text-red-600' : passwordStrength == PASSWORD_STRENGTH.MEDIUM ? 'text-yellow-400' : passwordStrength == PASSWORD_STRENGTH.STRONG ? 'text-green-500' : ''}`}
                     >
                        {passwordStrength}
                     </p>
                  </div>
                  <div className="flex min-h-[50px] flex-1 rounded-[30px] border border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-violet-500">
                     <input
                        type={passwordVisible.password ? 'text' : 'password'}
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        required
                        className="flex-1 bg-transparent outline-none focus:outline-none focus:ring-0"
                     />
                     <button
                        type="button"
                        className="ml-[5px] min-w-[35px]"
                        onClick={() => {
                           setPasswordVisible({
                              ...passwordVisible,
                              password: !passwordVisible.password,
                           });
                        }}
                     >
                        {passwordVisible.password ? <Eye /> : <EyeSlash />}
                     </button>
                  </div>
               </div>
               <div className="flex flex-col">
                  <div className="mt-[20px] flex">
                     <label className="flex-1" htmlFor="exampleInputPassword1">
                        Confirm Password
                     </label>
                     <p
                        className={`${state.confirmpassword != state.password ? 'text-red-600' : ''}`}
                     >
                        {state.confirmpassword != state.password
                           ? 'Not matching'
                           : ''}
                     </p>
                  </div>
                  <div className="flex min-h-[50px] rounded-[30px] border border-solid border-white pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-violet-500">
                     <input
                        type={
                           passwordVisible.confirmPassword ? 'text' : 'password'
                        }
                        id="confirmpassword"
                        placeholder="Confirm password"
                        value={state.confirmpassword}
                        onChange={handleChange}
                        required
                        className="flex-1 bg-transparent outline-none focus:outline-none focus:ring-0"
                     />
                     <button
                        type="button"
                        className="ml-[5px] min-w-[35px]"
                        onClick={() => {
                           setPasswordVisible({
                              ...passwordVisible,
                              confirmPassword: !passwordVisible.confirmPassword,
                           });
                        }}
                     >
                        {passwordVisible.confirmPassword ? (
                           <Eye />
                        ) : (
                           <EyeSlash />
                        )}
                     </button>
                  </div>
               </div>
               <div className="my-4 flex text-right">
                  <input type="checkbox" required className="mr-2"></input>
                  <p>
                     I agree to the{' '}
                     <u>
                        <b>
                           <Link href="/chinchilla/">Terms & Privacy</Link>
                        </b>
                     </u>
                  </p>
               </div>
               <button
                  type="submit"
                  className={`min-h-[56px] w-full rounded-[30px] border border-solid border-white bg-white text-black transition duration-300 ${Object.values(PASSWORD_STRENGTH.FAIL).includes(passwordStrength) || state.confirmpassword != state.password ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={
                     Object.values(PASSWORD_STRENGTH.FAIL).includes(
                        passwordStrength
                     ) || state.confirmpassword != state.password
                  }
               >
                  Register
               </button>
               {/* <button 
                        type="submit"
                        className='w-full min-h-[56px] rounded-[30px] border-white border-solid border-[1px] text-white bg-black mt-[30px] flex justify-center items-center'>
                            <Image src={Google} className='pr-[20px]' height={55}/><span className='leading-[8px]'>Login with Google</span>
                    </button> */}
            </form>
         </div>
      </div>
   );
}

const handleLogin = async ({ state, addNotification, router, setUserID }) => {
   const payload = {
      username: state.username,
      password: state.password,
   };

   const redirectToHome = () => {
      router.push('/dashboard');
   };

   try {
      const response = await fetch('/login/api', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload),
      });

      if (response.ok) {
         const data = await response.json();
         if (response.status === 202) {
            addNotification('Login successful', NOTIF_TYPE.SUCCESS);
            setUserID(state.username);
            localStorage.setItem(
               ACCESS_TOKEN_NAME,
               JSON.stringify(data.data.token)
            );
            redirectToHome();
         } else {
            addNotification(
               'Login failed. Please try again.',
               NOTIF_TYPE.ERROR
            );
         }
      }
   } catch (error) {
      addNotification(
         'Something went wrong during login. Please try again.',
         NOTIF_TYPE.ERROR
      );
   }
};
