'use strict';

// Assessments controller
angular.module('assessments').controller('AssessmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Assessments',
	function($scope, $stateParams, $location, Authentication, Assessments) {
		$scope.authentication = Authentication;

		// Create new Assessment
		$scope.create = function() {
			// Create new Assessment object
			var assessment = new Assessments ({
				name: this.name
			});

			// Redirect after save
			assessment.$save(function(response) {
				$location.path('assessments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Assessment
		$scope.remove = function(assessment) {
			if ( assessment ) { 
				assessment.$remove();

				for (var i in $scope.assessments) {
					if ($scope.assessments [i] === assessment) {
						$scope.assessments.splice(i, 1);
					}
				}
			} else {
				$scope.assessment.$remove(function() {
					$location.path('assessments');
				});
			}
		};

		// Update existing Assessment
		$scope.update = function() {
			var assessment = $scope.assessment;

			assessment.$update(function() {
				$location.path('assessments/' + assessment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Assessments
		$scope.find = function() {
			$scope.assessments = Assessments.query();
		};

		// Find existing Assessment
		$scope.findOne = function() {
			$scope.assessment = Assessments.get({ 
				assessmentId: $stateParams.assessmentId
			});
		};
	}
]);