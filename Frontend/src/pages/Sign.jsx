import React, { useState } from "react";
import '../assets/styles.css'
import { Link } from "react-router-dom";

let signupwelcome = "Welcome to FundBoost";
const signinwelcome = "Welcome Back";

let signuphead = "Create an account";
const signinhead = "Sign in to FundBoost";

let signuplink = "Sign in";
const signinlink = "Sign up";

// remove md-pt-4 after u get to know how to remove the navbar

function Formal({sign}) {
    return(
        <div className="md:w-[40vw] md:pt-[7rem] md:p-20 hidden md:block">
            <div className=""><Link to="/" > logo </Link></div>
            <div className="pt-20 pb-10 text-lg">
                {sign==="Sign Up" ? signupwelcome : signinwelcome}
            </div>
            <div className="text-4xl font-semibold">
                {sign === "Sign Up" ? signuphead : signinhead}
            </div>
        </div>
    )
}

function FormalSmall({sign}) {
    return(
        <div className="block mb-10 md:hidden">
            <div className="text-center pb-10"><Link to="/" > logo </Link></div>
            <div className="text-lg">
                {sign==="Sign Up" ? signupwelcome : signinwelcome}
            </div>
            <div className="text-4xl font-semibold">
                {sign === "Sign Up" ? signuphead : signinhead}
            </div>
        </div>
    )
}

function FormOut({ sign, handleSign }) {
    return(
        <div className="w-[100vw] md:w-[60vw] p-5 md:p-20 md:pt-[7rem] bg-white shadow-lg">
            <FormalSmall />
            <div className="md:text-right pb-5 md:pb-20">
                {sign==="Sign Up" ? "Already have an account? ": "Dont have an account? " }
                <span className="font-bold cursor-pointer hover:text-secondary" onClick={() => handleSign()}>
                    {sign === "Sign Up" ? signuplink : signinlink}
                </span>
            </div>
           <SignUpForm sign={sign}/> 
            <div className="my-10 relative">
                {/* md:absolute md:bottom-10 md:right-20 md:m-auto*/}
                <button className="w-[100%] text-white md:absolute md:right-0 md:w-auto p-3 px-10 rounded-xl bg-secondary hover:bg-black ease-in duration-150">{sign}</button>
            </div>
        </div>
    )
}

function SignUpForm({sign}) {
    return(
        <div className="">
            <div className="mb-3 md:mb-5">Your Account Details</div>
            <div className={sign=="Sign Up"? "block" : "hidden"}>
                <input type="text" placeholder="First Name" className="w-[100%] md:w-[49%] p-3 mb-3 md:mr-[2%]"/>
                <input type="text" placeholder="Last Name" className="w-[100%] md:w-[49%] p-3 mb-3"/>
            </div>
            <input type="email" placeholder="Email Address" className="w-[100%] p-3 mb-3"/>
            <div className={sign=="Sign Up"? "block" : "hidden"}>
                <input type="text" placeholder="Confirm Email Address" className="w-[100%] p-3 mb-3"/>
            </div>
            <input type="password" placeholder="Password" className="w-[100%] p-3 mb-3"/>
        </div>
    )
}

export default function Sign() {
    const [sign, setSign] = useState("Sign Up");
    const handleSign = () => {
        if (sign === "Sign Up") {
          setSign("Sign In");
        } else {
          setSign("Sign Up");
        }
    };
    return (
        <div className="flex md:min-h-[100vh] homebg">
            <Formal sign={sign} />
            <FormOut sign={sign} handleSign={handleSign} />
        </div>
    )
}