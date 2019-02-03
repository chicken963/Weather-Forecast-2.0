class UI{
  constructor(){
    this.location = document.getElementById('w-location');
    this.desc = Array.from(document.querySelectorAll('.w-desc'));
    this.datetime = Array.from(document.querySelectorAll('.datetime'));
    this.string = Array.from(document.querySelectorAll('.w-string'));
    this.details = Array.from(document.querySelectorAll('.w-details'));
    this.icon = Array.from(document.querySelectorAll('.w-icon'));
    this.humidity = Array.from(document.querySelectorAll('.w-humidity'));
    this.feelsLike = Array.from(document.querySelectorAll('.w-feels-like'));
    this.dewpoint = Array.from(document.querySelectorAll('.w-dewpoint'));
    this.wind = Array.from(document.querySelectorAll('.w-wind'));
  }
  

  translateWithYandexPromise(text) {
    const YANDEX_API_KEY = 'trnsl.1.1.20190131T180859Z.d04df4a2f3775bb3.ed05d90a8d65e1aaf17a1f146d518e784e97a315';
    return new Promise((resolve, reject) => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_API_KEY}&lang=en-ru&text=${text}`)
      .then(res => {
        resolve(res);
      })
    })
  }


  
  paint(weather){
    let objDates = weather.forecast.forecastday.map(dayWeather => dayWeather.date);
    let objDatesFormatted = [];
    objDates.forEach((date) => {
      let dateAsDate = new Date(date);
      dateAsDate = dateAsDate.toLocaleDateString('ru');
      objDatesFormatted.push(dateAsDate);
    })
    let objDesc = weather.forecast.forecastday.map(dayWeather => dayWeather.day.condition.text);
    let objCelsium = weather.forecast.forecastday.map(dayWeather => dayWeather.day.avgtemp_c);
    let objIcon = weather.forecast.forecastday.map(dayWeather => {
      return 'https:' + dayWeather.day.condition.icon;
    });
    let objHumidity = weather.forecast.forecastday.map(dayWeather => dayWeather.day.avghumidity);
    let objWind = weather.forecast.forecastday.map(dayWeather => dayWeather.day.maxwind_kph);

    this.translateWithYandexPromise(objDesc)
    .then(res => res.json())
    .then(res => {
      fillFieldSet('', '', this.desc, res.text[0].split(','));
    });

    fillFieldSet('', '', this.datetime, objDatesFormatted);
    fillFieldSet('', `${String.fromCharCode(176)}C`, this.string, objCelsium);
    fillFieldSet('Отн. влажность: ', '%', this.humidity, objHumidity);
    fillFieldSet('Скорость ветра: ', ' км/ч', this.wind, objWind);
    
    this.icon.forEach((dayContainer) =>{
      dayContainer.setAttribute('src', objIcon[this.icon.indexOf(dayContainer)]);
    })

    this.translateWithYandexPromise([weather.location.name, weather.location.country])
    .then(res => res.json())
    .then(res => {
      this.fillLocation(res.text[0].split(',').join(', '));
    });


  }


  fillLocation(place){
    this.location.textContent = `${place}`;
  }

  fillDesc(desc){
    fillFieldSet('', '', this.desc, desc);
  }
}

function fillFieldSet(preDesc, postDesc, fieldSet, dataSet){
  fieldSet.forEach((field) =>{
    field.textContent = preDesc + dataSet[fieldSet.indexOf(field)] + postDesc;
  })

}