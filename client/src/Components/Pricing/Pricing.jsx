import NavBar from "../NavBar/NavBar";

function Pricing({ toggleMode, userPreference }) {
    return (
        <div
            className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} h-[100vh] w-[100vw] bg-cover bg-top relative`}
            style={{ backgroundImage: "url('circle.png')" }}>

            <NavBar toggleMode={toggleMode} />

            <div className="relative h-full w-full">
                <img
                    src="/free.gif"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96"
                />
            </div>
        </div>
    )
}

export default Pricing;