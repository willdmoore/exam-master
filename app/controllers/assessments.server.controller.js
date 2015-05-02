'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Assessment = mongoose.model('Assessment'),
	_ = require('lodash');

/**
 * Create a Assessment
 */
exports.create = function(req, res) {
	var assessment = new Assessment(req.body);
	assessment.user = req.user;

	assessment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assessment);
		}
	});
};

/**
 * Show the current Assessment
 */
exports.read = function(req, res) {
	res.jsonp(req.assessment);
};

/**
 * Update a Assessment
 */
exports.update = function(req, res) {
	var assessment = req.assessment ;

	assessment = _.extend(assessment , req.body);

	assessment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assessment);
		}
	});
};

/**
 * Delete an Assessment
 */
exports.delete = function(req, res) {
	var assessment = req.assessment ;

	assessment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assessment);
		}
	});
};

/**
 * List of Assessments
 */
exports.list = function(req, res) { 
	Assessment.find().sort('-created').populate('user', 'displayName').exec(function(err, assessments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assessments);
		}
	});
};

/**
 * Assessment middleware
 */
exports.assessmentByID = function(req, res, next, id) { 
	Assessment.findById(id).populate('user', 'displayName').exec(function(err, assessment) {
		if (err) return next(err);
		if (! assessment) return next(new Error('Failed to load Assessment ' + id));
		req.assessment = assessment ;
		next();
	});
};

/**
 * Assessment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.assessment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
