async function getWeather() {
    const apiKey = 'd5a5d10600922931dc9db24148c2f0ca'; // Замените на свой ключ API
    const cityInput = document.getElementById('city');
    const cityName = cityInput.value;

    if (!cityName) {
        alert('Введите город!');
        return;
    }

    try {
        // Запрос к OpenWeatherMap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Инфа о погоде
        const weatherInfo = document.getElementById('weather-info');
        // Курс валют
        const exchangeRates = await getExchangeRates();

        weatherInfo.innerHTML = `
            <p>Город: ${data.name}</p>
            <p>Температура: ${data.main.temp} °C</p>
            <p>Описание: ${data.weather[0].description}</p>
        `;

        // Вывод информации о курсах валют
        if (exchangeRates) {
            weatherInfo.innerHTML += `
                <p>Курс доллара: ${exchangeRates.USD} KZT</p>
                <p>Курс евро: ${exchangeRates.EUR} KZT</p>
                <p>Курс рубля: ${exchangeRates.RUB} KZT</p>
            `;
        } else {
            weatherInfo.innerHTML += '<p>Не удалось получить курсы валют.</p>';
        }


        showCityOnMap(data.coord.lat, data.coord.lon);
    } catch (error) {
        console.error('Ошибка при получении погоды:', error);
        alert('Ошибка при получении погоды. Проверьте правильность ввода города и наличие интернет-соединения.');
    }
}

async function getExchangeRates() {
    try {
        const response = await fetch('/exchange-rates');
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error(`Error fetching exchange rates: ${error}`);
        return null;
    }
}

// Город на карте
function showCityOnMap(latitude, longitude) {
    const mapContainer = document.querySelector('.map-location');

    if (!mapContainer) {
        console.error('Элемент map-location не найден.');
        return;
    }

    mapContainer.innerHTML = '';

    const map = new google.maps.Map(mapContainer, {
        center: { lat: latitude, lng: longitude },
        zoom: 10,
    });

    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Город',
    });
}



document.addEventListener('DOMContentLoaded', function () {
    const getWeatherButton = document.querySelector('button');
    getWeatherButton.addEventListener('click', getWeather);
});
