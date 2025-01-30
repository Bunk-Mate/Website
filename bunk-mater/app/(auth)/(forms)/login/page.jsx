'use client';

import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/apiConstants';
import { useRouter } from 'next/navigation';
import Google from '@/app/_assets/google.png';
import Link from 'next/link';
import SlideInNotifications from '@/components/notifications/side_notification';
import { UserContext } from '@/app/_contexts/user_name';

function LoginForm() {
   const [state, setState] = useState({
      username: '',
      password: '',
      successMessage: null,
   });
   const router = useRouter();
   const notificationRef = useRef(null);

   const { _, setUserID } = useContext(UserContext);

   const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
         ...prevState,
         [id]: value,
      }));
   };

   const handleSubmitClick = (e) => {
      e.preventDefault();
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
      axios
         .post(API_BASE_URL + '/login', payload)
         .then(function (response) {
            if (response.status === 202) {
               setState((prevState) => ({
                  ...prevState,
                  successMessage:
                     'Login successful. Redirecting to home page..',
               }));
               //console.log(response.data)
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Login successful'
                  );
               }
               setUserID(state.username);
               localStorage.setItem(
                  ACCESS_TOKEN_NAME,
                  JSON.stringify(response.data.token)
               );
               redirectToHome();
            }
            // else if(response.code === 204){
            //     props.showError("Username and password do not match");
            // }
            else {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Login failed. Please try again.'
                  );
               }
               // alert("Username does not exists");
               //console.log(response.data)
            }
         })
         .catch(function (error) {
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Login failed. Please try again.'
               );
            }
            //console.log(error);
         });
      // redirectToHome()//make sure to comment this out
   };

   const redirectToHome = () => {
      router.push('/dashboard');
   };

   const redirectToRegister = () => {
      router.push('/registration');
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
                        className="min-h-[50px] rounded-[30px] border-[1px] border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]"
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        className="mt-[20px]"
                        htmlFor="exampleInputPassword1"
                     >
                        Password
                     </label>
                     <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        required
                        className="min-h-[50px] rounded-[30px] border-[1px] border-solid border-white bg-black pl-[20px] autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]"
                     />
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
                     className="min-h-[56px] w-full rounded-[30px] border-[1px] border-solid border-white bg-white text-black"
                  >
                     Login
                  </button>
                  <SlideInNotifications ref={notificationRef} />
                  {/* <button 
                        type="submit"
                        className='w-full min-h-[56px] rounded-[30px] border-white border-solid border-[1px] text-white bg-black mt-[30px] flex justify-center items-center'>
                            <Image src={Google} className='pr-[20px]' height={55}/><span className='leading-[8px]'>Login with Google</span></button> */}
               </form>
            </div>
         </div>
   );
}

export default LoginForm;
