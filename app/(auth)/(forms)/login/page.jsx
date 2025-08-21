'use client';

import React, { useState, useContext, useEffect } from 'react';
import { ACCESS_TOKEN_NAME } from '@/app/_utils/api_constants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@/app/_contexts/user_name';
import { useNotifications } from '@/app/_contexts/notification';
import Eye from '@/components/svg/eye';
import EyeSlash from '@/components/svg/eye_slash';
import { NOTIF_TYPE } from '@/app/_enums/notification';

function LoginForm() {
   const [state, setState] = useState({
      username: '',
      password: '',
      successMessage: null,
   });
   const router = useRouter();
   const { addNotification } = useNotifications();
   const [passwordVisible, setPasswordVisible] = useState({
      password: false,
   });

   const { setUserID } = useContext(UserContext);

   const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
         ...prevState,
         [id]: value,
      }));
   };

   useEffect(() => {
      const cookie = document.cookie
         .split('; ')
         .find((row) => row.startsWith('toastMessage='));

      if (cookie) {
         const message = decodeURIComponent(cookie.split('=')[1]);
         addNotification(message);

         // clear cookie after notification
         document.cookie = 'toastMessage=; Max-Age=0; path=/';
      }
   });

   useEffect(() => {
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);
      if (token) {
         redirectToHome();
      }
   }, []);

   const handleSubmitClick = async (e) => {
      e.preventDefault();
      addNotification('Login request sent. Please wait.');
      const payload = {
         username: state.username,
         password: state.password,
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
               setState((prevState) => ({
                  ...prevState,
                  successMessage: 'Login successful.',
               }));

               addNotification('Login successful.', NOTIF_TYPE.SUCCESS);

               setUserID(state.username);
               localStorage.setItem(
                  ACCESS_TOKEN_NAME,
                  JSON.stringify(data.data.token)
               );
               redirectToHome();
            }
            // else if(response.code === 204){
            //     props.showError("Username and password do not match");
            // }
            else {
               addNotification(
                  `Login failed. Please try again. (${Number(response.status)})`,
                  NOTIF_TYPE.ERROR
               );
               // alert("Username does not exists");
            }
         } else {
            addNotification(
               `Login failed. Please try again. (${Number(response.status)})`,
               NOTIF_TYPE.ERROR
            );
         }
      } catch (err) {
         addNotification(
            'Something went wrong during login. Please try again.',
            NOTIF_TYPE.ERROR
         );
      }
   };

   const redirectToHome = () => {
      router.push('/dashboard');
   };

   return (
      <div className="flex flex-1 items-center justify-center">
         <div className="flex-1 p-[14vw] md:p-[9vw]">
            <p className="text-[40px]">Welcome</p>
            <div className="mb-[50px]">
               <p>
                  <Link href={'/registration'}>
                     <b>
                        <u>Create a free account</u>
                     </b>
                  </Link>{' '}
                  or log in to get started
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
                     className="min-h-[50px] rounded-[30px] border border-solid border-white bg-black pl-[20px] [-webkit-text-fill-color:#fff] autofill:text-white autofill:shadow-[inset_0_0_0px_1000px_rgb(0,0,0)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-violet-500"
                  />
               </div>
               <div className="mt-[20px] flex">
                  <label className="flex-1" htmlFor="exampleInputPassword1">
                     Password
                  </label>
               </div>
               <div className="flex min-h-[50px] flex-1 rounded-[30px] border border-solid border-white bg-black pl-[20px] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-violet-500">
                  <input
                     type={passwordVisible.password ? 'text' : 'password'}
                     id="password"
                     placeholder="Password"
                     value={state.password}
                     onChange={handleChange}
                     required
                     className="flex-1 bg-transparent outline-none [-webkit-text-fill-color:#fff] autofill:text-white autofill:shadow-[inset_0_0_0px_1000px_rgba(0,0,0,1)] autofill:[-webkit-text-fill-color:#fff!important] focus:outline-none focus:ring-0"
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
               <div className="my-2 text-right">
                  <p>
                     <u>
                        <b>
                           <Link href="/forgot_pass">Forgot password?</Link>
                        </b>
                     </u>
                  </p>
               </div>
               <button
                  type="submit"
                  disabled={state.password.length < 8 && false}
                  className={`min-h-[56px] w-full rounded-[30px] border border-solid border-white bg-white text-black ${state.password.length < 8 ? 'cursor-not-allowed opacity-50' : ''}`}
               >
                  Login
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

export default LoginForm;
