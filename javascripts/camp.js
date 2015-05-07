function Camp(){
	
	$("#rcwomen").hide();
  $("#rcchangra").hide();
	$(".stats").show();

  player.rest();
	resetRival();
	
	$("#output").html("<h1>Camp - Week " + player.round + "</h1>");
	
	if (player.activity != "") $("#output").append("<p align='left'>" + player.activity + "</p>");
	
	//editPlayer();

	if (player.experience > 0) {
		$("#output").append(
			"<button id='women_button' class='btn' title='Examine the women'>Women</button>\
			<button id='wander_button' class='btn' title='Hunt!'>Wander</button>\
			<button id='exp_button' class='btn' title='Train yourself'>Train</button>\
			<button id='load_button' class='btn' title='Load the Saved game'>Load</button>\
			<button id='save_button' class='btn' title='Save the game'>Save</button>");
	} else {
		$("#output").append(
				"<button id='women_button' class='btn' title='Examine the women'>Women</button>\
				<button id='wander_button' class='btn' title='hunt!'>Wander</button>\
				<button id='load_button' class='btn' title='Load the Saved game'>Load</button>\
				<button id='save_button' class='btn' title='Save the game'>Save</button>");
	}
	
	$("#output").append("<div id='camp_feed'></div>");		
		
  $("#women_button").click(displayWomen);
  $("#wander_button").click(Wander);
  $("#load_button").click(function(){
		if (loadGame("Camp()") == 0) alert("No saved games");
	});
  $("#save_button").click(function() {
		saveGame("Camp()");
	});
	$("#exp_button").click(Train);
}

