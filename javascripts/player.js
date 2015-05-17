//
// Your player character
var player = new Avatar(getRandomInt(23, 28),
                        getRandomInt(23, 28),
                        getRandomInt(23, 28),
                        getRandomInt(23, 28),
                        getRandomInt(23, 28)
                        );
// Initialise player specific variables
player.experience = 5;
player.melon = 1;

// Get an unused name for a new woman, to limit cases of the same name being randomly chosen
function getUnusedFemaleName() {
  var ntry = 0;
  var str = "";
  var nok;
  while (ntry < 5) {  // try 5 times
		nok = true;
    str = randomFemaleName();
		for (var i = 0; i < player.women.length; i += 1 ) {
      if (player.women[i].name == str) {
				nok = false;
				break;
			}
		}
    if (nok === true) break;
    ntry += 1;
  }
  return str;
}
