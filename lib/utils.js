(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Util = App.Util = {};

  Util.inherits = function (ChildClass, BaseClass) {
   function Surrogate () { this.constructor = ChildClass };
   Surrogate.prototype = BaseClass.prototype;
   ChildClass.prototype = new Surrogate();
 };

 Array.prototype.equals = function(arr) {
 	if(this[0] === arr[0] && this[1] === arr[1]) {
 		return true;
 	} else {
 		return false;
 	}
 }

 var manhattan = Util.manhattan = function (start, dest) {
 	var dx = Math.abs(start[0] - dest[0]);
 	var dy = Math.abs(start[1] - dest[1]);
 	return dx + dy;
 }

 var heuristic = Util.heuristic = function (start, dest, node) {
 	var accruedCost = manhattan(start, node.pos);
 	var futureCost = manhattan(node.pos, dest);
 	return accruedCost + futureCost;
 }

 var BinaryHeap = Util.BinaryHeap = function(priorityFunction) {
 	this.nodes = [];
 	this.priorityFunction = priorityFunction;
 }

 BinaryHeap.prototype.push = function(node) {
 	this.nodes.push(node);
 	this.heapifyUp(this.nodes.length - 1);
 }

 BinaryHeap.prototype.pop = function(){
 	var result = this.nodes[0];
 	var end = this.nodes.pop();
 	if(this.nodes.length>0) {
 		this.nodes[0] = end;
 		this.heapifyDown(0);
 	}
 	return result;
 }

 BinaryHeap.prototype.heapifyUp = function(n) {
 	var node = this.nodes[n], priority = this.priorityFunction(node);
 	while(n > 0) {
 		var parentIndex = Math.floor((n + 1) / 2) - 1;
 		var parent = this.nodes[parentIndex];
 		if(priority >= this.priorityFunction(parent)) {
 			break;
 		}
 		this.nodes[parentIndex] = node;
 		this.nodes[n] = parent;
 		n = parentIndex;
 	}
 }

 BinaryHeap.prototype.heapifyDown = function(n) {
 	var length = this.nodes.length;
 	var node = this.nodes[n];
 	var priority = this.priorityFunction(node);
 	while(true) {
 		var childTwoIndex = (n + 1) * 2;
 		var childOneIndex = childTwoIndex - 1;
 		var swap = null;
 		if(childOneIndex < length) {
 			var childOne = this.nodes[childOneIndex];
 			var childOnePriority = this.priorityFunction(childOne);
 			if(childOnePriority < priority) {
 				swap = childOneIndex;
 			}
 		};
 		if(childTwoIndex < length) {
 			var childTwo = this.nodes[childTwoIndex];
 			var childTwoPriority = this.priorityFunction(childTwo);
 			if(childTwoPriority < (swap == null ? priority : childOnePriority)) {
 				swap = childTwoIndex;
 			}
 		}
 		if(swap == null) break; 
 		this.nodes[n] = this.nodes[swap];
 		this.nodes[swap] = node;
 		n = swap;
 	}
 }

 BinaryHeap.prototype.empty = function(){
 	if(this.nodes.length === 0) {
 		return true;
 	} else {
 		return false;
 	}
 }

 BinaryHeap.prototype.length = function(){
 	return this.nodes.length;
 }

 var Node = Util.Node = function(pos) {
 	this.neighbors = [];
 	this.pos = pos;
 }

 Node.prototype.addNeighbor = function(node) {
 	this.neighbors.push(node)
 }

 
Util.Queue = function Queue(){
	var a=[],b=0;
	this.getLength=function(){return a.length-b};
	this.isEmpty=function(){return 0==a.length};
	this.enqueue=function(b){a.push(b)};
	this.dequeue=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};
	this.peek=function(){return 0<a.length?a[b]:void 0}
};

})();
