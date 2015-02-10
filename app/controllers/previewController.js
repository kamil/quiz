angular.module('quiz')
    .controller('PreviewCtrl',
        function($scope, $location, $routeParams, $firebase, fbURL, $sce) {
            var questionId = $routeParams.questionId;

            $scope.question = $firebase(new Firebase(fbURL + 'question' + '/' + questionId)).$asObject();

            $scope.markedQuestion = ''

            $scope.question.$watch(function() {
                $scope.markedQuestion = marked($scope.question.question);
            });

            $scope.add = function() {
                $location.path('/');
            };
        }
)