'use strict';

(function() {
	// Assessments Controller Spec
	describe('Assessments Controller Tests', function() {
		// Initialize global variables
		var AssessmentsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Assessments controller.
			AssessmentsController = $controller('AssessmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Assessment object fetched from XHR', inject(function(Assessments) {
			// Create sample Assessment using the Assessments service
			var sampleAssessment = new Assessments({
				name: 'New Assessment'
			});

			// Create a sample Assessments array that includes the new Assessment
			var sampleAssessments = [sampleAssessment];

			// Set GET response
			$httpBackend.expectGET('assessments').respond(sampleAssessments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.assessments).toEqualData(sampleAssessments);
		}));

		it('$scope.findOne() should create an array with one Assessment object fetched from XHR using a assessmentId URL parameter', inject(function(Assessments) {
			// Define a sample Assessment object
			var sampleAssessment = new Assessments({
				name: 'New Assessment'
			});

			// Set the URL parameter
			$stateParams.assessmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/assessments\/([0-9a-fA-F]{24})$/).respond(sampleAssessment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.assessment).toEqualData(sampleAssessment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Assessments) {
			// Create a sample Assessment object
			var sampleAssessmentPostData = new Assessments({
				name: 'New Assessment'
			});

			// Create a sample Assessment response
			var sampleAssessmentResponse = new Assessments({
				_id: '525cf20451979dea2c000001',
				name: 'New Assessment'
			});

			// Fixture mock form input values
			scope.name = 'New Assessment';

			// Set POST response
			$httpBackend.expectPOST('assessments', sampleAssessmentPostData).respond(sampleAssessmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Assessment was created
			expect($location.path()).toBe('/assessments/' + sampleAssessmentResponse._id);
		}));

		it('$scope.update() should update a valid Assessment', inject(function(Assessments) {
			// Define a sample Assessment put data
			var sampleAssessmentPutData = new Assessments({
				_id: '525cf20451979dea2c000001',
				name: 'New Assessment'
			});

			// Mock Assessment in scope
			scope.assessment = sampleAssessmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/assessments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/assessments/' + sampleAssessmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid assessmentId and remove the Assessment from the scope', inject(function(Assessments) {
			// Create new Assessment object
			var sampleAssessment = new Assessments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Assessments array and include the Assessment
			scope.assessments = [sampleAssessment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/assessments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAssessment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.assessments.length).toBe(0);
		}));
	});
}());