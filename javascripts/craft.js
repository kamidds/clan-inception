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
		$("#craft_buttons").append("<button id='craft_btn_1' class='btn btn-woman push--right' title='Cradt Nipple Rings'>Nipple Rings</button>");
		$("#craft_btn_1").click(
			function(){
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else CraftIt("Nipple Rings", "nipplerings", "craftNippleRingsYou", "craftNippleRingsWoman");
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
	redraw();

	Message("Camp();Craft()", 
		"<h1>Nipple Rings</h1>\
		<p>You make the rings and with a sharp bone needle pierce " + rival.name + " nipples and fit the rings!</p>");			

}