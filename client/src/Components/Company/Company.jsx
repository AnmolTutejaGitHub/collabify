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

  return (<div className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} bg-cover bg-top`}
  style={{ backgroundImage: "url('circle.png')" }}
  >
    {/* <NavBar toggleMode={toggleMode} userPreference={userPreference}/> */}
    <div className="font-pj flex flex-col gap-8 justify-center items-center mt-40" id="company">
        <div className={`${userPreference.lightmode ? 'text-black' : 'text-white' } text-5xl font-bold p-4`}>Our happy <span className="text-[#F75904]/70">clients</span> says about us</div>
        <div className="p-4 pb-2">
        <div className="mt-16 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {testimonials.map((t,index) => (
              <Testimonal rating = {t.rating} quote={t.quote} image={t.image} name={t.name} role={t.role}/>
            ))}
          </div>
        </div>
    </div>
  </div>)
}

export default Company;