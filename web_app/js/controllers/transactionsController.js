angular.module('bankApp').controller('transactionsController', ['$scope', '$http', 'loginService' , function($scope, $http, loginService) {
	$scope.transactionTypes = ["purchase", "transfer", "deposit", "withdraw"];
	$scope.purchaseDate = new Date();
	
	if(!loginService.member.token){
		loginService.previousPage = "#/transactions";
		window.location.href = "#/login";
		return;
	}    	
	
	$http.post(loginService.baseURL + "/getAccounts", json)
			.success(function (data) {
				$scope.accounts = data;
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
		json["memberId"] =  loginService.memberId;
		json["token"] = loginService.member.token;
		
		$http.post(loginService.baseURL + "/makeTransaction/", json)
			.success(function (data) {
				//console.log("Sucess! " + JSON.stringify(data));
				$scope.accounts = data;
				window.location.href = "#";
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})	
	}
	
}]);