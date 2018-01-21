app.controller('terminalController', function($scope, $timeout, $interval, contentService) {
    $scope.demoCommandsComplete = false;
    $scope.terminalCommandList = contentService.getTerminalContent();
    $scope.terminalCommand = 0;
    runTerminalCommands(3500);

    $scope.nextCommand = function() { 
        if($scope.debug) { console.log('incrementing terminalCommand', $scope.terminalCommand); }
        $scope.terminalCommand++; 
    }

    $scope.delayInput = function() {
        if($scope.debug) { console.log('delayOutput():', $scope.terminalCommand); }
        // no action for the zeroth command
        if ($scope.terminalCommand == 0 || $scope.terminalCommand > $scope.terminalCommandList.length - 1) {
            console.log('NOPE');
            return;
        }
        if($scope.debug) { console.log('delaying input on', $scope.terminalCommandList[$scope.terminalCommand - 1]) };
        var outputLength = $scope.terminalCommandList[$scope.terminalCommand - 1].outputList.length;
        // var delay = $scope.terminalCommandList[index-1].delay + ((outputLength + 5) * 300);
        var delay = outputLength * 300;
        
        console.log('delaying input:', delay);
        $timeout(function() {
            $scope.terminalCommandList[$scope.terminalCommand].show = true;
            console.log('setting input', $scope.terminalCommand-1, 'true');
        }, delay);
    }

    $scope.delayOutput = function(parentIndex, index) {
        $timeout(function() {
            var outputList = $scope.terminalCommandList[parentIndex].outputList;
            outputList[index].show = true;
            // check if were done
            if ($scope.terminalCommandList.length - 1 == parentIndex && outputList.length - 1 == index) {
                $timeout(function() {
                    console.log('were done with commands');
                    $scope.demoCommandsComplete = true;
                }, 300);
            }
        }, index * 300)
    }

    function runTerminalCommands(delay) {
        var run = $interval(function() {
            $scope.terminalCommand++;
            if ($scope.terminalCommand == $scope.terminalCommandList.length) {
                $interval.cancel(run);
            }
        }, delay);
         // $timeout(function() {
        //  $scope.terminalCommand++;
        //  $timeout(function() {
        //      $scope.terminalCommand++;
        //  }, 3500)
        // }, 3500)
        // var commandTimeout = $timeout(function() {
 
        //     var currentDelay = $scope.terminalCommandList[$scope.terminalCommand].delay;
        //     var previousDelay, outputDelay;

        //     if ($scope.terminalCommandList[$scope.terminalCommand - 1] == undefined) {
        //         previousDelay = outputDelay = 0;
        //     }
        //     else {
        //         previousDelay = $scope.terminalCommandList[$scope.terminalCommand - 1].delay;
        //         outputDelay = ($scope.terminalCommandList[$scope.terminalCommand - 1].outputList.length + 5) * 300;

        //     }
        //     console.log('delaying terminal current:', currentDelay);
        //     console.log('delaying terminal previous:', previousDelay);
        //     console.log('delaying terminal output:', outputDelay);

        //     delay = currentDelay - previousDelay + outputDelay;
        //     console.log('****** delaying next command:', delay);
            
        //     $scope.terminalCommand++;
 
        //     if ($scope.terminalCommand == $scope.terminalCommandList.length) {
        //         $timeout.cancel(commandTimeout); // kill the timeout
        //     }
        //     else {
        //         runTerminalCommands(delay);
        //     }
        // }, delay);

    }
});