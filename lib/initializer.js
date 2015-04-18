(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Initializer = App.Initializer = function Initializer(levels, sprites, beginningSound, deathSound, eatGhostSound) {
      this.levels = levels;
      this.sprites = sprites;
      this.beginningSound = beginningSound;
      this.deathSound = deathSound;
      this.eatGhostSound = eatGhostSound;
      this.levelCounter = 0;
      this.levelArr = ['levelOne', 'levelTwo', 'levelThree', 'levelFour', 'levelFive'];
      this.currentLevel = null;
      this.game = null;
      this.gameView = null;
      this.reversePacmanAnimation = false;
      this.reverseBlinkyAnimation = false;
      this.pacmanLifeCounter = 3;
      this.pacmanScoreCounter = 0;
      
  }



  Initializer.prototype.animate = function(){
      this.initializeAnimationLayer();
      this.animateMenu();
      this.animateMenuOptions();
  };

  Initializer.prototype.initializeAnimationLayer = function(){

      var menuPacman = document.getElementById("menu-pacman-layer");
      menuPacman.width = 442;
      menuPacman.height = 470;
      this.mptx = menuPacman.getContext("2d");

      var menuGhosts = document.getElementById("menu-ghosts-layer");
      menuGhosts.width = 442;
      menuGhosts.height = 470;
      this.mgtx = menuGhosts.getContext("2d");

      this.pacman = new App.MovingObjects.Pacman([-50, 175], [0, 0], this.sprites, [-50, 175], this.mptx);
      this.pacman.avatar = this.pacman.spriteSources.pacmanRight[0];
      this.blinky = new App.MovingObjects.Blinky([-100, 175], [0, 0], this.sprites, [-100, 175], this.mptx);
      this.blinky.avatar = this.blinky.spriteSources.blinkyRight[0];
      this.clyde = new App.MovingObjects.Clyde([50, 225], [0, 0], this.sprites, [50, 225], this.mptx);
      this.clyde.avatar = this.clyde.spriteSources.clydeRight[0];
      this.pinky = new App.MovingObjects.Pinky([50, 290], [0, 0], this.sprites, [50, 290], this.mptx);
      this.pinky.avatar = this.pinky.spriteSources.pinkyRight[0];
      this.inky = new App.MovingObjects.Inky([50, 355], [0, 0], this.sprites, [50, 355], this.mptx);
      this.inky.avatar = this.inky.spriteSources.inkyRight[0];
  }

  Initializer.prototype.animateMenuOptions = function(){

      this.menuOptionsAnimationId = setInterval(
        function() {
          this.mgtx.clearRect(0, 0, 1000, 1000);
          this.pinky.avatar = this.pinky.spriteSources.pinkyRight[this.pinky.animationCycle % 2]
          this.inky.avatar = this.inky.spriteSources.inkyRight[this.inky.animationCycle % 2]
          this.clyde.avatar = this.clyde.spriteSources.clydeRight[this.clyde.animationCycle % 2]
          var sourceX = this.pinky.avatar[0]
          var sourceY = this.pinky.avatar[1]
          var sourceWidth = this.pinky.avatar[2]
          var sourceHeight = this.pinky.avatar[3]
          var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
          var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
          var destX = this.pinky.pos[0] - App.Blocks.BLOCK_DIM[0];
          var destY = this.pinky.pos[1] - App.Blocks.BLOCK_DIM[1];
          this.mgtx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

          var sourceX = this.inky.avatar[0]
          var sourceY = this.inky.avatar[1]
          var sourceWidth = this.inky.avatar[2]
          var sourceHeight = this.inky.avatar[3]
          var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
          var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
          var destX = this.inky.pos[0] - App.Blocks.BLOCK_DIM[0];
          var destY = this.inky.pos[1] - App.Blocks.BLOCK_DIM[1];
          this.mgtx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

          var sourceX = this.clyde.avatar[0]
          var sourceY = this.clyde.avatar[1]
          var sourceWidth = this.clyde.avatar[2]
          var sourceHeight = this.clyde.avatar[3]
          var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
          var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
          var destX = this.clyde.pos[0] - App.Blocks.BLOCK_DIM[0];
          var destY = this.clyde.pos[1] - App.Blocks.BLOCK_DIM[1];
          this.mgtx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
            
          
        }.bind(this), 1000/4
      );
      

  }



  Initializer.prototype.animateMenu = function(){
    this.menuAnimationId = setInterval(
      function(){
        this.mptx.clearRect(-120, 0, 1000, 1000);
        if(!this.reversePacmanAnimation) {
          this.pacman.pos[0] += 2;
          this.pacman.avatar = this.pacman.spriteSources.pacmanRight[this.pacman.animationCycle % 4];
          if(this.pacman.pos[0] > 542) {
            this.reversePacmanAnimation = true;
          };
        } else {
          this.pacman.pos[0] -= 2;
          this.pacman.avatar = this.pacman.spriteSources.pacmanLeft[this.pacman.animationCycle % 4];
          if(this.pacman.pos[0] < -50) {
            this.reversePacmanAnimation = false;
          };
        }
        
        var sourceX = this.pacman.avatar[0]
        var sourceY = this.pacman.avatar[1]
        var sourceWidth = this.pacman.avatar[2]
        var sourceHeight = this.pacman.avatar[3]
        var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
        var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
        var destX = this.pacman.pos[0] - App.Blocks.BLOCK_DIM[0];
        var destY = this.pacman.pos[1] - App.Blocks.BLOCK_DIM[1];
        this.mptx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

        
        if(!this.reverseBlinkyAnimation) {
          this.blinky.pos[0] += 2;
          this.blinky.avatar = this.blinky.spriteSources.blinkyRight[this.blinky.animationCycle % 2];
          if(this.blinky.pos[0] > 492) {
            this.reverseBlinkyAnimation = true;
          };
        } else {
          this.blinky.pos[0] -= 2;
          this.blinky.avatar = this.blinky.spriteSources.fleeing[this.blinky.animationCycle % 2];
          if(this.blinky.pos[0] < -100) {
            this.reverseBlinkyAnimation = false;
          };
        }
        
        var sourceX = this.blinky.avatar[0]
        var sourceY = this.blinky.avatar[1]
        var sourceWidth = this.blinky.avatar[2]
        var sourceHeight = this.blinky.avatar[3]
        var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
        var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
        var destX = this.blinky.pos[0] - App.Blocks.BLOCK_DIM[0];
        var destY = this.blinky.pos[1] - App.Blocks.BLOCK_DIM[1];
        this.mptx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
      }.bind(this), 1000/60
    );

    this.MovingObjectsAnimationId = setInterval(
      function(){
        this.pacman.animationCycle += 1;
        this.blinky.animationCycle += 1;
      }.bind(this), 1000/8
    );
  }


  Initializer.prototype.removeAnimations = function() {
    clearInterval(this.MovingObjectsAnimationId);
    clearInterval(this.menuAnimationId);
    clearInterval(this.menuOptionsAnimationId);
    this.reversePacmanAnimation = false;
    this.pacman.pos = this.pacman.startingPos.slice(0);
    this.reverseBlinkyAnimation = false;
    this.blinky.pos = this.blinky.startingPos.slice(0);
    this.mptx.clearRect(-120, 0, 1000, 1000);
    this.mgtx.clearRect(0, 0, 1000, 1000);
  }

  Initializer.prototype.initializeLevel = function(levelCounter) {
    this.currentLevel = this.levelArr[levelCounter];
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
    
    
  }

  Initializer.prototype.initializeGameDraw = function(){
    this.movingObjects = new App.MovingObjects.MovingObjects([200, 200], [0, 0], this.sprites, this.ptx, this.gtx, this.blinkytx, this.pinkytx, this.inkytx, this.clydetx);
    this.stationaryObjects = new App.StationaryObjects.StationaryObjects([0, 0], this.sprites, this.dotstx, this.stx);
    this.board = new App.Boards.Board(App.Levels[this.currentLevel], this.ctx, this.gtx, this.ptx, this.blinkytx, this.pinkytx, this.inkytx, this.clydetx, this.dotstx, this.stx, this.sprites);
    this.game = new App.Game(this.board, this.movingObjects, this.stationaryObjects);
    this.gameView  = new App.GameView(this.game, this.ctx)
    this.gameView.start();
  }

  Initializer.prototype.startNewGame = function(){
    this.removeAnimations();
    this.levelCounter = 0;
    $('.start-screen-options').fadeTo(500, 0, function(){
      $('.start-screen-options').hide();
      $('.canvas').fadeTo(0, 1)
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));

  }

  Initializer.prototype.startNextLevel = function(){
    $('.in-game-options-to-menu').hide();
    $('.canvas').fadeTo(250, 0, function(){
      this.board.clearBoard();
    }.bind(this))
    this.levelCounter += 1;
    $('.canvas').fadeTo(0, 1, function(){
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));
  }

  Initializer.prototype.triggerWin = function(){
    $('.in-game-options-to-menu').hide();
    $('.canvas').fadeTo(300, 0.3, function(){
      $('.in-game-options-win').show();
    }.bind(this))
  }

  Initializer.prototype.bindEvents = function(){
    $('#to-restart').bind('click', this.restart.bind(this));
    $('.in-game-options-loss #to-menu').bind('click', this.toMenu.bind(this));
    $('.in-game-options-win #to-menu').bind('click', this.toMenu.bind(this));
    $('#menu-banner span').bind('mouseenter', this.animateBanner.bind(this));
    $('#to-play').bind('click', this.startNewGame.bind(this));
    $('#to-play').bind('mouseenter', this.animatePlayGameOption.bind(this));
    $('#to-play').bind('mouseleave', this.removePlayGameOptionAnimation.bind(this));
    $('#to-levels').bind('mouseenter', this.animateLevelsOption.bind(this));
    $('#to-levels').bind('mouseleave', this.removeLevelsOptionAnimation.bind(this));
    $('#to-levels').bind('click', this.toLevels.bind(this));
    $('#levels-to-menu').bind('click', this.levelsToMenu.bind(this));
    $('#to-about').bind('mouseenter', this.animateAboutOption.bind(this));
    $('#to-about').bind('mouseleave', this.removeAboutOptionAnimation.bind(this));
    $('#to-about').bind('click', this.toAbout.bind(this));
    $('#about-to-menu').bind('click', this.aboutToMenu.bind(this));
    $('#level-one').bind('click', this.toLevelOne.bind(this));
    $('#level-two').bind('click', this.toLevelTwo.bind(this));
    $('#level-three').bind('click', this.toLevelThree.bind(this));
    $('#level-four').bind('click', this.toLevelFour.bind(this));
    $('#level-five').bind('click', this.toLevelFive.bind(this));
    $('.in-game-options-to-menu #to-menu').bind('click', this.toMenu.bind(this));
  }

  Initializer.prototype.toLevelOne = function(){
    this.levelCounter = 0;
    this.removeAnimations();
    $('.levels').fadeTo(500, 0, function(){
      $('.levels').hide();
      $('.canvas').fadeTo(0, 1)
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));
  };

  Initializer.prototype.toLevelTwo = function(){
    this.levelCounter = 1;
    this.removeAnimations();
    $('.levels').fadeTo(500, 0, function(){
      $('.levels').hide();
      $('.canvas').fadeTo(0, 1)
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));
  };

  Initializer.prototype.toLevelThree = function(){
    this.levelCounter = 2;
    this.removeAnimations();
    $('.levels').fadeTo(500, 0, function(){
      $('.levels').hide();
      $('.canvas').fadeTo(0, 1)
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));
  };

  Initializer.prototype.toLevelFour = function(){
    this.levelCounter = 3;
    this.removeAnimations();
    $('.levels').fadeTo(500, 0, function(){
      $('.levels').hide();
      $('.canvas').fadeTo(0, 1)
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));
  };

  Initializer.prototype.toLevelFive = function(){
    this.levelCounter = 4;
    this.removeAnimations();
    $('.levels').fadeTo(500, 0, function(){
      $('.levels').hide();
      $('.canvas').fadeTo(0, 1)
      this.initializeLevel(this.levelCounter);
      this.initializeGameDraw();
      $('.in-game-options-to-menu').fadeTo(500, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    }.bind(this));
  };

  Initializer.prototype.toMenu = function(){
    if(this.gameView && (this.gameView.timerId || this.gameView.animationId)) {
      clearInterval(this.gameView.timerId);
      clearInterval(this.gameView.animationId);
    }
    this.board.clearBoard();
    this.pacmanLifeCounter = 3;
    this.pacmanScoreCounter = 0;
    $('.in-game-options-loss').hide();
    $('.in-game-options-win').hide();
    $('.in-game-options-to-menu').hide();
    $('.start-screen-options').show();
    $('.start-screen-options').fadeTo(100, 1, function(){
      this.animateMenu();
      this.animateMenuOptions();
    }.bind(this))
  }

  Initializer.prototype.toAbout = function(){
    this.removeAnimations();
    $('.start-screen-options').fadeTo(300, 0, function(){
      $('.start-screen-options').hide();
      $('.about').show();
    }.bind(this));
  }

  Initializer.prototype.toLevels = function(){
    this.removeAnimations();
    $('.start-screen-options').fadeTo(300, 0, function(){
      $('.start-screen-options').hide();
      $('.levels').show();
      $('.levels').fadeTo(300, 1);
    }.bind(this));
  }

  Initializer.prototype.levelsToMenu = function(){
    $('.levels').hide();
    $('.start-screen-options').show();
    $('.start-screen-options').fadeTo(100, 1, function(){
      this.animateMenu();
      this.animateMenuOptions();
    }.bind(this))
  }

  Initializer.prototype.aboutToMenu = function(){
    $('.about').hide();
    $('.start-screen-options').show();
    $('.start-screen-options').fadeTo(100, 1, function(){
      this.animateMenu();
      this.animateMenuOptions();
    }.bind(this))
  }

  Initializer.prototype.restart = function(){
    $('.in-game-options-loss').hide();
    this.board.clearBoard();
    this.pacmanLifeCounter = 3;
    this.pacmanScoreCounter = 0;
    this.initializeGameDraw();
    $('.canvas').fadeTo(100, 1, function(){
      $('.in-game-options-to-menu').fadeTo(300, 1, function(){
        $('.in-game-options-to-menu').show();
        this.beginningSound.play();
      }.bind(this))
    })
  }

  Initializer.prototype.animateBanner = function() {
    $('#menu-banner span:nth-child(2)').animate({
      top: '20%',
      content: 'O'
    }, 200, this.reverseBannerAnimation).bind(this);

  }

  Initializer.prototype.animatePlayGameOption = function() {
      this.playGameOptionAnimationId = setInterval(
      function() {
        this.clyde.animationCycle += 1;
          
      }.bind(this), 1000/4
    )
  }

  Initializer.prototype.removePlayGameOptionAnimation = function(){
    clearInterval(this.playGameOptionAnimationId);
  }

  Initializer.prototype.animateLevelsOption = function() {
      this.levelsOptionAnimationId = setInterval(
      function() {
        this.pinky.animationCycle += 1;
          
      }.bind(this), 1000/4
    )
  }

  Initializer.prototype.removeLevelsOptionAnimation = function(){
    clearInterval(this.levelsOptionAnimationId);
  }

  Initializer.prototype.animateAboutOption = function() {
      this.aboutOptionAnimationId = setInterval(
      function() {
        this.inky.animationCycle += 1;
          
      }.bind(this), 1000/4
    )
  }

  Initializer.prototype.removeAboutOptionAnimation = function(){
    clearInterval(this.aboutOptionAnimationId);
  }

  Initializer.prototype.reverseBannerAnimation= function() {
    $('#menu-banner span:nth-child(2)').animate({
      top: '30%'
    }, 300)
  }


})();