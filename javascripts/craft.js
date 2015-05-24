// Crafting
/*jshint multistr:true*/

function Craft()
{
	if ($("#craft_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	$("#camp_feed").html(
		"<div id='craft_buttons' class='push--top'></div>\
		<div id='craft_display'></div>");
	
	// Nipple Rings
	if (player.Mods.craftnipplerings > 0) {
		$("#craft_buttons").append("<button id='craft_btn_1' class='btn btn-woman push--right' title='Craft Nipple Rings'>Nipple Rings</button>");
		$("#craft_btn_1").click(
			function(){
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else CraftIt("Nipple Rings", "nipplerings", "craftNippleRingsYou", "craftNippleRingsWoman");
			}
		);
	}
	// Collar
	if (player.Mods.craftcollar > 0) {
		$("#craft_buttons").append("<button id='craft_btn_2' class='btn btn-woman push--right' title='Craft a Torc Collar'>Torc</button>");
		$("#craft_btn_2").click(
			function(){
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				if (player.goods == 0) $("#craft_display").append("<p>You need a pretty gem to make this</p>");
				else CraftIt("Torc (Collar)", "collar", "craftCollarYou", "craftCollarWoman");
			}
		);
	}	
}

function CraftIt(desc, itm, actionyou, actionwoman)
{
	$("#output").html(desc);
  	
	$("#output").append("<h2>Who you make for?</h2>\
	<div id='craft_buttons' class='push--top'>");
	if (player.items[itm] == 0) {
		$("#craft_buttons").append("<button id='craft_button_you' class='btn btn-woman push--right'>You</button></div>");
		$("#craft_button_you").click(function(){eval(actionyou + "()");});	
	}
	$.each(player.women, function( index, value ) {
		if (player.women[index].items[itm] == 0) {
			if (player.women[index].isFemale()) $("#craft_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+value.name+"</button>");
			else $("#craft_buttons").append("<button id='woman_button_"+index+"' class='btn btn-man push--right'>"+value.name+"</button>");
		
			$("#woman_button_"+index).click(function(){
			
				if ($("#woman_craft_buttons").is(":visible")) {
						$("#craft_button_Woman").unbind('click').click(function(){
						eval(actionwoman + "(" + index + ")");
						});				
				} else {
					$("#craft_buttons").append("<div id='woman_craft_buttons' class='push--top'>\
					<button id='craft_button_Woman' class='btn btn-woman push--right'>Choose</button>\</div>");
				
					$("#craft_button_Woman").click(function(){
						eval(actionwoman + "(" + index + ")");
					});		
				}
				
				rival = player.women[index];
				$(".stats").show();
				$("#otherstats").show();
				redraw();
			});
		}
	});	
}

// Nipple Rings

function craftNippleRingsYou()
{
	player.metal -= 1;
	player.items.nipplerings = 1;
	player.changeNatural("orientation", -5);
	player.orientation -= 5l;
	player.capTraits();
	redraw();
	Message("Camp();Craft()", 
		"<h1>Nipple Rings</h1>\
		<p>You make the rings and with a sharp bone needle pierce your nipples and fit the rings!</p>");			
}

function craftNippleRingsWoman(index)
{
	player.metal -= 1;
	rival = player.women[index];
	rival.items.nipplerings = 1;
	rival.changeNatural("orientation", 5);
	rival.orientation += 5;
	rival.capTraits();
	redraw();

	Message("Camp();Craft()", 
		"<h1>Nipple Rings</h1>\
		<p>You make the rings and with a sharp bone needle pierce " + rival.name + " nipples and fit the rings!</p>");			
}

// Collar

function craftCollarYou()
{
	player.metal -= 1;
	player.goods -= 1;
	player.items.collar = 1;
	player.changeNatural("submissiveness", -5);
	player.submissiveness -= 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("Camp();Craft()", 
		"<h1>Torc</h1>\
		<p>You make the torc and fit it around you neck, you feel more commanding!</p>");			
}

function craftCollarWoman(index)
{
	player.metal -= 1;
	player.goods -= 1;	
	rival = player.women[index];
	rival.items.collar = 1;
	rival.changeNatural("submissiveness", 5);
	rival.submissiveness += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("Camp();Craft()", 
		"<h1>Torc</h1>\
		<p>You make the torc at fit it around " + rival.name + "'s neck, marking them as yours!</p>");			
}