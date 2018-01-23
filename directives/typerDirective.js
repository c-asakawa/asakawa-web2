
app.directive('inputLine', function() {
    return {
        restrict: 'AE',
        replace: true,
        template: '<span>                                                           \
                        <span style="color:#6fa3f7">&ensp;chris@asakawa:~</span>    \
                        <span style="color:greenyellow ">$</span>                   \
                   </span>',
    };
});


app.directive('inputType', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            commandList: '=',
            commandIndex: '=',
        },
        template: ' <div ng-show="showInput">                                   \
                        <input-line></input-line>                               \
                        <span>                                                  \
                            <span class="typer" id="command"></span>            \
                            <span class="cursor" data-owner="command"></span>   \
                       </span>                                                  \
                    </div>',
        link: function (scope, elem, attrs) {
            
            // console.log('input type directive:', scope, elem, attrs);
            // console.log('scope.text', scope.text);
            // console.log('scope.delay', scope.delay);


            scope.showInput = true;

            function getWords() {
                var words = [];
                for (var i=0; i < scope.commandList.length; i++) {
                    words.push(scope.commandList[i].input);
                }
                return words;
            }

            function nextCommand() {
                scope.$apply(function() {
                    scope.commandIndex++;
                });
            }
            function resetCommands() {
                scope.$apply(function() {
                    scope.commandIndex = 0;
                });
            }
            function toggleInput() {
                scope.$apply(function () {
                    scope.showInput = !scope.showInput;
                });
            }

            function resetOutputFlags() {
                for (var i=0; i < scope.commandList.length; i++) {
                    for (var j=0; j < scope.commandList[i].outputList.length; j++) {
                        scope.commandList[i].outputList[j].show = false;
                    }
                }
                scope.$apply();
            }

            var Typer = function(element) {
                this.element = element;
                this.words = getWords();

                // define the delays
                this.initialDelay = 1200;
                this.delay = 100;
                this.deleteDelay = 1500;

                // keep track of the progess of the typer
                this.progress = { word:0, char:0, building:true, atWordEnd:false, looped: 0 };
                this.typing = true;

                // default to white font
                var colors = "#FFF";
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
                        // increment the terminal index
                        lastWord = scope.commandList.length - 1;
                        p.word != lastWord ? nextCommand() : resetCommands();
                        // clear out the word
                        p.char = 0;
                        toggleInput();

                        var outputLength = scope.commandList[p.word].outputList.length;

                        var output = 0;
                        var outputInterval = setInterval(function() {
                            if ( scope.commandList[p.word - 1] == undefined ){
                                toggleInput();
                                clearInterval(outputInterval);
                                resetOutputFlags();
                            }
                            else {
                                scope.$apply(function() {
                                    scope.commandList[p.word - 1].outputList[output].show = true;
                                });
                                output++;

                                if (output == outputLength) {
                                    clearInterval(outputInterval);
                                    toggleInput();
                                }
                            }
                        }, 200)
                    }
                }

                if(p.atWordEnd) p.looped += 1;

                
                var myself = this;
                var currentDelay;

                // three delays to work with here. inital delay, type delay and delete delay
                if (myself.element.innerText.length == 0){
                    currentDelay = this.initialDelay
                    // on first run? give this a bit more delay
                    if (p.word == 0 && p.looped == 0) {
                        currentDelay += 1500;
                    }
                }
                else if (p.atWordEnd) {
                    currentDelay = this.deleteDelay;
                }
                else {
                    currentDelay = this.delay;
                }


                setTimeout(function() {
                  if (myself.typing) { 
                      myself.doTyping(); 
                  };
                }, currentDelay);
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
                    e.onclick = function(){owner.start();};
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