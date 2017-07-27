var app = angular.module('deployer');
app.controller('deployerCtrl', function ($scope, socketFactory, $stateParams, $state, $http) {
    //$scope.activeMenu = 'Deployer';
    
    $scope.totalProcesses = [];
    $scope.process = { "id": "", "processName": "", "commandsData": [] };
    $scope.processData = { "title": "", "processList": []};
    $scope.processData = $stateParams.processData;
    $scope.totalProcesses=$stateParams.totalProcesses;
    $scope.process.commandsData = [];
    var id =  $scope.totalProcesses.length+1;
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
        var flag=0;
        if ($scope.totalProcesses.length === 0 && $scope.process.processName !== "") {
            $scope.nameFlag = false;
        } else {
            for (var i = 0; i < $scope.totalProcesses.length; i++) {
                if ($scope.process.processName === "") {
                       // flag = true;
                       falg=flag+1;
                        $scope.nameFlag = true; 
                        toastr.error("process name required");
                        break;
                }
                else if($scope.totalProcesses[i].processName === $scope.process.processName){
                    //flag=true;
                    flag=flag+1;
                    
                    toastr.error($scope.process.processName+" process name already exist");
                     //$scope.nameFlag = true;
                }else{
                   //  $scope.nameFlag = false;
                }
            }
            if(flag>0){
               $scope.nameFlag = true; 
            }else{
                $scope.nameFlag = false;
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
            totalData: $scope.totalProcesses,
            request:"childProcess"
        });
        
    }

    $scope.saveProcessName = function () {
        //$scope.dismiss;
        var title = "";
        if ($scope.processTitle != null) {

            if ($scope.processTitle == "") {
                title = $scope.processData.title;
            } else {
                title = $scope.processTitle;
            }

            if (title != "") {
                $scope.processData.title = title;
                $scope.processData.processList = $scope.totalProcesses;
                $scope.saveProcessData();
            }

        }
    }
    $scope.saveProcessData = function () {
        $http({
            url: '/saveProcessData',
            method: "POST",
            data: $scope.processData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                //$scope.load = "none";
                $scope.totalProcesses=[];
                toastr.success(response.data.msg);
                console.log(response.data.msg); // *****************************************************************************

                //  $window.location.href = '../../../src/Registration-Login/views/index.html';
            } else if (response.data.msg === "please login to create app ") {
                //$scope.load = "none";
                $window.location.href = '../../../src/Registration-Login/views/index.html';
            }
            else {
                //$scope.load = "none";
                toastr.error(response.data.msg);
                console.log(response.data.msg); // *****************************************************************************

            }
        }, function (err) {
            //$scope.load = "none";
            toastr.error(err);
            console.log(err); // *****************************************************************************

        });
    }


});
