import React, { useEffect, useState } from "react";
import data from "../data.json";

function Countries({ dark, setDark }) {
  const [countriesData, setCountriesData] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    setCountriesData(data);
    console.log("Data:", data);
  }, []);
  const getBorderName = (code) => {
    const country = countriesData.find((c) => c.alpha3Code === code);
    return country ? country.name : code;
  };
  return (
    <div>
      <div
        className={
          dark ? "bg-[#202c37] text-white" : "bg-[#fcfcfc] text-[#202c37] "
        }
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-wrap ml-20 mt-20">
          <>
            {selectedCountry ? (
              // 👉 DETAIL VIEW
              <div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className={`ml-[10px] ${
                    dark
                      ? "bg-[hsl(209,23%,22%)] text-white"
                      : "bg-white text-black"
                  }  p-4 rounded-2xl w-1/13 shadow cursor-pointer`}
                >
                  ← Back
                </button>

                <div className="flex gap-[120px] mt-10">
                  <img src={selectedCountry.flags.png} className="w-[550px] " />

                  <div className="flex flex-col">
                    <h2 className="text-3xl mt-15">{selectedCountry.name}</h2>
                    <div className="mt-6 gap-3 flex flex-col">
                      <span>
                        <b>Native Name: </b>
                        <span>{selectedCountry.nativeName}</span>
                      </span>{" "}
                      <span>
                        <b>Population:</b>{" "}
                        {selectedCountry.population.toLocaleString()}
                      </span>
                      <span>
                        <b>Region:</b> {selectedCountry.region}
                      </span>
                      <span>
                        <b>Sub Region:</b> {selectedCountry.subregion}
                      </span>
                      <span>
                        <b>Capital: </b>
                        {selectedCountry.capital}
                      </span>
                      <span className="mt-5 ">
                        <b>Border Countries:</b>{" "}
                        {selectedCountry.borders?.length > 0 ? (
                          selectedCountry.borders.map((border, index) => (
                            <span
                              key={index}
                              className={`${dark ?"bg-[hsl(209,23%,22%)] text-white"
                              : "bg-white text-black" } m-1  p-2 rounded shadow`}
                            >
                              {getBorderName(border)}
                            </span>
                          ))
                        ) : (
                          <span>No Border Countries</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col mt-22">
                    <div className=" flex mt-6 gap-3 flex-col">
                      <span>
                        <b>Top level Domain:</b>{" "}
                        {selectedCountry.topLevelDomain}{" "}
                      </span>
                      <span>
                        <b>Curriences:</b>{" "}
                        {selectedCountry.currencies?.map((item) => item.code)}
                      </span>
                      <span>
                        <b>Languages: </b>
                        {selectedCountry.languages
                          ?.map((item) => item.name)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // 👉 LIST VIEW
              <div className="flex flex-wrap m-20 p-2 justify-center items-center">
                {countriesData?.map((item, index) => (
                  <div
                    onClick={() => setSelectedCountry(item)}
                    className={`w-[320px] h-[380px] shadow rounded-xl m-6 overflow-hidden cursor-pointer hover:scale-105 transition 
            ${
              dark ? "bg-[hsl(209,23%,22%)] text-white" : "bg-white text-black"
            }`}
                    key={index}
                  >
                    <img
                      src={item.flags.png}
                      alt="flags"
                      className="w-full h-[200px] object-cover"
                    />

                    <h2 className="font-black text-2xl p-2">{item.name}</h2>

                    <div className="flex flex-col p-2">
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
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default Countries;
