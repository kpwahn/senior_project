angular.module('bankApp').controller('homeController', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {
    
	if(!loginService.member.token){
		loginService.previousPage = "#/";
		window.location.href = "#/login";
		return;
	} else { 
		$scope.message = ""; 
		$scope.accounts = {};

		json = {
			"member_id" : loginService.member_id,
			"token" : loginService.member.token
		}
		
		$http.post(loginService.baseURL + "/getAccounts/", json)
			.success(function (data) {	
			console.log(data);
				if(data.status == 401){
					loginService.member.token = null;
					alert("Your session has timed out. Please log in");
					loginService.previousPage = "#"
					window.location.href = "#/login";	
					return;
				}
				$scope.accounts = data.data;

				//Trimming the dates
				$scope.accounts.forEach(function(account){
					account.transactions.forEach(function(transaction){
						transaction.date = transaction.date.slice(4, 16); 
					});
				});
				
				if(data.data.length == 0){
					$scope.message = "You currently have no accounts";	
				}
					
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})
	}
}]);