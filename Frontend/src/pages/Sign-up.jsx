import React, { useState } from "react";
import '../assets/styles.css'

let signupwelcome = "Welcome to FundBoost";
let signuphead = "Create an account";
// remove md-pt-4 after u get to know how to remove the navbar

function Formal() {
    return(
        <div className="md:w-[40vw] md:pt-40 md:p-20 hidden md:block">
            <div className="">logo</div>
            <div className="pt-20 pb-10 text-lg">
                {signupwelcome}
            </div>
            <div className="text-4xl font-semibold">
                {signuphead}
            </div>
        </div>
    )
}

function FormalSmall() {
    return(
        <div className="block mb-10 md:hidden">
            <div className="text-center pb-10">logo</div>
            <div className="text-lg">
                {signupwelcome}
            </div>
            <div className="text-4xl font-semibold">
                {signuphead}
            </div>
        </div>
    )
}

function FormOut() {
    return(
        <div className="w-[100vw] md:w-[60vw] p-5 md:p-20 md:pt-40 bg-white shadow-lg">
            <FormalSmall />
            <div className="md:text-right pb-5 md:pb-20">
                Already have an account?
                <span className="font-bold">
                    Sign in
                </span>
            </div>
           <SignUpForm/> 
            <div className="my-10 relative">
                {/* md:absolute md:bottom-10 md:right-20 md:m-auto*/}
                <button className="w-[100%] text-white md:absolute md:right-0 md:w-auto p-3 px-10 rounded-xl bg-secondary hover:bg-black ease-in duration-150">
                    Sign Up
                </button>
            </div>
        </div>
    )
}

function SignUpForm({sign}) {
    return(
        <div className="">
            <div className="mb-3 md:mb-5">Your Account Details</div>
            <input type="text" required placeholder="First Name" className="w-[100%] md:w-[49%] p-3 mb-3 md:mr-[2%]"/>
            <input type="text" required placeholder="Last Name" className="w-[100%] md:w-[49%] p-3 mb-3"/>
            <input type="email" required placeholder="Email Address" className="w-[100%] p-3 mb-3"/>
            <input type="text" required placeholder="Confirm Email Address" className="w-[100%] p-3 mb-3"/>
            <input type="password" required placeholder="Password" className="w-[100%] p-3 mb-3"/>
        </div>
    )
}

export default function SignUp() {
    return (
        <div className="flex md:min-h-[100vh] homebg">
            <Formal />
            <FormOut />
        </div>
    )
}