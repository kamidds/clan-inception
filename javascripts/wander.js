// Exploring/Hunting

function Wander()
{
	if ($("#wander_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();
	
	$("#camp_feed").html(
		"<h2>Where do you hunt?</h2>\
		<div id='wander_buttons' class='push--top'></div>\
		<div id='wander_display'></div>");
	
	// add places
	$("#wander_buttons").append("\
		<button id='wander_button_forest' class='btn btn-woman push--right' title='Forest'>Forest</button>\
		<button id='wander_button_hills' class='btn btn-woman push--right' title='Hills'>Hills</button>\
		<button id='wander_button_swamp' class='btn btn-woman push--right' title='Swamp'>Swamp</button>\
		<button id='wander_button_beach' class='btn btn-woman push--right' title='Beach'>Beach</button>\
	");
	$("#wander_button_forest").click(
		function(){
			var val = getRandomInt(1, 30);
			if (val < 6) WanderNothing();
			else if (val > 5 && val < 11) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
			else if (val > 10 && val < 16) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
			else if (val > 15 && val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else WanderBattle();
		}
	);
	$("#wander_button_hills").click(
		function(){
			var val = getRandomInt(1, 30);
			if (val < 6) WanderNothing();
			else if (val > 5 && val < 10) WanderFood("<h1>Found: Clean Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDomesticNutYou", "eatDomesticNutWoman");
			else if (val > 9 && val < 16) WanderFood("<h1>Found: Long Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatOrientationNutYou", "eatOrientationNutWoman");
			else if (val > 15 && val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else WanderBattle();
		}
	);
	$("#wander_button_swamp").click(
		function(){
			var val = getRandomInt(1, 35);
			if (val < 6) WanderNothing();
			else if (val > 5 && val < 15) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman");
			else if (val > 14 && val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val > 19 && val < 25) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman");
			else WanderBattle();
		}
	);
	$("#wander_button_beach").click(
		function(){
			var val = getRandomInt(1, 30);
			if (val < 6) WanderNothing();
			else if (val > 5 && val < 10) WanderFood("<h1>Found: Swollen Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatMaternalNutYou", "eatMaternalNutWoman");
			else if (val > 9 && val < 15) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman");
			else if (val > 14 && val < 20) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman");			
			else WanderBattle();
		}
	);	
}


// Find a rival

function WanderBattle()
{
	advanceRound();
  if (player.women.length == 0){
		MeetThoth();
		return;
	}
	
  new Message("new Battle(getRandomInt(15, 35))", "<h1>Wandering</h1>\
		<p>You wander through snow forest until spot lone man. He see you and grin. He think \
		you become womanfolk of his clan. He wrong.</p>");
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
	$("#eat_buttons").append("<button id='eat_button_throw' class='btn btn-woman push--right'>Throw Away</button>");
	$("#eat_button_throw").click(function(){
		new Message("Camp()", "<h1>Throw Away</h1><p>You thow the thing away.</p>");
	});		
}

// Breast Melon

function eatMelonYou()
{
	if (player.Mods.breasts < 100) {
		// Can benefit
		player.Mods.breasts += 5;
		if (player.Mods.breasts > 100) player.Mods.breasts = 100;
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


// Cock Mushroom

function eatMushroomYou()
{
	if (player.Mods.cock < 20) {
		// Can benefit
		player.Mods.cock += 1;
		redraw();
		new Message("Camp()", 
			"<h1>Eat the Mushroom</h1>\
			<p>You eat the mushroom and you feel your cock stiffens and swells with the power of your ancestors!</p>");
	} else {
		// No effect
		new Message("Camp()", 
			"<h1>Eat the Melon</h1>\
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