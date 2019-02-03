class Weather {
  constructor(city){
    this.apiKey = '27e416be35784446a06172004193001';
    this.city = city;
  }

  getWeatherPromise(){
    return fetch(`http://api.apixu.com/v1/forecast.json?key=${this.apiKey}&q=${this.city}&days=4`);
        
  }

  changeLocation(city){
    this.city = city;
  }


}