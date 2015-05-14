// Exploring/Hunting

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
	
	if (player.round > 5 && getPlaceCnt("Volcano") == 0) {
		setPlaceVisited("Volcano");
		new Message("Camp()", "<h2>Fire Mountain?</h2>\
		<p>You see a mountain smoking with red rivers flowing down it's side. Looks dangerous, but maybe you return there another time?")
		return;
	}
	
	$("#camp_feed").html(
		"<h2>Where do you hunt?</h2>\
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
	if (getPlaceCnt("Volcano") != 0) {
		$("#forage_buttons").append("<button id='forage_button_volcano' class='btn btn-woman push--right' title='Explore the volcano'>Volcano</button>");
		$("#forage_button_volcano").click(
			function(){
				setPlaceVisited("Volcano");
				var val = getRandomInt(1, 37);
				if (getPlaceCnt("Volcano") == 2) val = 0;
				if (val < 4) MeetDemon();
				else if (val < 11) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
				else if (val < 16) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
				else if (val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
				else if (val < 28) WanderFood("<h1>Found: Red Nut</h1><p>You find small white nut that smells of milk, it may feed your clan</p>", "eatDemonNutYou", "eatDemonNutWoman");
				else if (val < 33) WanderFood("<h1>Found: Split Mushroom</h1><p>You find strange mushroom, with long and stiff shape and two stalks, it may feed your clan</p>", "eatTwinMushroomYou", "eatTwinMushroomWoman");
				else WanderNothing();
			}
		)
	}
	$("#forage_button_forest").click(
		function(){
			setPlaceVisited("Forest");
			var val = getRandomInt(1, 34);
			if (val < 3) WanderNothing();
			else if (val < 11) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
			else if (val < 16) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
			else if (val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 25) WanderFood("<h1>Found: Grapes</h1><p>You find some odd grapes, with double berries, it may feed your clan</p>", "eatGrapesYou", "eatGrapesWoman");
			else if (val < 30) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman");
			else WanderNothing();
		}
	);
	$("#forage_button_hills").click(
		function(){
			setPlaceVisited("Hills");
			var val = getRandomInt(1, 37);
			if (val < 3) WanderNothing();
			else if (val < 10) WanderFood("<h1>Found: Clean Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDomesticNutYou", "eatDomesticNutWoman");
			else if (val < 16) WanderFood("<h1>Found: Long Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatOrientationNutYou", "eatOrientationNutWoman");
			else if (val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 28) WanderFood("<h1>Found: White Nut</h1><p>You find small white nut that smells of milk, it may feed your clan</p>", "eatMilkNutYou", "eatMilkNutWoman");
			else if (val < 33) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman");
			else WanderNothing();
		}
	);
	$("#forage_button_swamp").click(
		function(){
			setPlaceVisited("Swamp");
			var val = getRandomInt(1, 41);
			if (val < 3) WanderNothing();
			else if (val < 7) WanderFood("<h1>Found: Small Melon</h1><p>You find small strange melon, it may feed your clan</p>", "eatSmallMelonYou", "eatSmallMelonWoman");
			else if (val < 15) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 20) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
			else if (val < 25) WanderFood("<h1>Found: Green Berry</h1><p>You find small green berry that smells strange, it may feed your clan</p>", "eatGreenBerryYou", "eatGreenBerryWoman");
			else if (val < 30) WanderFood("<h1>Found: Pale Berry</h1><p>You find small pale berry that smells strange, it may feed your clan</p>", "eatPaleBerryYou", "eatPaleBerryWoman");
			else if (val < 35) WanderFood("<h1>Found: Dark Berry</h1><p>You find small dark coloured berry that smells strange, it may feed your clan</p>", "eatDarkBerryYou", "eatDarkBerryWoman");
			else if (val < 37) WanderFood("<h1>Found: Rainbow Flower</h1><p>You find small multicoloured flower that looks surprisingly edible, it may feed your clan</p>", "eatRainbowflowerYou", "eatRainbowflowerWoman");
			else WanderNothing();
		}
	);
	$("#forage_button_beach").click(
		function(){
			setPlaceVisited("Beach");
			var val = getRandomInt(1, 40);
			if (val < 3) WanderNothing();
			else if (val < 15) WanderFood("<h1>Found: Swollen Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatMaternalNutYou", "eatMaternalNutWoman");
			else if (val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val < 25) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
			else if (val < 30) WanderFood("<h1>Found: Paw Fruit</h1><p>You find small fruit look like paw, you feel the force of your ancestors in it</p>", "eatPawFruitYou", "eatPawFruitWoman");
			else if (val < 35) WanderFood("<h1>Found: Tri-Sea-thing</h1><p>You find strange sea creature, long and slimy with three bodies, it may feed your clan</p>", "eatTriCreatureYou", "eatTriCreatureWoman");
            		else if (val < 36) WanderFood("<h1>Found: Hairy Nut</h1><p>You find a large nut, it may feed your clan</p>", "eatHairyNutYou", "eatHairyNutWoman");
			else WanderNothing();
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
	
	if (player.round > 5 && getPlaceCnt("Volcano") == 0) {
		setPlaceVisited("Volcano");
		new Message("Camp()", "<h2>Fire Mountain?</h2>\
		<p>You see a mountain smoking with red rivers flowing down it's side. Looks dangerous, but maybe you return there another time?")
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
	if (getPlaceCnt("Volcano") != 0) {
		$("#wander_buttons").append("<button id='wander_button_volcano' class='btn btn-woman push--right' title='Explore the volcano'>Volcano</button>");
		$("#wander_button_volcano").click(
			function(){
				setPlaceVisited("Volcano");
				var val = getRandomInt(1, 37);
				if (getPlaceCnt("Volcano") == 2) val = 0;
				if (val < 4) MeetDemon();
				else WanderBattle("hot volcano");
			}
		)
	}
	$("#wander_button_forest").click(
		function(){
			setPlaceVisited("Forest");
			var val = getRandomInt(1, 34);
			if (val < 3) WanderNothing();
			else WanderBattle("snow forest");
		}
	);
	$("#wander_button_hills").click(
		function(){
			setPlaceVisited("Hills");
			var val = getRandomInt(1, 37);
			if (val < 3) WanderNothing();
			else WanderBattle("snow hills");
		}
	);
	$("#wander_button_swamp").click(
		function(){
			setPlaceVisited("Swamp");
			var val = getRandomInt(1, 41);
			if (val < 3) WanderNothing();
			else WanderBattle("cold swamp");
		}
	);
	$("#wander_button_beach").click(
		function(){
			setPlaceVisited("Beach");
			if (val < 3) WanderNothing();
			else WanderBattle("chilly beach");
		}
	);	
}


// Find a rival

function WanderBattle(plc)
{
	advanceRound();
  if (player.women.length == 0) {
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
				new Message("Camp();", "You no want this weakling and leave him.");
			}
		);
		
	} else {
		// Cannot avoid
		new Message("new Battle(rival)", "<h1>Wandering</h1>\
			<p>You wander through " + plc + " until spot lone man. He see you and grin. He think \
			you become womanfolk of his clan. He wrong.</p>");
	}
}


// Nothing happens

function WanderNothing()
{
	advanceRound();
	new Message("Camp()", "<h1>Failure</h1><p>You failed to hunt anything or anyone, and return to camp</p>");
}


// Found a consumable item (common function)

function WanderFood(desc, actionyou, actionwoman)
{
	$(".stats").hide();
	advanceRound();
  $("#output").html(desc);
	$("#output").append("<h2>Who will eat it?</h2>\
	<div id='eat_buttons' class='push--top'>\
	<button id='eat_button_you' class='btn btn-woman push--right'>You</button>\
	</div>");
	$("#eat_button_you").click(function(){
			eval(actionyou + "()");
	});	
	$.each(player.women, function( index, value ) {
		$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+value.name+"</button>");
		$("#woman_button_"+index).click(function(){
			eval(actionwoman + "(" + index + ")");
		});
	});
	$("#eat_buttons").append("<button id='eat_button_throw' class='btn btn-woman push--right'>Other Use</button>");
	$("#eat_button_throw").click(function(){
		player.goods += 2;
		new Message("Camp()", "<h1>Other Use</h1><p>You store it away to be used as needed for crafting.</p>");
	});		
}

