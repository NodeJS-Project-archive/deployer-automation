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
    //$scope.activeMenu = 'Process';
    $scope.totalData = $stateParams.totalData;
    $scope.reqFrom = $stateParams.request;
    $scope.runCommands = function () {
        $scope.data = [];
        var id=1;
        $scope.services="";
        $scope.responseData="";
       // $scope.services=[];
        // $scope.keys=[];
        // $scope.runningServices=[];
        // var service={};
        // var count=0;
        // var cnt=0;
         $scope.processFlag=false;
         $scope.serviceFlag=false;
        socketFactory.emit($scope.reqFrom, $scope.totalData);

        socketFactory.on('commands', function (data) {
            $scope.$apply(function () {
                $scope.responseData=id+": "+data.message;
                id=id+1;
                $scope.getResponse();
            });
        });

        socketFactory.on('runningProcesses', function (data) {
            $scope.$apply(function () {
                $scope.services=data.message;
                //$scope.responseData=id+": "+data.message;
                // $scope.services=data.message.split(" ");
                // console.log($scope.services);
                // for(var i=1;i<$scope.services.length;i++){
                //     if($scope.services[i]!==""){
                //         count=count+1;
                //         if(count>8){
                //             cnt=cnt+1;
                //             service[$scope.keys[cnt-1]]=$scope.services[i];
                //             if(cnt===8){
                //                 $scope.runningServices.push(service);
                //                 service={};
                //                 cnt=0;
                //             }
                //         }else{
                //             $scope.keys.push($scope.services[i]);
                //         }
                //     }else{
                //         continue;
                //     }
                // }
               // id=id+1;
               console.log($scope.runningServices);
                $scope.getServices();
            });
        });
    }

    $scope.getResponse = function () {
        $scope.data.push($scope.responseData);
        $scope.serviceFlag=false;
        $scope.processFlag=true;
    }

    $scope.getServices = function () {
        $scope.processFlag=false;
        $scope.serviceFlag=true;
    }
 
});
