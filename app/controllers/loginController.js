angular.module('quiz')
    .controller('LoginCtrl',
        function($scope, $location, $routeParams, $firebase, fbURL, $sce) {
            $scope.login = '';
            $scope.password = '';
            $scope.wrongPassword = false;

            $scope.checkLogin = function() {
            	console.log($scope.login, $scope.password);
            	


            	var ref = new Firebase(fbURL);
				ref.authWithPassword({
				  email    : $scope.login,
				  password : $scope.password
				}, function(error, authData) {
				  if (error) {
				  	$scope.wrongPassword = true;
				    console.log("Login Failed!", error);
				  } else {
				  	$scope.wrongPassword = false;
				    console.log("Authenticated successfully with payload:", authData);
				  }
				});
            }
        }
);