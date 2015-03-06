(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Util = App.Util = {};

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
   function Surrogate () { this.constructor = ChildClass };
   Surrogate.prototype = BaseClass.prototype;
   ChildClass.prototype = new Surrogate();
 };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

})();
