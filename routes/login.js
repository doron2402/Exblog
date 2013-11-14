var User = require('../lib/user');

exports.form = function(req, res){
	res.render('login/index', { title: 'Login' });
};

exports.submit = function(req, res, next){

	var data = req.body.user;
	console.log('%s %s',data.name, data.pass);
	
	User.authenticate(data.name, data.pass, function(err, user){
	
		if (err)
			return next(err);

		if (user){
			req.session.uid = user.id;
			res.redirect('/');
		} else {
			console.log('cant login')
			res.error("Sorry! invalid credentials.");
			res.redirect('back'); //redirect to login form
		}
	});
};

exports.logout = function(req, res){
	req.session.destory(function(err){
		if (err)
			throw err;
		res.redirect('/');
	});
};