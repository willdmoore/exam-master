'use strict';

//Responses service used to communicate Responses REST endpoints
angular.module('responses').factory('Responses', ['$resource',
	function($resource) {
		return $resource('responses/:responseId', { responseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);