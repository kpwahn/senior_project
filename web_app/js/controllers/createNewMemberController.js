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
			$http.post(loginService.baseURL + "/createNewMember/", json)
			.success(function (data) {
				loginService.member.token = data.data.token;
				loginService.username = json.username;
				loginService.member_id = data.data.member_id;
				
				window.location.href = "#";
			}).
			error(function (err) {
				console.log("Error with the request " + err);
			})
		}
    }
}]);