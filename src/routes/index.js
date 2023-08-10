var app = angular.module("myApp",['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/home",
            {
                templateUrl: "src/views/home.html",
                controller: "HomeController",
            })
        .when("/about",
            {
                templateUrl: "src/views/about.html",
                controller: "AboutController"
            })
        .when("/contact",
            {
                templateUrl: "src/views/contact.html",
                controller: "ContactController"
            })
        .when("/cousers",
        {
            templateUrl: "src/views/ListQuizz.html",
            controller: "QuizzController"
        })
        .when("/quizzDetail/:id", {
            templateUrl: "src/views/QuizzDetail.html",
            controller: "QuizzDetailController"
        })
            .when("/logout",
            {
                templateUrl: "src/views/home.html",
                controller:  "LogoutController"
            })
        .when("/register",
            {
                templateUrl: "src/views/dangky.html",
                controller: "registerCtrl"
            })
        .when("/login",
            {
                templateUrl: "src/views/login.html",
                controller: "LoginController"
            })
        .when("/updateaccount",
            {
                templateUrl: "src/views/capnhattk.html",
                controller: "updateaccountCtrl"
            })
        .when("/updatepassword",
            {
                templateUrl: "src/views/dmk.html",
                controller: "updatepasswordCtrl"
            })
        .when("/lichsuthi",
            {
                templateUrl: "src/views/lichsuthi.html",
                controller: "lichsuthiCtrl"
            })
        .when("/forgotpass",
            {
                templateUrl: "src/views/qmk.html",
                controller: "forgotpasswordCtrl"
            })
        .when("/danhsach",
            {
                templateUrl: "src/views/danhsachsv.html",
                controller: "danhsachCtrl"
            })
        .otherwise(
            {
                redirectTo: "/home"
            });
}]);



app.run(function( $rootScope, $http ){

        if(localStorage){
            $rootScope.student = JSON.parse(window.localStorage.getItem('user'));
            $rootScope.studentid = JSON.parse(window.localStorage.getItem('userid'));
            $rootScope.studentrole = JSON.parse(window.localStorage.getItem('userrole'));
        }else{
            $rootScope.student = null;
        }
})