var app = angular.module('deployer');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise("/deployer");

    $stateProvider
        
        .state('showProcess', {
            url: "/process",
            templateUrl: "../../src/views/showDeployProcess.html",
            params: {
                totalData: []
            }
        })
         .state('deployer', {
            url: "/deployer",
            templateUrl: "../../src/views/deployer.html"
        })
       

}]);