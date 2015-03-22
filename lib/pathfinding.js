(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var PathFinding = window.App.PathFinding = {}
 
  PathFinding.aStarSearch = function(node, start, destination) {
  	// var frontier = new App.Util.BinaryHeap(function(currentNode){
  	// 	return App.Util.heuristic(start, destination, currentNode)
  	// })
  	
  	var frontier = new App.Util.Queue()
  	frontier.enqueue(node);
  	
  	var cameFrom = {};
  	cameFrom[start] = "None";
  	while(!frontier.isEmpty()) {
  		var current = frontier.dequeue();
  		if(current.pos.equals(destination)) {
  			break;
  		} 

  		current.neighbors.forEach(function(neighbor){
  			if(!cameFrom['' + JSON.stringify(neighbor.pos)]) {
  				var neighborPos = neighbor.pos;
  				var newNode = App.Boards.Nodes['' + JSON.stringify(neighborPos)] 
  				frontier.enqueue(newNode);
  				cameFrom[JSON.stringify(neighbor.pos)] = current; 
  			}
  			
  		})
  	}

  	return cameFrom;
  }

  PathFinding.reconstructPath = function(cameFrom, start, destination) {
  	var current = destination
  	var path = [current]
  	while(!current.equals(start)) {
  		current = JSON.stringify(current)
  		current = cameFrom['' + current].pos;
  		path.push(current)
  	}
  	return path;
  }

})();
