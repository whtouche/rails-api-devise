ngDeviseApp.controller("mainController", ["$rootScope", "$scope", "userFactory", "$location", function($rootScope, $scope, userFactory, $location){

  $scope.sendRegistration = function() {
    userFactory.signup($scope.email, $scope.password)
    .then(function(registeredUser){
      console.log(registeredUser);
      //$location.path("/loggedin");
      $location.path("/");
    }, function(error) {
      alert("Something went wrong.");
      console.log(error);
      $location.path("/signup");
    });
  };

// Number: 2
  $scope.login = function() {
    userFactory.signin($scope.email, $scope.password)
    .then(function(user){
      $rootScope.user = user;
      $location.path("/");
    }, function(error) {
      alert("Something went wrong.");
      $location.path("/signin");
    });
  };

  // $scope.whoUser = function(){
  //   userFactory.whoAmI().then(function(user){
  //     console.log(user);
  //   });
  // };

  // $scope.$on('devise:login', function(event, currentUser) {
  //   alert("devise:login");
  //   console.log(currentUser.email);
  //   $scope.user = currentUser;
  // });
  // $scope.$on('devise:new-session', function(event, currentUser) {
  //   alert("devise:new-session");
  // });
  // $scope.$on('devise:logout', function(event, currentUser) {
  //   alert("devise:logout");
  // });
  // $scope.$on('devise:new-registration', function(event, currentUser) {
  //   alert("devise:new-registration");
  // });

}]);
