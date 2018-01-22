//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial', 'duParallax']);

app.controller('appController', function($scope, $window, $timeout, $mdDialog, contentService, parallaxHelper) {

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

    $scope.phone = function(ev) {
        showDialog(ev);
    };
    $scope.email = function(ev) {
        showDialog(ev);
    };    
    $scope.resume = function(ev) {
        showDialog(ev);
    };
    $scope.close = function() {
        console.log('close dialog');
        $timeout(function() {
            $mdDialog.cancel();
        }, 300)
    }

    function showDialog(ev) {
        $mdDialog.show({
            contentElement: '#dialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            preserveScope: true,
            clickOutsideToClose: true
        });
    }

    // function dialogController($scope, $mdDialog) {
    //     console.log('dialog controller hit')

    //     $scope.hide = function() {
    //         $mdDialog.hide();
    //     };
    //     $scope.cancel = function() {
    //         $mdDialog.cancel();
    //     };
    //     $scope.answer = function(answer) {
    //         $mdDialog.hide(answer);
    //     };
    // }

});
