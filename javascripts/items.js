/*jshint multistr:true*/
var ITEM_STATCHANGE = 10;		// constant

function YouEatTitle(bCooked) { return bCooked ? "Eat Cooked" : "Eat"; }
function YouEatDescription(bCooked) { return !bCooked ? "You eat the" : "You call on your ancestors and eat the"; }
function WomanEatTitle(bCooked) { return bCooked ? "Eats Cooked" : "Eats"; }
function WomanEatDescription(bCooked) { return !bCooked ? rival.name + " eats" : "You call on your ancestors and " + rival.name + " eats"; }

// Breast Melon

function eatMelonYou(bCooked)
{
	if (bCooked) player.goods--;
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += bCooked ? 7 : 5;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Melon</h1>\
			<p>" + YouEatDescription(bCooked) + " melon and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Melon</h1>\
			<p>" + YouEatDescription(bCooked) + " melon and your belly full</p>");		
	}			
}

function eatMelonWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	if (rival.Mods.breasts < 200) {
		// Can benefit
		rival.Mods.breasts += bCooked ? 7 : 5;
		if (rival.Mods.breasts > 200) rival.Mods.breasts = 200;
		var ch = bCooked ? 80 : 20;
		if (rival.physique.breasts > 30 && getRandomInt(1, 100) < ch) {
			rival.physique.breastrows += 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Melon</h1>\
				<p>" + WomanEatDescription(bCooked) + " the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and " + rival.hisher() + " breasts swell a little and grow a new set of breasts.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Melon</h1>\
				<p>" + WomanEatDescription(bCooked) + " the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and " + rival.hisher() + " breasts swell a little.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		}
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Melon</h1>\
			<p>" + WomanEatDescription(bCooked) + " the melon and " + rival.hisher() + " belly full</p>");		
	}
}

// Small Breast Melon

function eatSmallMelonYou(bCooked)
{
	if (bCooked) player.goods--;
	if (player.Mods.breasts > -20) {
		// Can benefit
		player.Mods.breasts -= bCooked ? 7 : 5;
		if (player.Mods.breasts < -20) player.Mods.breasts = -20;
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Small Melon</h1>\
			<p>" + YouEatDescription(bCooked) + " melon and feel your bad ancestors spirit, you forget how to make your women feed your children.</p>");
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Small Melon</h1>\
			<p>" + YouEatDescription(bCooked) + " small melon and your belly full</p>");		
	}			
}

function eatSmallMelonWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	if (rival.Mods.breasts > -20) {
		// Can benefit
		rival.Mods.breasts -= bCooked ? 7 : 5;
		if (rival.Mods.breasts < -20) rival.Mods.breasts = -20;
		Message("", 
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Small Melon</h1>\
			<p>" + WomanEatDescription(bCooked) + " the small melon....</p>", true);
		setTimeout(function() {
			$("#message").append("and " + rival.hisher() + " breasts shrink a little.</p>\
			<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Small Melon</h1>\
			<p>" + WomanEatDescription(bCooked) + " the melon and " + rival.hisher() + " belly full</p>");		
	}
}

// Paw Fruit

function eatPawFruitYou(bCooked)
{
	if (bCooked) player.goods--;
	player.physique.breastrows += bCooked ? 2 : 1;
	if (player.physique.tail < 20) {
		player.physique.tail += 1;
		player.physique.tailtype = 3;
	}	
	redraw();
	Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Fruit</h1>\
			<p>" + YouEatDescription(bCooked) + " melon and feel your ancestors spirit, your chest and rear feel strange.</p>");
}

function eatPawFruitWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	rival.physique.breastrows += bCooked ? 2 : 1;
	if (rival.physique.tail < 20) {
		rival.physique.tail += 1;
		rival.physique.tailtype = 3;
	}
	Message("", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Fruit</h1>\
		<p>" + WomanEatDescription(bCooked) + " the fruit....</p>", true);
	setTimeout(function() {
		$("#message").append("and row a new set of breasts");
		if (rival.physique.tail == 1) $("#message").append(" and grows a furry tail");
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Cock Mushroom

function eatMushroomYou(bCooked)
{
	if (!bCooked) {
		if (player.Mods.cock < 20) {
			// Can benefit
			player.Mods.cock += 1;
			redraw();
			Message("Camp()", 
				"<h1>" + YouEatTitle(bCooked) + " Mushroom</h1>\
				<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cock stiffen and swells with the power of your ancestors!</p>");
			return;
		}
	} else {
		player.goods--;
		if (player.Mods.cock > 0) {
			// Can benefit
			player.Mods.cock -= 1;
			redraw();
			Message("Camp()", 
				"<h1>" + YouEatTitle(bCooked) + " Mushroom</h1>\
				<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cock soften and shrink with the power of your ancestors!</p>");
			return;
		}	
	}
	// No effect
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Mushroom</h1>\
		<p>" + YouEatDescription(bCooked) + " mushroom and your belly full</p>");		
}

function eatMushroomWoman(index, bCooked)
{
	rival = player.women[index];
	redraw();	
	if (bCooked) {
		player.goods--;
		if (rival.Mods.futa > 0) {
			// Can benefit
			rival.Mods.futa -= 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked) + " the mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.futa == 0) $("#message").append("and the power of your ancestors fill " + rival.himher() + " and " + rival.hisher() + " cock vanishes.</p>");
				else $("#message").append("and " + rival.hisher() + " cock shrinks.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.Mods.futa < 20) {
			// Can benefit
			rival.Mods.futa += bCooked ? 2 : 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked) + " the mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.futa == 1) $("#message").append("and the power of your ancestors fill " + rival.hisher() + " and " + rival.heshe() + " grows a cock.</p>");
				else $("#message").append("and " + rival.hisher() + " cock swells.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	}
	// No effect
	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Mushroom</h1>\
		<p>" + WomanEatDescription(bCooked) + " the mushroom and " + rival.hisher() + " belly full</p>");	
}

// Twin Cock Mushroom

function eatTwinMushroomYou(bCooked)
{
	if (bCooked) {
		player.goods--;
		if (player.physique.gentialscnt == 2 || player.physique.gentialscnt == 3) {
			// Can benefit
			if (player.Mods.cock > 0) player.Mods.cock -= 1;
			if (player.physique.gentialscnt == 3) player.physique.gentialscnt = 2;
			else player.physique.gentialscnt = 1;
			redraw();
			if (player.physique.gentialscnt == 2) {
				Message("Camp()", 
					"<h1>" + YouEatTitle(bCooked) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cocks stiffen and they merge into a pair of cocks!</p>");
			} else {
				Message("Camp()", 
					"<h1>" + YouEatTitle(bCooked) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cocks stiffen and they merge into a single cock!</p>");
			}
			return;
		}	
	} else {
		if (player.physique.gentialscnt != 2) {
			// Can benefit
			if (player.Mods.cock < 20) player.Mods.cock += 1;
			if (player.physique.gentialscnt == 1) {
				Message("Camp()", 
					"<h1>" + YouEatTitle(bCooked) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cock stiffen and swells with the power of your ancestors, but then it splits in two!</p>");
			} else {
				Message("Camp()", 
					"<h1>" + YouEatTitle(bCooked) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cocks stiffen and swells with the power of your ancestors, but then they merge into two cocks!</p>");				
			}
			player.physique.gentialscnt = 2;
			redraw();				
			return;
		}
	}
	// No effect
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Mushroom</h1>\
		<p>" + YouEatDescription(bCooked) + " mushroom and your belly full</p>");		
}

function eatTwinMushroomWoman(index, bCooked)
{
	rival = player.women[index];
	redraw();	
	if (bCooked) {
		player.goods--;
		if (rival.physique.gentialscnt == 2 || rival.physique.gentialscnt == 3) {
			// Can benefit
			if (rival.Mods.futa > 0) rival.Mods.futa -= 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Twin Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked) + " the twin mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.futa == 0) $("#message").append("and the power of your ancestors fill " + rival.himher() + " and " + rival.hisher() + " cocks vanish.</p>");
				else {
					if (rival.physique.gentialscnt == 3) $("#message").append("and " + rival.hisher() + " cocks shrink and merge into a two cocks!</p>");
					else if (rival.physique.gentialscnt == 2) $("#message").append("and " + rival.hisher() + " cocks swells and join until you have a single cock only!</p>");
					else $("#message").append("and " + rival.hisher() + " cock shrinks.</p>");
				}
				if (rival.physique.gentialscnt == 3) rival.physique.gentialscnt = 2;
				else rival.physique.gentialscnt = 1;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.physique.gentialscnt != 2) {
			// Can benefit
			if (rival.Mods.futa < 20) rival.Mods.futa += 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Twin Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked) + " the twin mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.futa == 1) $("#message").append("and the power of your ancestors fill " + rival.himher() + " and " + rival.heshe() + " grows a pair of cocks.</p>");
				else {
					if (rival.physique.gentialscnt == 1) $("#message").append("and " + rival.hisher() + " cock swells and splits in two!</p>");
					else if (rival.physique.gentialscnt == 3) $("#message").append("and " + rival.hisher() + " cocks swells and join until there are only two!</p>");
					else $("#message").append("and " + rival.hisher() + " cock swells.</p>");
				}
				rival.physique.gentialscnt = 2;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	}
	// No effect
	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Mushroom</h1>\
		<p>" + WomanEatDescription(bCooked) + " the mushroom and " + rival.hisher() + " belly full</p>");		
}

// Tri Creature

function eatTriCreatureYou(bCooked)
{
	if (bCooked) {
		player.goods--;
		if (player.physique.gentialscnt == 2 || player.physique.gentialscnt == 3) {
			// Can benefit
			if (player.Mods.cock > 0) player.Mods.cock -= 1;
			if (player.physique.gentialscnt == 3) player.physique.gentialscnt = 2;
			else player.physique.gentialscnt = 1;
			redraw();
			if (player.physique.gentialscnt == 2) {
				Message("Camp()", 
					"<h1>" + YouEatTitle(bCooked) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cocks stiffen and they merge into a pair of cocks!</p>");
			} else {
				Message("Camp()", 
					"<h1>" + YouEatTitle(bCooked) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked) + " mushroom and you feel your cocks stiffen and they merge into a single cock!</p>");
			}
			return;
		}
	} else {
		if (player.physique.gentialscnt != 3) {
			// Can benefit
			player.Mods.cock += 1;
			player.physique.gentialscnt = 3;
			redraw();
			Message("Camp()", 
				"<h1>" + YouEatTitle(bCooked) + " Tri-Seathing</h1>\
				<p>" + YouEatDescription(bCooked) + " sea creature and you feel your cock stiffen and swells with the power of your ancestors, but then it splits into three cocks!</p>");
			return;
		}
	}
	
	// No effect
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Thing</h1>\
		<p>" + YouEatDescription(bCooked) + " thing and your belly full</p>");	
}

function eatTriCreatureWoman(index, bCooked)
{
	rival = player.women[index];
	redraw();
	if (bCooked) {
		player.goods--;
		if (rival.physique.gentialscnt == 2 || rival.physique.gentialscnt == 3) {
			// Can benefit
			if (rival.Mods.futa > 0) rival.Mods.futa -= 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Tri-Seacreature</h1>\
				<p>" + WomanEatDescription(bCooked) + " the seathing....</p>", true);
			setTimeout(function() {
				if (rival.Mods.futa == 0) $("#message").append("and the power of your ancestors fill " + rival.himher() + " and " + rival.hisher() + " cocks vanish.</p>");
				else {
					if (rival.physique.gentialscnt == 3) $("#message").append("and " + rival.hisher() + " cocks shrink and merge into a two cocks!</p>");
					else if (rival.physique.gentialscnt == 2) $("#message").append("and " + rival.hisher() + " cocks swells and join until you have a single cock only!</p>");
					else $("#message").append("and " + rival.hisher() + " cock shrinks.</p>");
				}
				if (rival.physique.gentialscnt == 3) rival.physique.gentialscnt = 2;
				else rival.physique.gentialscnt = 1;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.physique.gentialscnt != 3) {
			// Can benefit
			if (rival.Mods.futa < 20) rival.Mods.futa += 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Tri-Seacreature</h1>\
				<p>" + WomanEatDescription(bCooked) + " the seathing....</p>", true);
			setTimeout(function() {
				if (rival.Mods.futa == 1) $("#message").append("and the power of your ancestors fill " + rival.hisher() + " and " + rival.heshe() + " grows three cocks.</p>");
				else {
					if (rival.physique.gentialscnt == 1) $("#message").append("and " + rival.hisher() + " cock swells and splits into three!</p>");
					else if (rival.physique.gentialscnt == 2) $("#message").append("and " + rival.hisher() + " cocks swells and split into three!</p>");
					else $("#message").append("and " + rival.hisher() + " cock swells.</p>");
				}
				rival.physique.gentialscnt = 3;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}		
	}
	// No effect
	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Thing</h1>\
		<p>" + WomanEatDescription(bCooked) + " the sae creature and " + rival.hisher() + " belly full</p>");
}


// Balls Grapes

function eatGrapesYou(bCooked)
{
	if (bCooked) {
		player.goods--;
		if (player.Mods.balls > 0) {
			// Can benefit
			player.Mods.balls -= 1;
			redraw();
			Message("Camp()", 
				"<h1>" + YouEatTitle(bCooked) + " Grapes</h1>\
				<p>" + YouEatDescription(bCooked) + " grapes and you feel your balls shrink with the power of your ancestors!</p>");
			return;
		}
	} else {
		if (player.Mods.balls < 20) {
			// Can benefit
			player.Mods.balls += 1;
			redraw();
			Message("Camp()", 
				"<h1>" + YouEatTitle(bCooked) + " Grapes</h1>\
				<p>" + YouEatDescription(bCooked) + " grapes and you feel your balls swell with the power of your ancestors!</p>");
			return;
		}			
	}
	// No effect
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Grapes</h1>\
		<p>" + YouEatDescription(bCooked) + " grapes and your belly full</p>");			
}

function eatGrapesWoman(index, bCooked)
{
	rival = player.women[index];
	redraw();
	
	if (bCooked) {
		player.goods--;
		if (rival.Mods.balls > 0) {
			// Can benefit
			rival.Mods.balls -= 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Grapes</h1>\
				<p>" + WomanEatDescription(bCooked) + " the grapes....</p>", true);
			setTimeout(function() {
				if (rival.Mods.balls == 0) $("#message").append("and the power of your ancestors fill " + rival.hisher() + " and " + rival.hisher() + " balls vanish.</p>");
				else $("#message").append("and " + rival.hisher() + " balls shrink.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.Mods.balls < 20) {
			// Can benefit
			rival.Mods.balls += 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Grapes</h1>\
				<p>" + WomanEatDescription(bCooked) + " the grapes....</p>", true);
			setTimeout(function() {
				if (rival.Mods.balls == 1) $("#message").append("and the power of your ancestors fill " + rival.hisher() + " and " + rival.heshe() + " grows a set of balls.</p>");
				else $("#message").append("and " + rival.hisher() + " balls swell.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}		
	}
	// No effect
	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Grapes</h1>\
		<p>" + WomanEatDescription(bCooked) + " the grapes and " + rival.hisher() + " belly full</p>");		
}

// Domination Nut

function eatDominationNutYou(bCooked)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("submissiveness", val);
	player.submissiveness += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Nut</h1>\
		<p>" + YouEatDescription(bCooked) + " strong nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>");			
}

function eatDominationNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;	
	rival.changeNatural("submissiveness", val);
	rival.submissiveness += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Nut</h1>\
		<p>" + WomanEatDescription(bCooked) + " the nut and the power of the nut makes " + rival.himher() + " more " + (bCooked ? "dominant" : "obedient") + ".</p>");
}


// Domestic Nut

function eatDomesticNutYou(bCooked)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;	
	player.changeNatural("domesticity", val);
	player.domesticity += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Nut</h1>\
		<p>" + YouEatDescription(bCooked) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>");			
}

function eatDomesticNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	rival.changeNatural("domesticity", val);
	rival.domesticity += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Nut</h1>\
		<p>" + WomanEatDescription(bCooked) + " the nut and the power of the nut teaches " + rival.himher() + " to " + (bCooked ? "to explore and hunt" : "better clean your camp") + ".</p>");
}


// Maternal Nut

function eatMaternalNutYou(bCooked)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("maternalism", val);
	player.maternalism += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Nut</h1>\
		<p>" + YouEatDescription(bCooked) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>");			
}

function eatMaternalNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	redraw();
	rival = player.women[index];
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;	
	rival.changeNatural("maternalism", val);
	rival.maternalism += val;
	rival.capTraits();
	rival.calcPhysique();

	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Nut</h1>\
		<p>" + WomanEatDescription(bCooked) + " the nut...</p>");
		
	setTimeout(function(){ 
		$("#message").append(" and the power of the nut makes " + rival.himher() + " " + (bCooked ? "better to father children" : "better to bear your children") + ".</p>");
		redraw(); 
		
	}, 1000);
}


// Allure Nut

function eatAllureNutYou(bCooked)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("allure", val);
	player.allure += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Nut</h1>\
		<p>" + YouEatDescription(bCooked) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>");			
}

function eatAllureNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;	
	rival.changeNatural("allure", val);	
	rival.allure += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Nut</h1>\
		<p>" + WomanEatDescription(bCooked) + " the pretty nut and the power of the nut make " + rival.himher() + " " + (bCooked ? "handsome" : "prettier") + ".</p>");
}


// Orientation Nut

function eatOrientationNutYou(bCooked)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;	
	player.changeNatural("orientation", val);
	player.orientation += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Nut</h1>\
		<p>" + YouEatDescription(bCooked) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>");			
}

function eatOrientationNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;	
	rival.changeNatural("orientation", val);	
	rival.orientation += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("Camp()", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Nut</h1>\
		<p>" + WomanEatDescription(bCooked) + " the long nut and the power of the nut make " + rival.himher() + " " + (bCooked ? "no desire" : "desire") + " you.</p>");
}


// MilkNut

function eatMilkNutYou(bCooked)
{
	if (bCooked) player.goods--;
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += bCooked ? 7 : 5;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		if (player.physique.horns < 20) {
			player.physique.horns += 1;
			player.physique.hornstype = 1;
		}
		if (player.physique.tail < 20) {
			player.physique.tail += 1;
			player.physique.tailtype = 1;
		}
		var ch = bCooked ? 80 : 20;
		if (player.physique.breasts > 25 && getRandomInt(1, 100) < ch) player.physique.breastrows += 1;

		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " White Nut</h1>\
			<p>" + YouEatDescription(bCooked) + " nut and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " White Nut</h1>\
			<p>" + YouEatDescription(bCooked) + " nut and your belly full</p>");		
	}
	redraw();
}

function eatMilkNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	if (rival.Mods.breasts < 200) {
		// Can benefit
		rival.Mods.breasts += bCooked ? 3 : 2;
		if (rival.Mods.breasts > 200) rival.Mods.breasts = 200;
		if (rival.physique.horns < 20) {
			rival.physique.horns += 1;
			rival.physique.hornstype = 1;
		}
		if (rival.physique.tail < 20) {
			rival.physique.tail += 1;
			rival.physique.tailtype = 1;
		}
		var ch = bCooked ? 80 : 20;
		if (rival.physique.breasts > 25 && getRandomInt(1, 100) < ch) {
			rival.physique.breastrows += 1;
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " White Nut</h1>\
				<p>" + WomanEatDescription(bCooked) + " the nut....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little and grow a new set of breasts");
				if (rival.physique.horns == 1) $("#message").append(" and grows a set of cow horns.");
				$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			Message("", 
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " White Nut</h1>\
				<p>" + WomanEatDescription(bCooked) + " the nut....</p>", true);
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
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " White Nut</h1>\
			<p>" + WomanEatDescription(bCooked) + " the nut and " + rival.hisher() + " belly full</p>");		
	}
}

// Red Nut

function eatDemonNutYou(bCooked)
{
	if (bCooked) player.goods--;
	if (player.physique.skin < 100 || player.physique.wings < 20 || player.physique.hornstype != 2 || player.physique.tailtype != 2) {
		// Can benefit
		if (player.physique.skin < 100) player.physique.skin = Math.floor(Math.random() * 2) + 100;
		if (player.physique.wings < 10) player.physique.wings++;
		if (player.physique.hornstype != 2) player.physique.hornstype = 2;
		player.physique.horns += 2;
		if (player.physique.tailtype != 2) player.physique.tailtype = 2;
		player.physique.tail += 2;

		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Red Nut</h1>\
			<p>" + YouEatDescription(bCooked) + " nut and feel a surge of heat from the fires of the mountain.</p>");
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Red Nut</h1>\
			<p>" + YouEatDescription(bCooked) + " nut and your belly full</p>");		
	}
	redraw();
}

function eatDemonNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
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
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Red Nut</h1>\
			<p>" + WomanEatDescription(bCooked) + " the nut....</p>", true);
		setTimeout(function() {
			$("#message").append("and the fire of the mountain changes " + rival.hisher() + " body");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Red Nut</h1>\
			<p>" + WomanEatDescription(bCooked) + " the nut and " + rival.hisher() + " belly full</p>");		
	}
}

// Green Berry

function eatGreenBerryYou(bCooked)
{
	if (bCooked) player.goods--;
	if (player.physique.skin != 102) {
		// Can benefit
		player.physique.skin = 102;		

		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Berry</h1>\
			<p>" + YouEatDescription(bCooked) + " berry and feel a flush of cold.</p>");
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Green Berry</h1>\
			<p>" + YouEatDescription(bCooked) + " berry and your belly full</p>");		
	}
	redraw();
}

function eatGreenBerryWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	if (rival.physique.skin != 102) {
		// Can benefit
		rival.physique.skin = 102;	
		Message("", 
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Green Berry</h1>\
			<p>" + WomanEatDescription(bCooked) + " the berry....</p>", true);
		setTimeout(function() {
			$("#message").append("and a wave of green spreads over " + rival.hisher() + " skin.");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message("Camp()", 
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Green Berry</h1>\
			<p>" + WomanEatDescription(bCooked) + " the berry and " + rival.hisher() + " belly full</p>");		
	}
}

// Pale Berry

function eatPaleBerryYou(bCooked)
{
	if (bCooked) player.goods--;
	player.physique.skin = getRandomInt(1, 10);		

	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Pale Berry</h1>\
		<p>" + YouEatDescription(bCooked) + " berry and feel a flush of warmth.</p>");
	redraw();
}

function eatPaleBerryWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	rival.physique.skin = getRandomInt(1, 10);	
	Message("", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Pale Berry</h1>\
		<p>" + WomanEatDescription(bCooked) + " the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over " + rival.hisher() + " skin.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Pale Berry

function eatDarkBerryYou(bCooked)
{
	if (bCooked) player.goods--;
	player.physique.skin = getRandomInt(10, 20);		

	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Dark Berry</h1>\
		<p>" + YouEatDescription(bCooked) + " berry and feel a flush of warmth.</p>");
	redraw();
}

function eatDarkBerryWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	rival.physique.skin = getRandomInt(10, 20);	
	Message("", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Dark Berry</h1>\
		<p>" + WomanEatDescription(bCooked) + " the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over " + rival.hisher() + " skin.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

function eatHairyNutYou(bCooked)
{
	if (bCooked) player.goods--;
	var style = player.physique.hairstyle;
	var conclusion;
	if (style === 0) {
			player.physique.hairstyle = getRandomInt(1, 9);
			conclusion = "you feel like your skull is on fire";
	}
	else if (style >= 1) {
			player.physique.hairstyle = 0;
			conclusion = "you feel your hair fall out";
	}
	Message("Camp()", 
			"<h1>" + YouEatTitle(bCooked) + " Hairy Nut</h1>\
			<p>" + YouEatDescription(bCooked) + " nut and " + conclusion + "</p>");
	redraw();
}

function eatHairyNutWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	var style = rival.physique.hairstyle;
	var conclusion;
	redraw();
	if (style === 0) {
			rival.physique.hairstyle = getRandomInt(1, 9);
			conclusion = "hair grows from " + rival.hisher() + " head.";
	}
	else if (style >= 1) {
			rival.physique.hairstyle = 0;
			conclusion = rival.hisher() + " hair falls out.";
	}
	Message("", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Hairy Nut</h1>\
		<p>" + WomanEatDescription(bCooked) + " the nut....</p>", true);
	setTimeout(function() {
		$("#message").append("and you watch as " +conclusion);
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

function eatRainbowflowerYou(bCooked)
{
	if (bCooked) player.goods--;
	player.physique.hairc = getRandomInt(1, 16);
	Message("Camp()", 
		"<h1>" + YouEatTitle(bCooked) + " Rainbow Flower</h1>\
		<p>" + YouEatDescription(bCooked) + " flower and feel warmth on your scalp.</p>");
	redraw();
}

function eatRainbowflowerWoman(index, bCooked)
{
	if (bCooked) player.goods--;
	rival = player.women[index];
	redraw();
	rival.physique.hairc = getRandomInt(1, 16);	
	Message("", 
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked) + " Rainbow Flower</h1>\
		<p>" + WomanEatDescription(bCooked) + " the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over " + rival.hisher() + " hair.");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}
