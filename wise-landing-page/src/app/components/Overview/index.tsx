"use client";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
  heading: string;
  imgSrc: string;
}

const postData: DataType[] = [
  {
    heading: "Track period and activities",
    imgSrc: "/images/featured/feat1.png",
  },
  {
    heading: "Track daily water intake",
    imgSrc: "/images/featured/feat2.png",
  },
  {
    heading: "Health Education",
    imgSrc: "/images/featured/feat3.png",
  },
  {
    heading: "Access nearby hospitals",
    imgSrc: "/images/featured/feat4.png",
  },
  // {
  //   heading: "Learn by videos",
  //   imgSrc: "/images/featured/feat2.jpg",
  // },
];

// CAROUSEL SETTINGS

function SampleNextArrow(props: {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.3)",
        padding: "28px",
        borderRadius: "20px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.3)",
        padding: "28px",
        borderRadius: "20px",
      }}
      onClick={onClick}
    />
  );
}

const MultipleItems: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 775);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: !isMobile,
    autoplay: isMobile,
    speed: 400,
    nextArrow: <SampleNextArrow className="" style={{}} onClick={() => {}} />,
    prevArrow: <SamplePrevArrow className="" style={{}} onClick={() => {}} />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="py-20 marginFeature bg-featuredbg">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center pt-48 mt-8 pb md:pt-96">
          <h3
            id="overview"
            className="text-4xl sm:text-6xl  font-bold text-white my-2"
          >
            App Overview
          </h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-white text-opacity-50 lg:mr-48 my-2">
            App Overview
          </h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-white text-opacity-25 lg:-mr-32 my-2">
            App Overview
          </h3>
        </div>

        <Slider {...settings}>
          {postData.map((items, i) => (
            <div key={i}>
              <div className="bg-transparent m-3 pb-12 my-10 rounded-3xl">
                <Image
                  src={items.imgSrc}
                  alt="gaby"
                  width={636}
                  height={620}
                  className="rounded-2xl"
                />
                <div className="">
                  <h4 className="text-center sm:text-5xl font-bold sm:pt-6 lg:text-center sm:text-start mt-10 text-white">
                    {items.heading}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MultipleItems;
