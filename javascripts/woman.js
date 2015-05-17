//WOman Functions

function displayWomen(){
	function displayWoman(index){
		rival = player.women[index];
		$("#woman_display").html("<h2 style='margin-bottom:2px;'>"+rival.name+"</h2><font size='-1'>Children: " + rival.children + "</font>");
		if (rival.round > 0) $("#woman_display").append("<font size='-1'>, Brought to clan on week " + rival.round + "</font>");

		//editWoman();
		
		// Description
		var fate = rival.activity;		
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
			//Item Melon
			if (player.melon > 0){
			$("#woman_display").append(
				"<button id='woman_melon' class='btn' title='melon'>Eat Melon</button>");
				$("#woman_melon").click(function(){
					eatMelonWoman(index);
					player.melon -= 1;
				});}	
			//Item MaternalNut	
			if (player.maternalnut > 0){
			$("#woman_display").append(
				"<button id='woman_maternalnut' class='btn' title='maternalnut'>Eat swollen Nut</button>");
				$("#woman_maternalnut").click(function(){
					eatMaternalNutWoman(index);
					player.maternalnut -= 1;
				});}		
		});
	});
	
	
	
}

function editWoman()
{
		$("#woman_display").append(
		"<font size='-1'>\
		<a id='expandwoman' href='#'>Click Here To Edit " + rival.name + "</a>\
		<table class='slidertable3' id='womantable'>\
			<tr><td>Submissiveness</td><td><div id='slider_submissiveness'></div></td><td>Dominance</td></tr>\
			<tr><td>Domesticity</td><td><div id='slider_domesticity'></div></td><td>Adventurousness</td></tr>\
			<tr><td>Maternalism</td><td><div id='slider_maternalism'></div></td><td>Paternalism</td></tr>\
			<tr><td>Allure</td><td><div id='slider_allure'></div></td><td>Lustfulness</td></tr>\
			<tr><td>Homosexual</td><td><div id='slider_orientation'></div></td><td>Heterosexual</td></tr>\
			<tr><td>Boobs+</td><td><div id='slider_boobs'></div></td></tr>\
			<tr><td>Breast Rows</td><td><div id='slider_rows'></div></td></tr>\
			<tr><td>Genitals</td><td><div id='slider_cocks'></div></td></tr>\
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
	$("#slider_cocks").slider({value:rival.physique.gentialscnt,min:0,max:6,slide:function(event, ui) {
		rival.physique.gentialscnt = ui.value; 
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

