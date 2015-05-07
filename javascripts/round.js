// New round/game week

function advanceRound() {
  player.round += 1;
	player.activity = "";
	player.advancePregnancy();
  player.women.forEach(function(woman){
    woman.setActivity();
    woman.advancePregnancy();
    woman.advanceDesire();
  })
}