function displayWomen(){
	function displayWoman(index){
		rival = player.women[index];
		$("#woman_display").html("<h2>"+rival.name+"</h2><font size='-4'>Children: " + rival.children + "</font>");

		//editWoman();
		
		// Description
		var fate = rival.activity;		
		if (rival.round > 0) fate += "<br>Brought to clan on week " + rival.round;

		$("#woman_display").append("<p>"+fate+"</p>");
		redraw();
	}
		
	if ($("#women_buttons").is(":visible")) {
		$("#camp_feed").html("");
		resetRival();
		return;
	}

	$("#camp_feed").html(
		"<div id='women_buttons' class='push--top'></div>\
		<div id='woman_display'></div>");
		
	$.each(player.women, function( index, value ) {
		$("#women_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+value.name+"</button>");
		$("#woman_button_"+index).click(function(){
			displayWoman(index);
		});
	});
}

function editPlayer()
{
	$("#output").append(
			"<font size='-2'>\
			<a id='expandplayer' href='#'>Click Here To Edit Player</a>\
		  <table class='slidertable3' id='playertable'>\
				<tr><td>Submissiveness</td><td><div id='slider_submissiveness_p'></div></td><td>Dominance</td></tr>\
				<tr><td>Domesticity</td><td><div id='slider_domesticity_p'></div></td><td>Adventurousness</td></tr>\
				<tr><td>Maternalism</td><td><div id='slider_maternalism_p'></div></td><td>Paternalism</td></tr>\
				<tr><td>Allure</td><td><div id='slider_allure_p'></div></td><td>Lustfulness</td></tr>\
				<tr><td>Homosexual</td><td><div id='slider_orientation_p'></div></td><td>Heterosexual</td></tr>\
				<tr><td>Boobs+</td><td><div id='slider_boobs_p'></div></td></tr>\
				<tr><td>Cock+</td><td><div id='slider_cock_p'></div></td></tr>\
				<tr><td>Balls+</td><td><div id='slider_balls_p'></div></td></tr>\
				<tr><td>Futa+</td><td><div id='slider_futa_p'></div></td></tr>\
				<tr><td>Amazon+</td><td><div id='slider_amazon_p'></div></td></tr>\
				<tr><td>Push Submissiveness</td><td><div id='slider_psubmissiveness_p'></div></td></tr>\
				<tr><td>Push Domesticity</td><td><div id='slider_pdomesticity_p'></div></td></tr>\
				<tr><td>Push Maternalism</td><td><div id='slider_pmaternalism_p'></div></td></tr>\
				<tr><td>Push Allure</td><td><div id='slider_pallure_p'></div></td></tr>\
				<tr><td>Push Orientation</td><td><div id='slider_porientation_p'></div></td></tr>\
				<tr><td>Iron Will+</td><td><div id='slider_ironwill_p'></div></td></tr>\
				<tr><td>Resist Submissiveness</td><td><div id='slider_psubmissiveness_r'></div></td></tr>\
				<tr><td>Resist Domesticity</td><td><div id='slider_pdomesticity_r'></div></td></tr>\
				<tr><td>Resist Maternalism</td><td><div id='slider_pmaternalism_r'></div></td></tr>\
				<tr><td>Resist Allure</td><td><div id='slider_pallure_r'></div></td></tr>\
				<tr><td>Resist Orientation</td><td><div id='slider_porientation_r'></div></td></tr>\
			</table></font><br/>\
	");
	
	$('#expandplayer').click(function(){
    $('#playertable').slideToggle('fast');
	});
		
	$("#slider_maternalism_p").slider({value:100-player.maternalism,min:0,max:100,slide:function(event, ui) {
		player.maternalism = 100 - ui.value; 
		redraw();
	}});
	$("#slider_submissiveness_p").slider({value:100-player.submissiveness,min:0,max:100,slide:function(event, ui) {
		player.submissiveness = 100 - ui.value; 
		redraw();
	}});
	$("#slider_domesticity_p").slider({value:100-player.domesticity,min:0,max:100,slide:function(event, ui) {
		player.domesticity = 100 - ui.value; 
		redraw();
	}});
	$("#slider_allure_p").slider({value:100-player.allure,min:0,max:100,slide:function(event, ui) {
		player.allure = 100 - ui.value; 
		redraw();
	}});
	$("#slider_orientation_p").slider({value:100-player.orientation,min:0,max:100,slide:function(event, ui) {
		player.orientation = 100 - ui.value; 
		redraw();
	}}); 
	$("#slider_boobs_p").slider({value:player.Mods.breasts,min:-20,max:200,slide:function(event, ui) {
		player.Mods.breasts = ui.value; 
		redraw();
	}}); 
	$("#slider_amazon_p").slider({value:player.Mods.amazon,min:0,max:20,slide:function(event, ui) {
		player.Mods.amazon = ui.value; 
		redraw();
	}});
	$("#slider_cock_p").slider({value:player.Mods.cock,min:0,max:20,slide:function(event, ui) {
		player.Mods.cock = ui.value; 
		redraw();
	}});	
	$("#slider_balls_p").slider({value:player.Mods.balls,min:0,max:20,slide:function(event, ui) {
		player.Mods.balls = ui.value;
		redraw();
	}});		
	$("#slider_futa_p").slider({value:player.Mods.futa,min:0,max:20,slide:function(event, ui) {
		player.Mods.futa = ui.value; 
		redraw();
	}});
	$("#slider_psubmissiveness_p").slider({value:player.Mods.pushsubmissiveness,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushsubmissiveness = ui.value; 
		redraw();
	}});
	$("#slider_pdomesticity_p").slider({value:player.Mods.pushdomesticity,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushdomesticity = ui.value; 
		redraw();
	}});
	$("#slider_pmaternalism_p").slider({value:player.Mods.pushmaternalism,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushmaternalism = ui.value; 
		redraw();
	}});	
	$("#slider_pallure_p").slider({value:player.Mods.pushallure,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushallure = ui.value; 
		redraw();
	}});	
	$("#slider_porientation_p").slider({value:player.Mods.pushorientation,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushorientation = ui.value; 
		redraw();
	}});
	$("#slider_ironwill_p").slider({value:player.Mods.ironwill,min:0,max:4,slide:function(event, ui) {
		player.Mods.ironwill = ui.value; 
		redraw();
	}});
	$("#slider_psubmissiveness_r").slider({value:player.Mods.resistsubmissiveness,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistsubmissiveness = ui.value; 
		redraw();
	}});
	$("#slider_pdomesticity_r").slider({value:player.Mods.resistdomesticity,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistdomesticity = ui.value; 
		redraw();
	}});
	$("#slider_pmaternalism_r").slider({value:player.Mods.resistmaternalism,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistmaternalism = ui.value; 
		redraw();
	}});	
	$("#slider_pallure_r").slider({value:player.Mods.resistallure,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistallure = ui.value; 
		redraw();
	}});	
	$("#slider_porientation_r").slider({value:player.Mods.resistorientation,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistorientation = ui.value; 
		redraw();
	}});	
}

