var bankApp = angular.module('bankApp', ['ngRoute', 'ngMaterial']);

// configure our routes
bankApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'html/home.html',
        controller  : 'homeController'
    })
    
    .when('/createNewMember', {
            templateUrl : 'html/createNewMember.html',
            controller  : 'createNewMemberController'
    })
	
	.when('/createAccount', {
            templateUrl : 'html/createAccount.html',
            controller  : 'createAccountController'
    })
	
	.when('/transactions', {
            templateUrl : 'html/transactions.html',
            controller  : 'transactionsController'
    })
	
	.otherwise({
        templateUrl : 'html/login.html',
        controller  : 'loginController'
    });
});

bankApp.controller('indexController', ['$scope', 'loginService', function($scope, loginService) {
	
	//This controller is for the index.html page
	$scope.logout  = function(){
		loginService.member.token = "";
		loginService.username = "";
		loginService.memberId = "";
		loginService.previousPage = "#";
		window.location.href = '#login';
	}

	
}]);

bankApp.factory('loginService', function($http){
	
	var factory = {}
	
	factory.baseURL = "https://www.kpwahnschaffe.com";
	//factory.baseURL = "http://127.0.0.1:8080";
	
	factory.previousPage = "#/";
	
	factory.member = {
		username: "",
		memberId: "",
		token: ""
	}

	return factory;
});