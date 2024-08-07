'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../_utils/apiConstants';
import { useRouter } from 'next/navigation';
import ModernArt from '../../_assets/modernart-cropped.png'
import Google from '../../_assets/google.png'
import Image from 'next/image';
//axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function RegistrationForm(props){
    const [state, setState]=useState({
        username:"",
        password:"",
        role:"",
        confirmpassword:"",
        successMessage:null
    });
    const header={
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Authorization':'Bearer '+localStorage.getItem(ACCESS_TOKEN_NAME),
        // 'Access-Control-Allow-Origin':'*',
    }
    
    //console.log(header)
    const router =useRouter();

    const handleChange=(e)=>{
        const { id, value }=e.target;
        setState(prevState=>({
            ...prevState,
            [id]: value
        }));
    }
    const handleChangeForRadio=(e)=>{
        const role=e.target.name;
        const value=e.target.id;
        setState(prevState=>({
            ...prevState,
            [role]: value
        }));
        console.log(state);
    }

    const sendDetailsToServer=()=>{
        console.log("im here");
        if(state.username.length&&state.password.length&&state.confirmpassword.length){
            console.log('maybe here');
            const payload={
                "username":state.username,
                "password":state.password,
                "role":state.role
            }
            axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'
            console.log(state, "korewa state desne");
            axios.post(API_BASE_URL + '/register', payload)
            .then((response)=>{
                if(response.status===200){
                    console.log(response.body);
                    setState(prevState=>({
                        ...prevState,
                        'succesMessage':'Registration successful. Redirecting to homepage'
                    }))
                    console.log("about to pass")
                    // localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(response.data.token));
                    // redirectToHome();
                    console.log("created")
                }
            })
            .catch((error)=>{
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log('yo got a response but not 200');
                    console.log(error.response.data);
                    console.log(error.response.status)
                //   } else if (error.request) {
                //     // The request was made but no response was received
                //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //     // http.ClientRequest in node.js
                //     console.log("no server response");
                //     console.log(error.request);
                //   } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log("error while setting up request");
                //     console.log('Error', error.message);
                //   }
                //   console.log("error config");
                //   console.log(error.config);
            }})
        }else{
            // props.showError("Please enter valid credentials")
            alert("Please fill the empty boxes");
        }
    }

    const redirectToHome=()=>{
        console.log("home")
        router.push('/home');
    }

    const redirectToLogin=()=>{
        router.push('./login');
    }

    const handleSubmitClick=(e)=>{
        e.preventDefault();
        if(state.password===state.confirmpassword){
            sendDetailsToServer();
        }else{
            alert("Password do not match... ");
        }
    }

    return(
        <div className='flex min-h-screen'>
        <div className='ml-[150px] flex-1 justify-center items-center flex max-md:hidden'>
            <Image src={ModernArt} width={680} className='lg:rotate-[270deg]'/>
        </div>
        <div className='flex flex-1 justify-center items-center'>
            <div className='p-[140px] flex-1'>
            <p className='text-[40px]'>Welcome</p>
            <div className="mb-[50px]">
                <p className="">Already have an account? <span onClick={() => redirectToLogin()}><b><u>Login here</u></b></span></p> 
            </div>
            <form>
                <div className='flex flex-col'>
                    <label htmlFor="Username1">Username</label>
                    <input type="text"
                        id="username"
                        placeholder="Enter username" 
                        value={state.username}
                        onChange={handleChange}
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
                    className='pl-[20px] min-h-[50px] rounded-[30px] border-white border-solid border-[1px] bg-black autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]'
                />
                </div>
                <div className='flex flex-col'>
                <label className='mt-[20px]' htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                    id="confirmpassword" 
                    placeholder="Confirm password"
                    value={state.password}
                    onChange={handleChange}
                    className='pl-[20px] min-h-[50px] rounded-[30px] border-white border-solid border-[1px] bg-black autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,200)]'
                />
                </div>
                <div className='text-right my-2'>
                    <p><u><b>Forgot password?</b></u></p>
                </div>
                <button 
                    type="submit" 
                    onClick={handleSubmitClick}
                    className='w-full min-h-[56px] rounded-[30px] border-white border-solid border-[1px] text-black bg-white'>Login</button>
                <button 
                    type="submit"
                    className='w-full min-h-[56px] rounded-[30px] border-white border-solid border-[1px] text-white bg-black mt-[30px] flex justify-center items-center'>
                        <Image src={Google} className='pr-[20px]' height={55}/><span className='leading-[8px]'>Login with Google</span></button>
            </form>
        </div>
    </div>
</div>
    )
}
