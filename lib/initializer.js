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
    this.levelDimX = this.levels[this.currentLevel][0].length * App.Blocks.BLOCK_DIM[0] + 2;
    this.levelDimY = this.levels[this.currentLevel].length * App.Blocks.BLOCK_DIM[1] + 2;

    var dotsEl = document.getElementById("dots-layer");
    dotsEl.width = this.levelDimX;
    dotsEl.height = this.levelDimY;
    this.dotstx = dotsEl.getContext("2d");

    var canvasEl = document.getElementById("level-layer");
    canvasEl.width = this.levelDimX;
    canvasEl.height= this.levelDimY; 
    this.ctx = canvasEl.getContext("2d");

    var scoreEl = document.getElementById("score-layer");
    scoreEl.width = this.levelDimX;
    scoreEl.height = 50;
    this.stx = scoreEl.getContext("2d");

    var gridEl = document.getElementById("grid-layer");
    gridEl.width = this.levelDimX;
    gridEl.height = this.levelDimY;
    this.gtx = gridEl.getContext("2d");

    var blinkyEl = document.getElementById("blinky-layer");
    blinkyEl.width = this.levelDimX;
    blinkyEl.height = this.levelDimY;
    this.blinkytx = blinkyEl.getContext("2d");

    var pinkyEl = document.getElementById("pinky-layer");
    pinkyEl.width = this.levelDimX;
    pinkyEl.height = this.levelDimY;
    this.pinkytx = pinkyEl.getContext("2d");

    var inkyEl = document.getElementById("inky-layer");
    inkyEl.width = this.levelDimX;
    inkyEl.height = this.levelDimY;
    this.inkytx = inkyEl.getContext("2d");

    var clydeEl = document.getElementById("clyde-layer");
    clydeEl.width = this.levelDimX;
    clydeEl.height = this.levelDimY;
    this.clydetx = clydeEl.getContext("2d");

    var playerEl = document.getElementById("player-layer");
    playerEl.width = this.levelDimX;
    playerEl.height = this.levelDimY;
    this.ptx = playerEl.getContext("2d");
    
    this.sprites = new Image();
    this.sprites.src = './sprites/pacmansprites.png';
    $(window).load(function(){
      var movingObjects = new App.MovingObjects.MovingObjects([200, 200], [0, 0], this.sprites, this.ptx, this.gtx, this.blinkytx, this.pinkytx, this.inkytx, this.clydetx);
      var stationaryObjects = new App.StationaryObjects.StationaryObjects([0, 0], this.sprites, this.dotstx, this.stx);
      var board = new App.Boards.Board(App.Levels.levelOne, this.ctx, this.gtx, this.ptx, this.blinkytx, this.pinkytx, this.inkytx, this.clydetx, this.dotstx, this.stx, this.sprites);
      this.game = new App.Game(board, movingObjects, stationaryObjects);
      this.gameView  = new App.GameView(this.game, this.ctx)
      this.gameView.start();
    }.bind(this));
  }

  Initializer.prototype.bindEvents = function(){
    $('#to-restart').bind('click', this.restart.bind(this))
  }

  Initializer.prototype.restart = function(){
    $('.in-game-options').hide();
    var movingObjects = new App.MovingObjects.MovingObjects([200, 200], [0, 0], this.sprites, this.ptx, this.gtx, this.blinkytx, this.pinkytx, this.inkytx, this.clydetx);
    var stationaryObjects = new App.StationaryObjects.StationaryObjects([0, 0], this.sprites, this.dotstx, this.stx);
    var board = new App.Boards.Board(App.Levels.levelOne, this.ctx, this.gtx, this.ptx, this.blinkytx, this.pinkytx, this.inkytx, this.clydetx, this.dotstx, this.stx, this.sprites);
    this.game = new App.Game(board, movingObjects, stationaryObjects);
    this.gameView  = new App.GameView(this.game, this.ctx)
    this.gameView.start();
    $('.canvas').fadeTo(500, 1)
  }

})();