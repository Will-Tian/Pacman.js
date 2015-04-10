(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Blocks = window.App.Blocks = {};

  var BLOCK_DIM = Blocks.BLOCK_DIM = [20, 20];

  var Block = Blocks.Block = function Block(pos, ctx, color) {
    this.ctx = ctx;
    this.ctx.lineWidth = 3
    this.width = BLOCK_DIM[0];
    this.height = BLOCK_DIM[1];
    this.posX = $('canvas').position().left + 1 + pos[0] * this.width;
    this.posY = $('canvas').position().top + 1 + pos[1] * this.height;
  }

  var UpperLeftCornerTwo = Blocks.UpperLeftCornerTwo = function UpperLeftCornerTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperLeftCornerTwo, Block);

  UpperLeftCornerTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width, 1.5*Math.PI, 1*Math.PI, true);
    this.ctx.moveTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width/2, 1.5*Math.PI, 1*Math.PI, true);
    this.ctx.stroke();
  }

  var UpperRightCornerTwo = Blocks.UpperRightCornerTwo = function UpperRightCornerTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperRightCornerTwo, Block);

  UpperRightCornerTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY + this.height, this.width, 1.5*Math.PI, 0);
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.arc(this.posX, this.posY + this.height, this.width/2, 1.5*Math.PI, 0);
    this.ctx.stroke();
  }

  var LowerLeftCornerTwo = Blocks.LowerLeftCornerTwo = function LowerLeftCornerTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerLeftCornerTwo, Block);

  LowerLeftCornerTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.posX + this.width, this.posY, this.width, 1*Math.PI, .5*Math.PI, true);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.arc(this.posX + this.width, this.posY, this.width/2, 1*Math.PI, .5*Math.PI, true);
    this.ctx.stroke();
  }

  var LowerRightCornerTwo = Blocks.LowerRightCornerTwo = function LowerRightCornerTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerRightCornerTwo, Block);

  LowerRightCornerTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.width, 0, .5*Math.PI);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.arc(this.posX, this.posY, this.width/2, 0, .5*Math.PI);
    this.ctx.stroke();
  }

  var UpperHorizontalTwo = Blocks.UpperHorizontalTwo = function UpperHorizontalTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperHorizontalTwo, Block);

  UpperHorizontalTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY);
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.stroke();
  }

  var LowerHorizontalTwo = Blocks.LowerHorizontalTwo = function LowerHorizontalTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerHorizontalTwo, Block);

  LowerHorizontalTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.stroke();
  }

  var LeftVerticalTwo = Blocks.LeftVerticalTwo = function LeftVerticalTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LeftVerticalTwo, Block);

  LeftVerticalTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.lineTo(this.posX + this.width/2, this.posY + this.height);
    this.ctx.stroke();
  }

  var RightVerticalTwo = Blocks.RightVerticalTwo = function RightVerticalTwo(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(RightVerticalTwo, Block);

  RightVerticalTwo.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.lineTo(this.posX + this.width/2, this.posY + this.height);
    this.ctx.stroke();
  }

  var UpperLeftConnector = Blocks.UpperLeftConnector = function UpperLeftConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperLeftConnector, Block);

  UpperLeftConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY);
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.arc(this.posX, this.posY + this.height, this.width/2, 1.5*Math.PI, 0);
    this.ctx.stroke();
  }

  var UpperRightConnector = Blocks.UpperRightConnector = function UpperRightConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperRightConnector, Block);

  UpperRightConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY);
    this.ctx.moveTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width/2, 1.5*Math.PI, 1*Math.PI, true);
    this.ctx.stroke();
  }

  var LowerLeftConnector = Blocks.LowerLeftConnector = function LowerLeftConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerLeftConnector, Block);

  LowerLeftConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.arc(this.posX, this.posY, this.width/2, 0, .5*Math.PI);
    this.ctx.stroke();
  }

  var LowerRightConnector = Blocks.LowerRightConnector = function LowerRightConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerRightConnector, Block);

  LowerRightConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.arc(this.posX + this.width, this.posY, this.width/2, .5*Math.PI, 1*Math.PI);
    this.ctx.stroke();
  }

  var LeftUpperConnector = Blocks.LeftUpperConnector = function LeftUpperConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LeftUpperConnector, Block);

  LeftUpperConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.arc(this.posX + this.width, this.posY, this.width/2, 1*Math.PI, .5*Math.PI, true);
    this.ctx.stroke();
  }

  var LeftLowerConnector = Blocks.LeftLowerConnector = function LeftLowerConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LeftLowerConnector, Block);

  LeftLowerConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width/2, this.posY + this.height);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width/2, 1*Math.PI, 1.5*Math.PI);
    this.ctx.stroke();
  }

  var RightUpperConnector = Blocks.RightUpperConnector = function RightUpperConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(RightUpperConnector, Block);

  RightUpperConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.arc(this.posX, this.posY, this.width/2, 0, .5*Math.PI);
    this.ctx.stroke();
  }

  var RightLowerConnector = Blocks.RightLowerConnector = function RightLowerConnector(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(RightLowerConnector, Block);

  RightLowerConnector.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.arc(this.posX, this.posY + this.height, this.width/2, 1.5*Math.PI, 0);
    this.ctx.stroke();
  }

  var UpperLeftCornerOne = Blocks.UpperLeftCornerOne = function UpperLeftCornerOne(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperLeftCornerOne, Block);

  UpperLeftCornerOne.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width/2, this.posY + this.height);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width/2, 1*Math.PI, 1.5*Math.PI);
    this.ctx.stroke();
  }

  var UpperRightCornerOne = Blocks.UpperRightCornerOne = function UpperRightCornerOne(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(UpperRightCornerOne, Block);

  UpperRightCornerOne.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.arc(this.posX, this.posY + this.height, this.width/2, 1.5*Math.PI, 0);
    this.ctx.stroke();
  }

  var LowerLeftCornerOne = Blocks.LowerLeftCornerOne = function LowerLeftCornerOne(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerLeftCornerOne, Block);

  LowerLeftCornerOne.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.arc(this.posX + this.width, this.posY, this.width/2, .5*Math.PI, 1*Math.PI);
    this.ctx.stroke();
  }

  var LowerRightCornerOne = Blocks.LowerRightCornerOne = function LowerRightCornerOne(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(LowerRightCornerOne, Block);

  LowerRightCornerOne.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.arc(this.posX, this.posY, this.width/2, 0, .5*Math.PI);
    this.ctx.stroke();
  }

  var HorizontalOne = Blocks.HorizontalOne = function HorizontalOne(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(HorizontalOne, Block);

  HorizontalOne.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height/2);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height/2);
    this.ctx.stroke();
  }

  var VerticalOne = Blocks.VerticalOne = function VerticalOne(options) {
    Block.call(this, options.pos, options.ctx);
  }

  App.Util.inherits(VerticalOne, Block);

  VerticalOne.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width/2, this.posY);
    this.ctx.lineTo(this.posX + this.width/2, this.posY + this.height);
    this.ctx.stroke();
  }

})();
