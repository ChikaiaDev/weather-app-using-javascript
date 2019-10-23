window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let presipitate = document.querySelector('.presipitation');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy= 'https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/ac08f14a9e50ca268d22383f2e63c8c2/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data=>{
                console.log(data);
                const{temperature,summary, icon}= data.currently;


                // convert farenheit to celcius
                let celcius = Math.round(((temperature- 32) * (5/9))*10)/10 ;
                temperatureDegree.textContent= celcius;
                temperatureDescription.textContent= summary;
                locationTimezone.textContent = data.timezone;

                // set icons
                setIcons(icon, document.querySelector('.icon'));
            })
        });
    }else{
        temperatureDegree.textContent ="You have not enable Mweather to access your location";

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"rgb(223, 247, 239)"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})