'use client'

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../_utils/apiConstants';
import { useRouter } from 'next/navigation';
import Google from '@/public/assets/google.png'
import Image from 'next/image';
import Carousel from '@/components/carousels/carousel';
import Link from 'next/link';
import SlideInNotifications from '@/components/notifications/side_notification';
//axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function RegistrationForm(props){
    const [state, setState]=useState({
        username:"",
        password:"",
        confirmpassword:"",
        successMessage:null
    });
    const header={
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Authorization':'Bearer '+localStorage.getItem(ACCESS_TOKEN_NAME),
        // 'Access-Control-Allow-Origin':'*',
    }
    
    ////console.log(header)
    const router =useRouter();
    const notificationRef = useRef(null)

    const handleChange=(e)=>{
        const { id, value }=e.target;
        setState(prevState=>({
            ...prevState,
            [id]: value
        }));
    }

    const sendDetailsToServer=()=>{
        //console.log("im here");
        if(state.username.length&&state.password.length&&state.confirmpassword.length){
            if (notificationRef.current) {
                notificationRef.current.addNotif(Math.random(), "Registration request sent. Please wait.");
              }
            const payload={
                "username":state.username,
                "password":state.password,
            }
            // axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'
            // console.log(state, "korewa state desne");
            axios.post(API_BASE_URL + '/register', payload)
            .then((response)=>{
                if(response.status===201){
                    //console.log(response.body);
                    setState(prevState=>({
                        ...prevState,
                        'succesMessage':'Registration successful. Redirecting to homepage'
                    }))
                    if (notificationRef.current) {
                        notificationRef.current.addNotif(Math.random(), "Registration successful. Try logging in.");
                      }
                    // redirectToLogin();
                    //console.log("created")
                }else{
                    // console.log('failed')
                    if (notificationRef.current) {
                        notificationRef.current.addNotif(Math.random(), "Registration failed. Please try again.");
                      }
                }
            })
            .catch((error)=>{
                if (error.response) {
                    if (notificationRef.current) {
                        notificationRef.current.addNotif(Math.random(), "Registration failed. Please try again.");
                      }
                    //console.log(error.response.data);
                    //console.log(error.response.status)
            }else{
                if (notificationRef.current) {
                    notificationRef.current.addNotif(Math.random(), "Request failed. Please try again.");
                  }
            }})
        }else{
            if (notificationRef.current) {
                notificationRef.current.addNotif(Math.random(), "Please fill the empty input fields.");
              }
            // props.showError("Please enter valid credentials")
            // alert("Please fill the empty boxes");
        }
    }

    const redirectToLogin=()=>{
        router.push('/login');
    }

    const handleSubmitClick=(e)=>{
        e.preventDefault();
        //console.log("here")
        if(state.password===state.confirmpassword){
            sendDetailsToServer();
        }else{
            // alert("Password do not match... ");
            if (notificationRef.current) {
                notificationRef.current.addNotif(Math.random(), "Passwords do not match.");
              }
        }
    }

    return(
        <div className='flex min-h-screen max-md:flex-col'>
            <div className='md:pl-[5vw] flex-1 md:justify-end md:items-center flex'>
                {/* <Image src={ModernArt} width={680} className='lg:rotate-[270deg]'/> */}
                <Carousel/>
            </div>
            <div className='flex flex-1 justify-center items-center'>
                <div className='p-[14vw] md:p-[9vw] flex-1'>
                <p className='text-[40px]'>Welcome</p>
                <div className="mb-[50px]">
                    <p className="">Already have an account? <Link href={'/login'}><b><u>Login here</u></b></Link></p> 
                </div>
                <form onSubmit={handleSubmitClick}>
                    <div className='flex flex-col'>
                        <label htmlFor="Username1">Username</label>
                        <input type="text"
                            id="username"
                            placeholder="Enter username" 
                            value={state.username}
                            onChange={handleChange}
                            required
                            className='pl-[20px] min-h-[50px] rounded-[30px] border-white autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)] border-solid border-[1px] bg-black'
                        />
                    </div>
                    <div className='flex flex-col'>
                    <label className='mt-[20px]' htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        required
                        className='pl-[20px] min-h-[50px] rounded-[30px] border-white border-solid border-[1px] bg-black autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]'
                    />
                    </div>
                    <div className='flex flex-col'>
                    <label className='mt-[20px]' htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        id="confirmpassword" 
                        placeholder="Confirm password"
                        value={state.confirmpassword}
                        onChange={handleChange}
                        required
                        className='pl-[20px] min-h-[50px] rounded-[30px] border-white border-solid border-[1px] bg-black autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]'
                    />
                    </div>
                    <div className='text-right my-4 flex'>
                        <input type='checkbox' required className='mr-2'></input>
                        <p>I agree to the <u><b><Link href='/chinchilla/'>Terms & Privacy</Link></b></u></p>
                    </div>
                    <button 
                        type="submit"
                        className='w-full min-h-[56px] rounded-[30px] border-white border-solid border-[1px] text-black bg-white'>Register</button>
                    {/* <button 
                        type="submit"
                        className='w-full min-h-[56px] rounded-[30px] border-white border-solid border-[1px] text-white bg-black mt-[30px] flex justify-center items-center'>
                            <Image src={Google} className='pr-[20px]' height={55}/><span className='leading-[8px]'>Login with Google</span>
                    </button> */}
                </form>
            </div>
            <SlideInNotifications ref={notificationRef}/>
        </div>
    </div>
    )
}
