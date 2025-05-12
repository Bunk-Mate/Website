'use client';

import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/apiConstants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SlideInNotifications from '@/components/notifications/side_notification';
import { UserContext } from '@/app/_contexts/user_name';
//axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function RegistrationForm() {
   const [state, setState] = useState({
      username: '',
      password: '',
      confirmpassword: '',
      successMessage: null,
   });
   const { setUserID } = useContext(UserContext);
   const notificationRef = useRef(null);
   const router = useRouter();

   const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
         ...prevState,
         [id]: value,
      }));
   };

   const sendDetailsToServer = () => {
      if (
         state.username.length &&
         state.password.length &&
         state.confirmpassword.length
      ) {
         if (notificationRef.current) {
            notificationRef.current.addNotif(
               Math.random(),
               'Registration request sent. Please wait.'
            );
         }
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
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'Registration successful. Logging you in.'
                     );
                     handleLogin({ state, notificationRef, router, setUserID });
                  }
               } else {
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'Registration failed. Please try again.'
                     );
                  }
               }
            })
            .catch((error) => {
               if (error.response) {
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'Something went wrong during registration. Please try again.'
                     );
                  }
               } else {
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'Request failed. Please try again.'
                     );
                  }
               }
            });
      }
   };

   const handleSubmitClick = (e) => {
      e.preventDefault();
      if (state.password === state.confirmpassword) {
         sendDetailsToServer();
      } else {
         if (notificationRef.current) {
            notificationRef.current.addNotif(
               Math.random(),
               'Passwords do not match.'
            );
         }
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
                     className="min-h-[50px] rounded-[30px] border border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]"
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mt-[20px]" htmlFor="exampleInputPassword1">
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     placeholder="Password"
                     value={state.password}
                     onChange={handleChange}
                     required
                     className="min-h-[50px] rounded-[30px] border border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]"
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mt-[20px]" htmlFor="exampleInputPassword1">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     id="confirmpassword"
                     placeholder="Confirm password"
                     value={state.confirmpassword}
                     onChange={handleChange}
                     required
                     className="min-h-[50px] rounded-[30px] border border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]"
                  />
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
                  className="min-h-[56px] w-full rounded-[30px] border border-solid border-white bg-white text-black"
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
         <SlideInNotifications ref={notificationRef} />
      </div>
   );
}

const handleLogin = async ({ state, notificationRef, router, setUserID }) => {
   if (notificationRef.current) {
      notificationRef.current.addNotif(
         Math.random(),
         'Login request sent. Please wait.'
      );
   }
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
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Login successful'
               );
            }
            setUserID(state.username);
            localStorage.setItem(
               ACCESS_TOKEN_NAME,
               JSON.stringify(data.data.token)
            );
            redirectToHome();
         } else {
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Login failed. Please try again.'
               );
            }
         }
      }
   } catch (error) {
      if (notificationRef.current) {
         notificationRef.current.addNotif(
            Math.random(),
            'Something went wrong during login. Please try again.'
         );
      }
   }
};
