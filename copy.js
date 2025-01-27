const apikey = '703c8d68cf51469496f3df895f3bbd6b';

document.getElementById('weatherCheck').addEventListener('click', function() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error)
    }else{
        alert('error shit not supported by this browser')
    }
});

function success(position){
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apikey}`

    fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error('Message returned not okay');
            }

            return response.json();
        })

        .then(data => {
            const weather = data.data[0];
            const temperature = weather.temp;
            const description = weather.weather.description;
            alert(`current temperature: ${temperature} and description: ${description}`);
        })

        .catch(err => {
            console.error('fetch error', err);
            alert("failed to fetch the weather data")
        })
}

function error(){
    alert('unable to retrieve location data')
}