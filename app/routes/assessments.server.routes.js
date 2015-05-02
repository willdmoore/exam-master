'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var assessments = require('../../app/controllers/assessments.server.controller');

	// Assessments Routes
	app.route('/assessments')
		.get(assessments.list)
		.post(users.requiresLogin, assessments.create);

	app.route('/assessments/:assessmentId')
		.get(assessments.read)
		.put(users.requiresLogin, assessments.hasAuthorization, assessments.update)
		.delete(users.requiresLogin, assessments.hasAuthorization, assessments.delete);

	// Finish by binding the Assessment middleware
	app.param('assessmentId', assessments.assessmentByID);
};
