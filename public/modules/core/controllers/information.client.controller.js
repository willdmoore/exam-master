'use strict';

angular.module('core').controller('InformationController', ['$scope',
	function($scope) {
		// Information controller logic
		// ...
    $scope.tabs = [
      {
        'title': "Study Materials",
        'active': true,
        'content': "STUDY MATERIALS:  Students preparing for the Pennsylvania Insurance Examination \
                    should have a current edition of the companion study manual Essentials of \
                    Property and Casual Insurance and a current edition of the Pennsylvania Licensing \
                    and Examination Insurance booklet.  The study manual Essentials of Property and \
                    Casual Insurance provides a complete analysis of the terms."
      },
      {
        'title': "Exam Preparation",
        'active': false,
        'content': "EXAM PREPARATION:  It is recommended that candidates structure their study time \
                    over several weeks allocating a specific time each day.  A 30-day programmed \
                    instructional guide is included in the study manual."
      },
      {
        'title': "Licensing Manual",
        'active': false,
        'content': "LICENSING MANUAL:  The study manual follows the exam outline.  It is recommended \
                    that you begin with chapter one, highlighting important terms and topics.  If you \
                    do not fully understand a discussion area, refer to the specimen policy forms located \
                    in the specimen page section of the manual."
      },
      {
        'title': "Exam Master Software",
        'active': false,
        'content': "EXAM MASTER SOFTWARE:  After reviewing a chapter in the manual, EXAM MASTER Interactive \
                    is the perfect complement to get you up to speed on key information.  The Chapter Preview \
                    feature includes over 450 PowerPoint audio slides.  Use this feature to give you a preview \
                    of the chapter."
      },
      {
        'title': "I Am Ready",
        'active': false,
        'content': "AM I READY:  This depends to a great extent on how well you've studied and how well you have \
                    monitored yourself.  You should not attempt to take your state exam until you have reviewed \
                    the study manual and completed it's exercises, reviewed the Flash Card exercises in this \
                    software and are consistently scoring 85% or greater in the test mode of EXAM MASTER \
                    INTERACTIVE.  Only then should you attempt to take your state exam."
      }
    ];
	}
]);