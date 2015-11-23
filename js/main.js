var locations = [];

var map;
function initMap() {
	var mapOptions = {
		center: {lat: 44.635371, lng: -124.053291},
	zoom: 14
	};
	map = new google.maps.Map(document.getElementById('map'),
			mapOptions)
}

function googleError() {
	"use strict";
	document.getElementById('map').innerHTML = "<h1>Google Maps is not loading</h1>";
};


var ViewModel = function(){
	"use strict";
	var self = this;



	var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20130815&near=Newport, OR&radius=7500&query=coffee';
	$.ajax({
		url: fourSquareUrl,
		async: true,
		dataType: "json",
		success: function (data) {
			locations.push(data.response.venues);

			// Set Markers with data
			setMarkers(data);
			getNames(data)
			console.log(locations);
		}
	});

	function setMarkers(data) {
		"use strict";
		locations.push(data.response.venues);
		for (var i = 0; i < locations[0].length; i++) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[0][i].location.lat, locations[0][i].location.lng),
			map: map,
			title: locations[0][i].name,
			});
			marker.setMap(map);


	};

	}
}
ko.applyBindings(new ViewModel());





