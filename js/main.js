var locations = [];



var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.635371, lng: -124.053291},
    zoom: 14
  });
  infowindow = new google.maps.InfoWindow({
	content: name
	});
}



function googleError() {
	"use strict";
	document.getElementById('map').innerHTML = "<h1>Google Maps is not loading</h1>";
};


var ViewModel = function(){
	"use strict";
	var self = this;

	self.venues = ko.observableArray();
	console.dir(self.venues);

	function getNames(data) {
		self.venues.push(data.response.venues);
		// locations.push(data.response.venues);
		// for (var i = 0; i < locations[0].length; i++) {
		// 	self.venues.push(locations[0][i]);
		// 	}
		};

	var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20130815&near=Newport, OR&radius=7500&query=coffee';
	$.ajax({
		url: fourSquareUrl,
		async: true,
		dataType: "json",
		success: function (data) {
			locations.push(data.response.venues);
			console.log(locations);


			// Set Markers with data
			setMarkers(data);
			getNames(data);
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
		//Add infowindows credit http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
		google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, this);
		marker.setMap(map);
		});




	};


	}
	}

ko.applyBindings(new ViewModel());





