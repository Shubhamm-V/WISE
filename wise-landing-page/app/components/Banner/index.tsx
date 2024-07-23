import Image from "next/image";

const Banner = () => {
  return (
    <div className="mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-16">
        {/* COLUMN-1 */}

        <div className="mx-auto sm:mx-0">
          <div className="py-3 text-center lg:text-start">
            <button className="purple bg-lightprimary hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-darkprimary">
              Women Health Empowerment
            </button>
          </div>
          <div className="py-3 text-center lg:text-start">
            <h1 className="text-6xl lg:text-80xl font-bold text-darkpurple">
              Your Wellness Journey, Our Empowering Mission
            </h1>
          </div>
          <div className="flex gap-3 justify-center sm:justify-start">
            {" "}
            <div className="my-7 text-center lg:text-start">
              <button className="text-sm md:text-xl font-semibold hover:shadow-xl bg-primary text-white py-3 px-6 md:py-3 md:px-4 rounded-lg hover:bg-darkprimary">
                Install WISE
              </button>
            </div>
            <div className="my-7 text-center lg:text-start">
              <button className="text-sm border-2 md:text-xl font-semibold hover:shadow-xl bg-white text-primary py-3 px-6 md:py-3 md:px-4  rounded-lg hover:bg-lightprimary">
                Register Hospital
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN-2 */}

        <div className="lg:-m-24 lg:pt-20 hidden lg:block">
          <Image
            src="/images/banner/banner.svg"
            alt="hero-image"
            width={800}
            height={642}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
