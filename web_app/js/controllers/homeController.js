angular.module('bankApp').controller('homeController', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {
    
	if(!loginService.member.token){
		loginService.previousPage = "#/";
		window.location.href = "#/login";
		return;
	} else { 
	
		$scope.message = "Welcome to the bank!"; 
		$scope.accounts = {who: "said what"};

		json = {
			"memberId" : loginService.memberId,
			"token" : loginService.member.token
		}
		
		$http.post(loginService.baseURL + "/getAccounts/", json)
			.success(function (data) {	
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