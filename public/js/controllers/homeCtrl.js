/*global angular*/
/*global gapi*/
angular.module('homeCtrl', []).controller('homeController',function($scope,googleService) {

    $scope.tagline = 'To the moon and back!'; 
    
    
    $scope.login=function() {
    	var client_id="198228397436-ot0c7vj4tp93r91v6rhuo5bdpnhe1q4f.apps.googleusercontent.com";
    	var scope="https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/plus.login%20https://www.googleapis.com/auth/plus.me";
    	var redirect_uri="https://lab4-bbaksh.c9users.io";
    	var response_type="token";
    	var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
    	"&response_type="+response_type;
    	window.location.replace(url);
    };
});