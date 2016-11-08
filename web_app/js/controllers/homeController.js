angular.module('bankApp').controller('homeController', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {
    
	if(!loginService.member.token){
		loginService.previousPage = "#/";
		window.location.href = "#/login";
		return;
	} else { 
	
		$scope.message = "Welcome to the bank!"; 
		$scope.accounts = {};

		json = {
			"memberId" : loginService.memberId,
			"token" : loginService.member.token
		}
		
		$http.post(loginService.baseURL + "/getAccounts/", json)
			.success(function (data) {	
				if(data.status == 403){
					loginService.member.token = null;
					alert("Your session has timed out. Please log in and try again");
					loginService.previousPage = "#/transactions"
					window.location.href = "#/login";	
					return;
				}
				$scope.accounts = data;

				//Trimming the dates
				$scope.accounts.forEach(function(account){
					account.transactions.forEach(function(transaction){
						transaction.date = transaction.date.slice(4, 16); 
					});
				});
					
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})
	}
}]);