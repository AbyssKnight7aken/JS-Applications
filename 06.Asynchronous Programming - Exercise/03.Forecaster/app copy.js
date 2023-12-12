function attachEvents() {
    
    const inputLocationElement = document.getElementById('location');
    const getWeatherButton = document.getElementById('submit');
    const forecastElement = document.getElementById('forecast');
    const currentWeatherElement = document.getElementById('current');
    const upcomingWeatherElement = document.getElementById('upcoming');

    getWeatherButton.addEventListener('click', getWeather);

    function getWeather() {
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then(res => res.json())
        .then(data => {
            const cityIndex = data.findIndex(el => el.name === inputLocationElement.value);
            forecastElement.style.display = 'block';
            if (cityIndex === -1) {
                throw new Error();
            }
            let cityCode = data[cityIndex].code;

            fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
            .then(res = res.json())
            .then(data => {
                
            })
        })
    }
}

attachEvents();