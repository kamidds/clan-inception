// Breast Melon

function eatMelonYou()
{
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += 5;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		Message("Camp()", 
			"<h1>Eat the Melon</h1>\
			<p>You eat the melon and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		Message("Camp()", 
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
			Message("", 
				"<h1>" + rival.name + " Eats the Melon</h1>\
				<p>" + rival.name + " eats the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little and grow a new set of breasts.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			Message("", 
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
		Message("Camp()", 
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
		Message("Camp()", 
			"<h1>Eat the Small Melon</h1>\
			<p>You eat the melon and feel your bad ancestors spirit, you forget how to make your women feed your children.</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
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
		Message("Camp()", 
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
	Message("Camp()", 
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
	Message("", 
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
		Message("Camp()", 
			"<h1>Eat the Mushroom</h1>\
			<p>You eat the mushroom and you feel your cock stiffen and swells with the power of your ancestors!</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
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
		Message("Camp()", 
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
		Message("Camp()", 
			"<h1>Eat the Split Mushroom</h1>\
			<p>You eat the mushroom and you feel your cock stiffen and swells with the power of your ancestors, but then it splits in two!</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
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
		Message("Camp()", 
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
		Message("Camp()", 
			"<h1>Eat the Tri-Seathing</h1>\
			<p>You eat the sea creature and you feel your cock stiffen and swells with the power of your ancestors, but then it splits into three cocks!</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
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
		Message("Camp()", 
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
		Message("Camp()", 
			"<h1>Eat the Grapes</h1>\
			<p>You eat the grapes and you feel your balls swell with the power of your ancestors!</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
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
		Message("Camp()", 
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
	Message("Camp()", 
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

	Message("Camp()", 
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
	Message("Camp()", 
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

	Message("Camp()", 
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
	Message("Camp()", 
		"<h1>Eat the Nut</h1>\
		<p>You eat the nut, but you feel your ancestors power weaken you!</p>");			
}

function eatMaternalNutWoman(index)
{
	redraw();
	rival = player.women[index];
	rival.maternalism += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("Camp()", 
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
	Message("Camp()", 
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

	Message("Camp()", 
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
	Message("Camp()", 
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

	Message("Camp()", 
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

		Message("Camp()", 
			"<h1>Eat the White Nut</h1>\
			<p>You eat the nut and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		Message("Camp()", 
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
			Message("", 
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
			Message("", 
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
		Message("Camp()", 
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

		Message("Camp()", 
			"<h1>Eat the Red Nut</h1>\
			<p>You eat the nut and feel a surge of heat from the fires of the mountain.</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
			"<h1>" + rival.name + " Eats the Red Nut</h1>\
			<p>" + rival.name + " eats the nut....</p>", true);
		setTimeout(function() {
			$("#message").append("and the fire of the mountain changes her body");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message("Camp()", 
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

		Message("Camp()", 
			"<h1>Eat the Berry</h1>\
			<p>You eat the berry and feel a flush of cold.</p>");
	} else {
		// No effect
		Message("Camp()", 
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
		Message("", 
			"<h1>" + rival.name + " Eats the Green Berry</h1>\
			<p>" + rival.name + " eats the berry....</p>", true);
		setTimeout(function() {
			$("#message").append("and a wave of green spreads over her skin.");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + rival.name + " Eats the Green Berry</h1>\
			<p>" + rival.name + " eats the berry and her belly full</p>");		
	}
}

// Pale Berry

function eatPaleBerryYou()
{
	player.physique.skin = getRandomInt(1, 10);		

	Message("Camp()", 
		"<h1>Eat the Pale Berry</h1>\
		<p>You eat the berry and feel a flush of warmth.</p>");
	redraw();
}

function eatPaleBerryWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.skin = getRandomInt(1, 10);	
	Message("", 
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

	Message("Camp()", 
		"<h1>Eat the Dark Berry</h1>\
		<p>You eat the berry and feel a flush of warmth.</p>");
	redraw();
}

function eatDarkBerryWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.skin = getRandomInt(10, 20);	
	Message("", 
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
    Message("Camp()", 
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
	Message("", 
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
	Message("Camp()", 
		"<h1>Eat the Rainbow Flower</h1>\
		<p>You eat the flower and feel warmth on your scalp.</p>");
	redraw();
}

function eatRainbowflowerWoman(index)
{
	rival = player.women[index];
	redraw();
	rival.physique.hairc = getRandomInt(1, 16);	
	Message("", 
		"<h1>" + rival.name + " Eats the Rainbow Flower</h1>\
		<p>" + rival.name + " eats the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over her hair.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}
