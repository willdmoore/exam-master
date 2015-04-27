'use strict';

angular.module('core').controller('PracticeExaminationController', ['$scope',
	function($scope) {
		// Practice examination controller logic
		// ...

    $scope.index = 0;
    
    $scope.previousQuestion = function() {
      if ($scope.index-- < 0) $scope.index = $scope.questions.length - 1;
    };

    $scope.nextQuestion = function() {
      if ($scope.index++ >= ($scope.questions.length - 1)) $scope.index = 0;
    };

    $scope.questions = [
      {
        'id': 1,
        'content': 'An applicants licensing exam results are good for...',
        'correct_answer': 1
      },
      {
        'id': 2,        
        'content': 'The maximum fine per violation for soliciting insurance without a license is...',
        'correct_answer': 1        
      },
      {
        'id': 3,        
        'content': 'A temporary license my be issued to approved individuals for a period of...',
        'correct_answer': 1        
      },
      {
        'id': 4,        
        'content': 'Producers may co-mingle business monies with personal monies...',
        'correct_answer': 1        
      },
      {
        'id': 5,        
        'content': 'All the following are true regarding premiums collected from a policyholder, EXCEPT...',
        'correct_answer': 1        
      },      
    ];

    $scope.answers = [
      {
        'id': 1,
        'question_id': 1,
        'content': '60 days from the date of the exam.'
      },
      {
        'id': 2,
        'question_id': 1,        
        'content': '90 days from the date of the exam.'
      },
      {
        'id': 3,
        'question_id': 1,        
        'content': '180 days from the date of the exam.'
      },
      {
        'id': 4,
        'question_id': 1,        
        'content': 'One year from the date of the exam.'
      },
      {
        'id': 5,
        'question_id': 2,
        'content': '$300'
      },
      {
        'id': 6,
        'question_id': 2,        
        'content': '$500'
      },
      {
        'id': 7,
        'question_id': 2,        
        'content': '$1000'
      },
      {
        'id': 8,
        'question_id': 2,        
        'content': '$5000'
      },
      {
        'id': 9,
        'question_id': 3,
        'content': '30 days'
      },
      {
        'id': 10,
        'question_id': 3,        
        'content': '60 days'
      },
      {
        'id': 11,
        'question_id': 3,        
        'content': '90 days'
      },
      {
        'id': 12,
        'question_id': 3,        
        'content': '180 days'
      },
      {
        'id': 13,
        'question_id': 4,
        'content': 'Only if permitted in writing by the Insurance Commissioner'
      },
      {
        'id': 14,
        'question_id': 4,        
        'content': 'At any time if permitted by the insured'
      },
      {
        'id': 15,
        'question_id': 4,        
        'content': 'Only if each represented insurance company provides prior written consent'
      },
      {
        'id': 16,
        'question_id': 4,        
        'content': 'Never'
      },
      {
        'id': 17,
        'question_id': 5,        
        'content': 'Producers may not co-mingle business monies and personal monies unless each insurance company provides written permissions'
      },
      {
        'id': 18,
        'question_id': 5,
        'content': 'Producers may make remittance of premiums collected in the same form as received, need not maintain a separate account'
      },
                  {
        'id': 19,
        'question_id': 5,        
        'content': 'Producers who receive cash from insureds may deposit this money into his or her personal account and write a check to the insurance company'
      },
      {
        'id': 20,
        'question_id': 5,        
        'content': 'If a producer holds a policyholder\'s funds, they must be maintained in a separate account'
      },      
    ];
	}
]);