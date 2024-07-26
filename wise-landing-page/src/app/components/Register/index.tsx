import Link from "next/link";

const Beliefs = () => {
  return (
    <div
      id="joinus"
      className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-5">
        {/* COLUMN-1 */}

        <div className="bg-darkprimary bg-beliefs pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
          <h2 className="text-lg font-normal text-white tracking-widest mb-5 text-center sm:text-start">
            JOIN US AS WOMEN
          </h2>
          <h3 className="text-4xl sm:text-65xl font-bold text-white leading-snug mb-5 text-center sm:text-start">
            Install&nbsp;
            <span className="text-grey">
              WISE now and stay healthy as a women.
            </span>
          </h3>
          <div className="text-center sm:text-start">
            <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-primary border border-primary hover:bg-primary">
              Install Now
            </button>
          </div>
        </div>

        {/* COLUMN-2 */}

        <div className="bg-build pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
          <h2 className="text-lg font-normal text-primary tracking-widest mb-5 text-center sm:text-start">
            JOIN US AS HOSPITAL
          </h2>
          <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug mb-5 text-center sm:text-start">
            <span className="text-primary">Register</span> as hospital and
            connect with patients.
          </h3>

          <div className="text-center sm:text-start">
            <Link href={"https://wisefordoctors.netlify.app"}>
              <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-primary border border-primary hover:bg-darkprimary">
                Register Hospital
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beliefs;
