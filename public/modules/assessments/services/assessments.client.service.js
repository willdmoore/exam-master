'use strict';

//Assessments service used to communicate Assessments REST endpoints
angular.module('assessments').factory('Assessments', ['$resource',
	function($resource) {
		return $resource('assessments/:assessmentId', { assessmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);