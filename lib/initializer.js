(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Initializer = App.Initializer = function Initializer(levels, startingLevel) {
      this.levels = levels;
      this.currentLevel = startingLevel;
      this.game = null;
      this.gameView = null;
  }

  Initializer.prototype.initialize = function() {
    var levelDimX = this.levels[this.currentLevel][0].length * App.Blocks.BLOCK_DIM[0] + 2;
    var levelDimY = this.levels[this.currentLevel].length * App.Blocks.BLOCK_DIM[1] + 2;

    var dotsEl = document.getElementById("dots-layer");
    dotsEl.width = levelDimX;
    dotsEl.height = levelDimY;
    var dotstx = dotsEl.getContext("2d");

    var canvasEl = document.getElementById("level-layer");
    canvasEl.width = levelDimX;
    canvasEl.height= levelDimY; 
    var ctx = canvasEl.getContext("2d");

    var scoreEl = document.getElementById("score-layer");
    scoreEl.width = levelDimX;
    scoreEl.height = 50;
    var stx = scoreEl.getContext("2d");

    var gridEl = document.getElementById("grid-layer");
    gridEl.width = levelDimX;
    gridEl.height = levelDimY;
    var gtx = gridEl.getContext("2d");

    var blinkyEl = document.getElementById("blinky-layer");
    blinkyEl.width = levelDimX;
    blinkyEl.height = levelDimY;
    var blinkytx = blinkyEl.getContext("2d");

    var pinkyEl = document.getElementById("pinky-layer");
    pinkyEl.width = levelDimX;
    pinkyEl.height = levelDimY;
    var pinkytx = pinkyEl.getContext("2d");

    var inkyEl = document.getElementById("inky-layer");
    inkyEl.width = levelDimX;
    inkyEl.height = levelDimY;
    var inkytx = inkyEl.getContext("2d");

    var clydeEl = document.getElementById("clyde-layer");
    clydeEl.width = levelDimX;
    clydeEl.height = levelDimY;
    var clydetx = clydeEl.getContext("2d");

    var playerEl = document.getElementById("player-layer");
    playerEl.width = levelDimX;
    playerEl.height = levelDimY;
    var ptx = playerEl.getContext("2d");
    
    var sprites = new Image();
    sprites.src = './sprites/pacmansprites.png';
    $(window).load(function(){
      var movingObjects = new App.MovingObjects.MovingObjects([200, 200], [0, 0], sprites, ptx, gtx, blinkytx, pinkytx, inkytx, clydetx);
      var stationaryObjects = new App.StationaryObjects.StationaryObjects([0, 0], sprites, dotstx, stx);
      var board = new App.Boards.Board(App.Levels.levelOne, ctx, gtx, ptx, blinkytx, pinkytx, inkytx, clydetx, dotstx, stx, sprites);
      this.game = new App.Game(board, movingObjects, stationaryObjects);
      this.gameView  = new App.GameView(this.game, ctx)
      this.gameView.start();
    }.bind(this));
  }



})();