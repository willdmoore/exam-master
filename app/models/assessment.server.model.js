'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Assessment Schema
 */
var AssessmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Assessment name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Assessment', AssessmentSchema);
