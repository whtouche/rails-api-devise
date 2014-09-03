ngDeviseApp.controller("navController", ["$scope", "userFactory", "$location", "$route", function($scope, userFactory, $location, $route){

  // $scope.loggedOut = true;
    $scope.whoUser = function(){
    userFactory.whoAmI();
  };

  $scope.logout = function() {
    userFactory.signout().then(function(user)
    {
      console.log("Logged out");
      $scope.loggedOut = !$scope.loggedOut;
      // $route.reload();
      //$location.path('/');
    }, function(error){
      alert("There was a problem signing you out.");
      $route.reload();
    });
  };

  $scope.$on("devise:new-session", function(event, currentUser) {
    $scope.loggedOut = !$scope.loggedOut;
  });

}]);
