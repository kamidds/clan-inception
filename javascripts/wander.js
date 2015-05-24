// Exploring/Hunting
/*jshint multistr:true*/

function getPlaceCnt(place)
{
	if (isNaN(places[place])) return 0;
	return places[place];
}
function setPlaceVisited(place)
{
	if (isNaN(places[place])) places[place] = 1;
	else places[place] += 1;
}

function Forage()
{
	if ($("#forage_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();
	
	if (player.round > 5 && getPlaceCnt("Volcano") === 0) {
		setPlaceVisited("Volcano");
		Message("Camp()", "<h2>Fire Mountain?</h2>\
		<p>You see a mountain smoking with red rivers flowing down it's side. Looks dangerous, but maybe you return there another time?");
		return;
	}
	
	$("#camp_feed").html(
		"<h2>Where do you forage?</h2>\
		<div id='forage_buttons' class='push--top'></div>\
		<div id='forage_display'></div>");
	//$.each(places, function(index, place) { $("#forage_display").append(index + ": " + place + ", ");	});
	
	// add places
	$("#forage_buttons").append("\
		<button id='forage_button_forest' class='btn btn-woman push--right' title='Forest'>Forest</button>\
		<button id='forage_button_hills' class='btn btn-woman push--right' title='Hills'>Hills</button>\
		<button id='forage_button_swamp' class='btn btn-woman push--right' title='Swamp'>Swamp</button>\
		<button id='forage_button_beach' class='btn btn-woman push--right' title='Beach'>Beach</button>\
	");
	if (getPlaceCnt("Volcano") !== 0) {
		$("#forage_buttons").append("<button id='forage_button_volcano' class='btn btn-woman push--right' title='Explore the volcano'>Volcano</button>");
		$("#forage_button_volcano").click(
			function(){
				setPlaceVisited("Volcano");
				var val = getRandomInt(1, 100);
				if (val < 20) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
				else if (val < 40) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
				else if (val < 50) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
				else if (val < 80) WanderFood("<h1>Found: Red Nut</h1><p>You find small red nut that smells of fire, it may feed your clan</p>", "eatDemonNutYou", "eatDemonNutWoman");
				else if (val < 90) WanderFood("<h1>Found: Split Mushroom</h1><p>You find strange mushroom, with long and stiff shape and two stalks, it may feed your clan</p>", "eatTwinMushroomYou", "eatTwinMushroomWoman");
				else if (val < 95) WanderNothing();
				else WanderBattle("hot volcano");
			}
		);
	}
	$("#forage_button_forest").click(
		function(){
			setPlaceVisited("Forest");
			var val = getRandomInt(1, 100);
			if (val < 20) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
			else if (val < 35) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
			else if (val < 50) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 70) WanderFood("<h1>Found: Grapes</h1><p>You find some odd grapes, with double berries, it may feed your clan</p>", "eatGrapesYou", "eatGrapesWoman");
			else if (val < 90) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman");
			else if (val < 95) WanderNothing();
			else WanderBattle("snow forest");
		}
	);
	$("#forage_button_hills").click(
		function(){
			setPlaceVisited("Hills");
			var val = getRandomInt(1, 100);
			if (val < 20) WanderFood("<h1>Found: Clean Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDomesticNutYou", "eatDomesticNutWoman");
			else if (val < 35) WanderFood("<h1>Found: Long Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatOrientationNutYou", "eatOrientationNutWoman");
			else if (val < 50) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 75) WanderFood("<h1>Found: White Nut</h1><p>You find small white nut that smells of milk, it may feed your clan</p>", "eatMilkNutYou", "eatMilkNutWoman");
			else if (val < 85) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman");
			else if (val < 95) {
				if (smith.round > 0) {
					advanceRound();
					TradeSmith();
				}	else MeetSmith();
			}
			else WanderBattle("snow hills");
		}
	);
	$("#forage_button_swamp").click(
		function(){
			setPlaceVisited("Swamp");
			var val = getRandomInt(1, 100);
			if (val < 10) WanderFood("<h1>Found: Small Melon</h1><p>You find small strange melon, it may feed your clan</p>", "eatSmallMelonYou", "eatSmallMelonWoman");
			else if (val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 40) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
			else if (val < 60) WanderFood("<h1>Found: Green Berry</h1><p>You find small green berry that smells strange, it may feed your clan</p>", "eatGreenBerryYou", "eatGreenBerryWoman");
			else if (val < 75) WanderFood("<h1>Found: Pale Berry</h1><p>You find small pale berry that smells strange, it may feed your clan</p>", "eatPaleBerryYou", "eatPaleBerryWoman");
			else if (val < 85) WanderFood("<h1>Found: Dark Berry</h1><p>You find small dark coloured berry that smells strange, it may feed your clan</p>", "eatDarkBerryYou", "eatDarkBerryWoman");
			else if (val < 90) WanderFood("<h1>Found: Rainbow Flower</h1><p>You find small multicoloured flower that looks surprisingly edible, it may feed your clan</p>", "eatRainbowflowerYou", "eatRainbowflowerWoman");
			else if (val < 95) WanderNothing();
			else WanderBattle("cold swamp");
		}
	);
	$("#forage_button_beach").click(
		function(){
			setPlaceVisited("Beach");
			var val = getRandomInt(1, 100);
			if (val < 20) WanderFood("<h1>Found: Swollen Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatMaternalNutYou", "eatMaternalNutWoman");
			else if (val < 35) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 50) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
			else if (val < 65) WanderFood("<h1>Found: Paw Fruit</h1><p>You find small fruit look like paw, you feel the force of your ancestors in it</p>", "eatPawFruitYou", "eatPawFruitWoman");
			else if (val < 80) WanderFood("<h1>Found: Tri-Sea-thing</h1><p>You find strange sea creature, long and slimy with three bodies, it may feed your clan</p>", "eatTriCreatureYou", "eatTriCreatureWoman");
      else if (val < 90) WanderFood("<h1>Found: Hairy Nut</h1><p>You find a large nut, it may feed your clan</p>", "eatHairyNutYou", "eatHairyNutWoman");
			else if (val < 95) WanderNothing();
			else WanderBattle("chilly beach");
		}
	);	
}

