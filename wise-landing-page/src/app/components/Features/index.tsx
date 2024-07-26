import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

interface datatype {
  heading: string;
  imgSrc: string;
  paragraph: string;
}

const Aboutdata: datatype[] = [
  {
    heading: "Education",
    imgSrc: "/images/aboutus/imgOne.svg",
    paragraph:
      "Learn about women's health from professional doctors with the help of educational videos.",
  },
  {
    heading: "Track Periods",
    imgSrc: "/images/aboutus/imgTwo.svg",
    paragraph:
      "Track your period activities like Menstruation flow, feelings, symptoms and get notified before periods.",
  },
  {
    heading: "Water Intake",
    imgSrc: "/images/aboutus/imgThree.svg",
    paragraph:
      "Track your daily water intake. Set goals and reminders to stay healthy.",
  },
  {
    heading: "Hospitals",
    imgSrc: "/images/aboutus/imgThree.svg",
    paragraph:
      "Access nearby hospitals and contact doctors in case of any health emergency.",
  },
];

const Aboutus = () => {
  return (
    <div id="features">
      <div className="mx-auto max-w-8xl px-4 py-24 my-32 lg:px-5 bg-lightgrey rounded-3xl relative">
        <Image
          src="/images/aboutus/dots.svg"
          width={100}
          height={100}
          alt="dots-image"
          className="absolute bottom-1 -left-20"
        />
        <h3 className="text-center text-primary text-lg tracking-widest">
          FEATURES
        </h3>
        <h4 className="text-center text-4xl lg:text-65xl font-bold">
          What we offers?
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-16 gap-x-16 lg:gap-x-2">
          {Aboutdata.map((item, i) => (
            <div
              key={i}
              className="hover:bg-darkprimary bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group"
            >
              <h4 className="text-4xl font-semibold  text-darkprimary mb-5 group-hover:text-white">
                {item.heading}
              </h4>
              {/* <Image
                src={item.imgSrc}
                alt={item.imgSrc}
                width={100}
                height={100}
                className="mb-5"
              /> */}
              <h4 className="text-lg font-normal text-darkprimary group-hover:text-offwhite mb-5">
                {item.paragraph}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
