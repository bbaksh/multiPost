/*global angular*/
/*global gapi*/
/*global $scope*/
angular.module('multiPostService',[])
    .factory('multiPost',['$http',function($http){
        return {
            getAll : function(){
                console.log("From get function######");
                return $http.get('/api/allPosts'); 
            },
            
            get: function(id){
                return $http.get('/api/allPosts/'+id);
            },
            
            create : function(postData){
              return $http.post('/api/allPosts',postData);  
            },
            
            delete : function(id){
                return $http.delete('/api/allPosts/' + id);
            },
            put: function(data){
                return $http({
                    method: 'PUT',
                    url:'/api/allPosts/' + data.id,
                    data: {id:data.id, edit:data.value}
                });
            },
            info: function(data){
                    return $http({
                        method: 'GET',
                        url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + data.value
                    });
            }
        }
     }])
     .service('googleService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
            var clientId = '198228397436-ot0c7vj4tp93r91v6rhuo5bdpnhe1q4f.apps.googleusercontent.com',
                apiKey = 'AIzaSyDtvL8SoQttruRUVOCK5sX8oOpdIhUEf2U',
                scopes = 'profile',
                domain = 'https://lab4-bbaksh.c9users.io',
                deferred = $q.defer();

            this.login = function () {
                gapi.auth.authorize({ 
                    client_id: clientId, 
                    scope: scopes, 
                    immediate: false, 
                    hd: domain 
                }, this.handleAuthResult);

                return deferred.promise;
            }

            this.handleClientLoad = function () {
                gapi.client.setApiKey(apiKey);
                gapi.auth.init(function () { });
                window.setTimeout(checkAuth, 1);
            };

            this.checkAuth = function() {
                gapi.auth.authorize({ 
                    client_id: clientId, 
                    scope: scopes, 
                    immediate: true, 
                    hd: domain 
                }, this.handleAuthResult);
            };

            this.handleAuthResult = function(authResult) {
                if (authResult && !authResult.error) {
                    var data = {};
                    gapi.client.load('oauth2', 'v2', function () {
                        var request = gapi.client.oauth2.userinfo.get();
                        request.execute(function (resp) {
                            data.email = resp.email;
                            $rootScope.email=resp.email;
                        });
                    });
                    deferred.resolve(data);
                } else {
                    deferred.reject('error');
                }
            };

            this.handleAuthClick = function(event) {
                gapi.auth.authorize({ 
                    client_id: clientId, 
                    scope: scopes, 
                    immediate: false, 
                    hd: domain 
                }, this.handleAuthResult);
                return false;
            };
        }]);