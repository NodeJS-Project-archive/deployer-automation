var app = angular.module('deployer');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise("/overview");

    $stateProvider
        
        .state('showProcess', {
            url: "/process",
            templateUrl: "../../../src/deployer/views/showDeployProcess.html",
            params: {
                totalData: [],
                request:""
            }
        })
         .state('deployer', {
            url: "/deployer",
            templateUrl: "../../../src/deployer/views/deployer.html",
            params: {
                processData: {},
                totalProcesses:[]
            }
        })
        .state('overview', {
            url: "/overview",
            templateUrl: "../../../src/deployer/views/overview.html"
        })
        .state('existingProcesses', {
            url: "/existingProcesses",
            templateUrl: "../../../src/deployer/views/existingProcesses.html"
        })
}]);