var app = angular.module('deployer');

// ############ Login Controller ############

app.controller('LoginController', ['$scope', '$http', '$window', '$modal', function ($scope, $http, $window, $modal) {
    $scope.registerStatus = false;
    $scope.loginStatus = false;
    $scope.alertMsg = false;
    $scope.newUser = {};
    $scope.user = {};
    $scope.errorMsg = "";
    $scope.showRegistration = false;

    $scope.activateRegisterUser = function() {
          $scope.showRegistration = true;
    }


    $scope.login = function () {
        $http({
            url: '/checkUser',
            method: "POST",
            data: $scope.user,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                $window.location.href = '../../../src/deployer/views/index.html';
            }
            else {
                  $scope.errorMsg = response.data.msg;

                var modalInstance = $modal.open({
                    templateUrl: '../../../src/Registration-Login/views/Error.html',
                    windowClass: 'app-modal',
                    scope: $scope
                }).result.then(function () {

                }, function (res) {

                });
            
            }
        }, function (err) {
             toastr.options.timeOut = 1500;
            toastr.warning("Server Error Occured");
            console.log(err);
       
        });
    };

}]);


/*app.directive("modalmatric", function () {
    return {
     

        controller: function ($scope) {



        }
    };
});*/