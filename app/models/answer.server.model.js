'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answer Schema
 */
var AnswerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Answer name',
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
	content: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Answer', AnswerSchema);