(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  Levels = window.App.Levels = {};

	Levels.levelOne = [
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
	[00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 07, -2, -2, 00, 00, -2, -2, 08, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
	[02, 02, 02, 02, 02, -8, 00, -7, -8, 00, -1, 00, 00, 00, 00, 00, 00, 01, 00, -7, -8, 00, -7, 02, 02, 02, 02, 02],
	[00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1, 00, 00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
	[-2, -2, -2, -2, -2, 08, 00, 07, 08, 00, -1, 00, 00, 00, 00, 00, 00, 01, 00, 07, 08, 00, 07, -2, -2, -2, -2, -2],
	[00, 00, 00, 00, 00, 01, 00, 10, 10, 00, -7, 02, 02, 02, 02, 02, 02, -8, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
	[00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 00, 00, 00, "P", 00, 00, 00, 00, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
	[00, 00, 00, 00, 00, 01, 00, 10, 10, 00, 07, 09, 09, 09, 09, 09, 09, 08, 00, 10, 10, 00, -1, 00, 00, 00, 00, 00],
	[05, 02, 02, 02, 02, -8, 00, -7, -8, 00, -7, 09, 09, 08, 07, 09, 09, -8, 00, -7, -8, 00, -7, 02, 02, 02, 02, 06],
	[01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
	[01, 00, 07, 09, 09, 08, 00, 07, 09, 09, 09, 08, 00, 10, 10, 00, 07, 09, 09, 09, 08, 00, 07, 09, 09, 08, 00, -1],
	[01, 00, -7, 09, 08, 10, 00, -7, 09, 09, 09, -8, 00, -7, -8, 00, -7, 09, 09, 09, -8, 00, 10, 07, 09, -8, 00, -1],
	[01, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, -1],
	[11, 09, 08, 00, 10, 10, 00, 07, 08, 00, 07, 09, 09, 09, 09, 09, 09, 08, 00, 07, 08, 00, 10, 10, 00, 07, 09, 13],
	[12, 09, -8, 00, -7, -8, 00, 10, 10, 00, -7, 09, 09, 08, 07, 09, 09, -8, 00, 10, 10, 00, -7, -8, 00, -7, 09, 14],
	[01, 00, 00, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 10, 10, 00, 00, 00, 00, 00, 00, -1],
	[01, 00, 07, 09, 09, 09, 09, -8, -7, 09, 09, 08, 00, 10, 10, 00, 07, 09, 09, -8, -7, 09, 09, 09, 09, 08, 00, -1],
	[01, 00, -7, 09, 09, 09, 09, 09, 09, 09, 09, -8, 00, -7, -8, 00, -7, 09, 09, 09, 09, 09, 09, 09, 09, -8, 00, -1],
	[01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, -1],
	[-5, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -6],
				]

})();