'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var responses = require('../../app/controllers/responses.server.controller');

	// Responses Routes
	app.route('/responses')
		.get(responses.list)
		.post(users.requiresLogin, responses.create);

	app.route('/responses/:responseId')
		.get(responses.read)
		.put(users.requiresLogin, responses.hasAuthorization, responses.update)
		.delete(users.requiresLogin, responses.hasAuthorization, responses.delete);

	// Finish by binding the Response middleware
	app.param('responseId', responses.responseByID);
};
