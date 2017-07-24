var app = angular.module('deployer', ['ui.router']);
app.controller('deployerCtrl', function ($scope, socketFactory, $stateParams, $state) {

    $scope.totalProcesses = [];
    $scope.process = { "id": "", "processName": "", "commandsData": [] };
    $scope.process.commandsData = [];
    var id = 1;
    $scope.addtag = true;
    var addProcess = true;
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
    $scope.nameFlag = true;
    $scope.checkName = function () {
        if ($scope.totalProcesses.length === 0 && $scope.process.processName !== "") {
            $scope.nameFlag = false;
        } else {
            var flag=false;
            for (var i = 0; i < $scope.totalProcesses.length; i++) {
                if ($scope.process.processName === "") {
                        flag = true;
                        toastr.error("process name required");
                }
                else if($scope.totalProcesses[i].processName === $scope.process.processName){
                    flag=true;
                    toastr.error($scope.process.processName+" process name already exist");
                     //$scope.nameFlag = true;
                }
            }
            if(flag==false){
                $scope.nameFlag = false;
            }else{
                $scope.nameFlag = true;  
            }
        }

    }

    $scope.edit = function (data) {
        // counter = 0;
        $scope.addtag = false;
        console.log($scope.rowMaker);
        $scope.rowMaker = [];
        for (var i = 0; i < data.commandsData.length; i++) {
            $scope.rowMaker.push({ "value": data.commandsData[i] });
        };
        $scope.rowMaker.push({ "value": "" });
        $scope.process = angular.copy(data);
        $scope.nameFlag = false;
         for (var i = 0; i < $scope.totalProcesses.length; i++) {
                    if($scope.totalProcesses[i].id===data.id) {
                        $scope.totalProcesses[i].processName="";
                    }
         }
    };

    $scope.delete = function (data) {
        var flag = false;
        var count = data.id;
        for (var i = 0; i < $scope.totalProcesses.length; i++) {
            if (($scope.totalProcesses[i].id === data.id) && flag == false) {
                $scope.totalProcesses.splice(i, 1);
                flag = true;
                $scope.totalProcesses[i].id = count;
                count = count + 1
            }
            else if (flag == true) {
                $scope.totalProcesses[i].id = count;
                count = count + 1;
            }
        };
    };


    $scope.addNewProcess = function () {
        if (addProcess == false) {
            var isConfirmed = confirm("Do you want to save this data?");
            if (isConfirmed) {
                $scope.addData();
                addProcess = false;
                $scope.process = { "id": "", "processName": "", "commandsData": [] };
                $scope.rowMaker = [{ "value": "" }];
            } else {
                addProcess = false;
                $scope.process = { "id": "", "processName": "", "commandsData": [] };
                $scope.rowMaker = [{ "value": "" }];
            }
        } else {
            addProcess = false;
            $scope.process = { "id": "", "processName": "", "commandsData": [] };
            $scope.rowMaker = [{ "value": "" }];
            //$scope.process.commandsData = [];
        }
        //addProcess = true;
    }

    $scope.addData = function () {
        if ($scope.process.id === "") {
            $scope.process.commandsData = [];
            for (var i = 0; i < $scope.rowMaker.length; i++) {
                if ($scope.rowMaker[i].value && $scope.rowMaker[i].value != "")
                    $scope.process.commandsData.push($scope.rowMaker[i].value);
            }

            $scope.process.id = id;
            id = id + 1;
            $scope.totalProcesses.push($scope.process);

        } else {
             $scope.process.commandsData = [];
            for (var i = 0; i < $scope.rowMaker.length; i++) {
                if ($scope.rowMaker[i].value && $scope.rowMaker[i].value != ""){
                    $scope.process.commandsData.push($scope.rowMaker[i].value);
                }
                    
            }
            for (var i = 0; i < $scope.totalProcesses.length; i++) {
                if ($scope.totalProcesses[i].id === $scope.process.id) {
                    $scope.totalProcesses[i] = $scope.process;
                }
            }

        }
        $scope.process = { "id": "", "processName": "", "commandsData": [] };
        $scope.rowMaker = [{ "value": "" }];
        $scope.nameFlag=true;
        $scope.addtag = true;
        // $scope.process.commandsData = [];
        addProcess = true;

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
