angular.module('quiz').factory('Question', function($firebase, fbURL) {
    return $firebase(new Firebase(fbURL + 'question'));
})