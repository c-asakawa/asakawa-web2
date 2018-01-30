//Define an angular module for our app
var app = angular.module('asakawaApp', ['ngMaterial', 'duParallax', 'angular-preload-image']);


app.controller('appController', function($scope, $window, $timeout, $mdDialog, contentService, parallaxHelper) {

    const defaultDialogConfig = {
        isPhone: false,
        isEmail: false,
        isResume: false,
        isConfirm: false,
        isAcademia: false,
        isProjects: false,
        isOpensource: false,
        isFreelance: false,
        content: {}
    }

    $scope.debug = false;

    $scope.terminalCommandList = contentService.getTerminalContent();
    $scope.terminalCommandIndex = 0;

    $scope.bio = contentService.getBioContent();
    $scope.socialMedia = contentService.getSocialMedia();

    $scope.contactInfo = contentService.getContactInfo();
    $scope.tiles = contentService.getTiles();

    $scope.dialog = defaultDialogConfig;
    $scope.emailObject = {
        name: '',
        subject: '',
        message: '',
    }
    $scope.copyright = contentService.getCopyRightInfo();

    // init parallax background image
    $scope.background = parallaxHelper.createAnimator(-0.5);

    appLoad();


    function appLoad() {
        var loadingScreen = pleaseWait({
            logo: "",
            backgroundColor: '#FFF',
            loadingHtml: '                              \
                <div class="spinner">                   \
                    <div class="double-bounce1"></div>  \
                    <div class="double-bounce2"></div>  \
                </div>'
        });
        // spin for a second, giving some time for the images to load.
        // TODO: figure out something better
        $timeout( function() {
            loadingScreen.finish();
        }, 1000);

    }

    $scope.delayRedirect = function(url) {
        console.log('clicked social media button', url);
        // let the ripple animation play out
        $timeout(function() {
            $window.open(url, '_blank');
        }, 300)
    }

    $scope.clickTile = function(ev, index) {
        console.log('clicked tile:', index);
        resetDialogFlags();

        switch(index) {
            case 0: 
                $scope.dialog.isAcademia = true;
                $scope.dialog.content = contentService.getAcademiaContent();
                break;
            case 1: 
                $scope.dialog.isProjects = true; 
                $scope.dialog.content = contentService.getProjectsContent();
                break;
            case 2: 
                $scope.dialog.isOpensource = true;
                $scope.dialog.isLarge = true;
                $scope.dialog.content = contentService.getOpensourceContent();
                break;
            case 3: 
                $scope.dialog.isFreelance = true; 
                $scope.dialog.content = contentService.getFreelanceContent();
                break;
            default: 
                break;
        }

        console.log('current state of dialog:', $scope.dialog)
        showDialog(ev);
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
        var nameSignature = '\n\n Message From - ' +  $scope.emailObject.name
        var emailPath = 'mailto:chris@asakawa.me';
        emailPath += '?Subject=' + encodeURI($scope.emailObject.subject);
        emailPath += '&Body=' + encodeURI($scope.emailObject.message);
        emailPath += encodeURI(nameSignature);
        $timeout(function() {
            $mdDialog.cancel();
            $window.open(emailPath, '_top');
        }, 300)

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
        $scope.dialog.isAcademia = false;
        $scope.dialog.isProjects = false;
        $scope.dialog.isOpensource = false;
        $scope.dialog.isFreelance = false;
    }
});
