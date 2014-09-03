(function (angular) {
  'use strict';
  var devise = angular.module('Devise', []);
  devise.factory('deviseInterceptor401', [
    '$rootScope',
    '$q',
    function ($rootScope, $q) {
      // Only for intercepting 401 requests.
      return {
        responseError: function (response) {
          if (response.status === 401 && !response.config.ignoreAuth) {
            var deferred = $q.defer();
            $rootScope.$broadcast('devise:unauthorized', response, deferred);
            return deferred.promise;
          }
          return $q.reject(response);
        }
      };
    }
  ]).config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.interceptors.push('deviseInterceptor401');
    }
  ]);
  devise.provider('Auth', function AuthProvider() {
    /**
     * The default paths.
     */
    var paths = {
        login: '/users/sign_in.json',
        logout: '/users/sign_out.json',
        register: '/users.json'
      };
    /**
     * The default HTTP methods to use.
     */
    var methods = {
        login: 'POST',
        logout: 'DELETE',
        register: 'POST'
      };
    /**
     * Set to true if 401 interception of the provider is not desired
     */
    var ignoreAuth = false;
    /**
     * The parsing function used to turn a $http
     * response into a "user".
     *
     * Can be swapped with another parsing function
     * using
     *
     *  angular.module('myModule', ['Devise']).
     *  config(function(AuthProvider) {
     *      AuthProvider.parse(function(response) {
     *          return new User(response.data);
     *      });
     *  });
     */
    var _parse = function (response) {
      return response.data;
    };
    // A helper function that will setup the ajax config
    // and merge the data key if provided

    //'action' is set to 'login'
    //'data' is set to {user: creds} object
    function httpConfig(action, data) {
      var config = {
          method: methods[action].toLowerCase(),
          url: paths[action],
          ignoreAuth: ignoreAuth
        };
      if (data) {
        config.data = data;
      }
      return config;
    }
    // A helper function to define our configure functions.
    // Loops over all properties in obj, and creates a get/set
    // method for [key + suffix] to set that property on obj.
    function configure(obj, suffix) {
      angular.forEach(obj, function (v, action) {
        this[action + suffix] = function (param) {
          if (param === undefined) {
            return obj[action];
          }
          obj[action] = param;
          return this;
        };
      }, this);
    }
    configure.call(this, methods, 'Method');
    configure.call(this, paths, 'Path');
    // The ignoreAuth config function
    this.ignoreAuth = function (value) {
      if (value === undefined) {
        return ignoreAuth;
      }
      ignoreAuth = !!value;
      return this;
    };
    // The parse configure function.
    this.parse = function (fn) {
      if (typeof fn !== 'function') {
        return _parse;
      }
      _parse = fn;
      return this;
    };
    // Creates a function that always
    // returns a given arg.
    function constant(arg) {
      return function () {
        return arg;
      };
    }
    this.$get = [
      '$q',
      '$http',
      '$rootScope',
      function ($q, $http, $rootScope) {
        // Our shared save function, called
        // by `then`s. Will return the first argument,
        // unless it is falsey (then it'll return
        // the second).
        function save(user) {
          service._currentUser = user;
          return user;
        }
        // A reset that saves null for currentUser
        function reset() {
          save(null);
        }
        function broadcast(name) {
          return function (data) {
            $rootScope.$broadcast('devise:' + name, data);
            return data;
          };
        }
        var service = {
            _currentUser: null,
            //Promise returns data, headers, other stuff
            //'_parse' method sets variable 'parse' to contain just the data returned by the promise
            parse: _parse,
// Number: 4
            login: function (creds) {
              //Set 'withCredentials' to true if more than 0 arguments
              //loggedIn is set to false using 'isAuthenticated' method below
              var withCredentials = arguments.length > 0, loggedIn = service.isAuthenticated();
              //creds is set to the object containing email and password, IF it exists
              creds = creds || {};
              //Feed the above 'httpConfig' method to Angular's $http method
              //Runs 'service.parse' on the promise returned by $http
              //'.then(save)' uses the 'save' method to set '_currentUser' to 'user' which is the data returned by the method "_parse"
              return $http(httpConfig('login', { user: creds })).then(service.parse).then(save).then(function (user) {
                //Uses the above 'broadcast' function to use Angular's '$broadcast'
                //To broadcast "devise:new-session" and "devise:login"
                if (withCredentials && !loggedIn) {
                  return broadcast('new-session')(user);
                }
                return user;
              }).then(broadcast('login'));
            },
            logout: function () {
              var returnOldUser = constant(service._currentUser);
              return $http(httpConfig('logout')).then(reset).then(returnOldUser).then(broadcast('logout'));
            },
            register: function (creds) {
              creds = creds || {};
              return $http(httpConfig('register', { user: creds })).then(service.parse).then(save).then(broadcast('new-registration'));
            },
            currentUser: function () {
              if (service.isAuthenticated()) {
                return $q.when(service._currentUser);
              }
              return service.login();
            },
            isAuthenticated: function () {
              //'bangbang' sets variable to boolean
              return !!service._currentUser;
            }
          };
        return service;
      }
    ];
  });
}(angular));
