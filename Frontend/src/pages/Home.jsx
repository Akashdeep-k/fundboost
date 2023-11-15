import { Link, useNavigate } from "react-router-dom";
import { campaintext } from "../components/Navbar";
import "../assets/styles.css"
import logo from "../assets/fundboost.png"
import flower from "../assets/footer-flower.png"
import linkedinLogo from "../assets/linkedin.png"
import githubLogo from "../assets/github.png"

function Main() {
    return(
        <div className="homebg h-[60vh] md:h-[90vh] flex flex-col justify-center items-center p-10 md:p-auto mb-20">
            <div className="relative text-5xl md:text-6xl text-secondary font-bold text-center">Boost Your Cause Today.</div>
            <button className="relative mt-5 rounded-xl p-3 text-lg font-semibold shadow-sm bg-primary hover:outline ease-in duration-75"><Link to="/createcampaign">{campaintext}</Link></button>
        </div>
    )
}

function Instructions() {
    return(
        <div className="mx-5 md:mx-20 mb-0"> 
        {/* The mb has been shifted to below section as pt for the smooth effect */}
            <div className="mb-10">
                <div className="text-primary">What to expect</div>
                <div className="text-secondary text-2xl md:text-4xl font-bold">Fundraising on FundBoost < br/>takes just a few minutes</div>
            </div>
            <div className="md:flex flex-wrap w-[100%] justify-between text-secondary">
                <div className="mb-10 md:mb-0 flex justify-between md:block">
                    <div className="bg-primary rounded-full w-12 h-12 flex justify-center items-center md:mb-10">
                        <div className="text-xl md:text-2xl font-bold text-white">1</div>
                    </div>
                    <div className="w-[75%] md:w-[100%]">
                        <h1 className="text-xl md:text-2xl font-semibold">Start with basics</h1>
                        <p>Kicking things off with your name and basics.</p>
                    </div>
                </div>
                <div className="mb-10 md:mb-0 flex justify-between md:block">
                    <div className="bg-primary rounded-full w-12 h-12 flex justify-center items-center md:mb-10">
                        <div className="text-xl md:text-2xl font-bold text-white">2</div>
                    </div>
                    <div className="w-[75%] md:w-[100%]">
                        <h1 className="text-xl md:text-2xl font-semibold">Tell Your story</h1>
                        <p>We'll guide you with steps along the way.</p>
                    </div>
                </div>
                <div className="mb-10 md:mb-0 flex justify-between md:block">
                    <div className="bg-primary rounded-full w-12 h-12 flex justify-center items-center md:mb-10">
                        <div className="text-xl md:text-2xl font-bold text-white">3</div>
                    </div>
                    <div className="w-[75%] md:w-[100%]">
                        <h1 className="text-xl md:text-2xl font-semibold">Share with friends and family</h1>
                        <p>People out there want to help you.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card() {
    return (
        <div className="min-w-[250px] md:min-w-[330px] rounded-3xl justify-between shadow-md overflow-hidden mr-5 min hover:-translate-y-1 hover:shadow-xl">
            <div className="h-48 overflow-hidden"><img src={logo} alt="campain image" className="cover"/></div>
            <div className="p-5 leading-loose">
                <div className="font-semibold text-xl text-secondary">Heading</div>
                <div className="p-1 transition ease-in-out hover:px-3 hover:bg-light w-fit rounded-lg">Learn More</div>
                <div className="p-1 transition ease-in-out hover:px-3 hover:bg-light w-fit rounded-lg">Donate</div>
            </div>  
        </div>
    )
}

function Featured() {
    const navigate = useNavigate();
    return (
        <div className="pb-20 pt-20 md:pt-40 px-5 md:px-20 ">
            <div className="mb-8">
                <div className="text-primary">Where you can help</div>
                <div className="text-secondary text-2xl md:text-4xl font-bold">Featured topics</div>
            </div>
            <div className="flex overflow-x-scroll h-max p-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Link to="/campaigns" className="m-auto">
                    <div className="w-[100px]">
                        See More
                    </div>
                </Link>
                
            </div>
        </div>
    )
}

function CallToAction() {
    return(
        <div className="flex justify-center md:mb-20">
            <div className="w-[100%] md:mx-20 md:rounded-3xl bg-light p-20 md:grid md:grid-cols-2">
                <div className="m-auto mb-10 flex flex-col md:block justify-center md:mb-auto md:pr-10">
                    <div className="text-secondary font-bold text-4xl mb-5">Ready to get started? Join thousands of others today.</div>
                    <button className="mt-5 rounded-xl p-3 text-lg font-semibold shadow-sm bg-primary hover:outline ease-in duration-75"><Link to="/createcampaign">{campaintext}</Link></button>
                </div>
                <div className="flex justify-center"><img src={flower} className="max-w-[100%] max-h-[600px]"/></div>
            </div>
        </div>
    )
}

function Profile({name, imageURL, linkedinURL, githubURL}) {
    return(
    <div className="flex">
        <div><img src={imageURL} className="w-[45px] rounded-full mr-5 mb-10 md:mb-7"/></div>
        <div className="">
            <div className="font-bold">{name}</div>
            <div className="flex">
                <a href={linkedinURL} target="_blank"><img src={linkedinLogo} alt="linkedin" className="w-[20px] mr-2"/></a>
                <a href={githubURL} target="_blank"><img src={githubLogo} alt="github" className="w-[20px] "/></a>
            </div>
        </div>
    </div>
    )
}

function Footer() {
    return(
        <div className="bg-secondary md:grid md:grid-cols-2 p-10 md:p-20 text-white ">
            <div className=" mb-10 md:mb-0"><img src={logo} alt="logo" className="w-[26%]"/></div>
            <div>
                <div className="text-bold mb-5">Contributors:</div>
                <Profile 
                    name = "Akashdeep Singh Kataria"
                    imageURL = {logo}
                    linkedinURL = "https://www.linkedin.com/in/akashdeep-singh-kataria"
                    githubURL = "https://github.com/Akashdeep-k"
                />
                <Profile 
                    name = "Harshpreet Singh"
                    imageURL = {logo}
                    linkedinURL = "https://www.linkedin.com/in/-harshpreet-singh"
                    githubURL = "https://github.com/hrshpreet"
                />
            </div>
        </div>
    )
}

export default function Home() {
    return(
        <div className="scroll-smooth">
            <Main />
            <Instructions />
            <Featured />
            <CallToAction />
            <Footer />
        </div>
        
    )
}