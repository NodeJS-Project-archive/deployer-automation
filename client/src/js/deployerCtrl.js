var app = angular.module('deployer',['ui.router']);
app.controller('deployerCtrl', function ($scope, socketFactory,$stateParams, $state) {

    $scope.totalProcesses = [];
    $scope.process = { "processName": "", "commandsData": [] };
    $scope.process.commandsData=[];
    $scope.deleteRow = function (index) {
        if ($scope.rowMaker.length != 1 || index != $scope.rowMaker.length - 1) {
            $scope.rowMaker.splice(index, 1);
        }

    };

    $scope.rowValue = { "value": "" };
    $scope.rowMaker = [$scope.rowValue];
    $scope.addRow = function (index) {


        if (index == $scope.rowMaker.length - 1) {
            $scope.rowMaker.push({ "value": "" });
        }

    }
    var newProcess = true;
    var addProcess = true;
    $scope.addNewProcess = function () {
        if (addProcess == false) {
            var isConfirmed = confirm("Do you want to save this data?");
            if (isConfirmed) {
                $scope.addData();
                addProcess = false;
                $scope.process = {};
                $scope.rowMaker=[{ "value": "" }];
                $scope.process.commandsData=[];
            } else {
                addProcess = false;
                $scope.process = {};
                $scope.rowMaker=[{ "value": "" }];
                $scope.process.commandsData=[];
            }
        } else {
            addProcess = false;
            $scope.process = {};
            $scope.rowMaker=[{ "value": "" }];
            $scope.process.commandsData=[];
        }
        //addProcess = true;
    }

    $scope.addData = function () {
        $scope.process.commandsData=[];
        for (var i = 0; i < $scope.rowMaker.length; i++) {
            if ($scope.rowMaker[i].value && $scope.rowMaker[i].value != "")
                $scope.process.commandsData.push($scope.rowMaker[i].value);
        }
    
         $scope.totalProcesses.push($scope.process);
         addProcess=true;
    }

    $scope.runCommands = function () {

        $state.go("showProcess", {
            totalData: $scope.totalProcesses
        });
        // $window.location.href = '../../src/views/showDeployProcess.html';
        // $scope.data = [];
        // var id=1;
        // $scope.responseData="";
        // socketFactory.emit('childProcess', { name: $scope.totalProcesses });

        // socketFactory.on('commands', function (data) {
        //     $scope.$apply(function () {
        //         $scope.responseData=id+": "+data.message;
        //         id=id+1;
        //         $scope.getResponse();
        //     });
        // });
    }

    // $scope.getResponse = function () {
    //     $scope.data.push($scope.responseData);
    // }
   

});
