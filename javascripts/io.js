function redraw() 
{
	drawfigure("player_avatar", player);
	if (rival.name != "") drawfigure("rival_avatar", rival);
	else {
		var canvas = document.getElementById("rival_avatar");
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.clearRect (0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		var w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	}
	drawStats();
}
		
function drawStats() 
{
  function calcStatWidth(stat) { return stat >= 50 ? (stat - 50) * 2 : (50 - stat) * 2; }

  function appendStat(elem, type, avatar){
    var avatarObj = eval(avatar);
    var appendTo = avatarObj[type] >= 50 ? ".stat-bar--fem" : ".stat-bar--masc"
    $(elem).children(appendTo).first().append("<div class='avatar-stat avatar-stat--"+avatar+"'></div>");
    $(elem).children(appendTo).first().children(".avatar-stat--"+avatar).first().css("width", calcStatWidth(avatarObj[type])+"%");
  }

  $(".stat-bar-container").each(function(){
    $(this).empty();
    $(this).append("<span class='stat-bar stat-bar--fem'></span><span class='stat-bar stat-bar--masc'></span>")
    var type = $(this).attr("id")
    appendStat(this, type, "player")
    appendStat(this, type, "rival")
  });

  $("#player_changra").html(player.changra);
	if (getPerceptionRate() >= getRandomInt(0, 100)) $("#rival_changra").html(rival.changra);
	else $("#rival_changra").html("?");

  $("#player_women").html(player.women.length);
  $("#rival_women").html(rival.women.length);

  $("#player_perception").html(player.perception());
	$("#player_experience").html(player.experience);
}

function Message(action, message, noclick){
  $(".stats").hide();
  $("#output").html("<div id='message' class='clickable'>"+message+"</div>");
	if (noclick != true) {
		$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");

		$("#message").click(
			function() {
				$(".stats").show();
				eval(action)
			}
		);
	}
}