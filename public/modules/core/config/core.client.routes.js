'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('practice-examination', {
			url: '/practice-examination',
			templateUrl: 'modules/core/views/practice-examination.client.view.html'
		}).
		state('information', {
			url: '/information',
			templateUrl: 'modules/core/views/information.client.view.html'
		}).
		state('introduction', {
			url: '/introduction',
			templateUrl: 'modules/core/views/introduction.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);