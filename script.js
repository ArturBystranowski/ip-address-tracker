const API_URL =
	"https://geo.ipify.org/api/v2/country,city?apiKey=at_IQNC6w8LATe2QsmRjBFpMscFFvWXP&ipAddress=";
const API_KEY = "at_IQNC6w8LATe2QsmRjBFpMscFFvWXP";
const ipInput = document.querySelector("input");
const btn = document.querySelector("button");
const ipValue = document.querySelector(".ip-value");
const locationValue = document.querySelector(".location-value");
const timezoneValue = document.querySelector(".timezone-value");
const ispValue = document.querySelector(".isp-value");

// async function getData() {
// 	let ip = ipInput.value;
// 	const response = await fetch(API_URL + ip);
// 	const data = await response.json();
// 	ipValue.textContent = data.ip;
// 	locationValue.textContent = `${data.location.country}, ${data.location.city}`;
// 	timezoneValue.textContent = `UTC${data.location.timezone}`;
// 	ispValue.textContent = data.isp;
// 	let lat = data.location.lat;
// 	let lng = data.location.lng;
// }

// ---------------------------------------------

let map;

async function getData() {
	let ip = ipInput.value;
	const response = await fetch(API_URL + ip);
	const data = await response.json();
	ipValue.textContent = data.ip;
	locationValue.textContent = `${data.location.country}, ${data.location.city}`;
	timezoneValue.textContent = `UTC${data.location.timezone}`;
	ispValue.textContent = data.isp;
	let lat = data.location.lat;
	let lng = data.location.lng;

	getMap(lat, lng);
}

const getMap = (lat, lng) => {
	map.setView([lat, lng], 14);

	let icon = L.icon({
		iconUrl: "images/icon-location.svg",
		iconSize: [40, 48],
	});

	L.marker([lat, lng], { icon }).addTo(map);
};

(function () {
	map = L.map("map", { zoomControl: false, scrollWheelZoom: false });

	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: "© OpenStreetMap",
	}).addTo(map);

	getData();
})();

btn.addEventListener("click", getData);
