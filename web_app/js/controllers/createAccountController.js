angular.module('bankApp').controller('createAccountController', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {
	if(!loginService.member.token){
		loginService.previousPage = "#/createAccount";
		window.location.href = "#/login";
		return;
	}
	
	$scope.account_name = "";
	$scope.account_type = "";
	$scope.intial_balance = "";
	
	$scope.createAccount = function(){
		json = {
			"account_name" : $scope.account_name,
			"account_type" : $scope.account_type,
			"inital_balance" : $scope.intial_balance,
			"member_id" : loginService.member_id,
			"token" : loginService.member.token
		}
		
		$http.post(loginService.baseURL + "/createAccount/", json)
		.success(function (data) {
			if(data.status == 403){
				loginService.member.token = null;
				window.location.href = "#/login";	
			}
			window.location.href = "#";
		}).
		error(function (err) {
			console.log("Error with the request " + err);
		})
	}
}]);