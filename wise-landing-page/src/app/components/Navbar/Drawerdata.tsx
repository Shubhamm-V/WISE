import React from "react";
import Link from "next/link";
import Contactusform from "./Contactus";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Features", href: "#features", current: false },
  { name: "Join Us", href: "#joinus", current: false },
  { name: "App Overview", href: "#overview", current: false },
  { name: "FAQ", href: "#faq", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-purple"
                    : "text-black hover:bg-gray-700 hover:text-purple",
                  "block  py-2 rounded-md text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            <Link href="/">
              <button
                type="button"
                className="flex flex-row gap-2 align-middle text-sm font-semibold bg-transparent py-2 px-8 lg:px-8 navbutton rounded-lg hover:bg-darkprimary hover:text-white"
              >
                <Image
                  src={"/images/socials/google-play.png"}
                  alt="twitter"
                  width={24}
                  height={24}
                />
                <div>Install WISE</div>
              </button>
            </Link>
            {/* <Contactusform /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
