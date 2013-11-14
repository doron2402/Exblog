var User = require('../user');

module.exports = function(req, res, next) {
	var uid = req.session.uid; //Get user id from session request
	if (!uid)
		return next();

	User.get(uid, function(err, user){ //get logged-in users data from redis
		if (err)
			return next(err);

		console.log('user: %s', user.name);
		req.user = res.locals.user = user; //expose user data to response object
		next();
	});
};