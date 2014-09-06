var ngDeviseApp = angular.module("ngDeviseApp", ["ngRoute", "Devise", "ngResource", "ngCookies"]);

ngDeviseApp.config(['$routeProvider', 'AuthProvider',  function($routeProvider, AuthProvider){


  $routeProvider
  .when('/', {
    controller: 'authController',
    templateUrl: 'app/views/home.html'
  })
  .when('/signup', {
    controller: 'authController',
    templateUrl: 'app/views/signup.html'
  })
  .when('/signin', {
    controller: 'authController',
    templateUrl: 'app/views/signin.html'
  })
  ;

// //Start
// ngDeviseApp.controller("rootController", ["$rootScope", function($rootScope){
//   $scope.$on('devise:login', function(event, user) {
//     $rootScope.user = user;
//     $rootScope.loggedOut = false;
//   });
// }]);
// //End

}]);
