'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'exammasterinteractive';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('activities');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('assessments');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('questions');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('responses');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

//Setting up route
angular.module('activities').config(['$stateProvider',
	function($stateProvider) {
		// Activities state routing
		$stateProvider.
		state('listActivities', {
			url: '/activities',
			templateUrl: 'modules/activities/views/list-activities.client.view.html'
		}).
		state('createActivity', {
			url: '/activities/create',
			templateUrl: 'modules/activities/views/create-activity.client.view.html'
		}).
		state('viewActivity', {
			url: '/activities/:activityId',
			templateUrl: 'modules/activities/views/view-activity.client.view.html'
		}).
		state('editActivity', {
			url: '/activities/:activityId/edit',
			templateUrl: 'modules/activities/views/edit-activity.client.view.html'
		});
	}
]);
'use strict';

// Activities controller
angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Activities',
	function($scope, $stateParams, $location, Authentication, Activities) {
		$scope.authentication = Authentication;

		// Create new Activity
		$scope.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name
			});

			// Redirect after save
			activity.$save(function(response) {
				$location.path('activities/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Activity
		$scope.remove = function(activity) {
			if ( activity ) { 
				activity.$remove();

				for (var i in $scope.activities) {
					if ($scope.activities [i] === activity) {
						$scope.activities.splice(i, 1);
					}
				}
			} else {
				$scope.activity.$remove(function() {
					$location.path('activities');
				});
			}
		};

		// Update existing Activity
		$scope.update = function() {
			var activity = $scope.activity;

			activity.$update(function() {
				$location.path('activities/' + activity._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Activities
		$scope.find = function() {
			$scope.activities = Activities.query();
		};

		// Find existing Activity
		$scope.findOne = function() {
			$scope.activity = Activities.get({ 
				activityId: $stateParams.activityId
			});
		};
	}
]);
'use strict';

//Activities service used to communicate Activities REST endpoints
angular.module('activities').factory('Activities', ['$resource',
	function($resource) {
		return $resource('activities/:activityId', { activityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('practice-examination-chapter', {
			url: '/practice-examination-chapter',
			templateUrl: 'modules/core/views/practice-examination-chapter.client.view.html'
		}).
		state('practice-examination-results', {
			url: '/practice-examination-results',
			templateUrl: 'modules/core/views/practice-examination-results.client.view.html'
		}).
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
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

angular.module('core').controller('InformationController', ['$scope',
	function($scope) {
		// Information controller logic
		// ...
    $scope.tabs = [
      {
        'title': 'Study Materials',
        'active': true,
        'content': 'STUDY MATERIALS:  Students preparing for the Pennsylvania Insurance Examination should have a current edition of the companion study manual Essentials of Property and Casual Insurance and a current edition of the Pennsylvania Licensing and Examination Insurance booklet.  The study manual Essentials of Property and Casual Insurance provides a complete analysis of the terms.'
      },
      {
        'title': 'Exam Preparation',
        'active': false,
        'content': 'EXAM PREPARATION:  It is recommended that candidates structure their study time over several weeks allocating a specific time each day.  A 30-day programmed instructional guide is included in the study manual.'
      },
      {
        'title': 'Licensing Manual',
        'active': false,
        'content': 'LICENSING MANUAL:  The study manual follows the exam outline.  It is recommended that you begin with chapter one, highlighting important terms and topics.  If you do not fully understand a discussion area, refer to the specimen policy forms located in the specimen page section of the manual.'
      },
      {
        'title': 'Exam Master Software',
        'active': false,
        'content': 'EXAM MASTER SOFTWARE:  After reviewing a chapter in the manual, EXAM MASTER Interactive is the perfect complement to get you up to speed on key information.  The Chapter Preview feature includes over 450 PowerPoint audio slides.  Use this feature to give you a preview of the chapter.'
      },
      {
        'title': 'I Am Ready',
        'active': false,
        'content': 'AM I READY:  This depends to a great extent on how well you\'ve studied and how well you have monitored yourself.  You should not attempt to take your state exam until you have reviewed the study manual and completed it\'s exercises, reviewed the Flash Card exercises in this software and are consistently scoring 85% or greater in the test mode of EXAM MASTER INTERACTIVE.  Only then should you attempt to take your state exam.'
      }
    ];
	}
]);
'use strict';

angular.module('core').controller('IntroductionController', ['$scope',
	function($scope) {
		// Introduction ctrl controller logic
		// ...

	}
]);
'use strict';

angular.module('core').controller('PracticeExaminationChapterController', ['$scope',
	function($scope) {
		// Practice examination chapter controller logic
		// ...
	}
]);

'use strict';

angular.module('core').controller('PracticeExaminationController', ['$scope', '$location', 'Questions',
	function($scope, $location, Questions) {
		// Practice examination controller logic
		// ...

    var CHAPTER_1 = 1;
    var CHAPTER_2 = 2;
    var CHAPTER_3 = 3;
    var CHAPTER_4 = 4;
    var CHAPTER_5 = 5;
    var CHAPTER_6 = 6;
    var CHAPTER_7 = 7;
    var CHAPTER_8 = 8;
    var CHAPTER_9 = 9;
    var CHAPTER_10 = 10;
    var CHAPTERS = [
      CHAPTER_1,
      CHAPTER_2,
      CHAPTER_3,
      CHAPTER_4,
      CHAPTER_5,
      CHAPTER_6,
      CHAPTER_7,
      CHAPTER_8,
      CHAPTER_9,
      CHAPTER_10,
    ];
    var MODE_PRACTICE = 0;
    var MODE_TEST = 1;
    var MODES = [MODE_PRACTICE, MODE_TEST];

    $scope.index = 0;
    $scope.correct = 0;
    $scope.answered = 0;
    $scope.chapter = -1;
    $scope.mode = MODES[MODE_PRACTICE];
		$scope.questions = [];

    $scope.displayChapterExamination = function(chapter, mode) {
      $scope.mode = MODES[mode];
      $scope.chapter = CHAPTERS[chapter];
			$scope.questions = Questions.findByChapter(CHAPTERS[chapter].toString());
    };

    $scope.checkAnswer = function(question_id, answer_id) {
      var question = $scope.questions.filter(function(obj) {
        return obj.id === question_id;
      });

      if (question[0].correct_answer === answer_id)
      {
        $scope.correct++;
        $scope.answered++;

        if ($scope.answered >= $scope.questions.length)
        {
          $location.path('practice-examination-results');
        }

        $scope.nextQuestion();
      }
      else
      {
        $scope.answered++;

        if ($scope.answered >= $scope.questions.length)
        {
          $location.path('practice-examination-results');
        }

        $scope.nextQuestion();
      }
    };

    $scope.previousQuestion = function() {
      if ($scope.index-- < 0) $scope.index = $scope.questions.length - 1;
    };

    $scope.nextQuestion = function() {
      if ($scope.index++ >= ($scope.questions.length - 1)) $scope.index = 0;
    };
	}
]);

'use strict';

angular.module('core').controller('PracticeExamininationResultsController', ['$scope',
	function($scope) {
		// Practice examinination results controller logic
		// ...
	}
]);
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
'use strict';

angular.module('core').filter('shuffle', [
	function() {
		return function(input) {
      for(var j, x, i = input.length; i; j = parseInt(Math.random() * i), x = input[--i], input[i] = input[j], input[j] = x);
      return input.slice(0, 3);
		};
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

//Setting up route
angular.module('questions').config(['$stateProvider',
	function($stateProvider) {
		// Questions state routing
		$stateProvider.
		state('listQuestions', {
			url: '/questions',
			templateUrl: 'modules/questions/views/list-questions.client.view.html'
		}).
		state('createQuestion', {
			url: '/questions/create',
			templateUrl: 'modules/questions/views/create-question.client.view.html'
		}).
		state('viewQuestion', {
			url: '/questions/:questionId',
			templateUrl: 'modules/questions/views/view-question.client.view.html'
		}).
		state('editQuestion', {
			url: '/questions/:questionId/edit',
			templateUrl: 'modules/questions/views/edit-question.client.view.html'
		});
	}
]);
'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {
		$scope.authentication = Authentication;

		// Create new Question
		$scope.create = function() {
			// Create new Question object
			var question = new Questions ({
				name: this.name
			});

			// Redirect after save
			question.$save(function(response) {
				$location.path('questions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Question
		$scope.remove = function(question) {
			if ( question ) { 
				question.$remove();

				for (var i in $scope.questions) {
					if ($scope.questions [i] === question) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove(function() {
					$location.path('questions');
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var question = $scope.question;

			question.$update(function() {
				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({ 
				questionId: $stateParams.questionId
			});
		};
	}
]);
'use strict';

//Questions service used to communicate Questions REST endpoints
angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('questions/:questionId', { questionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('responses').config(['$stateProvider',
	function($stateProvider) {
		// Responses state routing
		$stateProvider.
		state('listResponses', {
			url: '/responses',
			templateUrl: 'modules/responses/views/list-responses.client.view.html'
		}).
		state('createResponse', {
			url: '/responses/create',
			templateUrl: 'modules/responses/views/create-response.client.view.html'
		}).
		state('viewResponse', {
			url: '/responses/:responseId',
			templateUrl: 'modules/responses/views/view-response.client.view.html'
		}).
		state('editResponse', {
			url: '/responses/:responseId/edit',
			templateUrl: 'modules/responses/views/edit-response.client.view.html'
		});
	}
]);
'use strict';

// Responses controller
angular.module('responses').controller('ResponsesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Responses',
	function($scope, $stateParams, $location, Authentication, Responses) {
		$scope.authentication = Authentication;

		// Create new Response
		$scope.create = function() {
			// Create new Response object
			var response = new Responses ({
				name: this.name
			});

			// Redirect after save
			response.$save(function(response) {
				$location.path('responses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Response
		$scope.remove = function(response) {
			if ( response ) { 
				response.$remove();

				for (var i in $scope.responses) {
					if ($scope.responses [i] === response) {
						$scope.responses.splice(i, 1);
					}
				}
			} else {
				$scope.response.$remove(function() {
					$location.path('responses');
				});
			}
		};

		// Update existing Response
		$scope.update = function() {
			var response = $scope.response;

			response.$update(function() {
				$location.path('responses/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Responses
		$scope.find = function() {
			$scope.responses = Responses.query();
		};

		// Find existing Response
		$scope.findOne = function() {
			$scope.response = Responses.get({ 
				responseId: $stateParams.responseId
			});
		};
	}
]);
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
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/users/views/dashboard/dashboard.client.view.html'
		}).
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/dashboard');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('DashboardController', ['$scope', 'Authentication', 'Activities',
	function($scope, Authentication, Activities) {
		// Dashboard controller logic
		$scope.user = Authentication.user;
    $scope.activities = Activities.query();
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);