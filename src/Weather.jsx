import axios from "axios";
import { useState } from "react";
function Weather(){
    const[location,setLocation]=useState("");
    const[weather,setWeather]=useState(null);

    const handleInputChange=(event)=>{
        setLocation(event.target.value);
    }

    const handleKeyPress=(event)=>{
        if(event.key==="Enter"){
            fetchWeather();
        }
    }

    const fetchWeather=async()=>{
        if(!location){
            alert("Please enter the city");
            return;
        }

        try{
            const response=await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=b2f6d710d55c420cbb6160436242711&q=${location}&days=7`);
            setWeather(response.data); 
        }
        catch(error){
            alert(error.message);
        }
    }

    return(
        <div className="main-container">
        <p id="heading">Weather Forecast</p>
        <input id="input" type="text" placeholder="Enter the city" value={location} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
        {weather && (
            <>
            <div className="main">
        <div className="main-left">
            <h1>{weather.location.name}</h1>
            <p id="date">{
                new Intl.DateTimeFormat("en-US",{
                    weekday:"long",
                    month:"long",
                    day:"numeric"
                }).format(new Date(weather.location.localtime))
                }</p>
            <p id="speed">Wind Speed: {weather.current.wind_kph} kph</p>
            <p id="hum">Humidity: {weather.current.humidity}%</p>
        </div>
        <div className="card">
            <p id="day">Today</p>
            <img src={weather.current.condition.icon} alt="Current condition" />
            <p id="temp">{weather.current.temp_c}°C</p>
            <p id="range">{weather.forecast.forecastday[0].day.mintemp_c}°C-{weather.forecast.forecastday[0].day.maxtemp_c}°C</p>
        </div>
        </div>
        <div className="forecast">
            {weather.forecast.forecastday.map((day,index)=>{
                const date=new Date(day.date);
                const dayName=date.toLocaleDateString("en-US",{weekday:"long"});
                return (
                    <div key={index} className="day-update">
                      <h3>{dayName}</h3>
                      <img src={day.day.condition.icon} alt="Condition" />
                      <p>{day.day.condition.text}</p>
                      <p>Avg Temp: {day.day.avgtemp_c}°C</p>
                    </div>
                  );
            })}
        </div>
        </>)}
        </div>
    );
}

export default Weather;