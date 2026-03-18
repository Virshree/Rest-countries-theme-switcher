import React, { useEffect, useState } from "react";
import data from "../data.json";

function Countries({ dark, setDark }) {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    setCountriesData(data);
    console.log("Data:", data);
  }, []);
  return (
    <div>
      <div
        className={
          dark ? "bg-[#202c37] text-white" : "bg-[#fcfcfc] text-[#202c37] "
        }
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-wrap m-20 p-2 justify-center items-center">
          {countriesData?.map((item, index) => (
            <div
              className={`w-[320px] h-[380px] shadow rounded-xl m-6  overflow-hidden ${ dark ? "bg-[hsl(209,23%,22%)] text-white":"bg-white text-black"}`}
              key={index}
            >
              <img
                src={item.flags.png}
                alt="flags"
                className="w-full  h-[200px] object-cover "
              />
              <h2 className="font-black text-2xl p-2">{item.name}</h2>
              <div className="flex flex-col p-2 ">
                <span>
                  <b>Population:</b> {item.population.toLocaleString()}
                </span>
                <span>
                  <b>Region:</b> {item.region}
                </span>
                <span>
                  <b>Capital:</b> {item.capital}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Countries;
