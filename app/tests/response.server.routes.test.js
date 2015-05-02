'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Response = mongoose.model('Response'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, response;

/**
 * Response routes tests
 */
describe('Response CRUD tests', function() {
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

		// Save a user to the test db and create new Response
		user.save(function() {
			response = {
				name: 'Response Name'
			};

			done();
		});
	});

	it('should be able to save Response instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Response
				agent.post('/responses')
					.send(response)
					.expect(200)
					.end(function(responseSaveErr, responseSaveRes) {
						// Handle Response save error
						if (responseSaveErr) done(responseSaveErr);

						// Get a list of Responses
						agent.get('/responses')
							.end(function(responsesGetErr, responsesGetRes) {
								// Handle Response save error
								if (responsesGetErr) done(responsesGetErr);

								// Get Responses list
								var responses = responsesGetRes.body;

								// Set assertions
								(responses[0].user._id).should.equal(userId);
								(responses[0].name).should.match('Response Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Response instance if not logged in', function(done) {
		agent.post('/responses')
			.send(response)
			.expect(401)
			.end(function(responseSaveErr, responseSaveRes) {
				// Call the assertion callback
				done(responseSaveErr);
			});
	});

	it('should not be able to save Response instance if no name is provided', function(done) {
		// Invalidate name field
		response.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Response
				agent.post('/responses')
					.send(response)
					.expect(400)
					.end(function(responseSaveErr, responseSaveRes) {
						// Set message assertion
						(responseSaveRes.body.message).should.match('Please fill Response name');
						
						// Handle Response save error
						done(responseSaveErr);
					});
			});
	});

	it('should be able to update Response instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Response
				agent.post('/responses')
					.send(response)
					.expect(200)
					.end(function(responseSaveErr, responseSaveRes) {
						// Handle Response save error
						if (responseSaveErr) done(responseSaveErr);

						// Update Response name
						response.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Response
						agent.put('/responses/' + responseSaveRes.body._id)
							.send(response)
							.expect(200)
							.end(function(responseUpdateErr, responseUpdateRes) {
								// Handle Response update error
								if (responseUpdateErr) done(responseUpdateErr);

								// Set assertions
								(responseUpdateRes.body._id).should.equal(responseSaveRes.body._id);
								(responseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Responses if not signed in', function(done) {
		// Create new Response model instance
		var responseObj = new Response(response);

		// Save the Response
		responseObj.save(function() {
			// Request Responses
			request(app).get('/responses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Response if not signed in', function(done) {
		// Create new Response model instance
		var responseObj = new Response(response);

		// Save the Response
		responseObj.save(function() {
			request(app).get('/responses/' + responseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', response.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Response instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Response
				agent.post('/responses')
					.send(response)
					.expect(200)
					.end(function(responseSaveErr, responseSaveRes) {
						// Handle Response save error
						if (responseSaveErr) done(responseSaveErr);

						// Delete existing Response
						agent.delete('/responses/' + responseSaveRes.body._id)
							.send(response)
							.expect(200)
							.end(function(responseDeleteErr, responseDeleteRes) {
								// Handle Response error error
								if (responseDeleteErr) done(responseDeleteErr);

								// Set assertions
								(responseDeleteRes.body._id).should.equal(responseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Response instance if not signed in', function(done) {
		// Set Response user 
		response.user = user;

		// Create new Response model instance
		var responseObj = new Response(response);

		// Save the Response
		responseObj.save(function() {
			// Try deleting Response
			request(app).delete('/responses/' + responseObj._id)
			.expect(401)
			.end(function(responseDeleteErr, responseDeleteRes) {
				// Set message assertion
				(responseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Response error error
				done(responseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Response.remove().exec();
		done();
	});
});