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

})();
