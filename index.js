const apikey = '703c8d68cf51469496f3df895f3bbd6b'; //instance for the api key

document.getElementById('weatherCheck').addEventListener('click', function(){
    if(navigator.geolocation){ //checking if the navigator.geolocation is compatible with the browser
        navigator.geolocation.getCurrentPosition(success, error) //if compatible
    }else{
        error('not supported by the browser'); //if not compatible with the browser
    }
})

function success(position){ //function for the success callback if success in the compatibility of the browser
    const lat = position.coords.latitude //latitude coordinates of the user
    const lon = position.coords.longitude //longitude coordinates of the user

    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apikey}` //this variable calls the API through its url

    //fetching the API
    fetch(url)
        .then(response => {
            if(!response.ok){  //server response from the the request(API request) note: that .then is a method to handle promises in asynchronous functions
                throw new error("Couldn't fetch the data error 404")
            }

            return response.json()
        })

        .then(data => {
            const weather = data.data[0] //the weather info is stored inside the data property capturing the first data [0 : means 1st]
            const temperature = weather.temp //captures the weather temperature
            const description = weather.weather.description //captures the weather description

            document.getElementById('displayloca').textContent = `Current Location: ${lat} ${lon}`
            document.getElementById('displayweath').textContent = `Weather: ${description}`
            document.getElementById('displayinfo').textContent = `temperature: ${temperature}°C` //displays the infos
            if(description === 'Light rain'){
                document.getElementById('advise').textContent = 
                `Upon scanning your location, you may go outside but better bring an umbrella!`
                const badweath = document.getElementById('gif');
                badweath.src = 'heavyrain.gif';
            }
            if (description === 'Heavy rain'){
                document.getElementById('advise').textContent = 
                `Upon scanning your location, you cannot go outside for estimated 30 minutes until the rain stops.`
                const slightweath = document.getElementById('gif');
                slightweath.src = 'slightrain.gif';
            }
            
            if(description === 'Clear sky'){
                document.getElementById('advise').textContent = 
                `Upon scanning your location, you may go outside!`
                const goodweath = document.getElementById('gif');
                goodweath.src = 'goodweather.gif';
            }
            if(description === 'Drizzle'){
                document.getElementById('advise').textContent = 
                `Upon scanning your location, you may go outside but you might want to consider bringing an umbrella`
                const goodweath = document.getElementById('gif');
                goodweath.src = 'couple-cuddle-weather.gif';
            }
        })

        .catch(err => {
            console.error('error running the response', err)
            alert('failed running the weather data')
        })
}

function error(){
    alert('error accessing the geolocation!')
}