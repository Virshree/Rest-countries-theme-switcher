import React, { useEffect, useState } from "react";
import data from "../data.json";

function Countries({ dark }) {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [region, setRegion] = useState("");

  useEffect(() => {
    setCountriesData(data);
  }, []);

  const getBorderName = (code) => {
    const country = countriesData.find((c) => c.alpha3Code === code);
    return country ? country.name : code;
  };

  // ✅ Filter logic
  const filteredCountries = countriesData.filter((country) => {
    const matchSearch = country.name
      .toLowerCase()
      .includes(searchCountry.toLowerCase());

    const matchRegion = region ? country.region === region : true;

    return matchSearch && matchRegion;
  });

  const displayCountries =
    searchCountry || region ? filteredCountries : countriesData;

  return (
    <div
      className={`min-h-screen ${
        dark ? "bg-[#202c37] text-white" : "bg-[#fafafa] text-[#202c37]"
      }`}
    >
      {/* 🔍 Search + Filter */}
      {!selectedCountry && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-20 pt-10">
          {/* Search */}
          <input
            type="text"
            placeholder="Search for a country..."
            className="w-full md:w-[400px] h-12 p-3 rounded-xl border shadow"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
          />

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className={`${
                dark
                  ? "bg-[hsl(209,23%,22%)] text-white"
                  : "bg-white text-black"
              } p-3 rounded-lg shadow w-[180px] text-left overflow-hidden`}
            >
              {region || "Filter by Region"}   ⌄
            </button>

            {showDropdown && (
              <div
                className={`absolute z-50 mt-2 w-full rounded-lg shadow ${
                  dark
                    ? "bg-[hsl(209,23%,22%)] text-white"
                    : "bg-white text-black"
                }`}
              >
                {["Africa", "Americas", "Asia", "Europe", "Oceania"].map(
                  (r) => (
                    <p
                      key={r}
                      onClick={() => {
                        setRegion(r);
                        setShowDropdown(false);
                      }}
                      className={`p-2 cursor-pointer ${
                        dark
                          ? "hover:bg-[hsl(209,23%,30%)]"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {r}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🌍 CONTENT */}
      {selectedCountry ? (
        // 👉 DETAIL VIEW
        <div className="px-4 md:px-20 py-10">
          <button
            onClick={() => setSelectedCountry(null)}
            className={`mb-6 px-6 py-2 rounded shadow ${
              dark
                ? "bg-[hsl(209,23%,22%)] text-white"
                : "bg-white text-black"
            }`}
          >
            ← Back
          </button>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Image */}
            <img
              src={selectedCountry.flags.png}
              className="w-full lg:w-[550px]"
              alt="flag"
            />

            {/* Info */}
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl mb-4">
                {selectedCountry.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span>
                    <b>Native Name:</b> {selectedCountry.nativeName}
                  </span>
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
                    <b>Capital:</b> {selectedCountry.capital}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span>
                    <b>Top Level Domain:</b>{" "}
                    {selectedCountry.topLevelDomain}
                  </span>
                  <span>
                    <b>Currencies:</b>{" "}
                    {selectedCountry.currencies
                      ?.map((c) => c.code)
                      .join(", ")}
                  </span>
                  <span>
                    <b>Languages:</b>{" "}
                    {selectedCountry.languages
                      ?.map((l) => l.name)
                      .join(", ")}
                  </span>
                </div>
              </div>

              {/* Borders */}
              <div className="mt-6">
                <b>Border Countries:</b>
                <div className="flex flex-wrap mt-2">
                  {selectedCountry.borders?.length > 0 ? (
                    selectedCountry.borders.map((border, index) => (
                      <span
                        key={index}
                        className={`m-1 p-2 rounded shadow ${
                          dark
                            ? "bg-[hsl(209,23%,22%)] text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {getBorderName(border)}
                      </span>
                    ))
                  ) : (
                    <span className="ml-2">No Border Countries</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 👉 LIST VIEW
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-20 py-10">
          {displayCountries.length > 0 ? (
            displayCountries.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedCountry(item)}
                className={`shadow rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition ${
                  dark
                    ? "bg-[hsl(209,23%,22%)] text-white"
                    : "bg-white text-black"
                }`}
              >
                <img
                  src={item.flags.png}
                  alt="flag"
                  className="w-full h-40 object-cover"
                />

                <h2 className="font-bold text-lg p-2">{item.name}</h2>

                <div className="flex flex-col p-2 text-sm">
                  <span>
                    <b>Population:</b>{" "}
                    {item.population.toLocaleString()}
                  </span>
                  <span>
                    <b>Region:</b> {item.region}
                  </span>
                  <span>
                    <b>Capital:</b> {item.capital}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-red-500 text-xl">
              No country found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Countries;