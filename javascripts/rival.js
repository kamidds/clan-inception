//
// rival object, generally your oponent in combat, but can also be used as in intermediate object when
// reviewing your clan or meeting other people
var rival;

// Functions
function createRival(femininity)
{
	var minTrait = femininity - 10;
	var maxTrait = femininity + 10;
	rival = new Avatar(getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait));
	rival.name = "rival";
	updateRival();
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