function Hunt()
{
	if ($("#wander_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	
	if (player.round > 5 && getPlaceCnt("Volcano") === 0) {
		setPlaceVisited("Volcano");
		Message("Camp()", "<h2>Fire Mountain?</h2>\
		<p>You see a mountain smoking with red rivers flowing down it's side. Looks dangerous, but maybe you return there another time?");
		return;
	}
	
	$("#camp_feed").html(
		"<h2>Where do you hunt?</h2>\
		<div id='wander_buttons' class='push--top'></div>\
		<div id='wander_display'></div>");
	//$.each(places, function(index, place) { $("#wander_display").append(index + ": " + place + ", ");	});
	
	// add places
	$("#wander_buttons").append("\
		<button id='wander_button_forest' class='btn btn-woman push--right' title='Forest'>Forest</button>\
		<button id='wander_button_hills' class='btn btn-woman push--right' title='Hills'>Hills</button>\
		<button id='wander_button_swamp' class='btn btn-woman push--right' title='Swamp'>Swamp</button>\
		<button id='wander_button_beach' class='btn btn-woman push--right' title='Beach'>Beach</button>\
	");
	if (getPlaceCnt("Volcano") !== 0) {
		$("#wander_buttons").append("<button id='wander_button_volcano' class='btn btn-woman push--right' title='Explore the volcano'>Volcano</button>");
		$("#wander_button_volcano").click(
			function(){
				setPlaceVisited("Volcano");
				var val = getRandomInt(1, 7);
				if (getPlaceCnt("Volcano") == 2) val = 0;
				if (val < 4) MeetDemon();
				else WanderBattle("hot volcano");
			}
		);
	}
	$("#wander_button_forest").click(
		function(){
			setPlaceVisited("Forest");
			var val = getRandomInt(1, 7);
			if (val < 3) WanderNothing();
			else WanderBattle("snow forest");
		}
	);
	$("#wander_button_hills").click(
		function(){
			setPlaceVisited("Hills");		
			if (player.round > 10 && smith.round == 0) {
				MeetSmith();
				return;
			}
			var val = getRandomInt(1, 7);
			if (val < 3 && smith.round > 0) {
				advanceRound();
				TradeSmith();
			}	else WanderBattle("snow hills");
		}
	);
	$("#wander_button_swamp").click(
		function(){
			setPlaceVisited("Swamp");
			var val = getRandomInt(1, 7);
			if (val < 3) WanderNothing();
			else WanderBattle("cold swamp");
		}
	);
	$("#wander_button_beach").click(
		function(){
			setPlaceVisited("Beach");
			var val = getRandomInt(1, 7);
			if (val < 3) WanderNothing();
			else WanderBattle("chilly beach");
		}
	);	
}


// Find a rival

function WanderBattle(plc)
{
	advanceRound();
  if (player.women.length === 0) {
		MeetThoth();
		return;
	}
	
	// Generic Rival
	var exp = Math.floor(player.getTrainingRanks() * (getRandomInt(40, 120) / 100)) * 5;
	createRival(exp);
	
	if (player.Mods.perception > 0 && (player.Mods.perception * 5) >= getRandomInt(0, 100)) {
		// can avoid
		$("#output").html("<h1>Wandering</h1>\
			<p>You wander through " + plc + " until spot lone man. He no see you yet.\
			<div id='fight_buttons' class='push--top'></div>\
			<button id='fight_button_fight' class='btn btn-woman push--right' title='Take him!'>Fight</button>\
			<button id='fight_button_leave' class='btn btn-woman push--right' title='Leave'>Leave</button>\
			");
		$("#fight_button_fight").click(
			function(){
				Battle(rival);
			}
		);
		$("#fight_button_leave").click(
			function() {
				Message("Camp();", "You no want this weakling and leave him.");
			}
		);
		
	} else {
		// Cannot avoid
		Message("new Battle(rival)", "<h1>Wandering</h1>\
			<p>You wander through " + plc + " until spot lone man. He see you and grin. He think \
			you become womanfolk of his clan. He wrong.</p>");
	}
}


// Nothing happens

function WanderNothing()
{
	advanceRound();
	Message("Camp()", "<h1>Failure</h1><p>You failed to hunt anything or anyone, and return to camp</p>");
}


// Found a consumable item (common function)

function WanderFood(desc, actionyou, actionwoman)
{
//	$(".stats").hide();

	advanceRound();
	$("#output").html(desc);
  	
	$("#output").append("<h2>Who will eat it?</h2>\
	<div id='eat_buttons' class='push--top'>\
	<button id='eat_button_you' class='btn btn-woman push--right'>You (Raw)</button></div>");
	$("#eat_button_you").click(function(){eval(actionyou + "(false)");});	
	if (player.Mods.infuse > 0 && player.goods > 0) {
		$("#eat_buttons").append("<button id='eat_button_you_infuse' class='btn btn-woman push--right'>You (Cooked)</button>");
		$("#eat_button_you_infuse").click(function(){eval(actionyou + "(true)");});	
	}
	$.each(player.women, function( index, value ) {
		if (player.women[index].isFemale()) $("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+value.name+"</button>");
		else $("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-man push--right'>"+value.name+"</button>");
		
		$("#woman_button_"+index).click(function(){
		
			if ($("#woman_eat_buttons").is(":visible")) {
					$("#eat_button_Woman").unbind('click').click(function(){
					eval(actionwoman + "(" + index + ",false)");
					});
					$("#eat_button_Woman_Cooked").unbind('click').click(function(){
					eval(actionwoman + "(" + index + ",true)");
					});					
			} else {
				$("#eat_buttons").append("<div id='woman_eat_buttons' class='push--top'>\
				<button id='eat_button_Woman' class='btn btn-woman push--right'>Choose (Raw)</button>\</div>");
			
				$("#eat_button_Woman").click(function(){
					eval(actionwoman + "(" + index + ",false)");
				});	
				if (player.Mods.infuse > 0 && player.goods > 0) {
					$("#woman_eat_buttons").append("<button id='eat_button_Woman_Cooked' class='btn btn-woman push--right'>Choose (Cooked)</button>");
				
					$("#eat_button_Woman_Cooked").click(function(){
						eval(actionwoman + "(" + index + ",true)");
					});	
				}
			
			}
			
			rival = player.women[index];
			$(".stats").show();
			$("#otherstats").show();
			redraw();
		
		
		});
	});
	
	$("#eat_buttons").append("<button id='eat_button_throw' class='btn btn-woman push--right'>Other Use</button>");
	
	$("#eat_button_throw").click(function(){
		player.goods += 2;
		Message("Camp()", "<h1>Other Use</h1><p>You store it away to be used as needed for crafting.</p>");
	});		
}

