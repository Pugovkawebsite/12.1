'use strict'


let mainInput = document.querySelector('.header__input');
let mainButton = document.querySelector('.header__button');
let ipAddress = document.querySelector('#ipAdress');
let locationIp = document.querySelector('#location');
let timezoneIP = document.querySelector('#Timezone');
let OperatorIp = document.querySelector('#Operator');


let mainMap;
let mainFlag;

fetch('https://ipapi.co/json/')
.then(function(response) {
  response.json().then(jsonData => {
  
    showAddress (jsonData);
    transferFlag(jsonData.latitude, jsonData.longitude);
 
    
  });
})
.catch(function() {
  console.log('error');
});

function showAddress (jsonData) {
  ipAddress.innerHTML = jsonData.ip;
  locationIp.innerHTML = jsonData.city + ', ' + jsonData.country + ', ' + jsonData.postal;
  timezoneIP.innerHTML = 'UTC' + jsonData.utc_offset;
  OperatorIp.innerHTML = jsonData.org;

}
mainButton.addEventListener('click', function() {
  if ((mainInput.value == '') || (mainInput.value == ' ')) {
    return;
  } else {
    fetch(`https://ipapi.co/${mainInput.value}/json/`)
    .then(function(response) {
      response.json().then(jsonData => {
        showAddress (jsonData);
        transferFlag(jsonData.latitude, jsonData.longitude);
        return jsonData;
      });
    })
    .catch(function(error) {
      console.log(error)
    });
  }
} )

  ymaps.ready(function(latitude, long){
    mainMap = new ymaps.Map(document.querySelector('.map'), {
        center: [55.76, 37.64],
        zoom: 15,
        type: 'yandex#map'
    });
    mainFlag = new ymaps.Placemark(mainMap.getCenter(), {
      hintContent: '',
      balloonContent: ''
      
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'icon/flag.png',

      
    });
 
});



function transferFlag (x, y) {
    mainMap.panTo([x, y], {
      delay: 3500
  });
    mainFlag.geometry.setCoordinates([x, y], 10);
  mainMap.geoObjects.add(mainFlag);
}







