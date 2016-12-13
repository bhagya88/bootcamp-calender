var login_user;
var loginUser = function(user) {
	if (user) {
		login_user = Object.assign({}, user);
	} else {
		return login_user;
	}
}

module.exports = loginUser;