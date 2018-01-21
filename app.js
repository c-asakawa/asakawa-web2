//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial']);

app.controller('appController', function($scope, contentService) {

    $scope.debug = false;
    $scope.content = contentService.getContent();

});
