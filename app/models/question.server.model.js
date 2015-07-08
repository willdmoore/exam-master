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
	created: {
		type: Date,
		default: Date.now
	},
	responses: [
		{
			content: String
		}
	],
	answer: Number,
	content: {
		type: String,
		default: '',
		trim: true
	},
	chapter: String,
	explanation: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Question', QuestionSchema);
