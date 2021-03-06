var app = angular.module('deployer');


app.controller('RegisterController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.registerStatus = false;
    $scope.loginStatus = false;
    $scope.alertMsg = false;
    $scope.newUser = {};
    $scope.password = "";
    $scope.user = {};
    $scope.confirmPassword = false;
    $scope.reEnterPassword = function () {

        if ($scope.password == $scope.newUser.pwd) {
            $scope.confirmPassword = true;
        } else {
            $scope.confirmPassword = false;
        }

    };

    $scope.registerUser = function () {

        $http({
            url: '/api/registerUser',
            method: "POST",
            data: $scope.newUser,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                console.log(response.data.msg);
                toastr.options.timeOut = 1500;
                toastr.success(response.data.msg);

            }
            else {
                toastr.options.timeOut = 1500;
                toastr.warning("Server Error Register Again");

             
                console.log(response.data.msg);
            }
        }, function (err) {
            toastr.options.timeOut = 1500;
            toastr.warning("Server Error Register Again");
            consle.log(err);
        });
    };

}]);

