exports.form = function(req, res) {
	res.render('register/index', {title: 'Register User'});
};


var User = require('../lib/user');

exports.submit = function(req, res, next) {
	var data = req.body.user;

	User.getByName(data.name, function(err, user){
		if (err)
			return next(err);

		if (user.id){
			res.error("Username already taken!");
			res.redirect('back');
		}
		else
		{
			user = new User({	//Register the user
				name: data.name,
				pass: data.pass
			});

			user.save(function(err){ //saving the user into Redis DB
				if (err)
					return next(err);

				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
};