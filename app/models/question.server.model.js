'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Question name',
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
	answer: {
		type:  Schema.ObjectId,
		ref: 'Answer'
	},
	content: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Question', QuestionSchema);