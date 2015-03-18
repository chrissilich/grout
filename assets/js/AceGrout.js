$(document).ready(function(){
	
	console.time("AceGrout");

	// colour debugging
	//var mr = function() { return Math.floor( Math.random() * 255 ) };
	//$(".grout .brick").each(function() {
	//	
	//	$(this).css("background-color", "rgb("+mr()+","+mr()+","+mr()+")");
	//});

	window.grid = [
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false] // it's dumb that this is pregenerated, and has a limit.
	];


	var findSpace = function(colCount, rowCount, brick) {
		// looping through possible start locations
		for (var r = 0; r < grid.length; r++) {
			for (var c = 0; c < grid[r].length; c++) {
				
				var blocked = false;

				// now loop through the adjacent required squares to see if any are blocked.
				for (var extraRows = 0; extraRows < rowCount; extraRows++) {
					for (var extraCols = 0; extraCols < colCount; extraCols++) {
						if (grid[r+extraRows][c+extraCols] || typeof grid[r+extraRows][c+extraCols] == "undefined") {
							blocked = true;
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

	

	

	


	$(".grout .brick").each(function() {
		var w = parseInt( $(this).attr("brick-width") );
		var h = parseInt( $(this).attr("brick-height") );

		findSpace(w, h, this);
		
	})

	// make rows
	var rows = [];
	for (var r = 0; r < grid.length; r++) {
		if (grid[r][0] || grid[r][1] || grid[r][2] || grid[r][3]) {
			rows.push($("<div class='row'>"));
		}
	}
	//console.log(rows);
	$(rows).each(function() {
		$(this).appendTo(".grout")
	});

	$(document).scrollsnap({
	    snaps: '.row',
	    proximity: 500,
	    latency: 100
	});

	for (var r = 0; r < grid.length; r++) {
		for (var c = 0; c < grid[r].length; c++) {
			//console.log(grid[r][c]);
			if (typeof grid[r][c] == "object") {
				$(grid[r][c])
					.css({
						left: c * 25 + "%"
					})
					.appendTo($(rows[r]));

			}
		}
	}

	console.timeEnd("AceGrout");


});