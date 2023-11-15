import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Ham from '../assets/hamburger.png'
import can from '../assets/cancel.png'
import searchIcon from '../assets/search.png'

const hometext = "Home";
const abouttext = "About";
const signuptext = "Sign Up / Sign In";
export const campaintext = "Launch A Campaign";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [nav, setNav] = useState("hidden")
    
    const handleNav = () => {
        if(nav=="hidden") setNav("block");
        else setNav("hidden");
    }

    return(
        <div className="sticky md:fixed bg-secondary md:bg-transparent top-0 w-full p-1 text-secondary z-10">
            <div className="mx-auto my-3 rounded-full h-16 w-11/12 grid grid-flow-col justify-between sm:px-10 items-center bg-white shadow-md">
                {/* <div className="w-full p-2 border-secondary border-solid border-2 rounded-xl text-secondary px-4">
                    <input
						type="text"
						className="outline-none w-11/12 "
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search..."
					/>
                </div> */}
                <div>
                    <Link to='/campaigns'>
                    <img src={searchIcon} alt="" className="w-[30px] h-fit ml-4"/>
                    </Link>
                </div>
                <div className="hidden sm:block"><Link to="/">Logo</Link></div>
                <div className="hidden md:block">
                    <ul className="">
                        <Link to="/about">
                            <li className="md:inline p-3 mx-2 rounded-xl hover:bg-light ease-in transition-colors">{abouttext}</li>
                        </Link>
                        <Link to="/sign">
                            <li className="md:inline p-3 mx-2 rounded-xl hover:bg-light ease-in transition-colors">{signuptext}</li>
                        </Link>
                        <Link to="/createcampaign">
                            <li className="md:inline p-3 mx-2 rounded-xl font-semibold bg-primary hover:outline ease-in duration-75">{campaintext}</li>
                        </Link>
                    </ul>
                </div>
                <div className="block md:hidden">
                    <div onClick={() => handleNav()}>
                        <img src={Ham} alt="" className="w-[50px] h-fit mr-4"/>
                    </div>
                    {/* Just remember if you passed a function with parentheses, the function would execute every time the component renders. To prevent this, try to put ()=> in front of your function. */}
                </div>
            </div>

            {/* Mobile view hambureger menu options */}
            <div className={` ${nav} md:hidden`}>
                <ul className="text-white">
                    <Link to="/">
                        <li className="p-3 mx-2 ">{hometext}</li>
                    </Link>
                    <Link to="/about">
                        <li className="p-3 mx-2 ">{abouttext}</li>
                    </Link>
                    <Link to="/sign">
                        <li className="p-3 mx-2 ">{signuptext}</li>
                    </Link>
                    <Link to="/createcampaign">
                        <li className="p-3 mx-2 ">{campaintext}</li>
                </Link>
                </ul>
            </div>
        </div>
    )
}