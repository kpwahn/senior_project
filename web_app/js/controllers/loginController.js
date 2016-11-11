angular.module('bankApp').controller('loginController', ['$scope', '$http', 'loginService' , function($scope, $http, loginService) {
	$scope.login = function(){		
		json = {								
				"username" : $scope.username,
				"password" : $scope.password
			}
		
		$http.post(loginService.baseURL + "/authenticate/", json)
		.success(function (data) {
			console.log(data);
			if (data.status == 403){
				console.log("Here");
				alert("invalid username or password. Please try again");	
			} else if (data.member_data.token){
				
				loginService.member.token = data.member_data.token;
				loginService.username = json.username;
				loginService.memberId = data.member_data.memberId;

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