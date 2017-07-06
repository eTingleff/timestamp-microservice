var express = require("express");

var app = express();

app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/:timeStamp', function(req, res) {
	var timeStamp = req.params.timeStamp;
	var natural;
	var unix;
	if (!isNaN(timeStamp)) {
		var unixDate = new Date(timeStamp * 1000);
		var dateMonth = unixDate.getMonth();
		var dateDay = unixDate.getDate();
		var dateYear = unixDate.getFullYear();
		natural = months[dateMonth] + ' ' + dateDay + ', ' + dateYear;
		var naturalDate = Date.parse(natural);
		unix = naturalDate / 1000;
		res.json({
			'unix': unix,
			'natural': natural
		}); 
	}
	else {
		var naturalDate = Date.parse(timeStamp);
		unix = naturalDate / 1000;
		if (isNaN(unix)) {
			res.json({
				'unix': null,
				'natural': null
			});
		}
		else {
			var unixDate = new Date(unix * 1000);
			var dateMonth = unixDate.getMonth();
			var dateDay = unixDate.getDate();
			var dateYear = unixDate.getFullYear();
			natural = months[dateMonth] + ' ' + dateDay + ', ' + dateYear;
			res.json({
				'unix': unix,
				'natural': natural
			});
		}
	}
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + 'press Ctrl + C to terminate');
});