//
// People you can encounter

// Demon at the Volcano
var demon;

function createDemon()
{
	demon = new Avatar(0, 50, 100, 100, 50);
	demon.physique.skin = 100;
	demon.physique.horns = 10;
	demon.physique.hornstype = 2;
	demon.physique.tail = 10;
	demon.physique.tailtype = 2;
	demon.physique.wings = 1;
	demon.physique.hairc = "black";
	demon.physique.irisc = "red";
	demon.Mods.ironwill = 4;
	demon.Mods.breasts = 12;
	demon.Mods.changra = 50;
	demon.Mods.perception = 4;
	demon.Mods.amazon = 1;
	demon.Mods.pushsubmissiveness = 4;
	demon.Mods.pushdomesticity = 4;
	demon.Mods.pushmaternalism = 4;
	demon.Mods.pushallure = 4;
	demon.Mods.pushorientation = 4;
	demon.Mods.resistsubmissiveness = 6;
	demon.Mods.resistdomesticity = 6;
	demon.Mods.resistmaternalism = 6;
	demon.Mods.resistallure = 6;
	demon.Mods.resistorientation = 6;
	demon.name = "Demona";
}

// Meet Demon

function MeetDemon()
{
	advanceRound();
	rival = demon;
	redraw();
	if (getPlaceCnt("Volcano") == 2) {
		Message("Camp()", "<h1>Demon!</h1><p>After wander near the fire mountain \
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
			Message("Camp()", "<h1>Nothing</h1><p>You failed to hunt anything but you do see the red woman far away, you could not catch her.</p>");
	}
}


// Smith
var smith;

function createSmith()
{
	createRival(20);
	smith = rival;
	
	smith.Mods.amazon = 2;
	smith.Mods.breasts = 6;
	smith.submissiveness = 0;
  smith.domesticity = 80;
  smith.maternalism = 65;
  smith.allure = 100;
  smith.orientation = 80;
	smith.futa = 0;

	smith.Mods.infuse = 1;
	smith.name = "Anhk";
}

// Meet Smith

function MeetSmith()
{
	advanceRound();
	rival = smith;
	rival.round = player.round;
	redraw();
	Message("Camp()", "<h1>Another Clan!</h1><p>You wander looking for man to claim for your clan \
		and you come across another clan, huts and fires. You cautious and approach,\
		but no man meet you but a woman!</p>\
		<p>You prepare your changra to fight for her but sh speak</p>\
		<p>'Wait! This is my clan and you no beat me easily. Why not we trade, no fight!'</p>\
		<p>Strange woman, how a woman be head of clan? Still you can fight another time so you sit with her and talk. She know many things you do not and talks of how to make things and how to use your ancestors to make things stronger.</p>\
		<p>Maybe you return one day and learn more from her</p>\
	");
}


// Trade with the Smith
function TradeSmith()
{
	advanceRound();
	rival = smith;
	redraw();
	var canTeach = player.Mods.infuse == 0;
	if (canTeach) {
		$(".stats").hide();
		$("#output").html("<h1>Trading</h1><p>You meet the woman and her clan again and talk of making and ancestors. She tell you she can teach you about</p>\
		<div id='teach_buttons' class='push--top'>\
		<button id='teach_infuse' class='btn btn-woman push--right'>Infuse</button>\
		<button id='leave_btn' class='btn btn-woman push--right'>Leave</button>\
		</div>");
	
		$("#teach_infuse").click(function(){TeachInfuse();});
		$("#leave_btn").click(function(){Camp();});
		$("#output").append("<div id='train_output'></div>");

	} else {
		rival.desire++;
		Message("Camp()", "<h1>Trading</h1><p>You meet the woman and her clan again and you sit and talk of your ancestors! She listen and talk of hers. After time you continue your hunt.</p>");
	}
}

function TeachInfuse()
{
	if (player.goods < 10) $("#train_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#train_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		player.experience -= 5;
		player.Mods.infuse = 1;
		Message("Camp()", "<h1>Training</h1><p>She teach you how to cook things and chant over them to call the power of your ancestors into the thing and change it's power. You need to offer to your ancestors and give these things to the fire.</p><p>You leave her, knowing how to better build your clan.</p>");
	}
}
