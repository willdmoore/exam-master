'use strict';

angular.module('core').controller('PracticeExaminationChapterController', ['$scope', '$location', '$stateParams', 'Questions',
	function($scope, $location, $stateParams, Questions) {
		// Practice examination chapter controller logic
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
    var MODE_PRACTICE = 'practice';
    var MODE_TEST = 'test';

    $scope.index = 0;
    $scope.correct = 0;
    $scope.answered = 0;
    $scope.chapter = $stateParams.chapterId;
    $scope.mode = MODE_PRACTICE;
    $scope.displayExplanation = false;

    $scope.questions = Questions.byChapter.query(
      { chapter: CHAPTERS[$scope.chapter - 1].toString() },
      function() {
        $scope.answers = $scope.questions[$scope.index].responses;
      });

    $scope.displayChapterExamination = function(chapter, mode) {
      $scope.chapter = CHAPTERS[chapter];
      $scope.displayExplanation = false;
      $scope.questions = Questions.byChapter.query(
        { chapter: CHAPTERS[$scope.chapter - 1].toString() },
        function() {
          $scope.answers = $scope.questions[$scope.index].responses;
        });
    };

    $scope.checkAnswer = function(answer, index) {
      var correct = (answer === (index + 1));
      if (correct === true)
      {
        $scope.correct++;
        $scope.answered++;

        if ($scope.answered >= $scope.questions.length)
        {
          $location.path('practice-examination-results');
        }


      }
      else
      {
        $scope.answered++;

        if ($scope.answered >= $scope.questions.length)
        {
          $location.path('practice-examination-results');
        }
      }

      if ($scope.mode === MODE_PRACTICE)
      {
        $scope.displayExplanation = true;
      }
    };

    $scope.previousQuestion = function() {
      $scope.displayExplanation = false;
      if ($scope.index-- < 0) $scope.index = $scope.questions.length - 1;
    };

    $scope.nextQuestion = function() {
      $scope.displayExplanation = false;
      if ($scope.index++ >= ($scope.questions.length - 1)) $scope.index = 0;
    };
  }
]);
