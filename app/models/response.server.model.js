'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Response Schema
 */
var ResponseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Response name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	question: {
		type: Schema.ObjectId,
		ref: 'Question'
	},
	answer: {
		type: Schema.ObjectId,
		ref: 'Answer'
	}
});

mongoose.model('Response', ResponseSchema);