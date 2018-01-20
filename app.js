//Define an angular module for our app
var app = angular.module('asakawaApp', []);

app.directive('inputLine', function() {
    return {
        restrict: 'AE',
        replace: true,
        template: '<span>                                                           \
                        <span style="color:black">&ensp;chris@asakawa :: ~</span> \
                        <span style="color:greenyellow ">$</span>                   \
                   </span>',
    };
});


app.directive('inputType', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: '=',
            delay: '=',
        },
        template: '<span>                                                   \
                        <span class="typer" id="command"></span>            \
                        <span class="cursor" data-owner="command"></span>   \
                   </span>',
        link: function (scope, elem, attrs) {
            
            // console.log('input type directive:', scope, elem, attrs);
            // console.log('scope.text', scope.text);
            // console.log('scope.delay', scope.delay);


            var Typer = function(element) {
                this.element = element;
                var delim = element.dataset.delim || ","; // default to comma
                var words = element.dataset.words || "override these,sample typing";
                // this.words = words.split(delim).filter(function(v){return v;}); // non empty words
                this.words = [scope.text]; // non empty words
                this.delay = element.dataset.delay || 100;
                this.loop = element.dataset.loop || "true";
                this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;
                this.initialDelay = scope.delay;

                this.progress = { word:0, char:0, building:true, atWordEnd:false, looped: 0 };
                this.typing = true;

                var colors = element.dataset.colors || "black";
                this.colors = colors.split(",");
                this.element.style.color = this.colors[0];
                this.colorIndex = 0;

                this.doTyping();
            };

            Typer.prototype.start = function() {
                if (!this.typing) {
                    this.typing = true;
                    this.doTyping();
                }
            };
            Typer.prototype.stop = function() {
              this.typing = false;
            };
            Typer.prototype.doTyping = function() {
                var e = this.element;
                var p = this.progress;
                var w = p.word;
                var c = p.char;
                var currentDisplay = [...this.words[w]].slice(0, c).join("");
                p.atWordEnd = false;
                if (this.cursor) {
                    this.cursor.element.style.opacity = "1";
                    this.cursor.on = true;
                    clearInterval(this.cursor.interval);
                    var itself = this.cursor;
                    this.cursor.interval = setInterval(function() {itself.updateBlinkState();}, 400);
                } 

                e.innerHTML = currentDisplay;

                if (p.building) {
                    if (p.char == [...this.words[w]].length) {
                        p.building = false;
                        p.atWordEnd = true;
                    } 
                    else {
                        p.char += 1;
                    }
                } 
                else {
                    if (p.char == 0) {
                        p.building = true;
                        p.word = (p.word + 1) % this.words.length;
                        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
                        this.element.style.color = this.colors[this.colorIndex];
                    } 
                    else {
                        p.char -= 1;
                    }
                }

                if(p.atWordEnd) p.looped += 1;

                if(!p.building && (this.loop == "false" || this.loop <= p.looped) ){
                    this.typing = false;
                }

                var myself = this;
                setTimeout(function() {
                    if (myself.typing && !p.atWordEnd) { myself.doTyping(); };
                }, myself.element.innerText.length == 0 ? this.initialDelay : this.delay);
            };

            var Cursor = function(element) {
                this.element = element;
                this.cursorDisplay = element.dataset.cursordisplay || "█";
                element.innerHTML = this.cursorDisplay;
                this.on = true;
                element.style.transition = "all 0.1s";
                var myself = this;
                this.interval = setInterval(function() {
                    myself.updateBlinkState();
                }, 400);
            }
            Cursor.prototype.updateBlinkState = function() {
                if (this.on) {
                    this.element.style.opacity = "0";
                    this.on = false;
                } 
                else {
                    this.element.style.opacity = "1";
                    this.on = true;
                }
            }

            function TyperSetup() {
                var typers = {};
                var elements = document.getElementsByClassName("typer");
                for (var i = 0, e; e = elements[i++];) {
                    typers[e.id] = new Typer(e);
                }
                var elements = document.getElementsByClassName("typer-stop");
                for (var i = 0, e; e = elements[i++];) {
                    let owner = typers[e.dataset.owner];
                    e.onclick = function(){owner.stop();};
                }
                var elements = document.getElementsByClassName("typer-start");
                    for (var i = 0, e; e = elements[i++];) {
                        let owner = typers[e.dataset.owner];
                        e.onclick = function(){ 
                        owner.start(); 
                    };
                }
                var elements2 = document.getElementsByClassName("cursor");
                for (var i = 0, e; e = elements2[i++];) {
                    let t = new Cursor(e);
                    t.owner = typers[e.dataset.owner];
                    t.owner.cursor = t;
                }
            }

            TyperSetup();

        }
    };
});


app.controller('appController', function($scope, $timeout, $interval) {
    $scope.terminalCommandList = [
        {
            input: 'whoami',
            delay: 2000,
            show: true,
            outputList: [ 
                { line: 'Hi, my name is Chris Asakawa.', show: false }, 
                { line: 'I\'m a software developer.', show: false }
            ],
        },
        {
            input: './welcome',
            delay: 5000,
            show: false,
            outputList: [ 
                { line: '***********************************', show: false }, 
                { line: '*  This portfolio contains:       *', show: false }, 
                { line: '* ------------------------------- *', show: false },
                { line: '*  - Academic Achievements        *', show: false }, 
                { line: '*  - Personal Projects            *', show: false }, 
                { line: '*  - Open Source Projects         *', show: false }, 
                { line: '*  - Freelance Work               *', show: false }, 
                { line: '***********************************', show: false }, 
            ],
        },
        {
        input: 'another command',
            delay: 9000,
            show: false,
            outputList: [ 
                { line: '***********************************', show: false }, 
                { line: '*  This portfolio contains:       *', show: false }, 
                { line: '* ------------------------------- *', show: false },
                { line: '*  - Academic Achievements        *', show: false }, 
                { line: '*  - Personal Projects            *', show: false }, 
                { line: '*  - Open Source Projects         *', show: false }, 
                { line: '*  - Freelance Work               *', show: false }, 
                { line: '***********************************', show: false }, 
            ],
        },

    ]
    $scope.terminalCommand = 0;
    runTerminalCommands();

    $scope.nextCommand = function() { 
        console.log('incrementing terminalCommand', $scope.terminalCommand);
        $scope.terminalCommand++; 
    }

    $scope.delayInput = function() {
        console.log('delayOutput():', $scope.terminalCommand)
        // no action for the zeroth command
        if ($scope.terminalCommand == 0 || $scope.terminalCommand > $scope.terminalCommandList.length - 1) {
            console.log('NOPE')
            return;
        }
        console.log('delaying input on', $scope.terminalCommandList[$scope.terminalCommand - 1])
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

            // // once all the output is displayed then increment the command index
            // if (outputList[outputList.length].show) {
            //     $scope.terminalCommand++;
            // }
        }, index * 300)
    }

    function runTerminalCommands() {
        $interval(function() {
            $scope.terminalCommand = $scope.terminalCommand + 1;
        }, 3500)
    }
});
