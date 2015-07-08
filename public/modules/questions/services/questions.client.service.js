'use strict';

// Questions service used to communicate Questions REST endpoints
angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		// return $resource('questions/:questionId', { questionId: '@_id' },
    //   {
    //     update: {
    //       method: 'PUT'
    //     }
    //   });

		return {
			question:
				$resource(
					'questions/:questionId',
					{ questionId: '@_id' },
					{ update: { method: 'PUT' } }
					),
			byChapter:
				$resource(
					'questions/by_chapter/:chapter',
					{ chapter: '@chapter' },
					{ query: { method: 'GET', params: {}, isArray: true } }
					)
		};
	}
]);
