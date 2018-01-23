app.directive('tileFlip', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            imagePath: '=',
            tileHeader: '=',
            tileIntro: '=',
            clickTile: '&',
        },
        template: '                                                            \
            <div class="tileContainer">                                        \
                <span class="tileLabel">{{tileHeader}}</span>                  \
                <div class="flip-container"                                    \
                    ontouchstart="this.classList.toggle(\'hover\');"           \
                    ng-click="" >                                              \
                    <div class="flipper">                                      \
                        <md-whiteframe class="md-whiteframe-2dp front">        \
                            <!-- front content -->                             \
                            <img class="tileImage" src="{{imagePath}}">        \
                        </md-whiteframe>                                       \
                        <md-whiteframe class="md-whiteframe-2dp back">         \
                            <!-- back content -->                              \
                            <img class="tileImage xFlip" src="{{imagePath}}">  \
                            <div class="tileOverlay"></div>                    \
                            <div class="tileIntro">                            \
                                {{tileIntro}}                                  \
                            </div>                                             \
                        </md-whiteframe>                                       \
                    </div>                                                     \
                </div>                                                         \
            </div>',
    };
});
