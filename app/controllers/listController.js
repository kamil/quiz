angular.module('quiz')
    .controller('ListCtrl', function($scope, $modal, $location, Question, $firebase, fbURL, $routeParams, filterFilter, $firebaseAuth) {
        // Define valriables
        $scope.alerts = []; // array of alert message objects.
        $scope.auth = {};


        $scope.questions = $firebase(new Firebase(fbURL + 'question')).$asArray();

        $scope.preview = function(questionId) {
            $location.path('/preview/' + questionId);
        };


        // Remove question
        $scope.removeRecord = function(questionId) {
            var questionUrl = fbURL + 'question' + '/' + questionId;
            $scope.question = $firebase(new Firebase(questionUrl));
            $scope.question.$remove();
            $scope.alerts.splice(0, 1);
            $scope.alerts.push({
                type: 'success',
                msg: "Question removed successfully!"
            });
        };

        // Close alert message
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        // Modal: called by edit(questionId) and Add new user
        $scope.open = function(questionId) {
            var modalInstance = $modal.open({
                templateUrl: 'views/question_modal.html',
                controller: $scope.model,
                size: 'lg',
                resolve: {
                    id: function() {
                        return questionId;
                    }
                }
            });
        };

        $scope.model = function($scope, $modalInstance, Question, id, $firebase, fbURL) {


            $scope.questions = Question;

            $scope.alerts = []; // array of alert message objects.
            $scope.language_array = [];
            $scope.language_array.push({
                id: 1,
                name: "JavaScript"
            });
            $scope.language_array.push({
                id: 2,
                name: "Ruby"
            });
            $scope.language_array.push({
                id: 3,
                name: "Java"
            });
            $scope.language_array.push({
                id: 4,
                name: "Python"
            });

            $scope.difficulty_array = [];
            $scope.difficulty_array.push({
                name: "Easy"
            });
            $scope.difficulty_array.push({
                name: "Normal"
            });
            $scope.difficulty_array.push({
                name: "Expert"
            });


            if (angular.isDefined(id)) {
                $scope.question = $firebase(new Firebase(fbURL + 'question' + '/' + id)).$asObject();
            } else {
                $scope.question = {
                    question: "",
                    answers: { 1: "", 2: "", 3: "", 4: "" }
                };
            }


            // close modal
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };

            // Add new question
            $scope.add = function() {
                questions = $firebase(new Firebase(fbURL + 'question')).$asArray();
                questions.$add($scope.question);
                $modalInstance.dismiss('cancel');
            };

            // Save edited question.
            $scope.save = function() {
                $scope.question.$save();
                $modalInstance.dismiss('cancel');
            };
        };
    });