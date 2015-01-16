function insertCharacterCreationIO(){
	$(".stats").hide();
  $("#output").html(
    "<h1>Design Your Avatar</h1>\
    <h2>Name</h2>\
    <input id='player_name_input' value='"+randomMaleName()+"' placeholder='Name'/>\
    <h2>Coloration</h2>\
    <table class='slidertable'>\
      <tr><td>Complexion: </td><td><div id='slider_skin'></div></td></tr>\
      <tr><td>Hair Color: </td><td><div id='slider_hair'></div></td></tr>\
      <tr><td>Eye Color: </td><td><div id='slider_eyes'></div></td></tr>\
    </table>\
    <h2>Personality</h2>\
    <table class='slidertable2'>\
      <tr><td>Submissiveness</td><td><div id='slider_submissiveness'></div></td><td>Dominance</td></tr>\
      <tr><td>Domesticity</td><td><div id='slider_domesticity'></div></td><td>Adventurousness</td></tr>\
      <tr><td>Maternalism</td><td><div id='slider_maternalism'></div></td><td>Paternalism</td></tr>\
      <tr><td>Allure</td><td><div id='slider_allure'></div></td><td>Lustfulness</td></tr>\
      <tr><td>Homosexual</td><td><div id='slider_orientation'></div></td><td>Heterosexual</td></tr>\
    </table>\
    <table><tr><td><b>Points:</b></td><td><div id='CustomPoints'></div></td></tr></table>\
    <br><button id='accept' class='btn'>Start</button>\
    <button id='load_button' class='btn'>Load</button>")


  $("#slider_eyes").slider({value: player["physique"].irisc,min:1,max:30,slide:function(event, ui){player["physique"].irisc=ui.value; drawfigure('player_avatar', player);}});
  $("#slider_skin").slider({value:player["physique"].skin,min:1,max:30,step:.1,slide:function(event, ui){player["physique"].skin=ui.value; drawfigure('player_avatar', player);}});
  $("#slider_hair").slider({value:player["physique"].hairc,min:1,max:30,step:.1,slide:function(event, ui){player["physique"].hairc=ui.value; drawfigure('player_avatar', player);}});
  
  var pts = 10;
	$("#CustomPoints").html(pts);
  

  $("#slider_maternalism").slider({value:51-player.maternalism,min:20,max:30,slide:function(event, ui)
  {
	  var diff = player.maternalism - (51 - ui.value);
	  if (diff > pts) return false;
	  pts -= diff;
		$("#CustomPoints").html(pts);
	  player.maternalism=51-ui.value; 
	  drawfigure('player_avatar', player);
  }
  });
  $("#slider_submissiveness").slider({value:51-player.submissiveness,min:20,max:30,slide:function(event, ui)
  {
	  var diff = player.submissiveness - (51 - ui.value);
	  if (diff > pts) return false;
	  pts -= diff;
		$("#CustomPoints").html(pts);

	  player.submissiveness=51-ui.value; 
	  drawfigure('player_avatar', player);}}
  );
  $("#slider_domesticity").slider({value:51-player.domesticity,min:20,max:30,slide:function(event, ui)
  {
	  var diff = player.domesticity - (51 - ui.value);
	  if (diff > pts) return false;
	  pts -= diff;
		$("#CustomPoints").html(pts);

	  player.domesticity=51-ui.value; 
	  drawfigure('player_avatar', player)}}
  );
  $("#slider_allure").slider({value:51-player.allure,min:20,max:30,slide:function(event, ui)
  {
	  var diff = player.allure - (51 - ui.value);
	  if (diff > pts) return false;
	  pts -= diff;
		$("#CustomPoints").html(pts);

	  player.allure=51-ui.value; 
	  drawfigure('player_avatar', player)}}
  );
  $("#slider_orientation").slider({value:51-player.orientation,min:20,max:30,slide:function(event, ui)
  {
	  var diff = player.orientation - (51 - ui.value);
	  if (diff > pts) return false;
	  pts -= diff;
		$("#CustomPoints").html(pts);

	  player.orientation=51-ui.value; 
	  drawfigure('player_avatar', player)}}
  ); 

  $("#player_name_input").click(function(){
    $("#player_name_input").focus();
  })
  $("#load_button").click(function(){
    new loadGame("location.reload();");
  })
  $("#accept").click(function(){
    player.name = $("#player_name_input").val();
    $.each(AVATAR_TRAITS, function(index, trait){
      player.natural[trait] = player[trait];
      player.minimums[trait] = player[trait] - 15;
      player.maximums[trait] = player[trait] + 35;
      player.description[trait] = Math.floor(player[trait]/10);
    })
		if (pts > 10) player.experience += Math.floor(pts / 10) * 5;
		player.round = 1;
    new Camp();    
  });
	
	drawfigure('player_avatar', player);
	createRival(0);
	createDemon();
}

$(document).ready(function() {
	// Work around for IE compatibility for playing offline
	!localStorage&&(l=location, p=l.pathname.replace(/(^..)(:)/,"$1$$"), (l.href=l.protocol+"//127.0.0.1"+p));

  new Message("insertCharacterCreationIO()", "<h1 class='fancy'>Clan: Inception</h1>\
			<button id='load_button' class='btnsmall' title='Load the Saved game'>Load Game</button>\
			<button id='new_button' class='btnsmall' title='New Game'>New Game</button>\
      <p>You man of Iberninth. This hard land. Much ice, many bear, always strong wind like howling wolf. \
      Only strong clan survive, but you, you have no clan. Your clan dead.</p>\
      <p>You hide in cold cave, lonesome. You wish for new clan and brothers. You \
      wish for talking and womanfolk and fucking. But you only laugh bitter. No \
      outside clan take you as brother. They have plenty brother. They want womanfolk . . . \
      and maybe they make you womanfolk if they catch you.</p>\
      <p>This land Iberninth. This land hard land. Most woman child not grow into woman mother. \
      Manfolk desperate, so they use Changra to battle other manfolk. If their Changra strong, \
      they turn other manfolk into womanfolk, and womanfolk become theirs. If manfolk very \
      strong, then they gather many womanfolk and have many son and bring much honor to clan.</p>\
      <p>Cold wind howl through cave, and you shiver quiet. This life make suffer.</p>\
      <p>So you decide. You find \
      lone man and ambush. You make man your woman. You start new clan . . . or you \
      become part of other clan in process. Either way, you warmer.</p>");
	$("#load_button").click(function(){
		if (loadGame("location.reload();") == 0) {
			alert("No saved games, starting a new game");
		}
	});
	$("#new_button").click(insertCharacterCreationIO);
});