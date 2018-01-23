//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial', 'duParallax']);


app.controller('appController', function($scope, $window, $timeout, $mdDialog, contentService, parallaxHelper) {

    const defaultDialogConfig = {
        isPhone: false,
        isEmail: false,
        isResume: false,
        isConfirm: false,
        content: {}
    }

    $scope.debug = false;

    $scope.terminalCommandList = contentService.getTerminalContent();
    $scope.terminalCommandIndex = 0;

    $scope.content = contentService.getContent();
    $scope.socialMedia = contentService.getSocialMedia();

    $scope.contactInfo = contentService.getContactInfo();
    $scope.tiles = contentService.getTiles();

    $scope.dialog = defaultDialogConfig;
    $scope.emailObject = {
        name: '',
        returnEmail: '',
        message: '',
    }
    $scope.copyright = contentService.getCopyRightInfo();

    // init parallax background image
    $scope.background = parallaxHelper.createAnimator(-0.5);

    appLoad();

    function appLoad() {
        var loading_screen = pleaseWait({
            logo: "",
            backgroundColor: '#FFF',
            loadingHtml: '                              \
                <div class="spinner">                   \
                    <div class="double-bounce1"></div>  \
                    <div class="double-bounce2"></div>  \
                </div>'
        });
        // spin for a second, giving some time for the images to load.
        $timeout( function() {
            loading_screen.finish();
        }, 1000);

    }

    $scope.clickSocialMedia = function(url) {
        console.log('clicked social media button', url);
        // let the ripple animation play out
        $timeout(function() {
            $window.open(url, '_blank');
        }, 300)
    }

    $scope.phone = function(ev) {
        resetDialogFlags();
        $scope.dialog.content = contentService.getPhoneContent();
        $scope.dialog.isPhone = true;
        showDialog(ev);
    };
    $scope.email = function(ev) {
        resetDialogFlags();
        $scope.dialog.content = contentService.getEmailContent();
        $scope.dialog.isEmail = true; 
        showDialog(ev);
    };    
    $scope.resume = function(ev) {
        resetDialogFlags();
        $scope.dialog.content = contentService.getResumeContent();
        $scope.dialog.isResume = true;
        $scope.dialog.isLarge = true;
        showDialog(ev);
    };
    $scope.closeDialog = function() {
        $timeout(function() {
            $mdDialog.cancel();
        }, 300)
    }
    $scope.cancelEmail = function() {
        $timeout(function() {
            $mdDialog.hide();
            $scope.emailObject.name = $scope.emailObject.returnEmail = $scope.emailObject.message = '';
        }, 300)
    }
    $scope.sendEmail = function() {
        console.log('sending email')
    }

    function showDialog(ev) {
        $scope.dialog = defaultDialogConfig; 
        $mdDialog.show({
            contentElement: '#dialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            preserveScope: true,
            clickOutsideToClose: true
        });
    }
    function resetDialogFlags() {
        $scope.dialog.isPhone = false;
        $scope.dialog.isEmail = false;
        $scope.dialog.isResume = false;
        $scope.dialog.isLarge = false;
        $scope.dialog.isConfirm = false;
    }
});
