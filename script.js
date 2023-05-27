//DOM elements

const isp = document.getElementById('isp');
const ip = document.getElementById('ip');
const timezone = document.getElementById('timezone');
const area = document.getElementById('location');

// showing the map
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// getting the data from api url using axios
async function getUserData() {
    try {
      const response = await axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_R8CDgzHTi6efcdtjg6pcKgucdCTVY&IPv4=8.8.8.8');
      const data = response.data;

      ip.innerHTML = data.ip
      isp.innerHTML = data.isp
      area.innerHTML = data.location.region + ', ' + data.location.country
      timezone.innerHTML = data.location.timezone
      
    } catch (error) {
      console.log('Error => ' + error);
    }
  }
  
  getUserData();

  // searching for data from ip address
  