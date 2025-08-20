import NavBar from "../NavBar/NavBar";
import Testimonal from "./Testimonal";

const Company = ({ toggleMode,userPreference }) => {
  const testimonials = [
    {
      name: "Leslie Alexander",
      role: "Open-Source Maintainer",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
      quote:
        "This platform has completely transformed the way my team collaborates.",
      rating: 5,
    },
    {
      name: "Jacob Jones",
      role: "Full-Stack Developer",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
      quote:
        "I can share snippets, collaborate in real-time, and manage projects all in one place.",
      rating: 5,
    },
    {
      name: "Jenny Wilson",
      role: "Software Engineering Student",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
      quote:
        "As a student, I love how easy it is to collaborate on assignments and hackathon projects.",
      rating: 5,
    },
  ];

  return (<div className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} h-[100vh] w-[100vw] bg-cover bg-top`}
  style={{ backgroundImage: "url('circle.png')" }}
  >
    <NavBar toggleMode={toggleMode} userPreference={userPreference}/>
    <div className="font-pj flex flex-col gap-8 justify-center items-center mt-40">
        <div className="text-xl font-semibold text-gray-500 font-pj">2,157 People have said How good Collabify</div>
        <div className={`${userPreference.lightmode ? 'text-black' : 'text-white' } text-5xl font-bold`}>Our happy <span className="text-[#F75904]/70">clients</span> says about us</div>
        <div className="p-4">
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t,index) => (
              <Testimonal rating = {t.rating} quote={t.quote} image={t.image} name={t.name} role={t.role}/>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
            <a
              href="#"
              className="border-b-2 border-gray-900 font-bold text-gray-500 hover:text-gray-600 hover:border-gray-600"
            >
              Check all 2,157 reviews
            </a>
        </div>
    </div>
  </div>)
}

export default Company;