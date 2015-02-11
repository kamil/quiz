angular.module('quiz')
    .controller('PreviewCtrl',
        function($scope, $location, $routeParams, $firebase, fbURL, $sce) {
            var questionId = $routeParams.questionId;

            $scope.question = $firebase(new Firebase(fbURL + 'question' + '/' + questionId)).$asObject();

            $scope.mdQuestion = {};

            $scope.question.$watch(function() {

                $scope.mdQuestion.question = marked($scope.question.question);
                $scope.mdQuestion.answers = [];
                
                _.forEach(_.shuffle($scope.question.answers), function(obj, key) {
                    $scope.mdQuestion.answers.push({ text: marked(obj.text) })
                });

                // $scope.mdQuestion.answers = _.shuffle( $scope.mdQuestion.answers );

            });

            $scope.add = function() {
                $location.path('/');
            };
        }
);