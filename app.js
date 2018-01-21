//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial', 'duParallax']);

app.controller('appController', function($scope, contentService, parallaxHelper) {

    $scope.debug = false;
    $scope.content = contentService.getContent();
    $scope.background = parallaxHelper.createAnimator(-0.5);
});
