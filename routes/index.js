exports.notfound = function(req, res) {
	res.status(404).format({
		html: function(){
			res.render('404');
		},
		json: function () {
			res.send({ message: 'Resource not found' });
		},
		xml: function() {
			res.write('<error>\n');
			res.write('	<message>Resource not found</message>\n');
			re.end('</error>');
		},
		text: function() {
			res.send('Resource not found\n');
		}

	});
};


exports.errorPage = function(err, req, res, next){
	console.error(err.stack);

	var msg;

	switch (err.type)
 	{
 		case 'database':
 			msg = 'database Unavailable';
 			res.statusCode = 501;
 			break;
 		default:
 			msg = "internal server error";
 			res.statusCode = 500;
 			break;
 	}

 	res.format({
 		html: function(){
 			res.render('5xx', { msg: msg, status: res.statusCode });
 		},
 		json: function () {
 			res.send({ error: msg });
 		},
 		text: function () {
 			res.send(msg + '\n');
 		}
 	});
 };
