let mainInput = document.getElementById('mainInput');
let data = []
let date;
let month;
let dayNumber;
let today;
let tomorrow;
let afterTomorrow;




// getLocation();

async function search(value) {
  let https = await fetch(`https://api.weatherapi.com/v1/search.json?key=a4d9ca52b51444709ba174407230812&q=${value}`)
  let response = await https.json()
  data = response

}

async function getWeather(value) {
  let https = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a4d9ca52b51444709ba174407230812&q=${value}&days=3`)
  let response = await https.json()
  display(response);

}



function display(response) {

  getDateInfo(response);

  let cartona = ` <div class="col-lg-4 ">
    <div class="item color1 pb-3 text-white  rounded-start-1">
      <div class="head d-flex justify-content-between border-bottom py-2 px-2 color2">
        <p class="m-0">${today}</p>
        <p class="m-0">${dayNumber}  ${month}</p>
      </div>
      <div class="body ps-2 color1">
        <p class="m-3 h4">${response.location.name}</p>
        <div class="main d-flex justify-content-between" >
          <p >${response.current.temp_c}°c</p>
          <img src="${response.current.condition.icon}"  class="me-3" width="150 "  alt="">
        </div>
        <p class="text-info text-center">${response.current.condition.text}</p>
        <div class="weather-icons px-5 d-flex justify-content-between">
          <div class="d-flex">
            <img src="./imgs/icon-umberella.png" class="mx-1" alt="">
            <p class="m-0">${response.current.cloud}</p>
          </div>
          <div class="d-flex">
            <img src="./imgs/icon-wind.png"  alt="">
            <p class="m-0">${response.current.wind_kph} km/hr</p>
          </div>
          <div class="d-flex">
            <img src="./imgs/icon-compass.png" class="mx-1" alt="">
            <p class="m-0">${response.current.wind_dir}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-4 text-center">
    <div class="item color3 text-white pb-3">
      <div class="head color4 border-bottom py-2">
        <p class="m-0">${tomorrow}</p>
        
      </div>
      <div class="body">
        <img src="${response.forecast.forecastday[1].day.condition.icon}" class="my-5" alt="">
        <p class="bold-text" >${response.forecast.forecastday[1].day.maxtemp_c}°c</p>
        <p class="h5 color5">${response.forecast.forecastday[1].day.mintemp_c}°c</p>
        <p class="text-info">${response.forecast.forecastday[1].day.condition.text}</p>
      
      </div>
    </div>
  </div>
  <div class="col-lg-4 text-center">
    <div class="item color1 text-white pb-3  rounded-end-1">
      <div class="head border-bottom py-2 color2">
        <p class="m-0">${afterTomorrow}</p>
        
      </div>
      <div class="body">
        <img src="${response.forecast.forecastday[2].day.condition.icon}"  class="my-5" alt="">
        <p class="bold-text">${response.forecast.forecastday[2].day.maxtemp_c}°c</p>
        <p class="color5 h5">${response.forecast.forecastday[2].day.mintemp_c}°c</p>
        <p class="text-info">${response.forecast.forecastday[1].day.condition.text}</p>
      </div>
    </div>
  </div>`
  document.querySelector('.row').innerHTML = cartona;
}

function getDateInfo(response) {
  date = new Date(response.forecast.forecastday[0].date);  // 2009-11-10
  month = date.toLocaleString('default', { month: 'long' });
  dayNumber = date.getDate()
  today = date.toLocaleString('default', { weekday: "long" })
  tomorrow = new Date(response.forecast.forecastday[1].date).toLocaleString('default', { weekday: "long" })
  afterTomorrow = new Date(response.forecast.forecastday[2].date).toLocaleString('default', { weekday: "long" })
  console.log(today, tomorrow, afterTomorrow);
}

mainInput.addEventListener('input',async function(){
  await search(this.value);
  for(let i=0;i<data.length;i++){
    if(data[i].name.toLowerCase().includes(this.value.toLowerCase())||data[i].country.toLowerCase().includes(this.value.toLowerCase())){
      getWeather(this.value);
    }
  }
})

getWeather('cairo');



