//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial']);

app.controller('appController', function($scope, $timeout, $interval) {

    $scope.debug = false;

});
