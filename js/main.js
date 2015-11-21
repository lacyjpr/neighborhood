var locations = [];

var googleMap;
function initMap() {
	googleMap = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 44.635371, lng: -124.053291},
	zoom: 14
	});
}

function googleError() {
	document.getElementById('map').innerHTML = "<h1>Google Maps is not loading</h1>";
}

var ViewModel = function(){
	var self = this;

	var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20130815&near=Newport, OR&radius=7500&query=coffee';
	$.ajax({
		url: fourSquareUrl,
		async: true,
		dataType: "json",
		success: function (data) {
			locations.push(data.response.venues);
			console.log(locations);
		}
	});

};

ko.applyBindings(new ViewModel());





