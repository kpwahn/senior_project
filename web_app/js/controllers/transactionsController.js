angular.module('bankApp').controller('transactionsController', ['$scope', '$http', 'loginService' , function($scope, $http, loginService) {
	$scope.transactionTypes = ["purchase", "transfer", "deposit", "withdraw"];
	$scope.purchaseDate = new Date();
	
	if(!loginService.member.token){
		loginService.previousPage = "#/transactions";
		window.location.href = "#/login";
		return;
	}    	

	json = {
		"member_id" : loginService.member_id,
		"token" : loginService.member.token
	}
	
	$http.post(loginService.baseURL + "/getAccounts", json)
			.success(function (data) {
				if(data.status == 403){
					alert("Your session has timed out. Please log in");
					loginService.member.token = null;
					loginService.previousPage = "#/transactions"
					window.location.href = "#/login";
					return;
				}
				$scope.accounts = data.data;
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})
	
	$scope.purchase = function(){
		json = {
			"type": "purchase",
			"account" : $scope.purchaseAccount,
			"amount": $scope.purchaseAmount,
			"location": $scope.purchaseLocation,
			"comment": $scope.purchaseComment
		}
		
		makeRequest(json);
	}
	
	$scope.transfer = function(){
		json = {
			"type":  "transfer",
			"amount": $scope.transferAmount,
			"toAccount": $scope.toTransferAccount,
			"fromAccount": $scope.fromTransferAccount
		}
		makeRequest(json);
	}
	
	$scope.deposit = function(){
		json = {
			"type": "deposit",
			"amount": $scope.depositAmount,
			"account": $scope.depositAccount
		}
		makeRequest(json);
	}
	
	$scope.withdraw = function(){
		json = {
			"type": "withdraw",
			"amount": $scope.withdrawAmount,
			"account": $scope.withdrawAccount
		}
		makeRequest(json);
	}
	
	function makeRequest(json, endpoint){
		json["member_id"] =  loginService.member_id;
		json["token"] = loginService.member.token;
		
		$http.post(loginService.baseURL + "/makeTransaction/", json)
			.success(function (data) {
				if(data.status == 403){
					loginService.member.token = null;
					alert("Your session has timed out. Please log in and try again");
					loginService.previousPage = "#/transactions"
					window.location.href = "#/login";
					return;
				} else if (data.status == 400) {
					alert("invalid amount");
				} else {
				
					$scope.accounts = data;
					window.location.href = "#";
				}
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})	
	}
	
}]);