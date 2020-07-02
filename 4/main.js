// googleMap API key: AIzaSyB0Utsq-f5txBmNM7Q_hY8-35Fw0b36Dd0

let countriesArray = [];
let targetCountryId;
let selectedCountryInfo;
const OWApiKey = '20456a0806891a0cabd85c21e51c42c3';
let weatherApi = [];
let theLat = 32;
let theLng = 53;

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(theLat, theLng),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(theLat, theLng)
    });
    marker.setMap(map);
}

//GET countries list
$.ajax({
    type: "GET",
    url: "https://restcountries.eu/rest/v2/all",
    success: function (response) {
        countriesArray = response;
        console.log(response);

        $('#selectCountry').html("Select Country"); //Change Loading to select country
        $("#country").prop("disabled", false).css('cursor', 'pointer'); //enable select tag
        for (let i = 1; i < countriesArray.length; i++) {
            //create countries is select tag as options
            $("#country").append(`<option value="${countriesArray[i].name}" id="${i}">${countriesArray[i].name}</option>`)
            //set the position of country in response array as it's ID
        }

        //what happen when selecting a country from list
        $("#country").on('change', function () {
            targetCountryId = country.options[country.selectedIndex].id; // a method to get selected element ID
            selectedCountryInfo = countriesArray[targetCountryId];
            console.log(selectedCountryInfo);


            //form the country card
            $("#flagImage").attr('src', selectedCountryInfo.flag)
            $('#countryName').html(selectedCountryInfo.name);
            $("#countryCode").html(`Country Code: ${selectedCountryInfo.callingCodes}`);
            $("#nativeName").html(`Native Name: ${selectedCountryInfo.nativeName}`);
            $("#capital").html(`Capital: ${selectedCountryInfo.capital}`);
            $("#region").html(`Region: ${selectedCountryInfo.region}`);
            $("#population").html(`Population: ${selectedCountryInfo.population}`);
            $("#languages").html(`Languages: `);
            for (let n = 0; n < selectedCountryInfo.languages.length; n++) {
                $("#languages").append(`${selectedCountryInfo.languages[n].name} `);
            }
            $("#timeZone").html(`Time Zone: ${selectedCountryInfo.timezones}`)


            //form weather card
            $.ajax({
                type: "GET",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${selectedCountryInfo.capital}&appid=20456a0806891a0cabd85c21e51c42c3`,
                success: function (response) {
                    console.log(response);
                    console.log(`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
                    $("#weatherImage").attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                    $("#city").html(selectedCountryInfo.capital);
                    $("#weatherCondition").html(response.weather[0].description)
                    $("#windSpeed").html(`Wind Speed: ${response.wind.speed} km/h`)
                    $("#temperature").html(`Temperature: ${(response.main.temp - 273.15)-(response.main.temp - 273.15)%1}`)
                    $("#humidity").html(`Humidity: ${response.main.humidity}%`)
                    $("#visibility").html(`Visibility: ${response.visibility/1000}km`)

                    //map

                    theLat = selectedCountryInfo.latlng[0];
                    theLng = selectedCountryInfo.latlng[1];
                    myMap();

                },

                error: function (err) {
                    console.log(err, `\n unable to fetch weather information!!!`);
                }
            });





        })
    },

    error: function (err) {
        console.log(err, `\n unable to fetch country information!!!`);
    }
});