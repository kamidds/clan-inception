function Train()
{
	if ($("#train_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	$("#camp_feed").html(
		"<div id='train_buttons' class='push--top'></div>\
		<div id='train_display'></div>");
	
	// Iron Will
	if (player.Mods.ironwill < 4) {
		$("#train_buttons").append("<button id='train_button_12' class='btn btn-woman push--right' title='You more unstoppable!'>Iron Will+</button>");
		$("#train_button_12").click(
			function(){
				if (player.experience >= 5 && player.Mods.ironwill < 4) {
					player.experience -= 5;
					player.Mods.ironwill += 1;
					$("#train_display").append("<p>You can resist others domination better</p>");
					drawStats();
				}
				IsDoneTraining();
			}
		)
	}
	
	// Breast size increase
	$("#train_buttons").append("<button id='train_button_1' class='btn btn-woman push--right' title='Increase way new women care for children'>Mother+</button>");
	$("#train_button_1").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.breasts < 100) {
					player.experience -= 5;
					player.Mods.breasts += 10;
					$("#train_display").append("<p>Your new Women will feed their children more</p>");
					drawStats();
				} else $("#train_display").append("<p><b>No bigger possible.</b></p>");
			}
			IsDoneTraining();
		}
	)
	
	// Perception increase
	$("#train_buttons").append("<button id='train_button_2' class='btn btn-woman push--right' title='See though your enemies'>Perception+</button>");
	$("#train_button_2").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.perception += 5;
				$("#train_display").append("<p>You see more prey and enemies ways</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	
	// Changra increase
	$("#train_buttons").append("<button id='train_button_3' class='btn btn-woman push--right' title='More Power!'>Changra+</button>");
	$("#train_button_3").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.changra += 5;
				player.rest();
				$("#train_display").append("<p>You have more Power to expand your clan</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	
	// Amazon
	$("#train_buttons").append("<button id='train_button_4' class='btn btn-woman push--right' title='Strong women!'>Amazon+</button>");
	$("#train_button_4").click(
		function(){
			if (player.experience >= 5) {
					if (player.Mods.amazon < 20) {
					player.experience -= 5;
					player.Mods.amazon += 2;
					$("#train_display").append("<p>Your new women will be stronger!</p>");
					drawStats();
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	)
	
	// Cocks
	$("#train_buttons").append("<button id='train_button_5' class='btn btn-woman push--right' title='Big Cock!'>Cock+</button>");
	$("#train_button_5").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.cock < 20) {
					player.experience -= 5;
					player.Mods.cock += 2;
					if (player.Mods.cock > 20) player.Mods.cock = 20;
					$("#train_display").append("<p>Your cock will grow!</p>");
					redraw();
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	)

	// Futa
	$("#train_buttons").append("<button id='train_button_6' class='btn btn-woman push--right' title='Futa!'>Futa+</button>");
	$("#train_button_6").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.futa < 20) {
					player.experience -= 5;
					player.Mods.futa += 2;
					if (player.Mods.futa > 20) player.Mods.futa = 20;
					if (player.Mods.futa > 2) $("#train_display").append("<p>Your women will have bigger cocks!</p>");
					else $("#train_display").append("<p>Your women will also have cocks!</p>");
					drawStats();
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	)
	
	$("#train_buttons").append("<br>");
	
	// Push Dominance
	$("#train_buttons").append("<button id='train_button_8' class='btn btn-woman push--right' title='Force Submissiveness more!'>Submissiveness+</button>");
	$("#train_button_8").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushsubmissiveness += 2;
				$("#train_display").append("<p>You make others more submissive!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Push Domesticity
	$("#train_buttons").append("<button id='train_button_9' class='btn btn-woman push--right' title='Force Domesticity more!'>Domesticity+</button>");
	$("#train_button_9").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushdomesticity += 2;
				$("#train_display").append("<p>You make others more domestic!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Push Maternalism
	$("#train_buttons").append("<button id='train_button_7' class='btn btn-woman push--right' title='Force Maternalism more!'>Maternalism+</button>");
	$("#train_button_7").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushmaternalism += 2;
				$("#train_display").append("<p>You make others more of a mother!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Push Allure
	$("#train_buttons").append("<button id='train_button_10' class='btn btn-woman push--right' title='Force Alure more!'>Allure+</button>");
	$("#train_button_10").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushallure += 2;
				$("#train_display").append("<p>You make others more pretty!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Push Orientation
	$("#train_buttons").append("<button id='train_button_11' class='btn btn-woman push--right' title='Force Orientation more!'>Orientation+</button>");
	$("#train_button_11").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushorientation += 2;
				$("#train_display").append("<p>You make others desire you more</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	
	$("#train_buttons").append("<br>");
	
	// Resist Dominance
	$("#train_buttons").append("<button id='train_button_13' class='btn btn-woman push--right' title='Resist Submissiveness!'>Resist Submissiveness</button>");
	$("#train_button_13").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistsubmissiveness += 1;
				$("#train_display").append("<p>You not beome a follower so easily!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	
	// Resist Domesticity
	$("#train_buttons").append("<button id='train_button_14' class='btn btn-woman push--right' title='Resist Domesticity!'>Resist Domesticity</button>");
	$("#train_button_14").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistdomesticity += 1;
				$("#train_display").append("<p>You not become one to look after camp so easily!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Resist Maternalism
	$("#train_buttons").append("<button id='train_button_15' class='btn btn-woman push--right' title='Resist Maternalism!'>Resist Maternalism</button>");
	$("#train_button_15").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistmaternalism += 1;
				$("#train_display").append("<p>You not become a mother so easily!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Resist Allure
	$("#train_buttons").append("<button id='train_button_16' class='btn btn-woman push--right' title='Resist Alure!'>Resist Allure</button>");
	$("#train_button_16").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistallure += 1;
				$("#train_display").append("<p>You not become pretty so easily!</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
	// Resist Orientation
	$("#train_buttons").append("<button id='train_button_17' class='btn btn-woman push--right' title='Resist Orientation!'>Resist Orientation</button>");
	$("#train_button_17").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistorientation += 1;
				$("#train_display").append("<p>You not gain desire as much</p>");
				drawStats();
			}
			IsDoneTraining();
		}
	)
}

function IsDoneTraining()
{
	if (player.experience <= 0) {
		$("#exp_button").hide();
		$("#train_buttons").hide();
		$("#train_display").append("<p><b>You no know how to train more.</b></p>");
	}
}