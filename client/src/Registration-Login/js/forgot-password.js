var app = angular.module('deployer');



app.controller('ForgotPassowrd', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.user = { "email": "", "otp": "", "pwd": "", "cpwd": "" };
    $scope.showDiv = false;
    $scope.showLoading = true;
    $scope.showResetPwd = false;
    $scope.showotp = false;
    $scope.showSuccessMsg = false;
    $scope.showOtpErrorMsg = false;
    $scope.showPasswordMsg = false;
    $scope.passwordMsg = "";
    var otp = "";

    $scope.getOTP = function () {
        $scope.showDiv = true;


        $http({
            method: "POST",
            headers: { 'ContentType': 'application/json' },
            url: "/api/generateOTP",
            data: $scope.user
        }).then(function successCallback(response) {
            if (response.data.stat == true) {
                otp = response.data.otp;
                console.log(response);
                $scope.showLoading = false;
                $scope.showotp = true;
            } else {
            toastr.options.timeOut = 1500;
            toastr.warning("User Not Found !!!");
                   
                     $scope.showLoading = false;
                     $scope.showDiv = false;
            }

        }, function errorCallback(err) {

             toastr.options.timeOut = 1500;
            toastr.warning("User Not Found !!!");
            console.log(err);

        });
    }


    $scope.matchOTP = function () {


        if ($scope.user.otp == otp) {
            $scope.showLoading = true;
            $scope.showResetPwd = true;
            console.log("done");
            $scope.showotp = false;
            $scope.showOtpErrorMsg = false;
        } else {
            $scope.showOtpErrorMsg = true;
            console.log("OTP Not Matched");
        }

    }

    $scope.changePassowrd = function () {

            $scope.showPasswordMsg = false;
            var pwdNotMatchMsg = "Password and Confirm Password Should Follow This Pasttern :-\
            # must contains one digit from 0-9 \
             # must contains one lowercase character \
             # must contains one special symbols in the list '@#$%' \
             # length at least 8 characters and maximum of 20";

        if ($scope.user.pwd == undefined || $scope.user.cpwd == undefined) {
            $scope.showPasswordMsg = true;
            $scope.passwordMsg = pwdNotMatchMsg;
            console.log("Please Enter Correct Password");
        }


       else if ($scope.user.pwd != $scope.user.cpwd) {
            $scope.showPasswordMsg = true;
            $scope.passwordMsg = "Password Not Matched";
            console.log("Password Not Matched Error");
        } else {
            $scope.showPasswordMsg = false;
            $scope.showLoading = true;
            $scope.showResetPwd = false;

            $http({
                method: "POST",
                headers: { 'ContentType': 'application/json' },
                url: "/api/setPassword",
                data: $scope.user
            }).then(function successCallback(response) {
                if (response.data.stat == true) {
                    $scope.showLoading = false;
                    $scope.showSuccessMsg = true;
                    $scope.showotp = false;
                }

            }, function errorCallback(err) {

                console.log(err);

            });

        }






    }


}])