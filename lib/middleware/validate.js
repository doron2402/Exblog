//return the field that we need to fetch from the body
function parseField(field) { 
	return field
	.split(/\[|\]/)
	.filter(function(s){return s});
}

//Get the data from the http request by parsing it from the body request
function getField (req, field) { 
	var val = req.body;
	field.forEach(function(prop) {
		val = val[prop];
	});
	return val;
}

exports.required = function(field) {
	field = parseField(field);
	return function(req, res, next) {
		if (getField(req, field))
			next()
		else
		{
			red.error(field.join(' ') + ' is required');
			red.redirect('back');
		}
	}
};

exports.lengthAbove = function(field, len) {
	field = parseField(field)
	return function(req, res, next){
		if (getField(req, field).length > len)
			next()
		else{
			res.error(field, join(' ') + ' must have more than ' + len + ' characters.');
			res.redirect('back');
		}
	}
};