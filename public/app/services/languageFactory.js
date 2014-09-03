ngDeviseApp.factory("languageFactory", ["$http", function($http){

  var factory = {};

  factory.getChildren = function(){
    return $http.get('/api/languages/');
  };

  return factory;

}]);
