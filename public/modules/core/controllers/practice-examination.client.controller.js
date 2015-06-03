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
