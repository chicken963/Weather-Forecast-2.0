const storage = new Storage();
const ui = new UI();

const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation);
weather.getWeatherPromise()
  .then(results => results.json())
  .then(results => {
    ui.paint(results);
    })
  .catch(err => console.log(err));

  
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;

  weather.changeLocation(city);
  storage.setLocationData(city);
  weather.getWeatherPromise()
  .then(results => results.json())
  .then(results => {
    ui.paint(results);
    })
  .catch(err => console.log(err));

  $('#locModal').modal('hide');
})
  
