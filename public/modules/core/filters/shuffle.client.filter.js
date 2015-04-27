'use strict';

angular.module('core').filter('shuffle', [
	function() {
		return function(input) {
      for(var j, x, i = input.length; i; j = parseInt(Math.random() * i), x = input[--i], input[i] = input[j], input[j] = x);
      return input.slice(0, 3);
		};
	}
]);