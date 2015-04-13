(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var GameView = App.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.MOVES = {
    "w": [0, -2],
    "s": [0, 2],
    "a": [-2, 0],
    "d": [2, 0],
    "up": [0, -2],
    "down": [0, 2],
    "left": [-2, 0],
    "right": [2, 0]
  }

  GameView.prototype.bindKeyHandlers = function(){
    var player = App.MovingObjects.Objects.pacman;
    Object.keys(GameView.MOVES).forEach(function(k) {
      var moveValue = GameView.MOVES[k];
      key(k, function() { player.changeDirection(moveValue);});
    });
  }

  GameView.prototype.start = function() {
    var gameView = this;
    
    // this.game.board.drawGrid();
    this.game.board.initialize();
    this.timerId = setInterval(
        function () {
          gameView.game.movingObjects.draw();
          gameView.game.stationaryObjects.draw();
        }, 1000 / 60
    );
    this.animationId = setInterval(
      function() {
          $.each(App.MovingObjects.Objects, function(objectKey, object){
            if(object.moved){
              object.animationCycle += 1;
            }
            
          })
          
      }, 1000/8
    )

    this.bindKeyHandlers();
  };

})();
