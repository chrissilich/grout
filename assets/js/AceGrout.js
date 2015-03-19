$(document).ready(function(){
	
	console.time("AceGrout");




	// Config Start

	var breakpoints = [
		0, 		// 1 col
		768, 	// 2 col
		768,  	// 3 col
		1000 	// 4 col
	]

	var debugColours = false;

	var snapping = false; // uses scrollsnap plugin

	// Config End - Don't edit beyond here.









	var grid;
	window.grid = grid;

	var tiles = $(".grout .tile");
	window.tiles = tiles;



	// colour debugging
	if (debugColours) {
		var mr = function() { return Math.floor( Math.random() * 255 ) };
		$(tiles).each(function() {		
			$(this).css("background-color", "rgb("+mr()+","+mr()+","+mr()+")");
		});
	}


	var generateBlankGrid = function(cols) {
		grid = [];
		var rows = tiles.length;
		for (var i = 0; i < rows; i++) {
			var row = [];
			for (var j = 0; j < cols; j++) {
				row.push(null);
			};
			grid.push(row);
		};
	}



	var findSpace = function(width, height, tile) {
		// looping through possible start locations
		for (var r = 0; r < grid.length; r++) {
			for (var c = 0; c < grid[r].length; c++) {
				
				var blocked = false;

				// now loop through the adjacent required squares to see if any are blocked.
				for (var col = 0; col < height; col++) {
					for (var row = 0; row < width; row++) {
						try {
							if (grid[r+col][c+row]) {
								blocked = true;
							}
						} catch(e) {}
					};
				};
				

				// if none are blocked...
				if (!blocked) {
					// loop through them again, marking them blocked
					for (var col = 0; col < height; col++) {
						for (var row = 0; row < width; row++) {
							grid[r+col][c+row] = true;
						};
					};

					grid[r][c] = tile; // and mark the top left corner one as the tile itself
					return;
				}
			};
		};

		console.warn("No space found for tile", width, height, tile);
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

		$(tiles).hide().appendTo(".grout").each(function() {
			var w = parseInt( $(this).attr("tile-width") );
			var h = parseInt( $(this).attr("tile-height") );
			if (w > columnsNeeded) w = columnsNeeded;
			if (columnsNeeded == 1) h = 1;

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

		console.log(grid);
	}

	makeGrid();

	if (snapping && $().scrollsnap) {
		$(document).scrollsnap({
			snaps: 		'.row',
			proximity: 	500,
			latency: 	300,
			duration: 	300
		});
	}

	$(window).on("resize orientationchange", makeGrid);

	console.timeEnd("AceGrout");


});