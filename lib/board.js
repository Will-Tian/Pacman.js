(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Boards = window.App.Boards = {};
  Boards.Blocks = [];
  Boards.Intersections = {};
  Boards.IntersectionArr = [];
  Boards.CageNodes = {};
  Boards.CageCorridor = {};
  Boards.WallCollisions = {};
  Boards.levelDim = [];
  Boards.GhostRespawn = [];
  Boards.Nodes = {};


  var Board = Boards.Board = function(grid, ctx, gtx, ptx, blinkytx, pinkytx, inkytx, clydetx, dotstx, stx, sprites){
    this.grid = grid;
    this.ctx = ctx;
    this.gtx = gtx;
    this.ptx = ptx;
    this.blinkytx = blinkytx;
    this.pinkytx = pinkytx;
    this.inkytx = inkytx;
    this.clydetx = clydetx;
    this.dotstx = dotstx;
    this.stx = stx
    this.sprites = sprites;
    this.colorPalate = ['#6495ED', '#7FDBFF', '#0074D9', '#3D9970', '#01FF70', '#B22222', '#85144b', '#F012BE', '#B10DC9', '#4682B4', '#5F9EA0', '#6A5ACD', '#4169E1', '#20B2AA', '#2E8B57', '#3CB371']
    this.ctx.strokeStyle = this.colorPalate[Math.floor(Math.random()*this.colorPalate.length)];
    this.determineDim();
  }

  var BLOCK_DIM = App.Blocks.BLOCK_DIM

  Board.prototype.clearBoard = function() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.gtx.clearRect(0, 0, 1000, 1000);
    this.ptx.clearRect(0, 0, 1000, 1000);
    this.blinkytx.clearRect(0, 0, 1000, 1000);
    this.pinkytx.clearRect(0, 0, 1000, 1000);
    this.inkytx.clearRect(0, 0, 1000, 1000);
    this.clydetx.clearRect(0, 0, 1000, 1000);
    this.dotstx.clearRect(0, 0, 1000, 1000);
    this.stx.clearRect(0, 0, 1000, 1000);
    Boards.Blocks = [];
    Boards.Intersections = {};
    Boards.IntersectionArr = [];
    Boards.CageNodes = {};
    Boards.CageCorridor = {};
    Boards.WallCollisions = {};
    Boards.levelDim = [];
    Boards.GhostRespawn = [];
    Boards.Nodes = {};
    App.StationaryObjects.Objects = {};
    App.MovingObjects.Objects = {};
  }

  Board.prototype.drawGrid = function() {
    this.gtx.globalAlpha = 1;
    this.gtx.strokeStyle = 'grey'
    var dx = BLOCK_DIM[0];
    var dy = BLOCK_DIM[1];
    for(x=0;x<=this.grid[0].length;x++) {
      startDrawPosX = $('#grid-layer').position().left + x*dx;
      startDrawPosY = $('#grid-layer').position().top;
      endDrawPosY = startDrawPosY + this.grid.length*dy;
      this.gtx.setLineDash([2, 3])
      this.gtx.moveTo(startDrawPosX, startDrawPosY);
      this.gtx.lineTo(startDrawPosX, endDrawPosY);
    }

    for(y=0;y<=this.grid.length;y++) {
      startDrawPosX = $('#grid-layer').position().left;
      startDrawPosY = $('#grid-layer').position().top + y*dy;
      endDrawPosX = startDrawPosX + this.grid[0].length*dx;
      this.gtx.setLineDash([2, 3])
      this.gtx.moveTo(startDrawPosX, startDrawPosY);
      this.gtx.lineTo(endDrawPosX, startDrawPosY);
    }
    this.gtx.stroke();
  }

  Board.prototype.initializeScoreBoard = function() {
    var posX = $('#score-layer').position().left;
    var posY = $('#score-layer').position().top;
    var scoreBoard = new App.StationaryObjects.ScoreBoard([posX, posY], this.sprites, this.dotstx, this.stx);
    App.StationaryObjects.Objects['scoreBoard'] = scoreBoard;
  }

  Board.prototype.addWallCollision = function(x, y) {
    var CollisionPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
    var CollisionPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
    var collisionPos = [CollisionPosX, CollisionPosY];
    collisionPos = JSON.stringify(collisionPos);
    Boards.WallCollisions["" + collisionPos] = 1;
  }

  Board.prototype.isEmptySpaceObject = function(value) {
    if(value === 0) {
      return true;
    } else if(value === "P") {
      return true;
    } else if(value === "I") {
      return true;
    } else if(value === "N") {
      return true;
    } else if(value === 97) {
      return true;
    } else if(value === 96) {
      return true;
    }
  }

  Board.prototype.addIntersection = function(posX, posY) {
    var intersectionPos = [posX, posY];
    Boards.Intersections["" + JSON.stringify(intersectionPos)] = 1;
    Boards.IntersectionArr.push(intersectionPos);
  }

  Board.prototype.isIntersection = function(x, y) {
    return (this.isEmptySpaceObject(this.grid[y + 1][x]) || this.isEmptySpaceObject(this.grid[y-1][x])) && (this.isEmptySpaceObject(this.grid[y][x + 1]) || this.isEmptySpaceObject(this.grid[y][x -1]))
  }

  Board.prototype.isWithinCage = function(x, y) {
    return (this.grid[y + 1][x] === 99 || this.grid[y - 1][x] === 99 || this.grid[y][x + 1] === 99 || this.grid[y][x - 1] === 99);
  }

  Board.prototype.isCageObject = function(value) {
    if(value === "E") {
      return true;
    } else if(value === "C") {
      return true;
    } else if(value === "B") {
      return true;
    }

  }

  Board.prototype.determineDim = function(){
    var startingX = $('#level-layer').position().left;
    var startingY = $('#level-layer').position().top;
    var dimX = this.grid[0].length;
    var dimY = this.grid.length;
    Boards.levelDim.push([startingX, startingX + dimX * App.Blocks.BLOCK_DIM[0]]);
    Boards.levelDim.push([startingY, startingY + dimY * App.Blocks.BLOCK_DIM[1]]);
  }

  Board.prototype.initializeWalls = function(x, y) {

        if(this.grid[y][x] === 1) {
          var block = new App.Blocks.LeftVerticalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -1) {
          var block = new App.Blocks.RightVerticalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 2) {
          var block = new App.Blocks.UpperHorizontalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -2) {
          var block = new App.Blocks.LowerHorizontalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 3) {
          var block = new App.Blocks.UpperLeftConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -3) {
          var block = new App.Blocks.LowerLeftConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 4) {
          var block = new App.Blocks.UpperRightConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -4) {
          var block = new App.Blocks.LowerRightConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 5) {
          var block = new App.Blocks.UpperLeftCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -5) {
          var block = new App.Blocks.LowerLeftCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 6) {
          var block = new App.Blocks.UpperRightCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -6) {
          var block = new App.Blocks.LowerRightCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 7) {
          var block = new App.Blocks.UpperLeftCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -7) {
          var block = new App.Blocks.LowerLeftCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }


        if(this.grid[y][x] === 8) {
          var block = new App.Blocks.UpperRightCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === -8) {
          var block = new App.Blocks.LowerRightCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 9) {
          var block = new App.Blocks.HorizontalOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 10) {
          var block = new App.Blocks.VerticalOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 11) {
          var block = new App.Blocks.LeftUpperConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 12) {
          var block = new App.Blocks.LeftLowerConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 13) {
          var block = new App.Blocks.RightUpperConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

        if(this.grid[y][x] === 14) {
          var block = new App.Blocks.RightLowerConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
          this.addWallCollision(x, y);
        }

  }

  Board.prototype.initializeDots = function(x, y) {
    //add SmallDots
    if(this.grid[y][x] === 0){
      var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
      var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
      var dot = new App.StationaryObjects.SmallDot([posX, posY], this.sprites, this.dotstx);
      App.StationaryObjects.Objects[[posX, posY]] = dot;
    }

    //add LargeDots
    if(this.grid[y][x] === 96){
      var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
      var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
      var dot = new App.StationaryObjects.LargeDot([posX, posY], this.sprites, this.dotstx);
      App.StationaryObjects.Objects[[posX, posY]] = dot;
    } 
  }

  Board.prototype.initializeNodes = function(x, y) {
    if(this.isEmptySpaceObject(this.grid[y][x])) {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var node = new App.Util.Node([posX, posY]);
          Boards.Nodes['' + JSON.stringify([posX, posY])] = node;
          if(this.isEmptySpaceObject(this.grid[y][x + 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }
          if(this.isEmptySpaceObject(this.grid[y][x - 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x - 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isEmptySpaceObject(this.grid[y + 1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + (y + 1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isEmptySpaceObject(this.grid[y - 1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + (y - 1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isCageObject(this.grid[y][x + 1])) {
             var neighborPosX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0];
             var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
             var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
             

             var interNodeX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
             var interNodeY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
             var interNode = new App.Util.Node([interNodeX, interNodeY]);
             interNode.addNeighbor(neighborNode);
             interNode.addNeighbor(node);
             node.addNeighbor(interNode);
             Boards.Nodes['' + JSON.stringify([interNodeX, interNodeY])] = interNode;
  
          }

          if(this.isCageObject(this.grid[y][x - 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x - 2) * BLOCK_DIM[0] + BLOCK_DIM[0];
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            

            var interNodeX = $('#level-layer').position().left + 1 + (x - 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var interNodeY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var interNode = new App.Util.Node([interNodeX, interNodeY]);
            interNode.addNeighbor(neighborNode);
            interNode.addNeighbor(node);
            node.addNeighbor(interNode);
            Boards.Nodes['' + JSON.stringify([interNodeX, interNodeY])] = interNode;

          }
          // Add Intersections
          if(this.isIntersection(x, y)) {
            var intersectionPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var intersectionPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            this.addIntersection(intersectionPosX, intersectionPosY);
          }

        }
  };

  Board.prototype.initializeCage = function(x, y) {
     if(this.isCageObject(this.grid[y][x]) && !this.isCageObject(this.grid[y][x-1])) {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var node = new App.Util.Node([posX, posY]);
          Boards.Nodes['' + JSON.stringify([posX, posY])] = node;
          if(this.isEmptySpaceObject(this.grid[y][x + 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }
          if(this.isEmptySpaceObject(this.grid[y][x - 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x - 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            var interNodeX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var interNodeY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var interNode = new App.Util.Node([interNodeX, interNodeY]);
            node.addNeighbor(interNode);
          }

          if(this.isEmptySpaceObject(this.grid[y + 1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + (y + 1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isEmptySpaceObject(this.grid[y - 1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + (y - 1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isCageObject(this.grid[y][x +1])) {
            if(this.isEmptySpaceObject(this.grid[y][x + 2])) {
              var neighborPosX = $('#level-layer').position().left + 1 + (x + 2) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
              var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
              var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);

              var interNodeX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
              var interNodeY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
              var interNode = new App.Util.Node([interNodeX, interNodeY]);
              node.addNeighbor(interNode);
            }
          }

          if(this.isCageObject(this.grid[y-1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
            var neighborPosY = $('#level-layer').position().top + 1 + (y -1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isCageObject(this.grid[y+1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
            var neighborPosY = $('#level-layer').position().top + 1 + (y + 1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }
          var IntersectionPos = JSON.stringify([posX, posY]);
          Boards.CageNodes["" + IntersectionPos] = 1;          
        }

        if(this.isCageObject(this.grid[y][x])) {
          //map corridor coordinates
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          Boards.CageCorridor['' + JSON.stringify([posX, posY])] = 1;
        }
  };

  Board.prototype.initializeMovingObjects = function(x, y) {
     if(this.grid[y][x] === "P") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var pacman = new App.MovingObjects.Pacman([posX, posY], [0, 0], this.sprites, [posX, posY], this.ptx, this.gtx, this.dotstx);
          App.MovingObjects.Objects.pacman = pacman;
        }

        if(this.grid[y][x] === "B") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var blinky = new App.MovingObjects.Blinky([posX, posY], [0, 0], this.sprites, [posX, posY], {blinkytx: this.blinkytx, board: this});
          App.MovingObjects.Objects.blinky = blinky;
        }

        if(this.grid[y][x] === "E") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var pinky = new App.MovingObjects.Pinky([posX, posY], [0, 0], this.sprites, [posX, posY], {pinkytx: this.pinkytx, board: this});
          App.MovingObjects.Objects.pinky = pinky;
          App.Boards.ghostRespawn = [posX, posY]
        }

        if(this.grid[y][x] === "I") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var inky = new App.MovingObjects.Inky([posX, posY], [0, 0], this.sprites, [posX, posY], {inkytx: this.inkytx, board: this.board});
          App.MovingObjects.Objects.inky = inky;
          var node = new App.Util.Node([posX, posY]);
          Boards.Nodes['' + JSON.stringify([posX, posY])] = node;
          var neighborPosX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
          var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
          node.addNeighbor(neighborNode);
          App.Boards.CageNodes['' + JSON.stringify([neighborPosX, neighborPosY])] = 1;
          App.Boards.CageNodes['' + JSON.stringify([posX, posY])] = 1;
        }

        if(this.grid[y][x] === "N") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var clyde = new App.MovingObjects.Clyde([posX, posY], [0, 0], this.sprites, [posX, posY], {clydetx: this.clydetx, board: this.board});
          App.MovingObjects.Objects.clyde = clyde;
          var node = new App.Util.Node([posX, posY]);
          Boards.Nodes['' + JSON.stringify([posX, posY])] = node;
          var neighborPosX = $('#level-layer').position().left + 1 + (x - 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
          var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
          node.addNeighbor(neighborNode);
          App.Boards.CageNodes['' + JSON.stringify([neighborPosX, neighborPosY])] = 1;
          App.Boards.CageNodes['' + JSON.stringify([posX, posY])] = 1;
        }
  };

  Board.prototype.initialize = function() {
    this.initializeScoreBoard();

    for(var y=0;y<this.grid.length;y++) {
      for(var x=0;x<this.grid[0].length;x++){
        this.initializeWalls(x, y);
        this.initializeDots(x, y);
        this.initializeNodes(x, y);
        this.initializeCage(x, y);
        this.initializeMovingObjects(x, y);

      }
    }


    Boards.Blocks.forEach(function(block){block.draw()});


  }


})();
