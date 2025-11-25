export function initWeather() {
    const tempEl = document.getElementById('weatherTemp');
    const descEl = document.getElementById('weatherDesc');
    const locationEl = document.getElementById('weatherLocation');
    const iconEl = document.getElementById('weatherIcon');

    // Default location (Sao Paulo) if permission denied or error
    const defaultLat = -23.5505;
    const defaultLon = -46.6333;

    function getWeather(lat, lon, locationName = 'Local Weather') {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const current = data.current;
                const temp = Math.round(current.temperature_2m);
                const code = current.weather_code;
                const isDay = current.is_day;

                tempEl.textContent = `${temp}°C`;
                locationEl.textContent = locationName;

                const weatherInfo = getWeatherInfo(code, isDay);
                descEl.textContent = weatherInfo.desc;
                iconEl.textContent = weatherInfo.icon;
            })
            .catch(err => {
                console.error('Weather fetch error:', err);
                descEl.textContent = 'Offline';
            });
    }

    function getWeatherInfo(code, isDay) {
        // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
        // 0: Clear sky
        // 1, 2, 3: Mainly clear, partly cloudy, and overcast
        // 45, 48: Fog
        // 51, 53, 55: Drizzle
        // 61, 63, 65: Rain
        // 71, 73, 75: Snow
        // 95, 96, 99: Thunderstorm

        if (code === 0) return { desc: 'Clear Sky', icon: isDay ? '☀️' : '🌙' };
        if (code >= 1 && code <= 3) return { desc: 'Partly Cloudy', icon: isDay ? '⛅' : '☁️' };
        if (code >= 45 && code <= 48) return { desc: 'Foggy', icon: '🌫️' };
        if (code >= 51 && code <= 55) return { desc: 'Drizzle', icon: '🌦️' };
        if (code >= 61 && code <= 67) return { desc: 'Rain', icon: '🌧️' };
        if (code >= 71 && code <= 77) return { desc: 'Snow', icon: '❄️' };
        if (code >= 80 && code <= 82) return { desc: 'Showers', icon: '🌧️' };
        if (code >= 95 && code <= 99) return { desc: 'Thunderstorm', icon: '⚡' };

        return { desc: 'Unknown', icon: '🌡️' };
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeather(position.coords.latitude, position.coords.longitude, 'Current Location');
            },
            (error) => {
                console.warn('Geolocation denied/error, using default.', error);
                getWeather(defaultLat, defaultLon, 'Default Location');
            }
        );
    } else {
        getWeather(defaultLat, defaultLon, 'Default Location');
    }
}
