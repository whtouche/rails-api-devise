ngDeviseApp.factory("userFactory", ['$http', 'Auth', '$cookieStore', function($http, Auth, $cookieStore){

  var factory = {};

  factory.signup = function(email, password) {
    return Auth.register({email: email, password: password});
  };
// Number: 3
  factory.signin = function(email, password) {
    return Auth.login({email: email, password: password});
  };
  factory.signout = function() {
    return Auth.logout();
  };
  factory.whoAmI = function(){
     return Auth.currentUser().then(function(user) {
      console.log(user);
    });
  };

  factory.loggedIn = function(){
    return Auth.isAuthenticated();
  };

  return factory;

}]);
