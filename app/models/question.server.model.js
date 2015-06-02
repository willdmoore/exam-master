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

/**
 * Questions associated with a particular Chapter
 */
QuestionSchema.statics.findByChapter = function(chapter, callback) {
	return this.find({ chapter: chapter }, callback);
};

mongoose.model('Question', QuestionSchema);
