var app = angular.module('deployer');
app.factory('socketFactory', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

app.controller('showProcessCtrl', function ($scope, socketFactory,$stateParams, $state) {

    $scope.totalData = $stateParams.totalData;
    $scope.runCommands = function () {
        $scope.data = [];
        var id=1;
        $scope.responseData="";
        socketFactory.emit('childProcess', $scope.totalData);

        socketFactory.on('commands', function (data) {
            $scope.$apply(function () {
                $scope.responseData=id+": "+data.message;
                id=id+1;
                $scope.getResponse();
            });
        });
    }

    $scope.getResponse = function () {
        $scope.data.push($scope.responseData);
    }
 
});
