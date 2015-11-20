

var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20130815&ll=44.634589, -124.053299&query=coffee'
$.ajax({
	url: fourSquareUrl,
	async: true,
	dataType: "json",
	success: function (data) {
		console.log(data);
	}
});



// $.getJSON(fourSquareUrl, function (data) {
// 	console.log(data);
// });
