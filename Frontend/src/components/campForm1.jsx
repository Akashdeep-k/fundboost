function CampPage1Formal() {
    return(
        <div className="md:w-[40vw] md:pt-40 md:p-20 hidden md:block">
            <div className="">logo</div>
            <div className="pt-20 pb-10 text-lg">
                {signinwelcome}
            </div>
            <div className="text-4xl font-semibold">
                {signinhead}
            </div>
        </div>
    )
}

function FormalSmall() {
    return(
        <div className="block mb-10 md:hidden">
            <div className="text-center pb-10">logo</div>
            <div className="text-lg">
                {signinwelcome}
            </div>
            <div className="text-4xl font-semibold">
                {signinhead}
            </div>
        </div>
    )
}