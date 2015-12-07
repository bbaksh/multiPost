/*global angular*/
angular.module('appRoutes',[]).config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/home.html',
            controller: 'homeController'
        })
        .when('/login',{
           templateUrl:'views/login.html',
           controller: 'multiPostController'
        })
        .when('/access_token=:accessToken',{
            template:'',
            controller: function($location, $rootScope){
                var hash = $location.path().substr(1);
                var splitted = hash.split('&');
                var params = {};
                for(var  i = 0 ; i < splitted.length; i++){
                    var param = splitted[i].split('=');
                    var key = param[0];
                    var value = param[1];
                    params[key] = value;
                    $rootScope.accessToken=params;
                    console.log("***",$rootScope.accessToken)
                }
                $location.path("/login");
            }
        });
    
    $locationProvider.html5Mode(true);
}]);