import { useState, useEffect } from "react";
import WheaterData from "./components/WheaterData";
import { WheaterDataProps } from "./types";
import './App.css'

function App() {
  const [input, setInput] = useState<string>();
  const [wheaterData, setWheaterData] = useState<WheaterDataProps | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWheaterData(latitude, longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  async function getWheaterData(lat?: number, lon?: number) {
    const key = import.meta.env.VITE_KEY;
    let url;
    try {
      if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}&units=metric`
      }
      const request = await fetch( url );

      if (!request) {
        throw new Error("Fetch request failed!");
      }
      const data = await request.json();
      console.log(data);

      setWheaterData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function getInput() {
    setInput((document.getElementById("city") as HTMLInputElement).value);
  }


  return (
    <div className="container d-flex flex-column align-items-center justify-content-center ">
      <div>
        <div className="my-5">
          <input type="text" id="city" onChange={() => getInput()} />
          <button type="button" onClick={() => getWheaterData()}>
            Submit
          </button>
        </div>

        <WheaterData data={wheaterData} />
      </div>
    </div>
  );
}

export default App;