// Breast Melon

function eatMelonYou()
{
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += 5;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		new Message("Camp()", 
			"<h1>Eat the Melon</h1>\
			<p>You eat the melon and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Melon</h1>\
			<p>You eat the melon and your belly full</p>");		
	}			
}

function eatMelonWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.Mods.breasts < 200) {
		// Can benefit
		rival.Mods.breasts += 5;
		if (rival.Mods.breasts > 200) rival.Mods.breasts = 200;
		if (rival.physique.breasts > 30 && getRandomInt(1, 100) < 20) {
			rival.physique.breastrows += 1;
			new Message("", 
				"<h1>" + rival.name + " Eats the Melon</h1>\
				<p>" + rival.name + " eats the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little and grow a new set of breasts.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			new Message("", 
				"<h1>" + rival.name + " Eats the Melon</h1>\
				<p>" + rival.name + " eats the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		}
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Melon</h1>\
			<p>" + rival.name + " eats the melon and her belly full</p>");		
	}
}

// Small Breast Melon

function eatSmallMelonYou()
{
	if (player.Mods.breasts > -20) {
		// Can benefit
		player.Mods.breasts -= 5;
		if (player.Mods.breasts < -20) player.Mods.breasts = -20;
		new Message("Camp()", 
			"<h1>Eat the Small Melon</h1>\
			<p>You eat the melon and feel your bad ancestors spirit, you forget how to make your women feed your children.</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Small Melon</h1>\
			<p>You eat the small melon and your belly full</p>");		
	}			
}

function eatSmallMelonWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.Mods.breasts > -20) {
		// Can benefit
		rival.Mods.breasts -= 5;
		if (rival.Mods.breasts < -20) rival.Mods.breasts = -20;
		new Message("", 
			"<h1>" + rival.name + " Eats the Small Melon</h1>\
			<p>" + rival.name + " eats the small melon....</p>", true);
		setTimeout(function() {
			$("#message").append("and her breasts shrink a little.</p>\
			<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Small Melon</h1>\
			<p>" + rival.name + " eats the melon and her belly full</p>");		
	}
}

// Paw Fruit

function eatPawFruitYou()
{
	player.physique.breastrows += 1;
	if (player.physique.tail < 20) {
		player.physique.tail += 1;
		player.physique.tailtype = 3;
	}	
	redraw();
	new Message("Camp()", 
			"<h1>Eat the Fruit</h1>\
			<p>You eat the melon and feel your ancestors spirit, your chest and rear feel strange.</p>");
}

function eatPawFruitWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.breastrows += 1;
	if (rival.physique.tail < 20) {
		rival.physique.tail += 1;
		rival.physique.tailtype = 3;
	}
	new Message("", 
		"<h1>" + rival.name + " Eats the Fruit</h1>\
		<p>" + rival.name + " eats the fruit....</p>", true);
	setTimeout(function() {
		$("#message").append("and row a new set of breasts");
		if (rival.physique.tail == 1) $("#message").append(" and grows a furry tail");
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Cock Mushroom

function eatMushroomYou()
{
	if (player.Mods.cock < 20) {
		// Can benefit
		player.Mods.cock += 1;
		redraw();
		new Message("Camp()", 
			"<h1>Eat the Mushroom</h1>\
			<p>You eat the mushroom and you feel your cock stiffen and swells with the power of your ancestors!</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Mushroom</h1>\
			<p>You eat the mushroom and your belly full</p>");		
	}			
}

function eatMushroomWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.Mods.futa < 20) {
		// Can benefit
		rival.Mods.futa += 1;
		new Message("", 
			"<h1>" + rival.name + " Eats the Mushroom</h1>\
			<p>" + rival.name + " eats the mushroom....</p>", true);
		setTimeout(function() {
			if (rival.Mods.futa == 1) $("#message").append("and the power of your ancestors fill her and she grows a cock.</p>");
			else $("#message").append("and her cock swells.</p>");
			$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Mushroom</h1>\
			<p>" + rival.name + " eats the mushroom and her belly full</p>");		
	}
}

// Twin Cock Mushroom

function eatTwinMushroomYou()
{
	if (player.physique.gentialscnt != 2) {
		// Can benefit
		if (player.Mods.cock < 20) player.Mods.cock += 1;
		player.physique.gentialscnt = 2;
		redraw();
		new Message("Camp()", 
			"<h1>Eat the Split Mushroom</h1>\
			<p>You eat the mushroom and you feel your cock stiffen and swells with the power of your ancestors, but then it splits in two!</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Mushroom</h1>\
			<p>You eat the mushroom and your belly full</p>");		
	}			
}

function eatTwinMushroomWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.physique.gentialscnt != 2) {
		// Can benefit
		if (rival.Mods.futa < 20) rival.Mods.futa += 1;
		new Message("", 
			"<h1>" + rival.name + " Eats the Twin Mushroom</h1>\
			<p>" + rival.name + " eats the twin mushroom....</p>", true);
		setTimeout(function() {
			if (rival.Mods.futa == 1) $("#message").append("and the power of your ancestors fill her and she grows a pair of cocks.</p>");
			else {
				if (rival.physique.gentialscnt == 1) $("#message").append("and her cock swells and splits in two!</p>");
				else if (rival.physique.gentialscnt == 3) $("#message").append("and her cocks swells and join until there are only two!</p>");
				else $("#message").append("and her cock swells.</p>");
			}
			rival.physique.gentialscnt = 2;
			$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Mushroom</h1>\
			<p>" + rival.name + " eats the mushroom and her belly full</p>");		
	}
}

// Tri Creature

function eatTriCreatureYou()
{
	if (player.physique.gentialscnt != 3) {
		// Can benefit
		player.Mods.cock += 1;
		player.physique.gentialscnt = 3;
		redraw();
		new Message("Camp()", 
			"<h1>Eat the Tri-Seathing</h1>\
			<p>You eat the sea creature and you feel your cock stiffen and swells with the power of your ancestors, but then it splits into three cocks!</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Thing</h1>\
			<p>You eat the thing and your belly full</p>");		
	}			
}

function eatTriCreatureWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.physique.gentialscnt != 3) {
		// Can benefit
		if (rival.Mods.futa < 20) rival.Mods.futa += 1;
		new Message("", 
			"<h1>" + rival.name + " Eats the Tri-Seacreature</h1>\
			<p>" + rival.name + " eats the seathing....</p>", true);
		setTimeout(function() {
			if (rival.Mods.futa == 1) $("#message").append("and the power of your ancestors fill her and she grows three cocks.</p>");
			else {
				if (rival.physique.gentialscnt == 1) $("#message").append("and her cock swells and splits into three!</p>");
				else if (rival.physique.gentialscnt == 2) $("#message").append("and her cocks swells and split into three!</p>");
				else $("#message").append("and her cock swells.</p>");
			}
			rival.physique.gentialscnt = 3;
			$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Thing</h1>\
			<p>" + rival.name + " eats the sae creature and her belly full</p>");		
	}
}


// Balls Grapes

function eatGrapesYou()
{
	if (player.Mods.balls < 20) {
		// Can benefit
		player.Mods.balls += 1;
		redraw();
		new Message("Camp()", 
			"<h1>Eat the Grapes</h1>\
			<p>You eat the grapes and you feel your balls swell with the power of your ancestors!</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Grapes</h1>\
			<p>You eat the grapes and your belly full</p>");		
	}			
}

function eatGrapesWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.Mods.balls < 20) {
		// Can benefit
		rival.Mods.balls += 1;
		new Message("", 
			"<h1>" + rival.name + " Eats the Grapes</h1>\
			<p>" + rival.name + " eats the grapes....</p>", true);
		setTimeout(function() {
			if (rival.Mods.balls == 1) $("#message").append("and the power of your ancestors fill her and she grows a set of balls.</p>");
			else $("#message").append("and her balls swell.</p>");
			$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Grapes</h1>\
			<p>" + rival.name + " eats the grapes and her belly full</p>");		
	}
}

// Domination Nut

function eatDominationNutYou()
{
	player.submissiveness += 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	new Message("Camp()", 
		"<h1>Eat the Nut</h1>\
		<p>You eat the strong nut, but you feel your ancestors power weaken you!</p>");			
}

function eatDominationNutWoman(index)
{
	rival = player.women[index];
	rival.submissiveness += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	new Message("Camp()", 
		"<h1>" + rival.name + " Eats the Nut</h1>\
		<p>" + rival.name + " eats the nut and the power of the nut makes them more obedient.</p>");
}


// Domestic Nut

function eatDomesticNutYou()
{
	player.domesticity += 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	new Message("Camp()", 
		"<h1>Eat the Nut</h1>\
		<p>You eat the nut, but you feel your ancestors power weaken you!</p>");			
}

function eatDomesticNutWoman(index)
{
	rival = player.women[index];
	rival.domesticity += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	new Message("Camp()", 
		"<h1>" + rival.name + " Eats the Nut</h1>\
		<p>" + rival.name + " eats the nut and the power of the nut teaches them to clean your camp better.</p>");
}


// Maternal Nut

function eatMaternalNutYou()
{
	player.maternalism += 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	new Message("Camp()", 
		"<h1>Eat the Nut</h1>\
		<p>You eat the nut, but you feel your ancestors power weaken you!</p>");			
}

function eatMaternalNutWoman(index)
{
	rival = player.women[index];
	rival.maternalism += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	new Message("Camp()", 
		"<h1>" + rival.name + " Eats the Nut</h1>\
		<p>" + rival.name + " eats the nut and the power of the nut makes them ready to bear your children.</p>");
}


// Allure Nut

function eatAllureNutYou()
{
	player.allure += 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	new Message("Camp()", 
		"<h1>Eat the Nut</h1>\
		<p>You eat the nut, but you feel your ancestors power weaken you!</p>");			
}

function eatAllureNutWoman(index)
{
	rival = player.women[index];
	rival.allure += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	new Message("Camp()", 
		"<h1>" + rival.name + " Eats the Nut</h1>\
		<p>" + rival.name + " eats the pretty nut and the power of the nut make her prettier.</p>");
}


// Orientation Nut

function eatOrientationNutYou()
{
	player.orientation += 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	new Message("Camp()", 
		"<h1>Eat the Nut</h1>\
		<p>You eat the nut, but you feel your ancestors power weaken you!</p>");			
}

function eatOrientationNutWoman(index)
{
	rival = player.women[index];
	rival.orientation += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	new Message("Camp()", 
		"<h1>" + rival.name + " Eats the Nut</h1>\
		<p>" + rival.name + " eats the long nut and the power of the nut make her desire you.</p>");
}


// MilkNut

function eatMilkNutYou()
{
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += 5;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		if (player.physique.horns < 20) {
			player.physique.horns += 1;
			player.physique.hornstype = 1;
		}
		if (player.physique.tail < 20) {
			player.physique.tail += 1;
			player.physique.tailtype = 1;
		}			
		if (player.physique.breasts > 25 && getRandomInt(1, 100) < 20) player.physique.breastrows += 1;

		new Message("Camp()", 
			"<h1>Eat the Melon</h1>\
			<p>You eat the nut and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the White Nut</h1>\
			<p>You eat the nut and your belly full</p>");		
	}
	redraw();
}

function eatMilkNutWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.Mods.breasts < 200) {
		// Can benefit
		rival.Mods.breasts += 2;
		if (rival.Mods.breasts > 200) rival.Mods.breasts = 200;
		if (rival.physique.horns < 20) {
			rival.physique.horns += 1;
			rival.physique.hornstype = 1;
		}
		if (rival.physique.tail < 20) {
			rival.physique.tail += 1;
			rival.physique.tailtype = 1;
		}		
		if (rival.physique.breasts > 25 && getRandomInt(1, 100) < 20) {
			rival.physique.breastrows += 1;
			new Message("", 
				"<h1>" + rival.name + " Eats the White Nut</h1>\
				<p>" + rival.name + " eats the nut....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little and grow a new set of breasts");
				if (rival.physique.horns == 1) $("#message").append(" and grows a set of cow horns.");
				$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			new Message("", 
				"<h1>" + rival.name + " Eats the White Nut</h1>\
				<p>" + rival.name + " eats the nut....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little");
				if (rival.physique.horns == 1) $("#message").append(" and grows a set of cow horns.");
				$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		}
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the White Nut</h1>\
			<p>" + rival.name + " eats the nut and her belly full</p>");		
	}
}

