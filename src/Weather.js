import React, { useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './weather.css';

function GfGWeatherApp() {
    const [zipcode, setZip] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    const toDateFunction = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const WeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
            months[currentDate.getMonth()]
        }`;
        return date;
    };

	const search = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setWeather({ ...weather, loading: true });
	
			const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
			const weatherApiKey = 'c80b67eaae40e00d83bbcc8af4fa487f';
			const zipUrl = `https://api.zippopotam.us/us/${zipcode}`;
	
			try {

				const weatherResponse = await axios.get(weatherUrl, {
					params: {
						zip: `${zipcode},us`,
						units: 'imperial',
						appid: weatherApiKey,
					},
				});
	
				console.log('Full weather data:', weatherResponse.data);
	
				const zipResponse = await axios.get(zipUrl);
				const state = zipResponse.data.places[0].state;
				console.log('State: ', state);
	
				setWeather({
					data: { ...weatherResponse.data, state },
					loading: false,
					error: false,
				});

			} catch (error) {
				console.log('Error:', error);
				setWeather({ ...weather, data: {}, loading: false, error: true });
			}
		}
	};

    return (
        <div className="App">
            <h1 className="app-name">Weather App</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="zip-search"
                    placeholder="Enter ZIP Code.."
                    name="zipcode"
                    value={zipcode}
                    onChange={(event) => setZip(event.target.value)}
                    onKeyDown={search}
                />
            </div>
            {weather.loading && (
                <>
                    <br />
                    <br />
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px' }}>ZIP Code not found</span>
                    </span>
                </>
            )}
            {weather && weather.data && weather.data.main && (
                <div className='display'>
                    <div className="city-name">
                        <h2>
                            {weather.data.name}, <span>{weather.data.state}</span>, <span>{weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDateFunction()}</span>
                    </div>
                    <div className="icon-temp">
                        <img
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt={weather.data.weather[0].description}
                        />
                        {Math.round(weather.data.main.temp)}
                        <sup className="deg">°F</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {(weather.data.wind.speed).toFixed(0)}mph</p>
                    </div>
					<div className='feels-like'>
						<p>Feels like {(weather.data.main.feels_like).toFixed(0)}<sup className="deg">°F</sup> </p> 
					</div>
					<div className='humidity'>
						<p>Humidity {(weather.data.main.humidity).toFixed(0)}%</p>
					</div>
                </div>
            )}
        </div>
    );
}

export default GfGWeatherApp;
