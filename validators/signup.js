var validator = require('validator');

var models = require('../models');

const validateCreateUserFields = function(errors, req) {
	if (!validator.isEmail(req.body.email)) {
		errors["email"] = "Please enter a valid email address.";
	}
	if (!validator.isAscii(req.body.password)) {
		errors["password"] = "There are invalid characters in the password you are attempting to create.  Please try a different password.";
	}
	if (!validator.isLength(req.body.password, {min: 8, max: 25})) {
		errors["password"] = "Your password must have at least 8 characters, and no more than 25 characters.";
	}
}

exports.validateUser = function(errors, req) {
	return new Promise(function(resolve, reject) {
		validateCreateUserFields(errors, req);
		return models.User.findOne({
			where: {
				email: req.body.email
			}
		}).then(u => {
			if (u !== null) {
				errors["email"] = "This email is already registered.  Please log in or reset your password.";
			}
			resolve(errors);
		})
	})
}