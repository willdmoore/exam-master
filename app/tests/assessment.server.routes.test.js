'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Assessment = mongoose.model('Assessment'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, assessment;

/**
 * Assessment routes tests
 */
describe('Assessment CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Assessment
		user.save(function() {
			assessment = {
				name: 'Assessment Name'
			};

			done();
		});
	});

	it('should be able to save Assessment instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assessment
				agent.post('/assessments')
					.send(assessment)
					.expect(200)
					.end(function(assessmentSaveErr, assessmentSaveRes) {
						// Handle Assessment save error
						if (assessmentSaveErr) done(assessmentSaveErr);

						// Get a list of Assessments
						agent.get('/assessments')
							.end(function(assessmentsGetErr, assessmentsGetRes) {
								// Handle Assessment save error
								if (assessmentsGetErr) done(assessmentsGetErr);

								// Get Assessments list
								var assessments = assessmentsGetRes.body;

								// Set assertions
								(assessments[0].user._id).should.equal(userId);
								(assessments[0].name).should.match('Assessment Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Assessment instance if not logged in', function(done) {
		agent.post('/assessments')
			.send(assessment)
			.expect(401)
			.end(function(assessmentSaveErr, assessmentSaveRes) {
				// Call the assertion callback
				done(assessmentSaveErr);
			});
	});

	it('should not be able to save Assessment instance if no name is provided', function(done) {
		// Invalidate name field
		assessment.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assessment
				agent.post('/assessments')
					.send(assessment)
					.expect(400)
					.end(function(assessmentSaveErr, assessmentSaveRes) {
						// Set message assertion
						(assessmentSaveRes.body.message).should.match('Please fill Assessment name');
						
						// Handle Assessment save error
						done(assessmentSaveErr);
					});
			});
	});

	it('should be able to update Assessment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assessment
				agent.post('/assessments')
					.send(assessment)
					.expect(200)
					.end(function(assessmentSaveErr, assessmentSaveRes) {
						// Handle Assessment save error
						if (assessmentSaveErr) done(assessmentSaveErr);

						// Update Assessment name
						assessment.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Assessment
						agent.put('/assessments/' + assessmentSaveRes.body._id)
							.send(assessment)
							.expect(200)
							.end(function(assessmentUpdateErr, assessmentUpdateRes) {
								// Handle Assessment update error
								if (assessmentUpdateErr) done(assessmentUpdateErr);

								// Set assertions
								(assessmentUpdateRes.body._id).should.equal(assessmentSaveRes.body._id);
								(assessmentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Assessments if not signed in', function(done) {
		// Create new Assessment model instance
		var assessmentObj = new Assessment(assessment);

		// Save the Assessment
		assessmentObj.save(function() {
			// Request Assessments
			request(app).get('/assessments')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Assessment if not signed in', function(done) {
		// Create new Assessment model instance
		var assessmentObj = new Assessment(assessment);

		// Save the Assessment
		assessmentObj.save(function() {
			request(app).get('/assessments/' + assessmentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', assessment.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Assessment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assessment
				agent.post('/assessments')
					.send(assessment)
					.expect(200)
					.end(function(assessmentSaveErr, assessmentSaveRes) {
						// Handle Assessment save error
						if (assessmentSaveErr) done(assessmentSaveErr);

						// Delete existing Assessment
						agent.delete('/assessments/' + assessmentSaveRes.body._id)
							.send(assessment)
							.expect(200)
							.end(function(assessmentDeleteErr, assessmentDeleteRes) {
								// Handle Assessment error error
								if (assessmentDeleteErr) done(assessmentDeleteErr);

								// Set assertions
								(assessmentDeleteRes.body._id).should.equal(assessmentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Assessment instance if not signed in', function(done) {
		// Set Assessment user 
		assessment.user = user;

		// Create new Assessment model instance
		var assessmentObj = new Assessment(assessment);

		// Save the Assessment
		assessmentObj.save(function() {
			// Try deleting Assessment
			request(app).delete('/assessments/' + assessmentObj._id)
			.expect(401)
			.end(function(assessmentDeleteErr, assessmentDeleteRes) {
				// Set message assertion
				(assessmentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Assessment error error
				done(assessmentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Assessment.remove().exec();
		done();
	});
});