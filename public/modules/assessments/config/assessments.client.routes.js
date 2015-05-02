'use strict';

//Setting up route
angular.module('assessments').config(['$stateProvider',
	function($stateProvider) {
		// Assessments state routing
		$stateProvider.
		state('listAssessments', {
			url: '/assessments',
			templateUrl: 'modules/assessments/views/list-assessments.client.view.html'
		}).
		state('createAssessment', {
			url: '/assessments/create',
			templateUrl: 'modules/assessments/views/create-assessment.client.view.html'
		}).
		state('viewAssessment', {
			url: '/assessments/:assessmentId',
			templateUrl: 'modules/assessments/views/view-assessment.client.view.html'
		}).
		state('editAssessment', {
			url: '/assessments/:assessmentId/edit',
			templateUrl: 'modules/assessments/views/edit-assessment.client.view.html'
		});
	}
]);