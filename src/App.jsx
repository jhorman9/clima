import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  
  const [weather, setWeather] = useState({});
  const [changeTemp, setChangeTemp] = useState(true);
  
  useEffect(() =>{
      function success(pos) {
      const crd = pos.coords;
      const lat = crd.latitude;
      const lon = crd.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bec57263d3b907386ff434cc82cdc1b4`)
      .then(res => setWeather(res.data));
      }
      navigator.geolocation.getCurrentPosition(success);
    },[])

  const changer = () =>[
    setChangeTemp(!changeTemp)
  ]

  console.log(weather);
  
  if(weather.weather?.[0].icon == "09d" || weather.weather?.[0].icon == "10d"){
    document.body.style ="background-image('https://i.vimeocdn.com/video/754305287-aa942b9f53c566365a144ca3ac9762b9076cc4e965d1fbf103813dcb38200d57-d_640x360.jpg'); color:black";
  }else if(weather.weather?.[0].icon == "09n" || weather.weather?.[0].icon == "10n"){
    document.body.style ="background-image('https://4.bp.blogspot.com/-hBJkeg5al8M/WCjpiOmbShI/AAAAAAAABdQ/gZ_b2Lyc_X8cMKf70upx_xXaPq7CF_i_ACLcB/s1600/6262013414_05dd3de8ce_b.jpg'); color:white";
  }else if(weather.weather?.[0].icon === "01d"){
    document.body.style ="background-image:url('https://p0.piqsels.com/preview/502/763/582/sky-clouds-sun-weather.jpg'); color:black";
  }else if(weather.weather?.[0].icon === "02d"){
    document.body.style = "background-image: url('https://media.istockphoto.com/photos/deep-blue-sky-with-few-clouds-picture-id1310822348?k=20&m=1310822348&s=612x612&w=0&h=LlQm1Cxcw-mNRyMYmUtFNtxrlycyTpeChoJYIsHLDOw='); color:black"
  }else if(weather.weather?.[0].icon === "03d"){
    document.body.style = "background-image: url('https://media.istockphoto.com/photos/cirrocumulus-clouds-cloudscape-picture-id645173476?b=1&k=20&m=645173476&s=170667a&w=0&h=0wdytj1LA3mA1Jzp0j6_rgip60BxH9e5BAAE_vFlJQE='); color:black"
  }else if(weather.weather?.[0].icon === "04d"){
    document.body.style = "background-image: url('https://www.e-education.psu.edu/meteo101/sites/www.e-education.psu.edu.meteo101/files/images/lesson1/broken_ps0107.jpg'); color:black"
  }else if(weather.weather?.[0].icon === "01n"){
    document.body.style = "background-image: url('https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_960_720.jpg'); color:white"
  }else if(weather.weather?.[0].icon === "02n"){
    document.body.style = "background-image: url('https://qph.cf2.quoracdn.net/main-qimg-506bee5948e08eb9100f86cd17f6314f.webp'); color:white"
  }else if(weather.weather?.[0].icon === "03n"){
    document.body.style = "background-image: url('https://live.staticflickr.com/89/243533494_363ba3b01e_b.jpg'); color:white"
  }else if(weather.weather?.[0].icon === "04n"){
    document.body.style = "background-image: url('https://i0.wp.com/www.troyjohnstone.com/astrophotography/images/sky_clouds_night_moon_2006_09_09_04.jpg'); color:white"
  }

  return (
    <>
    <div className="App">
        <h3>Weather APP</h3>
        <h4>{weather.name}, "{weather.sys?.country}"</h4>
        <p><b>"{weather.weather?.[0].description.toUpperCase()}"</b></p>
        <div className="iconSeparate">
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
          <div className="infoSeparate">
            <p><b>Wind Speed:</b> {weather.wind?.speed} m/s</p>
            <p><b>Pressure:</b> {weather.main?.pressure} mb</p>
          </div>
        </div>
        <div className="temperature">
          <p className='temp'><b>Temp:</b> {changeTemp ? `${weather.main?.temp} K` : `${(weather.main?.temp - 273.15).toFixed(2)} C°`}</p>
          <p className='temp'><b>Temp MAX:</b> {changeTemp ? `${weather.main?.temp_max} K` : `${(weather.main?.temp_max - 273.15).toFixed(2)} C°`}</p>
          <p className='temp'><b>Temp MIN:</b> {changeTemp ? `${weather.main?.temp_min} K` : `${(weather.main?.temp_min - 273.15).toFixed(2)} C°`}</p>
        </div>
        <div className="btn">
          <button onClick={changer}>{changeTemp ? "Change to C°" : "Change to K"}</button>
        </div>
      </div>
      {}
    </>
  )
}

export default App
