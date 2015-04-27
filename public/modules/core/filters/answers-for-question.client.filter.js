'use strict';

angular.module('core').filter('answersForQuestion', [
	function() {
		return function(input, id) {
			// Answers for question directive logic
			// ...

			return input.filter(function(obj) {
        return obj.question_id === id;
      });
		};
	}
]);