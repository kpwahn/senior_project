angular.module('bankApp').controller('loginController', ['$scope', '$http', 'loginService' , function($scope, $http, loginService) {
	$scope.login = function(){	
		json = {								
				"username" : $scope.username,
				"password" : $scope.password
			}
		
		$http.post(loginService.baseURL + "/authenticate/", json)
		.success(function (data) {
			if (data.status == 401){
				alert("Invalid username or password. Please try again");
				$scope.username = "";
				$scope.password = "";
			} else if (data.data.token){
				
				loginService.member.token = data.data.token;
				loginService.username = json.username;
				loginService.member_id = data.data.member_id;

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
	
	$scope.words = function(){
		$http.post(loginService.baseURL + "/words", {"number_of_words" : $scope.num_words})
		.success(function (data) {
			document.getElementById('words').innerHTML = " ";
			array = data.data;
			
			var arrayLength = array.length;
			for(var i =0; i < arrayLength; i++){
				document.getElementById('words').innerHTML += array[i] + " ";	
			}
		}).
		error(function (err) {
			console.log("Error with the request " + err);
		})
	}
}]);