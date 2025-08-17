import NavBar from "../NavBar/NavBar";

function About({toggleMode,userPreference}){
    return( 
    <div
        className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} h-[100vh] w-[100vw] bg-cover bg-top relative`}
        style={{ backgroundImage: "url('circle.png')" }}>

        <NavBar toggleMode={toggleMode} />

    </div>)
}
export default About;