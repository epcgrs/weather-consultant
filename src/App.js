import React, {useState} from 'react';

const api = {
  key: '68e2d44d0f5a77e8381c7efd974d6f19',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState(''); 
  const [weather, setWeather] = useState({});
  
  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&lang=pt_br&units=metric`)
        .then(res => {
          return res.json();
        })
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? ( 
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}ºC
            </div>
            <div className="weather">
              <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
              <br />  
              {weather.weather[0].description}
            </div>
          </div>  
        </div>
        ) : ('') }
      </main>
    </div>
  );
}

export default App;
