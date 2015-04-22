'use strict';

angular.module('core').controller('PracticeExaminationController', ['$scope',
	function($scope) {
		// Practice examination controller logic
		// ...
    $scope.index = 0;
    
    $scope.questions = [
      {
        'id': 1,
        'content': "An applicants licensing exam results are good for...",
        'correct_answer': 1
      },
      {
        'id': 2,        
        'content': "The maximum fine per violation for soliciting insurance without a license is...",
        'correct_answer': 1        
      },
      {
        'id': 3,        
        'content': "A temporary license my be issued to approved individuals for a period of...",
        'correct_answer': 1        
      },
      {
        'id': 4,        
        'content': "Producers may co-mingle business monies with personal monies...",
        'correct_answer': 1        
      },
      {
        'id': 5,        
        'content': "All the following are true regarding premiums collected from a policyholder, EXCEPT...",
        'correct_answer': 1        
      },      
    ];

    $scope.answers = [
      {
        'id': 1,
        'content': "60 days from the date of the exam."
      },
      {
        'id': 2,
        'content': "90 days from the date of the exam."
      },
      {
        'id': 3,
        'content': "180 days from the date of the exam."
      },
      {
        'id': 4,
        'content': "One year from the date of the exam."
      },
      {
        'id': 5,
        'content': "$300"
      },
      {
        'id': 6,
        'content': "$500"
      },
      {
        'id': 7,
        'content': "$1000"
      },
      {
        'id': 8,
        'content': "$5000"
      },
      {
        'id': 9,
        'content': "30 days"
      },
      {
        'id': 10,
        'content': "60 days"
      },
                  {
        'id': 11,
        'content': "90 days"
      },
      {
        'id': 12,
        'content': "180 days"
      },
      {
        'id': 13,
        'content': "Only if permitted in writing by the Insurance Commissioner"
      },
      {
        'id': 14,
        'content': "At any time if permitted by the insured"
      },
      {
        'id': 15,
        'content': "Only if each represented insurance company provides prior written consent"
      },
      {
        'id': 16,
        'content': "Never"
      },
      {
        'id': 17,
        'content': "Producers may not co-mingle business monies and personal monies unless each insurance company provides written permissions"
      },
      {
        'id': 18,
        'content': "Producers may make remittance of premiums collected in the same form as received, need not maintain a separate account"
      },
                  {
        'id': 19,
        'content': "Producers who receive cash from insureds may deposit this money into his or her personal account and write a check to the insurance company"
      },
      {
        'id': 20,
        'content': "If a producer holds a policyholder's funds, they must be maintained in a separate account"
      },      
    ];
	}
]);