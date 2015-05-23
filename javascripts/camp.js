// At Camp
/*jshint multistr:true*/

function Camp(){
	
	$("#rcwomen").hide();
  $("#rcchangra").hide();
	$(".stats").show();
	$("#otherstats").show();
	$("#goods").show();
	
	$("#player_goods").html(player.goods);
	if (player.Mods.craftnipplerings == 0) {
		$("#metal_label").hide();
	} else {
		$("#metal_label").show();
		$("#player_metal").html(player.metal);
	}
	
	var ch = 0;
	$.each(player.women, function( index, value ) {
		ch += player.women[index].children;
	});
	if (player.futa > 0) $("#player_kids").html(player.children + "/" + ch);
	else $("#player_kids").html(ch);

  player.rest();
	resetRival();
	
	$("#output").html("<h1>Camp - Week " + player.round + "</h1>");
	
	var ps = false;
	if (player.activity !== "") {
		$("#output").append("<p align='left'>" + player.activity);
		ps = true;
	}
	$.each(player.women, function( index, value ) {
		if (player.women[index].activity.indexOf("birth") != -1) {
			if (!ps) {
				ps = true;
				$("#output").append("<p align='left'>");
			} else $("#output").append("<br/>");
			$("#output").append(player.women[index].activity.split("She").join(player.women[index].name));
		}
	});
	if (ps) $("#output").append("</p>");
	
	//editPlayer();

	$("#output").append(
		"<button id='women_button' class='btn' title='Examine the women'>Women</button>\
		<button id='forage_button' class='btn' title='Forage!'>Forage</button>\
		<button id='hunt_button' class='btn' title='Hunt!'>Hunt</button>");

	if (player.experience > 0) {
		$("#output").append(" <button id='exp_button' class='btn' title='Train yourself'>Train</button>");
	}
	if (player.Mods.craftnipplerings > 0) {
		$("#output").append(" <button id='craft_button' class='btn' title='Craft'>Craft</button>");
	}	
	$("#output").append(
			" <button id='load_button' class='btn' title='Load the Saved game'>Load</button>\
			<button id='save_button' class='btn' title='Save the game'>Save</button>");
	
	$("#output").append("<div id='camp_feed'></div>");		
		
  $("#women_button").click(displayWomen);
  $("#forage_button").click(Forage);
  $("#hunt_button").click(Hunt);
  $("#load_button").click(function(){
		if (loadGame("Camp()") === 0) alert("No saved games");
	});
  $("#save_button").click(function() {
		saveGame("Camp()");
	});
	$("#exp_button").click(Train);
	$("#craft_button").click(Craft);
}
