angular.module('bankApp').controller('loginController', ['$scope', '$http', 'loginService' , function($scope, $http, loginService) {
	document.getElementById("username").focus();
	
	$scope.login = function(){		
		json = {								
				"username" : $scope.username,
				"password" : $scope.password
			}
		
		
		$http.post(loginService.baseURL + "/authenticate/", json)
		.success(function (data) {
			if(data.data.token){
				
				loginService.member.token = data.data.token;
				loginService.username = json.username;
				loginService.memberId = data.data.memberId;

				if(loginService.previousPage != "#login"){
					window.location.href = loginService.previousPage;
					
				}else {
					window.location.href = "#";
					
				}
			} else {	
				window.location.href = '#login';
			}
			
		}).
		error(function (err) {
			console.log("Error with the request " + err);
		})
	}
}]);