function editWoman()
{
		$("#woman_display").append(
		"<font size='-2'>\
		<a id='expandwoman' href='#'>Click Here To Edit " + rival.name + "</a>\
		<table class='slidertable3' id='womantable'>\
			<tr><td>Submissiveness</td><td><div id='slider_submissiveness'></div></td><td>Dominance</td></tr>\
			<tr><td>Domesticity</td><td><div id='slider_domesticity'></div></td><td>Adventurousness</td></tr>\
			<tr><td>Maternalism</td><td><div id='slider_maternalism'></div></td><td>Paternalism</td></tr>\
			<tr><td>Allure</td><td><div id='slider_allure'></div></td><td>Lustfulness</td></tr>\
			<tr><td>Homosexual</td><td><div id='slider_orientation'></div></td><td>Heterosexual</td></tr>\
			<tr><td>Boobs+</td><td><div id='slider_boobs'></div></td></tr>\
			<tr><td>Breast Rows</td><td><div id='slider_rows'></div></td></tr>\
			<tr><td>Futa+</td><td><div id='slider_futa'></div></td></tr>\
			<tr><td>Balls</td><td><div id='slider_balls'></div></td></tr>\
			<tr><td>Amazon+</td><td><div id='slider_amazon'></div></td></tr>\
			<tr><td>Horns</td><td><div id='slider_horns'></div></td></tr>\
			<tr><td>Tail</td><td><div id='slider_tail'></div></td></tr>\
			<tr><td>Pregnancy</td><td><div id='slider_pregnancy'></div></td></tr>\
		</table></font>\
		");
	$('#expandwoman').click(function(){
		$('#womantable').slideToggle('fast');
	});
	$("#slider_maternalism").slider({value:100 - rival.maternalism,min:0,max:100,slide:function(event, ui) {
		rival.maternalism=100-ui.value; 
		redraw();
	}});
	$("#slider_submissiveness").slider({value:100-rival.submissiveness,min:0,max:100,slide:function(event, ui) {
		rival.submissiveness=100-ui.value; 
		redraw();
	}});
	$("#slider_domesticity").slider({value:100-rival.domesticity,min:0,max:100,slide:function(event, ui) {
		rival.domesticity=100-ui.value; 
		redraw();
	}});
	$("#slider_allure").slider({value:100-rival.allure,min:0,max:100,slide:function(event, ui) {
		rival.allure=100-ui.value; 
		redraw();
	}});
	$("#slider_orientation").slider({value:100-rival.orientation,min:0,max:100,slide:function(event, ui) {
		rival.orientation=100-ui.value; 
		redraw();
	}}); 
	$("#slider_boobs").slider({value:rival.Mods.breasts,min:-20,max:200,slide:function(event, ui) {
		rival.Mods.breasts = ui.value; 
		redraw();
	}}); 
	$("#slider_amazon").slider({value:rival.Mods.amazon,min:0,max:20,slide:function(event, ui) {
		rival.Mods.amazon = ui.value; 
		redraw();
	}});	
	$("#slider_futa").slider({value:rival.Mods.futa,min:0,max:20,slide:function(event, ui) {
		rival.Mods.futa = ui.value; 
		redraw();
	}});
	$("#slider_balls").slider({value:rival.Mods.balls,min:0,max:20,slide:function(event, ui) {
		rival.Mods.balls = ui.value; 
		redraw();
	}});	
	$("#slider_rows").slider({value:rival.physique.breastrows,min:0,max:6,slide:function(event, ui) {
		rival.physique.breastrows = ui.value; 
		redraw();
	}});
	$("#slider_horns").slider({value:rival.physique.horns,min:0,max:10,slide:function(event, ui) {
		rival.physique.horns = ui.value; 
		redraw();
	}});
	$("#slider_tail").slider({value:rival.physique.tail,min:0,max:10,slide:function(event, ui) {
		rival.physique.tail = ui.value; 
		redraw();
	}});
	$("#slider_pregnancy").slider({value:rival.pregnancy,min:0,max:100,slide:function(event, ui) {
		rival.pregnancy = ui.value; 
		redraw();
	}});	
}
