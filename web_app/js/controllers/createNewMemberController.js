angular.module('bankApp').controller('createNewMemberController', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {
    $scope.name = "";
	$scope.username = "";
	$scope.password = "";
	$scope.confirm_password = "";
	
    $scope.createNewMember = function(){
         
		if($scope.password != $scope.confirm_password){
			alert("passwords do not match");
			$scope.password = "";
			$scope.confirm_password = "";
		}else {
			json = {
				"member_name" : $scope.name,									
				"username" : $scope.username,
				"password" : $scope.password
			}
			$http.post(loginService.baseURL + "/createNewMember", json)
			.success(function (data) {
				//console.log(JSON.stringify(data));
				alert(JSON.stringify(data.message));
				window.location.href = "#/home";
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})
		}
    }
}]);