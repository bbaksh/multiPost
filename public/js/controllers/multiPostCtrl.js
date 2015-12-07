/*global angular*/
/* global gapi */
angular.module('multiPostCtrl',[]).controller('multiPostController', //['$scope', 'multiPost', '$http','$rootScope', 'googleService',
    function($scope, $http, multiPost, googleService, $rootScope){
        
        $scope.name = "TEMP";
        $scope.email = null;
        $scope.token = $rootScope.accessToken;
        $scope.posts = [];
        
        $scope.requested = false;

        /* Get google data */
        $scope.getEmail = function() {
            $scope.token = $rootScope.accessToken;
            if(typeof($scope.token) === undefined || $scope.requested) {
                return;
            }
            
            $scope.requested = true;
            
            $http({
                method:'GET',
                url:'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + $scope.token.access_token
            }).then(function successCallback(response){
              $scope.email = response.data.email;
              $scope.name = response.data.name;
              getPosts();
              return;
            },function errorCallBack(response){
               $scope.email = "Invalid Token";
               return;
            });
        }

        /* Get posts created by user */
        var getPosts = function(){
            multiPost.getAll().then(function(payload) {
                $scope.posts = payload.data;//TODO: add posts only from the specific user. (ie a loop pushing to array)
                $scope.myPosts = [];
                for(var i = 0 ; i < $scope.posts.length; i++){
                    if($scope.posts[i].email == $scope.email){
                        $scope.myPosts.push($scope.posts[i]);
                    }
                }
            });
        }
        
        getPosts();

        $scope.addPost = function(){
            if(!$scope.title || $scope.title === ''){
                return;
            }
            var newPost = {
                name:$scope.name, 
                email:$scope.email, 
                title: $scope.title 
            }
            multiPost.create([newPost]);
            getPosts();
            //update();
            $scope.title = '';
            $scope.$apply($scope.posts);
        };

        /* Edit a post */
        $scope.editPost = function(post){
            if(!$scope.edit || $scope.edit === ''){
                return;
            }
            post.title = $scope.edit;
            var editedPost = {
                id: post._id,
                value: $scope.edit
            }
            multiPost.put(editedPost);
            $scope.edit = '';
            getPosts();
            $scope.$apply();
        };
        
        /* Delete a post */
        $scope.deletePost = function(post){
            multiPost.delete(post._id).then(function(){
                getPosts();
                $scope.$apply();
            });
            $scope.$apply();
        };
    });

/*    
  $http({
        method:'GET',
        url:'https://www.googleapis.com/plus/v1/people/me?key={AIzaSyDtvL8SoQttruRUVOCK5sX8oOpdIhUEf2U}'
  }).then(function successCallback(response){
      $scope.name = response.data;
  },function errorCallBack(response){
       
  });
//   $scope.name = $scope.googleResponse.displayName;
   
   
    // $scope.name = googleService.then(function(data){
    //     return data.email;
    // })
    /* global gapi */
    // var request = gapi.client.plus.people.get({
    //   'userId' : 'me'
    // });
    // request.execute(function(resp) {
    //   $scope.name = resp.displayName;
    // });
    //*/