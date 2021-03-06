//
// rival object, generally your oponent in combat, but can also be used as in intermediate object when
// reviewing your clan or meeting other people
/*jshint multistr:true*/
var rival;

// Functions
function createRival(exp)
{
	// Stats
	var femininity = getRandomInt(15, 35) - (exp / 5);		// 15-35 median for stats
	if (femininity < 6) femininity = 6;
	var minTrait = femininity - 10;
	var maxTrait = femininity + 10;
	rival = new Avatar(getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait));
	
	// Standard Victory/Defeat/Tells for Generic man
	rival.Victory = RivalVictory;
	rival.Defeat = RivalDefeat;
	rival.getTell = RivalGetTell;
	rival.spendExperience = RivalSpendExperience;
	rival.experience = exp;
	rival.goods = getRandomInt(3, 10);
	// Can they be futa, yes if the player is or any of their women
	var iFuta = player.futa;
	$.each(player.women, function( index, value ) {
		iFuta += player.women[index].Mods.futa;
	});
	rival.futa = iFuta > 0 && Math.random() < 0.2 ? player.futa : 0;
	rival.name = rival.isFemale() || rival.futa > 0 ? "Rival woman" : "Rival man";		// Generic man
	
	updateRival();
	
	rival.spendExperience();
}

function updateRival()
{
	rival.Mods.breasts = player.Mods.breasts;
	rival.Mods.amazon = player.Mods.amazon;
	rival.Mods.futa = player.Mods.futa;
}

// Reset to a average person, with stats all in the center, no bars shown
function resetRival()
{
	rival = new Avatar(50, 50, 50, 50, 50);
	redraw();
}


// Generic Man

// allocate experience
function RivalSpendExperience()
{
	if (rival.experience === 0) return;
	
	// Ranks
	var ranks = rival.experience / 5;
	
	// divide ranks up
	// Perception 20%
	var used = 0;
	var val = Math.floor(ranks / 5);
	if (val > ((player.Mods.perception / 5) - 1)) val = (player.Mods.perception / 5) - 1;
	if (val > 0) {
		rival.Mods.perception += val * 5;
		used += val;
	}
	// Changra 20%
	val = Math.floor(ranks / 5);
	if (val > 0) {
		rival.Mods.changra += val * 5;
		used += val;
	}	
	
	// Iron will
	if ((ranks - used) > 3) {
		rival.Mods.ironwill++;
		used++;
	}
	
	// Divide remaining between push and resist
	for (var i = ranks - used; i > 0; i--) {
		// TODO respect desires
		var trait = AVATAR_TRAITS[getRandomInt(1, 5)];
		if (getRandomInt(1, 100) < 50) rival.Mods["push" + trait] += 2;
		else rival.Mods["resist" + trait] += 1;
		used++;
	}
	
	//rival.experience -= used * 5;
}

// You beat them
function RivalVictory()
{
  $("#output").html(
    "<h1>You Howl!</h1>\
    <p>And unleash your spirit Changra. The air smell of burning and lightning, and then your rival crumble, weeping like woman. Her Changra burned away. She yours, and soon she forget how to be what she was. You take what <i>she</i> was carrying from their hunt.</p>\
    <p>As she quiver and snivel, you must decide on name for her.</p>\
    <input id='woman_name' value='" + getUnusedFemaleName() + "'>\
    <button id='name_woman' class='btn'>Give Name</button>\
		<button id='reject_woman' class='btn'>Reject Woman</button>\
  ");

  $('#woman_name').click(function() {
    $("#woman_name").focus();
  });

  $("#name_woman").click(function() {
    rival.name = $("#woman_name").val().length > 0 ? $("#woman_name").val() : getUnusedFemaleName();
    player.women.push(rival);
    player.experience += minValue(Math.floor(rival.femininity() / 10), 5);
		player.goods += rival.goods;
		rival.goods = 0;
    rival.round = player.round;		// day captured
    Camp();
  });
  $("#reject_woman").click(function() {
    player.experience += 5;
		player.goods += rival.goods;	
    Message("Camp();", "You no want this weakling and leave her to be claimed by another.");
  });	
}

