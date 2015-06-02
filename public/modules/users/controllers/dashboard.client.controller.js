'use strict';

angular.module('users').controller('DashboardController', ['$scope', 'Authentication', 'Activities',
	function($scope, Authentication, Activities) {
		// Dashboard controller logic
		$scope.user = Authentication.user;
    $scope.activities = Activities.query();
	}
]);
