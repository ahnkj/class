const API_KEY ='26e02cf6267ff8367a8e39cbf97f9468',
 POSITION_KEY = 'position',
 weather = document.querySelector('#weather');


function getWeather(coords){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const tempreture=json.main.temp;
        const place =json.name;
        weather.innerHTML=`${place} ${tempreture}‎°C`;
    }
    );
}


function handleGeoSucces(position){
    //console.log(position);
    const coords={latitude : position.coords.latitude, longitude : position.coords.longitude};
    //const strCoords = JSON.stringify(coords);
    //console.log(strCoords);
    localStorage.setItem(POSITION_KEY, JSON.stringify(coords));
}


function HandleGeoError(){
    console.log("Error!");
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,HandleGeoError);

}

function loadCoords(){
    const loaded = JSON.parse(localStorage.getItem(POSITION_KEY));

    if(loaded === null){
        askForCoords();
    }else{
        console.log(loaded);
        const coords= loaded;
        getWeather(coords);
    }

}


function init(){
    loadCoords();
}

init();