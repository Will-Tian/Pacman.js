(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Boards = window.App.Boards = {};
  Boards.Blocks = [];
  Boards.Intersections = {};
  Boards.CageNodes = {};
  Boards.CageCorridor = {};
  Boards.WallCollisions = {};
  Boards.Nodes = {};


  var Board = Boards.Board = function(grid, ctx, gtx, ptx, pdtx, sprites){
    this.grid = grid;
    this.ctx = ctx;
    this.gtx = gtx;
    this.ptx = ptx;
    this.pdtx = pdtx;
    this.sprites = sprites;
  }

  var BLOCK_DIM = App.Blocks.BLOCK_DIM

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

  Board.prototype.addWallCollision = function(x, y) {
    var CollisionPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
    var CollisionPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
    var collisionPos = [CollisionPosX, CollisionPosY];
    collisionPos = JSON.stringify(collisionPos);
    Boards.WallCollisions["" + collisionPos] = 1;
  }

   Board.prototype.addIntersection = function(x, y) {
    var IntersectionPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
    var IntersectionPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
    var IntersectionPos = [IntersectionPosX, IntersectionPosY];
    IntersectionPos = JSON.stringify(IntersectionPos);
    Boards.Intersections["" + IntersectionPos] = 1;
  }

  Board.prototype.isIntersection = function(x, y) {
    return (this.grid[y + 1][x] === 0 || this.grid[y-1][x] === 0) && (this.grid[y][x + 1] === 0 || this.grid[y][x -1] === 0)
  }

  Board.prototype.isEmptySpaceObject = function(value) {
    if(value === 0) {
      return true;
    } else if(value === "P") {
      return true;
    } 
  }

  Board.prototype.isCageObject = function(value) {
    if(value === "E") {
      return true;
    } else if(value === "C") {
      return true;
    } else if(value === "I") {
      return true;
    } else if(value === "N") {
      return true;
    } else if(value === "B") {
      return true;
    }

  }

  Board.prototype.draw = function() {
    for(var y=0;y<this.grid.length;y++) {
      for(var x=0;x<this.grid[0].length;x++){
        var CollisionPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
        var CollisionPosY = $('#level-layer').position().left + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
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

        //add intersections and Nodes
        if(this.isEmptySpaceObject(this.grid[y][x])) {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var node = new App.Util.Node([posX, posY]);
          Boards.Nodes['' + JSON.stringify([posX, posY])] = node;
          // this.gtx.fillStyle = 'red'
          // this.gtx.fillRect(posX - BLOCK_DIM[0]/2, posY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1]);
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
             // interNode.neighbors.forEach(function(neighbor){
             //  this.gtx.fillStyle = "yellow";
             //  this.gtx.fillRect(neighbor.pos[0] - BLOCK_DIM[0]/2, neighbor.pos[1] - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
             // }.bind(this))
             //  this.gtx.fillStyle = "blue";
             //  this.gtx.fillRect(interNodeX - BLOCK_DIM[0]/2, interNodeY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
             //  this.gtx.fillStyle = 'red'
             //  this.gtx.fillRect(posX - BLOCK_DIM[0]/2, posY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1]);

              // this.gtx.fillStyle = "blue";
              // this.gtx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
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

            // interNode.neighbors.forEach(function(neighbor){
            //   this.gtx.fillStyle = "yellow";
            //   this.gtx.fillRect(neighbor.pos[0] - BLOCK_DIM[0]/2, neighbor.pos[1] - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            //  }.bind(this))
            //   this.gtx.fillStyle = "blue";
            //   this.gtx.fillRect(interNodeX - BLOCK_DIM[0]/2, interNodeY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            //   this.gtx.fillStyle = 'red'
            //   this.gtx.fillRect(posX - BLOCK_DIM[0]/2, posY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1]);
            
            // this.gtx.fillStyle = "blue";
            // this.gtx.fillRect(interNodeX - BLOCK_DIM[0]/2, interNodeY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            // this.gtx.fillStyle = "yellow";
            // this.gtx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
          }

          if(this.isIntersection(x, y)) {
            this.addIntersection(x, y);
            // uncomment below to draw intersection on debugging canvas
            // var intersectionPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0];
            // var intersectionPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1];
            // this.gtx.fillStyle = 'red'
            // this.gtx.fillRect(intersectionPosX, intersectionPosY, BLOCK_DIM[0], BLOCK_DIM[1]);
          }
        }
        
       
        if(this.isCageObject(this.grid[y][x])) {
          //map corridor coordinates
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          Boards.CageCorridor['' + JSON.stringify([posX, posY])] = 1;
        } 

        if(this.isCageObject(this.grid[y][x]) && !this.isCageObject(this.grid[y][x-1])) {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var node = new App.Util.Node([posX, posY]);
          Boards.Nodes['' + JSON.stringify([posX, posY])] = node;
          // this.gtx.fillStyle = 'blue'
          // this.gtx.fillRect(posX - BLOCK_DIM[0]/2, posY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1]);
          if(this.isEmptySpaceObject(this.grid[y][x + 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            // this.ctx.fillStyle = "green";
            // this.ctx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            node.addNeighbor(neighborNode);
          }
          if(this.isEmptySpaceObject(this.grid[y][x - 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x - 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var neighborPosY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            
            // node.addNeighbor(neighborNode);

            var interNodeX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
            var interNodeY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var interNode = new App.Util.Node([interNodeX, interNodeY]);
            // interNode.addNeighbor(neighborNode);
            // interNode.addNeighbor(node);
            node.addNeighbor(interNode);
            // Boards.Nodes['' + JSON.stringify([interNodeX, interNodeY])] = interNode;
            // this.ctx.fillStyle = "green";
            // this.ctx.fillRect(interNodeX - BLOCK_DIM[0]/2, interNodeY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            // this.gtx.fillStyle = 'red'
            // this.gtx.fillRect(posX - BLOCK_DIM[0]/2, posY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1]);
            // this.ctx.fillStyle = "yellow";
            // this.ctx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])

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
              // node.addNeighbor(neighborNode);

              var interNodeX = $('#level-layer').position().left + 1 + (x + 1) * BLOCK_DIM[0] + BLOCK_DIM[0]/2;
              var interNodeY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
              var interNode = new App.Util.Node([interNodeX, interNodeY]);
              // interNode.addNeighbor(neighborNode);
              // interNode.addNeighbor(node);
              node.addNeighbor(interNode);
              // Boards.Nodes['' + JSON.stringify([interNodeX, interNodeY])] = interNode;
              // this.ctx.fillStyle = "green";
              // this.ctx.fillRect(interNodeX - BLOCK_DIM[0]/2, interNodeY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
              // this.ctx.fillStyle = "green";
              // this.ctx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            }
          }

          if(this.isCageObject(this.grid[y-1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
            var neighborPosY = $('#level-layer').position().top + 1 + (y -1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
            // this.ctx.fillStyle = "green";
            // this.ctx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            
          }

          if(this.isCageObject(this.grid[y+1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
            var neighborPosY = $('#level-layer').position().top + 1 + (y + 1) * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
            var neighborNode =  new App.Util.Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
            // this.ctx.fillStyle = "green";
            // this.ctx.fillRect(neighborPosX - BLOCK_DIM[0]/2, neighborPosY - BLOCK_DIM[1]/2, BLOCK_DIM[0], BLOCK_DIM[1])
            
          }
          var IntersectionPos = JSON.stringify([posX, posY]);
          Boards.CageNodes["" + IntersectionPos] = 1;          
        }


        if(this.grid[y][x] === "P") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var pacman = new App.MovingObjects.Pacman({pos: [posX, posY], vel: [0, 0], sprites: this.sprites, ptx: this.ptx, gtx: this.gtx, pdtx: this.pdtx});
          App.MovingObjects.Objects.pacman = pacman;
        }

        if(this.grid[y][x] === "B") {
          var posX = $('#level-layer').position().left + 1 + x * BLOCK_DIM[0] + BLOCK_DIM[0];
          var posY = $('#level-layer').position().top + 1 + y * BLOCK_DIM[1] + BLOCK_DIM[1]/2;
          var blinky = new App.MovingObjects.Blinky({pos: [posX, posY], vel: [0, 0], sprites: this.sprites, ptx: this.ptx, gtx: this.gtx, pdtx: this.pdtx});
          App.MovingObjects.Objects.blinky = blinky;
        }

      }
    }
    Boards.Blocks.forEach(function(block){block.draw()});

  }


})();
