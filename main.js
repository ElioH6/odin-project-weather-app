import APIKEY from './config.js';

$('document').ready(function () {
    $('.search-box button').click(function (event) {
      event.preventDefault();
      const city = $('.search-box input').val();

      if (city === '') {
        $('.search-box').css('border', '1px solid red');
        $('.search-box input').val('');
        $('.search-box input').removeClass('search');
        $('.search-box input').addClass('notFound');
        $('.search-box input').attr('placeholder', 'you must enter a location');
        return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          $('.search-box').css('border', '1px solid white');
          $('.search-box input').removeClass('notFound');
          $('.search-box input').addClass('search');
          $('.weather-box img').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
          $('.weather-box .temprature').html(`${data.main.temp} <span>°C</span>`);
          $('.weather-box .description').html(data.weather[0].description);
          $('.info-humidity span').html(`${data.main.humidity}%`);
          $('.info-wind span').html(`${data.wind.speed}Km/h`);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          $('.search-box').css('border', '1px solid red');
          $('.search-box input').val('');
          $('.search-box input').removeClass('search');
          $('.search-box input').addClass('notFound');
          $('.search-box input').attr('placeholder', 'City not found');
          $('.weather-box img').attr('src', 'images/404.png');
          $('.weather-box .temprature').html(`? <span>°C</span>`);
          $('.weather-box .description').html('Not Found');
        });
    });
  });