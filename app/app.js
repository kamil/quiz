(function() {

    'use strict';

    angular.module('quiz', ['ngRoute', 'firebase', 'ui.bootstrap', 'ngSanitize'])
        .value('fbURL', localStorage.getItem('fbURL'))
        .config(function($routeProvider, $locationProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {
                    controller: 'ListCtrl',
                    templateUrl: 'views/list.html'
                })
                .when('/preview/:questionId', {
                    controller: 'PreviewCtrl',
                    templateUrl: 'views/preview.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}());