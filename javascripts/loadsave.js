// Save Object
// General container for all variables for a game in progress
function ASavedGame()
{
	// The player
	this.player = "";
	
	// some details on each visitable place
	this.places = "";
	
	// Demon
	this.demon = "";
}
	
// Load Games

function loadGame(cancel) 
{
	var cnt = 0;
	for (var id = 1; id < 5; id++) {
		var str = localStorage.getItem('clani' + id);
		var sg = JSON.parse(str);
		if (sg != undefined) cnt++;
	}
	if (cnt == 0) return 0;

	$("#output").html("<h1>Loading a game</h1><div id='loading'></div>");
	for (var id = 1; id < 5; id++) {
		var str = localStorage.getItem('clani' + id);
		var sg = JSON.parse(str);
		if (sg != undefined) {
			cnt++;
			var temp = JSON.parse(sg.player);
			$("#loading").append("<button myid='" + id + "' id='load_button_"+id+"' class='btn btn-woman push--right' title='" + temp.name + ", week " + temp.round + "'>Save Game "+id+"</button>");
			
			$("#load_button_"+id).click(
				function() { loadGameId($(this).attr("myid")); }
			);
		}
	}
	$("#loading").append("<button id='load_button_import' class='btn btn-woman push--right' title='Import'>Import</button>");
	$("#load_button_import").click(
		function() {
			$("#loading").append("<br><textarea onclick='this.focus()' id='importtxt' cols='40' rows='10''></textarea>");
			$("#loading").append("<br><button id='load_export' class='btn btn-woman push--right' title='Load'>Load</button>");
			$("#load_export").click(
				function() { 
					var str = $('textarea#importtxt').val();
					loadGameString(str);
				}
			);				
		}
	);	
	$("#loading").append("<button id='load_button_cancel' class='btn btn-woman push--right' title='Cancel'>Cancel</button>");
	$("#load_button_cancel").click(
		function() { 
			eval(cancel);
		}
	);	

	return cnt;
}

function loadGameId(id) 
{
	var str = localStorage.getItem('clani' + id);
	loadGameString(str, id);
}
function loadGameString(str, id)
{
	if (str == undefined) {
		alert("Save not found.");
		return;
	}
	createRival(0);
	var sg = JSON.parse(str);
	var temp = JSON.parse(sg.player);

	jQuery.extend(player, temp);
	player.upgradeSave(sg.round);

	player.women = [];
	for (var i = 0; i < temp.women.length; i += 1 ) {
		player.women[i] = new Avatar(50, 95, 90, 75, 80);
		jQuery.extend(player.women[i], temp.women[i]);
		player.women[i].upgradeSave();
	}
	places = { };
	if (sg.places != undefined) {
		var tempplaces = JSON.parse(sg.places);
		$.each(tempplaces, function(index, place) {
			places[index] = tempplaces[index];
			if (isNaN(places[index])) places[index] = 0;
		});
	}
	
	createDemon();
	if (sg.demon != undefined) {
		var tempdemon = JSON.parse(sg.demon);
		jQuery.extend(demon, tempdemon);
		demon.upgradeSave();
	}
	resetRival();
	rival.name = "";
	
	if (id == undefined) alert("Imported Game, week " + player.round);
	else alert("Loaded Game " + id + ", week " + player.round);
	new Camp();
}

// Save Games

function saveGame(cancel) 
{
	$("#output").html("<h1>Saving a game</h1><div id='saving'></div>");
	for (var id = 1; id < 5; id++) {
		$("#saving").append("<button myid='" + id + "' id='save_button_"+id+"' class='btn btn-woman push--right'>Save Game "+id+"</button>");
		
		$("#save_button_"+id).click(
			function() { saveGameId($(this).attr("myid")); }
		);
	}
	$("#saving").append("<button id='save_button_export' class='btn btn-woman push--right' title='Export'>Export</button>");
	$("#save_button_export").click(
		function() { 
			$("#saving").append("<br><textarea onclick='this.select()' cols='40' rows='10'>" + saveString() + "</textarea>");
		}
	);
	$("#saving").append("<button id='save_button_cancel' class='btn btn-woman push--right' title='Cancel'>Cancel</button>");
	$("#save_button_cancel").click(
		function() { 
			eval(cancel);
		}
	);
}

function saveString()
{
	var sg = new ASavedGame();
	sg.player = JSON.stringify(JSON.decycle(player));
	sg.demon = JSON.stringify(JSON.decycle(demon));
	sg.places = JSON.stringify(JSON.decycle(places));
	return JSON.stringify(JSON.decycle(sg));
}

function saveGameId(id) 
{
	var str = saveString();
	localStorage.setItem('clani' + id, str);
	alert("Saved.");
	resetRival();
	rival.name = "";
	Camp();
}
