var locations = [
	{
		name: "Fast Lane Coffee",
		lat: 44.64070053,
		lng: -124.05267986,
		id: "4d9a662a674ca14376eaba43"
	},
	{
		name: "Dutch Bros. Coffee",
		lat: 44.62933649650506,
		lng: -124.06172633171082,
		id: "4ae9a73ff964a5208ab521e3"
	},
	{
		name: "The Coffee House",
		lat: 44.631362557411194,
		lng: -124.050916,
		id: "4b9bd043f964a5204e2836e3"
	},
	{
		name: "Solid Grounds Coffee House",
		lat: 44.633673,
		lng: -124.057304,
		id: "4f32afba19836c91c7efd8a5"
	},
	{
		name: "Bayscapes Coffee House",
		lat: 44.63016470161697,
		lng: -124.05276088349126,
		id: "4e4455eb1838e44e898badeb"
	},
	{
		name: "Carls Coffee",
		lat: 44.638854379944675,
		lng: -124.0611189933332,
		id: "5116a3fce4b04e9f6ad94274"
	},
	{
		name: "Dockside Coffee House Gallery",
		lat: 44.630096,
		lng: -124.05267119407654,
		id: "4c55e6ccfd2ea59359727f2c"
	},
	{
		name: "Surf Town Coffee Company",
		lat: 44.62982165943548,
		lng: -124.05335751403604,
		id: "4c02a2e89a7920a1c0b5ce79"
	},
	{
		name: "Starbucks",
		lat: 44.63738090498442,
		lng: -124.05263566533459,
		id: "4bafb4d1f964a52080193ce3"
	},
	{
		name: "Fins Coffee at the Oregon Coastal Aquarium",
		lat: 44.617662114530646,
		lng: -124.04709191325138,
		id: "51f42596498eabca282eba39"
	},
	{
		name: "Starbucks",
		lat: 44.651158892548324,
		lng: -124.0517664026574,
		id: "4e4dd567bd41b76bef93e4a9"
	}
];

// Initialize the map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.635371, lng: -124.053291},
    zoom: 14
  });
ko.applyBindings(new ViewModel()); 
}

// Alert the user if google maps isn't working
function googleError() {
	"use strict";
	document.getElementById('map').innerHTML = "<h1>Google Maps is not loading</h1>";
};

//Place constructor
// Credit https://discussions.udacity.com/t/having-trouble-accessing-data-outside-an-ajax-request/39072/10
var Place = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.id = ko.observable(data.id);
	this.marker = ko.observable();
	this.phone = ko.observable('');
}

var ViewModel = function(){
	var self = this;

	// Create an array of all places
	// Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
	this.placeList = ko.observableArray([]);

	// Create Place objects for each item in locations
	// Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
	locations.forEach(function(placeItem) {
		self.placeList.push( new Place(placeItem));
	}); 

	// Place markers
	// Credit https://github.com/kacymckibben/project-5-app.git
	var infowindow = new google.maps.InfoWindow();
	var marker;

	self.placeList().forEach(function(placeItem){

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(placeItem.lat(),placeItem.lng()),
			map: map,
			animation: google.maps.Animation.DROP,
			title: placeItem.name()
		});
		placeItem.marker = marker;

		//function getFoursquare() {
			$.ajax({
				url: 'https://api.foursquare.com/v2/venues/' + placeItem.id() + '?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20130815',
				success: function(data) {
					//console.dir(data);
					var result = data.response.venue;
					console.dir(result);
					placeItem.name(result.name);
					//placeItem.phone(result.contact.formattedPhone);
					// Credit https://discussions.udacity.com/t/foursquare-results-undefined-until-the-second-click-on-infowindow/39673/2
					var contact = result.hasOwnProperty('contact') ? result.contact : '';
					if (contact.hasOwnProperty('formattedPhone')) {
    					placeItem.phone(contact.formattedPhone || '');
					}
				},
				error: function(e) {
					infowindow.setContent('<h5>Foursquare data is unavailable. Please try refreshing later.</h5>')
				}
			});
		//};

		function toggleBounce() {
		if(placeItem.marker.getAnimation() !== null) {
			placeItem.marker.setAnimation(null);
		} else {
			placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

		//Add infowindows credit http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
		google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, this);
		toggleBounce();
		setTimeout(toggleBounce, 500);
		//getFoursquare();
		infowindow.setContent('<h4>' + placeItem.name() + '</h4><p>' + placeItem.phone() + '</p>')
		});
	});

	self.showInfo = function(placeItem) {
		google.maps.event.trigger(placeItem.marker, 'click');
	}



	// Array containing only the markers based on search
	self.visible = ko.observableArray();

	// All markers are visible by default before any user search
	self.placeList().forEach(function(place) {
		self.visible.push(place);
	});

	// Keep track of user input
	self.userInput = ko.observable('');

	// Filter markers: Set all markers to not visible. 
	// Only display them if they match user search input
	// Credit http://codepen.io/prather-mcs/pen/KpjbNN?editors=001
	self.filterMarkers = function() {
		var searchInput = self.userInput().toLowerCase();
		self.visible.removeAll();
		// Compare the name of each place to the user input
		// If it matches, display the place and marker
		self.placeList().forEach(function(place) {
			place.marker.setVisible(false);
		if (place.name().toLowerCase().indexOf(searchInput) !== -1) {
			self.visible.push(place);
			}
		});
		self.visible().forEach(function(place){
			place.marker.setVisible(true);
		})
	}





} // ViewModel






