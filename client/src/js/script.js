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
        // on: function (eventName, callback) {
        //     function wrapper() {
        //         var args = arguments;
        //         $rootScope.$apply(function () {
        //             callback.apply(socket);
        //         });
        //     }
        //     socket.on(eventName, wrapper);
        //     return function () {
        //         socket.removeListener(eventName, wrapper);
        //     };
        // },
        // emit: function (eventName, data, callback) {
        //     socket.emit(eventName, data, function () {
        //         var args = arguments;
        //         $rootScope.$apply(function () {
        //             if (callback) {
        //                 callback.apply(socket);
        //             }
        //         });
        //     });
        // }
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
       // $scope.data = [];
        $scope.data.push($scope.responseData);
    }
    // $scope.res = false;
    // $scope.err = false;
    // $http({
    //     method: "GET",
    //     url: "/childProcess"
    // }).then(function mySuccess(response) {
    //     $scope.res = true;
    //     $scope.err = false;
    //     $scope.data = response.data;
    // }, function myError(err) {
    //     $scope.res = false;
    //     $scope.err = true;
    //     $scope.error = err;
    // });
});