// You lost
function RivalDefeat()
{
	var rivalhis = rival.hisher();
	var rivalhim = rival.himher();
	var fates = [];
	if (player.submissiveness > 75) {
		fates.push("meekly obeying " + rivalhis + " wishes");
	}
	if (player.domesticity > 75) {
		fates.push("spending your days tending to " + rivalhis + " household");
	}
	if (player.allure > 75) {
		fates.push("spreading your legs for " + rivalhim + " every night");
	}
	if (player.maternalism > 75) {
		fates.push("bearing " + rivalhim + " healthy sons");
	}
	if (fates.length === 0) {
		fates.push("sneaking away, though. You not man, but you refuse to be woman of this one");
	}
	var fate = toCommaSeperatedList(fates);
	var rivalhe = rival.heshe();
	var rivalmanlwr = rival.name == "Rival man" || rival.name == "Rival woman" ? rival.name.toLowerCase() : rival.name;
	fate = "<p>With mighty howl, " + rivalmanlwr + " stomp and point palm at you, " + rivalhis + " Changra surge into you, and your Changra evaporate like mist in sunlight. You collapse at " + rivalmanlwr + "'s feet, and he stare down as you pant and try collect your Changra. Finally " + rivalhe + " laugh and offer you hand.</p>\
	<p>'You have no Changra,' " + rivalhe + " say, pulling you up. 'You womanfolk. You mine now, and you be called "+randomFemaleName()+".'</p>\
	<p>You very confused, and you follow " + rivalhim + " back to clan. You struggle remember what was to be man, but those thoughts become strange to you, until finally all you know is to be woman.</p>\
	<p>" + rival.name + " in your thoughts always now. Soon, you " + fate + ".</p>";
	
	if (fates.length === 0) {
		// Escape, not feminine enough
		Message("Camp();", fate);
		return false;
	}
	
	// Captured
	$(".stats").hide();
	$("#output").html("<div id='message'>" + fate + "</div>\
		<div id='end_buttons' class='push--top'></div>\
		");

	// add choices
	$("#end_buttons").append("<button id='end_button_submit' class='btn btn-woman push--right' title='Submit'>Submit</button>");
	$("#end_button_submit").click(
		function(){
			Message("location.reload();", "You give up and submit to your man");
		}
	);
	if (player.Mods.ironwill > 0) {
		$("#end_buttons").append("<button id='end_button_resist' class='btn btn-woman push--right' title='Resist'>Resist</button>");
			$("#end_button_resist").click(
			function() {
				player.Mods.changra -= 5;
				Message("Camp();", "You resist you desire for the " + rivalmanlwr + " and run away, you weaker for this");
			}
		);
	} else $("#end_buttons").append("<p><b>You not strong in will enough to do anything else.</b></p>");
	return true;
}

// The tells they give off
function RivalGetTell(action) {

	var pushDescription = getRandomElem([
		"pound chest.",
		"yell powerful.",
		"bellow laugh.",
		"flare nostrils like dragon.",
		"stomp ground"
	]);

	var drainDescription = getRandomElem([
		"close eyes and hum to self.",
		"quiet and focus.",
		"whisper to self.",
		"close eyes and breathe deep.",
		"focused and very still."
	]);

	var reflectDescription = getRandomElem([
		"plant feed in ground and stare at you defiant.",
		"cross arms over chest.",
		"step back, arms crossed in front of face.",
		"crouch low, arms crossed in front of face.",
		"crouched and very still."
	]);

	var restDescription = getRandomElem([
		"breathe deep.",
		"panting.",
		"look pale.",
		"wipe sweat face.",
		"very still."
	]);

	var hesitateDescription = getRandomElem([
		"look uncertain.",
		"look confused.",
		"bite lip.",
		"look at ground.",
		"chew lip."
	]);

	switch(action) {
		case "push": return rival.name + " " + pushDescription;
		case "drain": return rival.name + " " + drainDescription;
		case "reflect": return rival.name + " " + reflectDescription;
		case "rest": return rival.name + " " + restDescription;
		case "hesitate": return rival.name + " " + hesitateDescription;
	}
	return "";
}