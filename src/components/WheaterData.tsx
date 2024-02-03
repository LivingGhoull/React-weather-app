import { Data } from "../types";

function WheaterData({ data }: Data) {
  return (
    <>
      {data?.cod == 200 ? (
        <>
          <p>City: {data.name} </p>
          <p>Temp: {data.main.temp} </p>

          <p>descripotion: {data.weather[0].description} </p>

          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />

          <p>Temp-max: {data.main.temp_max} </p>
          <p>Temp-min: {data.main.temp_min} </p>
        </>
      ) : (
        <p>Nothing is found</p>
      )}
    </>
  );
}

export default WheaterData;