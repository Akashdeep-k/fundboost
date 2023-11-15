import React, { useState } from "react";
import '../assets/styles.css'
import logo from '../assets/fundboost.jpg'
import { useNavigate } from "react-router-dom";

const Headarr = ["Head 0", "Head 1", "Head 2", "Head 3", "Head 4"];
const Subheadarr = ["Subhead 0", "Subhead 1", "Subhead 2", "Subhead 3", "Subhead 4"];

export default function CreateCampain() {
    const [pageNumber, setPageNumber] = useState(0);
    const [formData, setFormData] = useState({
        location: "", // step 0 // dropdown
        genre: "",  // step 0 genre/reason
        forWhom: "", // yourself, someone else, charity-> name // step 1
        initialTarget: "", // amount needed // step 2
        photo: "", // cover photo or video // step 3
        title: "", // step 4
        story: "", // step 4
        // step 5 is review all fields and edit 
    })

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    }
    const updateFormData = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    }
    const handlePrevPage = () => {
        setPageNumber(pageNumber - 1);
    }
    const handleSubmit = () => {
        console.log("Form data submitted:", formData);
    }


    const isLastStep = pageNumber === 4;


    return (
        <div className="md:flex md:min-h-[100vh] homebg">
            <Formal pageNumber={pageNumber} />
            <FormLayout
                pageNumber={pageNumber}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                formData={formData}
                updateFormData={updateFormData}
                isLastStep={isLastStep}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

function Formal({ pageNumber }) {
    const navigate = useNavigate();
    return (
        <div className="w-[100%] md:w-[40vw] p-5 md:pt-40 md:p-20 flex items-center justify-between md:block">
            {/*  hidden md:block */}
            <div className="cursor-pointer w-[100px]" onClick={() => {navigate('/')}}><img src={logo} /></div>
            <div>
                <div className="md:pt-20 md:pb-10 text-4xl">
                    {Headarr[pageNumber]} {/* Use Headarr based on the current pageNumber */}
                </div>
                <div className="text-lg font-semibold">
                    {Subheadarr[pageNumber]} {/* Use Subheadarr based on the current pageNumber */}
                </div>
            </div>
            
        </div>
    )
}


function FormLayout({ pageNumber, handleNextPage, handlePrevPage, formData, updateFormData, isLastStep, handleSubmit }) {

    return (
        <div className="w-[100vw] md:w-[60vw] p-5 md:p-20 md:pt-40 bg-white shadow-lg">
            <div className="h-[50vh]">
                {selectForm(pageNumber, formData, updateFormData)}
            </div>
            <div className="flex w-[100%] justify-between">
                <button
                    onClick={handlePrevPage}
                    className={`bg-gray-300 z-10 ${pageNumber === 0 ? 'cursor-not-allowed' : 'hover:bg-primary'}`}
                    disabled={pageNumber === 0}
                >
                    Previous
                </button>
                <p>Page {pageNumber}/4</p>
                <button
                    onClick={isLastStep ? handleSubmit : handleNextPage}
                    className={`hover:bg-primary z-10`}
                >
                    {isLastStep ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    )
}

function selectForm(pageNumber, formData, updateFormData) {
    switch (pageNumber) {
        case 0:
            return <Step0 formData={formData} updateFormData={updateFormData} />;
        case 1:
            return <Step1 formData={formData} updateFormData={updateFormData} />;
        case 2:
            return <Step2 formData={formData} updateFormData={updateFormData} />;
        case 3:
            return <Step3 formData={formData} updateFormData={updateFormData} />;
        case 4:
            return <Step4 formData={formData} updateFormData={updateFormData} />;
        default:
            break;
    }
}


function Step0({ formData, updateFormData }) {
    const locationArr = [
        "--Select--",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ]


    const genreArr = ["Medical", "Travel", "Education", "Sports", "Family", "Emergencies", "Other"]
    const genreList = genreArr.map((genre) => (
        <label key={genre} className="p-2" >
            <input
                type="radio"
                name="genre"
                id={genre}
                value="genre"
                onChange={(e) => updateFormData("genre", e.target.value)}
            />
            {genre}
        </label>
    ));

    return (
        <div className="">
            <form>
                <label>Where are you located
                    <select
                        id="location"
                        name="location"
                        value="location"
                        onChange={(e) => updateFormData("location", e.target.value)}
                    >
                        {locationArr.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>

                </label>
                <br />

                <label htmlFor="">What best describes why you're fundraising?</label>
                <div className="">
                    {genreList}
                </div>
            </form>
        </div>
    )
}



// ... (other imports and code)

function Step1({ formData, updateFormData }) {
    return (
        <div className="">
            <form>
                <label>Who are you fundraising for?</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="forWhom"
                            id="yourself"
                            value="Yourself"
                            onChange={(e) => updateFormData("forWhom", e.target.value)}
                            checked={formData.forWhom === "Yourself"}
                        />
                        Yourself
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="forWhom"
                            id="friendsFamily"
                            value="Friends or Family"
                            onChange={(e) => updateFormData("forWhom", e.target.value)}
                            checked={formData.forWhom === "Friends or Family"}
                        />
                        Friends or Family
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="forWhom"
                            id="charity"
                            value="Charity"
                            onChange={(e) => updateFormData("forWhom", e.target.value)}
                            checked={formData.forWhom === "Charity"}
                        />
                        Charity
                    </label>
                </div>
            </form>
        </div>
    );
}

function Step2({ formData, updateFormData }) {
    return (
        <div>
            <label>Your Starting Goal</label>
            <br />
            Rs.<input
                type="number"
                name="initialTarget"
                id="initialTarget"
                value={formData.initialTarget}
                onChange={(e) => updateFormData("initialTarget", e.target.value)}
            />
        </div>
    );
}

function Step3({ formData, updateFormData }) {
    // return (
    //     <div className="mw-[500px] h-[100px] outline ">
    //         <label htmlFor="file" className="w-[100%] h-[100%] relative">
    //             <div className="absolute flex justify-between w-[100%] mt-9">
    //                 <div></div>
    //                 <div className="">Add a Cover Photo</div>
    //                 <div></div>
    //             </div>
    //             <input
    //                 type="file"
    //                 accept="image/*"
    //                 name="photo"
    //                 id="file"
    //                 className="opacity-0 w-[100%] h-[100%]"
    //                 onChange={(e) => updateFormData("photo", e.target.value)}
    //             />
    //         </label>
    //     </div>
    // );
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Update the form data
        updateFormData("photo", file);

        // Display the image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleRemoveImage = () => {
        // Clear the image preview and reset form data
        setImagePreview(null);
        updateFormData("photo", null);
    };

    return (
        <div className="mw-[400px] h-[300px] outline">
            <label htmlFor="file" className="w-[100%] h-[100%] relative">
                {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Cover Photo" className="w-[100%] h-[100%]" />
                        <button onClick={handleRemoveImage} className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded-md bg-secondary">
                            Change
                        </button>
                    </>
                ) : (
                    <div className="absolute flex justify-center items-center w-[100%] h-full">
                        {/* <div></div> */}
                        <div className="">Add a Cover Photo</div>
                        {/* <div></div> */}
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    id="file"
                    className={`opacity-0 w-[100%] h-[100%] ${imagePreview ? `hidden` : `block`}`}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}

function Step4({ formData, updateFormData }) {
    return (
        <div className="">
            <label>
                Give your fundraiser a title
                <br />
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                />
            </label>
            <br />
            <label>
                Tell your story
                <br />
                <textarea
                    name="story"
                    id="story"
                    cols="50"
                    rows="10"
                    value="story"
                    onChange={(e) => updateFormData("story", e.target.value)}
                ></textarea>
            </label>
        </div>
    );
}

// ... (rest of the components and code)
