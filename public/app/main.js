var ngDeviseApp = angular.module("ngDeviseApp", ["ngRoute", "Devise", "ngResource"]);

ngDeviseApp.config(['$routeProvider', 'AuthProvider',  function($routeProvider, AuthProvider){


  $routeProvider
  .when('/', {
    controller: 'mainController',
    templateUrl: 'app/views/home.html'
  })
  .when('/signup', {
    controller: 'mainController',
    templateUrl: 'app/views/signup.html'
  })
  .when('/signin', {
    controller: 'mainController',
    templateUrl: 'app/views/signin.html'
  })
  ;

}]);
