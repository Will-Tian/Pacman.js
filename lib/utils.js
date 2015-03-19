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

 var manhattan = Util.manhattan = function (start, dest) {
 	var dx = Math.abs(start[0] - dest[0]);
 	var dy = Math.abs(start[1] - dest[1]);
 	return dx + dy;
 }

 var heuristic = Util.heuristic = function (start, dest, node) {
 	var accruedCost = manhattan(start, node);
 	var futureCost = manhattan(node, dest);
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
 		this.content[n] = parent;
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

})();
