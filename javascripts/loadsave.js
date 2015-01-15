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

function loadGame() 
{
	var cnt = 0;
	for (var id = 1; id < 4; id++) {
		var str = localStorage.getItem('clani' + id);
		var sg = JSON.parse(str);
		if (sg != undefined) cnt++;
	}
	if (cnt == 0) return 0;

	$("#output").html("<h1>Loading a game</h1><div id='loading'></div>");
	for (var id = 1; id < 4; id++) {
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
	return cnt;
}

function loadGameId(id) 
{
	var str = localStorage.getItem('clani' + id);
	if (str == undefined) {
		alert("Save not found.");
		return;
	}
	createDemon();
	createRival(0);
	var sg = JSON.parse(str);
	var temp = JSON.parse(sg.player);

	jQuery.extend(player, temp);
	if (player.round == undefined || player.round == 0) player.round = sg.round;
	player.women = [];
	for (var i = 0; i < temp.women.length; i += 1 ) {
		player.women[i] = new Avatar(50, 95, 90, 75, 80);
		jQuery.extend(player.women[i], temp.women[i]);
		if (player.women[i].activity == "") player.women[i].setActivity();
		if (player.women[i].name == "") player.women[i].name = getUnusedFemaleName();
		if (isNaN(player.women[i].pregnancy)) {
			player.women[i].pregnancy = 0;
			player.women[i].children = 0;
		}
	}
	places = { };
	if (sg.places != undefined) {
		var tempplaces = JSON.parse(sg.places);
		$.each(tempplaces, function(index, place) {
			places[index] = tempplaces[index];
			if (isNaN(places[index])) places[index] = 0;
		});
	}
	
	if (sg.demon != undefined) {
		var tempdemon = JSON.parse(sg.demon);
		jQuery.extend(demon, tempdemon);
	}

	
	alert("Loaded Game " + id + ", week " + player.round);
	resetRival();
	rival.name = "";
	new Camp();
}

// Save Games

function saveGame() 
{
	$("#output").html("<h1>Saving a game</h1><div id='saving'></div>");
	for (var id = 1; id < 4; id++) {
		$("#saving").append("<button myid='" + id + "' id='save_button_"+id+"' class='btn btn-woman push--right'>Save Game "+id+"</button>");
		
		$("#save_button_"+id).click(
			function() { saveGameId($(this).attr("myid")); }
		);
	}
}

function saveGameId(id) 
{
	var sg = new ASavedGame();
	sg.player = JSON.stringify(JSON.decycle(player));
	sg.demon = JSON.stringify(JSON.decycle(demon));
	sg.places = JSON.stringify(JSON.decycle(places));
	var str = JSON.stringify(JSON.decycle(sg));
	localStorage.setItem('clani' + id, str);
	alert("Saved.");
	resetRival();
	rival.name = "";
	Camp();
}
