const searchBar = document.querySelector('#search');
const resultBar = document.querySelector('#resultBar');
const resultsList = document.querySelector('#resultsList');
const loading = document.querySelector('#loading');
var cityButton = document.querySelectorAll(".city-button");
var oldValueSearchBar = "";
var cityHasBeenFound = false
searchBar.addEventListener('input', () => {
  
  resultBar.classList.add('fade-in')
  resultBar.style.visibility = "visible";
  displayCities(searchBar.value);
  loading.style.visibility = "hidden";

})


searchBar.addEventListener('click', () => {
    oldValueSearchBar = searchBar.value;
    searchBar.value = "";
})


const displayCities = async (cityTyped) =>{
  let htmlContent; 
  let cities = {};
  let dataCityClicked = "";
  if(cityTyped.length==0){
    resultsList.innerHTML = "";
  }
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityTyped}`);
    let imageHasChanged = false;
    if(response.status == 200){
      if(imageHasChanged){
        loading.src = "images/loading.png";
      }
      cities = await response.json();
    }
    else{
      loading.src = "images/error.png";
      imageHasChanged = true
    }
  }
  catch (error) {
    loading.src = "images/noInternet.png";
    loading.style.visibility = "visible";
    resultsList.innerHTML = "";
  }
  if(cities.results != undefined){
    Boolean(cities.length) ? htmlContent = "" : htmlContent = "<ul>";
    for(var i = 0; i < cities.results.length; i++){
      htmlContent +=  `<li>\n`+
                      `   <div class="city-button" data-city="${cities.results[i].latitude},${cities.results[i].longitude},${cities.results[i].timezone},${cities.results[i].country_code}" line="${i+1}">\n`+
                      `     <img class="flag" src="https://flagsapi.com/${cities.results[i].country_code}/flat/64.png" alt="flag">\n`+
                      `     <span>${cities.results[i].name}, ${cities.results[i].admin1}, ${cities.results[i].country}</span>\n`+
                      `   </div>\n`+
                      `</li>`;
      if(i == cities.results.length - 1){
        htmlContent+="</ul>"
      }
    }
    resultsList.innerHTML = htmlContent
    cityButton = document.querySelectorAll(".city-button");
    cityButton.forEach(function(el) {
      el.addEventListener('click', () => {
        dataCityClicked = el.getAttribute("data-city");
        displayCityInfos(dataCityClicked.split(',')[0], dataCityClicked.split(',')[1], dataCityClicked.split(',')[2])
        searchBar.value = document.querySelector(`#resultsList > ul > li:nth-child(${el.getAttribute("line")}) > div > span`).textContent +' '+ getFlagEmoji(dataCityClicked.split(',')[3]);
      })
      cityHasBeenFound = true;
    });
    
    
  }
}



searchBar.addEventListener('blur', () => {
  loading.style.visibility = "hidden"
  resultBar.classList.remove('fade-in');
  resultBar.classList.add('fade-out');
  setTimeout(() => {
    resultBar.style.visibility = "hidden";
    resultBar.classList.remove('fade-out');
  }, 500);
  (cityHasBeenFound) ?
   cityHasBeenFound = false : searchBar.value = oldValueSearchBar;
})
