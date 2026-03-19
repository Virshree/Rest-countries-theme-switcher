import React, { useState } from "react";
import Countries from "./Countries";

function Navbar() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={
        `   md:justify-between md:items-center
       ${ dark
          ? "bg-[hsl(207,26%,17%)] min-h-screen"
          : "bg-[hsl(0,0%,99%)] min-h-screen"}
      `}
    >
      {/* Navbar */}
      <div
        className={`h-15 flex justify-between items-center p-4 ${
          dark
            ? "bg-[hsl(209,23%,22%)] text-white shadow"
            : "bg-[hsl(0,0%,99%)] text-[hsl(200,15%,8%)] shadow"
        }`}
      >
        <h2 className=" md:text-base  font-semibold">Where in the world?</h2>

        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-2 cursor-pointer text-sm sm:text-base"
        >
          {dark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}

          {dark ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Content */}

      <Countries dark={dark}  />
    </div>
  );
}

export default Navbar;