// Red Nut

function eatDemonNutYou()
{
	if (player.physique.skin < 100 || player.physique.wings < 20 || player.physique.hornstype != 2 || player.physique.tailtype != 2) {
		// Can benefit
		if (player.physique.skin < 100) player.physique.skin = Math.floor(Math.random() * 2) + 100;
		if (player.physique.wings < 10) player.physique.wings++;
		if (player.physique.hornstype != 2) player.physique.hornstype = 2;
		player.physique.horns += 2;
		if (player.physique.tailtype != 2) player.physique.tailtype = 2;
		player.physique.tail += 2;

		new Message("Camp()", 
			"<h1>Eat the Red Nut</h1>\
			<p>You eat the nut and feel a surge of heat from the fires of the mountain.</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Red Nut</h1>\
			<p>You eat the nut and your belly full</p>");		
	}
	redraw();
}

function eatDemonNutWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.physique.skin < 100 || rival.physique.wings < 20 || rival.physique.hornstype != 2 || rival.physique.tailtype != 2) {
		// Can benefit
		if (rival.physique.skin < 100) {
			if (player.physique.skin > 99) rival.physique.skin = player.physique.skin;
			else rival.physique.skin = Math.floor(Math.random() * 2) + 100;
		}
		if (rival.physique.wings < 10) rival.physique.wings++;
		if (rival.physique.hornstype != 2) rival.physique.hornstype = 2;
		rival.physique.horns += 2;
		if (rival.physique.tailtype != 2) rival.physique.tailtype = 2;
		rival.physique.tail = 2;			
		new Message("", 
			"<h1>" + rival.name + " Eats the Red Nut</h1>\
			<p>" + rival.name + " eats the nut....</p>", true);
		setTimeout(function() {
			$("#message").append("and the fire of the mountain changes her body");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Red Nut</h1>\
			<p>" + rival.name + " eats the nut and her belly full</p>");		
	}
}

// Green Berry

function eatGreenBerryYou()
{
	if (player.physique.skin != 102) {
		// Can benefit
		player.physique.skin = 102;		

		new Message("Camp()", 
			"<h1>Eat the Berry</h1>\
			<p>You eat the berry and feel a flush of cold.</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Green Berry</h1>\
			<p>You eat the berry and your belly full</p>");		
	}
	redraw();
}

function eatGreenBerryWoman(index)
{
	rival = player.women[index];
	redraw();
	if (rival.physique.skin != 102) {
		// Can benefit
		rival.physique.skin = 102;	
		new Message("", 
			"<h1>" + rival.name + " Eats the Green Berry</h1>\
			<p>" + rival.name + " eats the berry....</p>", true);
		setTimeout(function() {
			$("#message").append("and a wave of green spreads over her skin.");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>" + rival.name + " Eats the Green Berry</h1>\
			<p>" + rival.name + " eats the berry and her belly full</p>");		
	}
}

// Pale Berry

function eatPaleBerryYou()
{
	player.physique.skin = getRandomInt(1, 10);		

	new Message("Camp()", 
		"<h1>Eat the Pale Berry</h1>\
		<p>You eat the berry and feel a flush of warmth.</p>");
	redraw();
}

function eatPaleBerryWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.skin = getRandomInt(1, 10);	
	new Message("", 
		"<h1>" + rival.name + " Eats the Pale Berry</h1>\
		<p>" + rival.name + " eats the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over her skin.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Pale Berry

function eatDarkBerryYou()
{
	player.physique.skin = getRandomInt(10, 20);		

	new Message("Camp()", 
		"<h1>Eat the Dark Berry</h1>\
		<p>You eat the berry and feel a flush of warmth.</p>");
	redraw();
}

function eatDarkBerryWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.skin = getRandomInt(10, 20);	
	new Message("", 
		"<h1>" + rival.name + " Eats the Dark Berry</h1>\
		<p>" + rival.name + " eats the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over her skin.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

function eatHairyNutYou()
{
    var style = player.physique.hairstyle
    if (style == 0) {
        player.physique.hairstyle = getRandomInt(1, 9);
        var conclusion = "you feel like your skull is on fire"
    }
    else if (style >= 1) {
        player.physique.hairstyle = 0;
        var conclusion = "you feel your hair fall out"
    }
    new Message("Camp()", 
        "<h1>Eat the Hairy Nut</h1>\
        <p>You eat the nut and " + conclusion + "</p>");
	redraw();
}
function eatHairyNutWoman(index)
{

	rival = player.women[index];
    var style = rival.physique.hairstyle
	redraw();
    if (style == 0) {
        rival.physique.hairstyle = getRandomInt(1, 9);
        var conclusion = "hair grows from her head."
    }
    else if (style >= 1) {
        rival.physique.hairstyle = 0;
        var conclusion = "her hair falls out."
    }
	new Message("", 
		"<h1>" + rival.name + " Eats the Hairy Nut</h1>\
		<p>" + rival.name + " eats the nut....</p>", true);
	setTimeout(function() {
		$("#message").append("and you watch as " +conclusion);
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

function eatRainbowflowerYou()
{
	player.physique.hairc = getRandomInt(1, 16);
	new Message("Camp()", 
		"<h1>Eat the Rainbow Flower</h1>\
		<p>You eat the flower and feel warmth on your scalp.</p>");
	redraw();
}

function eatRainbowflowerWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.hairc = getRandomInt(1, 16);	
	new Message("", 
		"<h1>" + rival.name + " Eats the Rainbow Flower</h1>\
		<p>" + rival.name + " eats the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over her hair.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}



// Find Thoth

function MeetThoth(){
	rival = new Avatar(50, 95, 90, 75, 80);
	rival.physique["skin"] = player.physique["skin"];
	rival.physique["hairc"] = player.physique["hairc"]; 
	updateRival();
	rival.name = "Thoth";
	redraw();
	new Message("new nameThoth()", "<h1>Thoth</h1><p>After wander three \
		day, you find track in snow. Is woman track, alone. You lift \
		nose and smell air, and her scent like she-deer in heat.</p>\
		<p>You follow track like master hunter. Soon, she found walking ahead. Her \
		gait awkward, like new woman uncomfortable in body. She breathe heavy from \
		tired and she no hear you from behind.</p>\
		<p>'Face me!' you shout at woman. 'You mine now!'</p>\
		<p>'Me belong nobody!' she shout, turning to you. She about say more when \
		she see your face. '"+player.name+"?'</p>\
		<p>You blink confused, but then woman face look familiar. Like old clansmate Thoth, \
		only soft pretty. 'Thoth?' you say.</p>\
		<p>Woman smile big and jump into arms. '"+player.name+"! I pray for this!' she say.\
		'Clansmate take me home. Bonespeaker make me no more woman!'</p>\
		<p>She breathe heavy and slow and happy, but you feel sadness. \
		'You no know?' you say. 'Clan dead. No more Bonespeaker. We only ones.'<p>\
		<p>Thoth look at you with puzzle-look. 'Cannot be,' she protest, and her eyes begin \
		cry. Before long, she sobbing loud and woman-like.</p>\
		<p>You stroke Thoth hair, and it pretty silky hair. She soft and warm in arms, \
		and you know she make good clan mother. 'We start new clan,' you say, but \
		Thoth keeping crying.</p>\
		<p>'Krelis? Gromel? Sloan? All dead?' You nod head quiet, and she wail like \
		mother losing son. You not know what do, so you keep stroke hair. She slow relax, \
		but then grow sudden tense and pull away. 'How you think we start clan?' she ask in tense whisper, and \
		when you no respond quick, she turn and start run.</p>\
		<p>'Thoth!' you shout, chasing after her. She move awkward with big woman hips and \
		not get far before stumble and fall into snow. You kneel beside her and she curl \
		into ball, back to you.</p>\
		<p>'No,' she whimper, 'no look at me.'</p>\
		<p>'Why?' you ask. 'You no be ashamed. You very pretty.'</p>\
		<p>Thoth sob bitter. 'Stupid "+player.name+". That why! Me have woman body now. How \
		me no be ashamed?' You place hand on Thoth back, and at first you expect her pull away. \
		When she no pull away, you stay like that. Soon sun begin fall, and you realize Thoth be sleeping. \
		Gentle-like, you cover her in fur and then lie beside her.</p>\
	");
}

function nameThoth(){
  $(".stats").hide();
  $("#output").html(
    "<h1>Start of New Clan</h1>\
    <p>When you wake next morning, you smell meat cooking. Thoth be tending fire, roasting \
    rabbit you caught yesterday. She give you quiet smile, then look back at rabbit meat.</p>\
    <p>'That smell good,' you say, and Thoth nod quiet.</p>\
    <p>'Me good cook now.' She gently spin roasting rabbit. 'Is strange. Me no learn cook from parent. \
    But after this--' she gesture at her woman body '--me know. Me think about cook all time. So much, \
    me trouble thinking other things.'</p>\
    <p>You nod. Woman only woman because she have woman mind. 'You make good woman,' you say.</p>\
    <p>Thoth frown. 'Careful. You make me cry again.' You laugh, and after moment Thoth start laugh, too. \
    'Me embarrassed about last night, "+player.name+". Me cry like woman.'</p>\
    <p>Thoth turn gaze back to roasting rabbit, and you sit next her and shoulders touch. \
    She lean into you, and soon her face colored blush. 'You very pretty,' you say.</p>\
    <p>'"+player.name+". . . .' she say.</p>\
    <p>'You not only think of cook, do you?' Thoth look down, shake head quiet. You place hand \
    on her soft thigh and she bite lip. 'You think of man. You want man.' Your hand travel \
    further down thigh and touch warm sex. 'Say you want man.'</p>\
    <p>Thoth take deep breath. 'Me want man,' she say, dropping rabbit in snow and crawling on top of you. 'Me want "+player.name+".'</p>\
    <p>You kiss passionate, and soon her warm sex ride up and down you. Her thick thighs squeeze you. Her soft breast fill your \
    hand. 'Me want start new clan,' she say. 'Me want be clan mother. You be clan father.'<p>\
    <p>'Thoth,' you pant, but she put finger on your mouth.</p>\
    <p>'No,' she say. 'Me your woman now. Give me woman name.' As she ask, she grind harder \
    and faster, panting like wild cat. 'Say my name, "+player.name+". Say my name!'<p/>\
    <input id='woman_name' value='"+randomFemaleName()+"'>\
    <button id='name_woman' class='btn'>Give Name</button>\
  ");
  redraw();

  $('#woman_name').click(function(){
    $("#woman_name").focus();
  })

  $("#name_woman").click(function(){
    rival.name = $("#woman_name").val().length > 0 ? $("#woman_name").val() : randomFemaleName();
    rival.dysphoria = 0;
    rival.activity = "She make camp feel warm again.";
		redraw();
		$(".stats").hide();
    player.women.push(rival);
    new Message("Camp()", "<h1>"+rival.name+"</h1>\
      <p>'"+rival.name+"!' she cry, nipple hard as rock, warm juice flowing down crotch. '"+rival.name+"!'</p>\
      <p>And you no hold it in any longer. You spray warm seed inside her. You groan \
      while "+rival.name+" moan woman-like. She yours now, filled with your seed. Soon, \
      your clan reborn.</p>\
		");
  })
}


// Meet Demon

function MeetDemon()
{
	advanceRound();
	rival = demon;
	redraw();
	if (getPlaceCnt("Volcano") == 2) {
		new Message("Camp()", "<h1>Demon!</h1><p>After wander near the fire mountain \
			day, you find tracks in the scortched earth, barefoot and a womans!\
			You hunt her, to claim her as a new woman for you clan!</p>\
			<p>You charge and she moves away, staying from your grasp and that of your ancestors. She speak oddly</p>\
			<p>'You are a new one for me to prey on, but you do seem stronger than most who become my toys.\
			I will let you go for now. Come back when you are stronger, then we will fight, either I will enslave you \
			or you will enslave me as your woman'</p>\
			<p>She laughs amused at the idea you defeat her. You furious and decide to attack any way. She smiles and her wings stretch out, she flies away!!!</p>\
			<p>You will return to capture this woman!</p>\
		");
	} else {
			new Message("Camp()", "<h1>Nothing</h1><p>You failed to hunt anything but you do see the red woman far away, you could not catch her.</p>");
	}
}
