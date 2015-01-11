function advanceRound() {
  player.round += 1;
  player.women.forEach(function(woman){
    woman.setActivity();
    woman.advancePregnancy();
    woman.advanceDesire();
  })
}