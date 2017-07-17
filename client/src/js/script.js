var app = angular.module('myApp', []);
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
app.controller('myCtrl', function ($scope, socketFactory) {

    $scope.runCommands = function () {
        $scope.data = [];
        $scope.responseData="";
        socketFactory.emit('childProcess', { name: "spandana" });

        socketFactory.on('commands', function (data) {
            $scope.$apply(function () {
                $scope.responseData=data.message;
                $scope.getResponse();
            });
        });
    }

    $scope.getResponse = function () {
        $scope.data.push($scope.responseData);
    }
 
});
