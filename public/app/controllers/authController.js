ngDeviseApp.controller("authController", ["$scope", "Auth", "$cookieStore", function($scope, Auth, $cookieStore) {

  var credentials = {
      email: $scope.email,
      password: $scope.password,
      password_confirmation: $scope.confirmPassword
  };

  $scope.signUp = function(credentials) {
    Auth.register(credentials).then(function(registeredUser) {
      console.log(registeredUser);
    }, function(error) {
      console.log(error);
    });
  };

  $scope.signIn = function(email, password) {
    Auth.login({email: $scope.email, password: $scope.password}).then(function(user){
      //$rootScope.user = user;
      console.log(user);
      //$location.path("/");
    }, function(error) {
      alert("Something went wrong.");
      $location.path("/signin");
    });
  };

  $scope.signOut = function() {
    Auth.logout().then(function(user)
    {
      console.log("Logged out");
      $scope.loggedOut = true;
      // $route.reload();
      //$location.path('/');
    }, function(error){
      alert("There was a problem signing you out.");
      $route.reload();
    });
  };

  $scope.$on('devise:new-registration', function(event, user) {
    alert("Signed up successfully.");
  });

//   $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
//     // Ask user for login credentials

//     Auth.login({email: $scope.email, password: $scope.password}).then(function() {
//         // Successfully logged in.
//         // Redo the original request./[]
//         return $http(xhr.config);
//     }).then(function(response) {
//         // Successfully recovered from unauthorized error.
//         // Resolve the original request's promise.
//         deferred.resolve(response);
//     }, function(error) {
//         // There was an error.
//         // Reject the original request's promise.
//         deferred.reject(error);
//     });
// });

}]);
