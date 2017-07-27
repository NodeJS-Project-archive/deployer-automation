var app = angular.module('deployer');
app.controller('overviewCtrl', function ($scope,$http,$state) {
    //$scope.activeMenu = 'Home';
    $scope.getPortsAvailable = function () {
        $http({
            url: '/getPortsAvailable',
            method: "GET",
            headers: { 'ContentType': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                $scope.ports = response.data.ports;
                $scope.platform=response.data.platform;
                $scope.username=response.data.username;
                $scope.totalmem=response.data.totalmem;
                $scope.freemem=response.data.freemem;

            }
             else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../../../src/Registration-Login/views/index.html';
            }
            else {
                toastr.options.timeOut = 1500;
                toastr.warning(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });
    }

    $scope.getRunningServices = function () {
        $state.go("showProcess", {
            totalData: [],
            request:"getRunningProcesses"
        });
    }

});
