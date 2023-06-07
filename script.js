//DOM elements

const isp = document.getElementById("isp");
const ip = document.getElementById("ip");
const timezone = document.getElementById("timezone");
const area = document.getElementById("location");
const searchBar = document.getElementById("ip-address-input");
const button = document.getElementById("arrow-icon");

// constants
let latitude;
let longitude;

const API_KEY = "aa1ab53bf9f940c7bcb66293a76fdd15";

// getting the data from api url using axios
async function getUserData(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;

    ip.innerHTML = data.ip;
    isp.innerHTML = data.isp;
    area.innerHTML = data.location.region + ", " + data.location.country;
    timezone.innerHTML = data.location.timezone;
  } catch (error) {
    console.log("Error => " + error);
  }
}

getUserData(
  "https://geo.ipify.org/api/v2/country?apiKey=at_R8CDgzHTi6efcdtjg6pcKgucdCTVY&IPv4=8.8.8.8"
);

// showing the map
var map = L.map("map").setView([51.5, -0.09], 13);
map.zoomControl.remove(); // removes the default zoom in and out buttons

var myIcon = L.icon({
  iconUrl: "images/icon-location.svg",
});

var marker = L.marker([51.501, -0.09], { icon: myIcon }).addTo(map);

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
    variant: "World_Street_Map",
  }
).addTo(map);

// searching for data from ip address

function searchFromIPAddress() {
  ipAddress = searchBar.value;

  function isValidIPAddress(ip) {
    // regex expression
    const ipAddressRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // checks ip address is valid fom regex and returns true/false
    return ipAddressRegex.test(ip);
  }

  if (isValidIPAddress(ipAddress)) {
    // display data about that ip address

    axios
      .get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress}`
      )
      .then((response) => {
        const data = response.data;
        // Process the data returned by the API
        ip.innerHTML = data.ip;
        isp.innerHTML = data.isp;
        area.innerHTML = data.city + ", " + data.country_code3;
        timezone.innerHTML = data.time_zone.offset;

        // change map view to show location of ip

        map.setView([data.latitude, data.longitude], 13);
        L.marker([data.latitude, data.longitude], { icon: myIcon }).addTo(map);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 403) {
          alert("You're not authorized to access this resource ");
          // Handle the 403 error case
        } else {
          console.log("An error occurred:", error.message);
          // Handle other errors
        }
      });
  } else {
    // show error message
    alert("Please enter a valid IP address");
  }
}

// Event listeners
button.addEventListener("click", searchFromIPAddress);
