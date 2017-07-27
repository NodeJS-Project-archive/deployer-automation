var app = angular.module('deployer');

app.controller('existingProcessesCtrl', function ($scope,$http,$state) {
    //$scope.activeMenu = 'Home';
    $scope.getExistingProcesses = function () {
        $http({
            url: '/getExistingProcesses',
            method: "GET",
            headers: { 'ContentType': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                $scope.processes = response.data.processes;
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

    $scope.show = function (data) {
        $state.go("deployer", {
            processData: data,
            totalProcesses:data.processList
        });
    }

});
