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
  
  let videoToBg = "./src/assets/video/Dia.mp4";
  if(weather.weather?.[0].icon == "09d" || weather.weather?.[0].icon == "10d"){
    videoToBg = "./src/assets/video/LluviaDia.mp4";
    document.body.style ="background-image('https://i.vimeocdn.com/video/754305287-aa942b9f53c566365a144ca3ac9762b9076cc4e965d1fbf103813dcb38200d57-d_640x360.jpg'); color:black";
  }else if(weather.weather?.[0].icon == "09dn" || weather.weather?.[0].icon == "10dn"){
    videoToBg = "./src/assets/video/LluviaNoche.mp4";
    document.body.style ="background-image('https://4.bp.blogspot.com/-hBJkeg5al8M/WCjpiOmbShI/AAAAAAAABdQ/gZ_b2Lyc_X8cMKf70upx_xXaPq7CF_i_ACLcB/s1600/6262013414_05dd3de8ce_b.jpg'); color:white";
  }

  document.body.style ="background-image:url('https://www.madeiraislandnews.com/wp-content/uploads/2020/02/image_content_2787091_20200222115545.jpg'); color:black";

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
      <video src={videoToBg} autoplay="true" muted="true" loop="true" ></video>
    </>
  )
}

export default App
