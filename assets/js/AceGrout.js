$(document).ready(function(){
	
	console.time("AceGrout");




	// Config Start

	var breakpoints = [
		0, 		// 1 col
		768, 	// 2 col
		768,  	// 3 col
		1000 	// 4 col
	]

	var debugColours = true;

	var snapping = true; // uses scrollsnap plugin

	// Config End - Don't edit beyond here.










	// colour debugging
	if (debugColours) {
		var mr = function() { return Math.floor( Math.random() * 255 ) };
		$(".grout .brick").each(function() {		
			$(this).css("background-color", "rgb("+mr()+","+mr()+","+mr()+")");
		});
	}


	var grid;
	window.grid = grid;

	var generateBlankGrid = function(cols) {
		grid = [];
		var rows = $(".brick").length;
		for (var i = 0; i < rows; i++) {
			var row = [];
			for (var j = 0; j < cols; j++) {
				row.push(null);
			};
			grid.push(row);
		};
	}



	var findSpace = function(colCount, rowCount, brick) {
		// looping through possible start locations
		for (var r = 0; r < grid.length; r++) {
			for (var c = 0; c < grid[r].length; c++) {
				
				var blocked = false;

				// now loop through the adjacent required squares to see if any are blocked.
				for (var extraRows = 0; extraRows < rowCount; extraRows++) {
					for (var extraCols = 0; extraCols < colCount; extraCols++) {
						if (grid[r+extraRows]) {
							if (grid[r+extraRows][c+extraCols] || typeof grid[r+extraRows][c+extraCols] == "undefined") {
								blocked = true;
							}
						}
					};
				};
				

				// if none are blocked...
				if (!blocked) {
					// loop through them again, marking them blocked
					for (var extraRows = 0; extraRows < rowCount; extraRows++) {
						for (var extraCols = 0; extraCols < colCount; extraCols++) {
							grid[r+extraRows][c+extraCols] = true;
						};
					};

					grid[r][c] = brick; // and mark the top left corner one as the brick itself
					return;
				}
			};
		};
	}

	

	

	
	var makeGrid = function() {

		var columnsNeeded = 0;
		var windowWidth = $(window).innerWidth();
		var breaks = breakpoints.slice(0);
		// console.log("breaks", breaks);
		while (windowWidth > breaks[0] && breaks.length) {
			breaks.shift();
			columnsNeeded++;
		}
		//console.log("breaks", breaks);
		//console.log("columnsNeeded", columnsNeeded);

		if ( $(".grout").hasClass("cols-"+columnsNeeded) ) return;

		console.log("RESIZING TO " + columnsNeeded + " COLUMNS!");

		$(".grout").removeClass("cols-1")
				   .removeClass("cols-2")
				   .removeClass("cols-3")
				   .removeClass("cols-4")
				   .removeClass("cols-5")
				   .addClass("cols-"+columnsNeeded)

		generateBlankGrid(columnsNeeded);

		$(".grout .brick").hide().appendTo(".grout").each(function() {
			var w = parseInt( $(this).attr("brick-width") );
			var h = parseInt( $(this).attr("brick-height") );

			findSpace(w, h, this);

		});

		// destroy old rows
		$(".grout .row").remove();

		// make rows
		var rows = [];
		for (var r = 0; r < grid.length; r++) {
			var full = false;
			for (var c = 0; c < grid[r].length; c++) {
				if (grid[r][c]) full = true;
			};
			if (full) rows.push($("<div class='row'>"));
		}
		//console.log(rows);
		$(rows).each(function() {
			$(this).appendTo(".grout")
		});

		

		for (var r = 0; r < grid.length; r++) {
			for (var c = 0; c < grid[r].length; c++) {
				//console.log(grid[r][c]);
				if (typeof grid[r][c] == "object") {
					$(grid[r][c])
						.css({
							left: c * (100/columnsNeeded) + "%"
						})
						.appendTo($(rows[r]))
						.show();

				}
			}
		}
	}

	makeGrid();

	if (snapping && $().scrollsnap) {
		$(document).scrollsnap({
			snaps: 		'.row',
			proximity: 	500,
			latency: 	100
		});
	}

	$(window).on("resize orientationchange", makeGrid);

	console.timeEnd("AceGrout");


});