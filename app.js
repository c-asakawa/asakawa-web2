//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial', 'duParallax']);

app.controller('appController', function($scope, $window, $timeout, contentService, parallaxHelper) {

    $scope.debug = false;
    $scope.content = contentService.getContent();
    $scope.socialMedia = contentService.getSocialMedia();
    $scope.background = parallaxHelper.createAnimator(-0.5);


    $scope.clickSocialMedia = function(url) {
        console.log('clicked social media button', url);
        // let the ripple animation play out
        $timeout(function() {
            $window.open(url, '_blank');
        }, 300)
    }
});
