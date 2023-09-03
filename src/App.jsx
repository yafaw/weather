import "./App.css";
import React, { useState } from "react";
import axios from "axios";

import reactLogo from "./assets/react.svg";
import feelsLike from "./assets/feels_like.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import clear from "./assets/clear.png";
import clouds from "./assets/clouds.png";
import rain from "./assets/rain.jpg";
import thunderstorm from "./assets/thunderstorm.png";
import line from "./assets/line.png";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [allCities, setAllCities] = useState([]);
  const tempUnits = ["°F", "°C", "K"];
  const [highlightedUnit, setHighlightedUnit] = useState(0);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=257ed06624a0e464f6e5632248920b41`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((e) => console.error(e));
      setLocation("");
    }
  };

  const toCelsius = (f) => {
    const a = f - 32;
    const b = 5 / 9;
    const c = a * b;
    return c;
  };

  const toKelvin = (f) => {
    const a = f - 32;
    const b = 5 / 9;
    const c = a * b + 273.15;
    return c;
  };

  const toFahrenheit = (f) => f;

  const changeTemp = () => {
    highlightedUnit == 0
      ? toFahrenheit(data.main.temp).toFixed()
      : highlightedUnit == 1
      ? toCelsius(data.main.temp).toFixed()
      : highlightedUnit == 2
      ? toKelvin(data.main.temp).toFixed()
      : null;
  };

  return (
    <div className="app">
      <div className={`search`}>
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search Location"
        />
        {data.name !== undefined && (
          <div className="temp-units">
            {tempUnits.map((unit, i) => (
              <h4
                onClick={() => setHighlightedUnit(i)}
                key={i}
                className={`${highlightedUnit === i ? "selected" : ""}`}
              >
                {unit}
              </h4>
            ))}
          </div>
        )}
      </div>
      <div className="container">
        <div className="top">
          <div className="left">
            <div className="location">
              <p>{data.name}</p>
              {data.sys ? <h4>{data.sys.country}</h4> : null}
            </div>
            <div className="temp">
              {data.main ? (
                <h1>
                  {highlightedUnit == 0
                    ? toFahrenheit(data.main.temp).toFixed()
                    : highlightedUnit == 1
                    ? toCelsius(data.main.temp).toFixed()
                    : highlightedUnit == 2
                    ? toKelvin(data.main.temp).toFixed()
                    : null}{" "}
                  {tempUnits[highlightedUnit]}
                </h1>
              ) : null}
            </div>
            {data.weather ? (
              <div className="icon">
                {data.weather[0].main == "Clear" ? (
                  <img src={clear} />
                ) : data.weather[0].main == "Clouds" ? (
                  <img src={clouds} />
                ) : data.weather[0].main == "Rain" ? (
                  <img src={rain} />
                ) : data.weather[0].main == "Thunderstorm" ? (
                  <img src={thunderstorm} />
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="right">
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        </div>

        {data.name && (
          <a href="#" className="view-more">
            View more &#8618;
          </a>
        )}

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {highlightedUnit == 0
                    ? toFahrenheit(data.main.temp).toFixed()
                    : highlightedUnit == 1
                    ? toCelsius(data.main.temp).toFixed()
                    : highlightedUnit == 2
                    ? toKelvin(data.main.temp).toFixed()
                    : null}{" "}
                  {tempUnits[highlightedUnit]}
                </p>
              ) : null}
              <p>Feels Like</p>
              <img src={feelsLike} />
            </div>
            <img className="line" src={line} />
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
              <img src={humidity} />
            </div>
            <img className="line" src={line} />
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}mph</p>
              ) : null}
              <p>Wind</p>
              <img src={wind} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
