(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Boards = window.App.Boards = {};
  var Blocks = Boards.Blocks = [];

  App.levelOne = [
    [05, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 03, 04, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 06], 
    [01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [01, 00, 07, 09, 09, 08, 00, 07, 09, 09, 09, 08, 00, 10, 10, 00, 07, 09, 09, 09, 08, 00, 07, 09, 09, 08, 00, -1],
    [01, 00, 10, 00, 00, 10, 00, 10, 00, 00, 00, 10, 00, 10, 10, 00, 10, 00, 00, 00, 10, 00, 10, 00, 00, 10, 00, -1],
    [01, 00, -7, 09, 09, -8, 00, -7, 09, 09, 09, -8, 00, -7, -8, 00, -7, 09, 09, 09, -8, 00, -7, 09, 09, -8, 00, -1],
    [01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [01, 00, 07, 09, 09, 08, 00, 07, 08, 00, 07, 09, 09, 09, 09, 09, 09, 08, 00, 07, 08, 00, 07, 09, 09, 08, 00, -1],
    [01, 00, -7, 09, 09, -8, 00, 10, 10, 00, -7, 09, 09, 08, 07, 09, 09, -8, 00, 10, 10, 00, -7, 09, 09, -8, 00, -1],
    [01, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, -1],
    [-5, -2, -2, -2, -2, 08, 00, 10, -7, 09, 09, 08, 00, 10, 10, 00, 07, 09, 09, -8, 10, 00, 07, -2, -2, -2, -2, -6],
    [00, 00, 00, 00, 00, 01, 00, 10, 07, 09, 09, -8, 00, -7, -8, 00, -7, 09, 09, 08, 10, 00, -1, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 05, 02, 02, 00, 00, 02, 02, 06, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
    [02, 02, 02, 02, 02, -8, 00, -7, -8, 00, 01, 00, 00, 00, 00, 00, 00, -1, 00, -7, -8, 00, -7, 02, 02, 02, 02, 02],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 00, -1, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [-2, -2, -2, -2, -2, 08, 00, 07, 08, 00, 01, 00, 00, 00, 00, 00, 00, -1, 00, 07, 08, 00, 07, -2, -2, -2, -2, -2],
    [00, 00, 00, 00, 00, 01, 00, 10, 10, 00, -5, -2, -2, -2, -2, -2, -2, -6, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 07, 09, 09, 09, 09, 09, 09, 08, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
    [05, 02, 02, 02, 02, -8, 00, -7, -8, 00, -7, 09, 09, 08, 07, 09, 09, -8, 00, -7, -8, 00, -7, 02, 02, 02, 02, 06],
    [01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [01, 00, 07, 09, 09, 08, 00, 07, 09, 09, 09, 08, 00, 10, 10, 00, 07, 09, 09, 09, 08, 00, 07, 09, 09, 08, 00, -1],
    [01, 00, -7, 09, 08, 10, 00, -7, 09, 09, 09, -8, 00, -7, -8, 00, -7, 09, 09, 09, -8, 00, 10, 07, 09, -8, 00, -1],
    [01, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, -1],
    [11, 09, 08, 00, 10, 10, 00, 07, 08, 00, 07, 09, 09, 09, 09, 09, 09, 08, 00, 00, 00, 00, 10, 10, 00, 07, 09, 13],
    [12, 09, -8, 00, -7, -8, 00, 10, 10, 00, -7, 09, 09, 08, 07, 09, 09, -8, 00, 00, 00, 00, -7, -8, 00, -7, 09, 14],
    [01, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [01, 00, 00, 00, 00, 00, 00, -8, -7, 09, 09, 08, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [01, 00, 00, 00, 00, 00, 00, 00, 09, 09, 09, -8, 00, -7, -8, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
    [-5, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -6],
  ]

  var Board = Boards.Board = function(grid, ctx, gtx){
    this.grid = grid;
    this.ctx = ctx;
    this.gtx = gtx;
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

  Board.prototype.draw = function() {
    startDrawPosX = $('canvas').position().left;
    startDrawPosY = $('canvas').position().top;
    for(var y=0;y<this.grid.length;y++) {
      for(var x=0;x<this.grid[0].length;x++){

        if(this.grid[y][x] === 1) {
          var block = new App.Blocks.LeftVerticalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -1) {
          var block = new App.Blocks.RightVerticalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 2) {
          var block = new App.Blocks.UpperHorizontalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -2) {
          var block = new App.Blocks.LowerHorizontalTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 3) {
          var block = new App.Blocks.UpperLeftConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -3) {
          var block = new App.Blocks.LowerLeftConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 4) {
          var block = new App.Blocks.UpperRightConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -4) {
          var block = new App.Blocks.LowerRightConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 5) {
          var block = new App.Blocks.UpperLeftCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -5) {
          var block = new App.Blocks.LowerLeftCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 6) {
          var block = new App.Blocks.UpperRightCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -6) {
          var block = new App.Blocks.LowerRightCornerTwo({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 7) {
          var block = new App.Blocks.UpperLeftCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -7) {
          var block = new App.Blocks.LowerLeftCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }


        if(this.grid[y][x] === 8) {
          var block = new App.Blocks.UpperRightCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === -8) {
          var block = new App.Blocks.LowerRightCornerOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 9) {
          var block = new App.Blocks.HorizontalOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 10) {
          var block = new App.Blocks.VerticalOne({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 11) {
          var block = new App.Blocks.LeftUpperConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 12) {
          var block = new App.Blocks.LeftLowerConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 13) {
          var block = new App.Blocks.RightUpperConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

        if(this.grid[y][x] === 14) {
          var block = new App.Blocks.RightLowerConnector({pos: [x, y], ctx: this.ctx});
          Boards.Blocks.push(block);
        }

      }
    }
    // var block = new App.Blocks.UpperLeftCornerTwo({pos: [0, 0], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.UpperRightCornerTwo({pos: [19, 0], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.LowerLeftCornerTwo({pos: [0, 17], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.LowerRightCornerTwo({pos: [19, 17], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.UpperHorizontalTwo({pos: [1, 0], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.LowerHorizontalTwo({pos: [1, 17], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.LeftVerticalTwo({pos: [0, 16], ctx: this.ctx});
    // Boards.Blocks.push(block);
    // var block = new App.Blocks.RightVerticalTwo({pos: [19, 16], ctx: this.ctx});
    // Boards.Blocks.push(block);
    Boards.Blocks.forEach(function(block){block.draw()});
  }


})();
