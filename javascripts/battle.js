/*jslint white: false, maxerr: 999, indent: 2 */

function Victory()
{
  $("#output").html(
    "<h1>You Howl!</h1>\
    <p>And unleash your spirit Changra. The air smell of burning and lightening, and then your rival crumble, weeping like woman. Her Changra burned away. She yours, and soon she forget how to be man.</p>\
    <p>As she quiver and snivel, you must decide on name for her.</p>\
    <input id='woman_name' value='" + getUnusedFemaleName() + "'>\
    <button id='name_woman' class='btn'>Give Name</button>\
  ");

  $('#woman_name').click(function() {
    $("#woman_name").focus();
  })

  $("#name_woman").click(function() {
    rival.name = $("#woman_name").val().length > 0 ? $("#woman_name").val() : getUnusedFemaleName();
    player.women.push(rival);
    player.experience += minValue(Math.floor(rival.femininity() / 10), 5);
    rival.round = player.round;		// day captured
    Camp();
  })
}

function getPerceptionRate() {
  var perception = 75;
  var ratio = player.perception() - rival.cunning();
  if (ratio > 0) { perception += ratio / 3; }
  else if (ratio < 0) { perception += ratio / 3; }
  return perception;
}

function Battle(rivalFemininity) {

  createRival(rivalFemininity);

  var pushCount = 0;
  var drainCount = 0;
  var reflectCount = 0;

  var description = ""
  var playerDefeated = false;

  var nextRivalAction = new RivalAction();

  $("#rcwomen").show();
  $("#rcchangra").show();

  $("#output").html(
    "<div class='combat-controls'>\
      <div id='push_controls' class='combat-button-column'></div>\
      <div id='drain_controls' class='combat-button-column'></div>\
      <div id='support_controls' class='combat-button-column'></div>\
      <div id='victory_button_container'></div>\
    </div>\
    <div id='combat_feed'>\
      <div id='last_action'></div>\
      <hr/>\
      <div id='changes'></div>\
    </div>");

  function insertCombatControls() {
    function fillPushColumn() {
      $("#push_controls").html("<h2>Infuse</h2>");
      $.each(AVATAR_TRAITS, function( index, trait ) {
        traitName = trait === "orientation" ? "Attraction to &#9794;" : capitalize(trait)
        if (player[trait] > 50) {
          $("#push_controls").append("<button id='push_"+trait+"' class='btn btn-combat btn-push'>&#955; "+traitName+"</button>");
          if (player.changra < 13) {
            $("#push_"+trait).attr("disabled","disabled");
          } else {
            $("#push_"+trait).click(function() { new Round(new Push(trait, player)); });
          }
        } else {
          $("#push_controls").append("<button id='push_"+trait+"' class='btn btn-combat btn-summon-maternal'>&#8756; "+traitName+"</button>");
          if (player.changra < 7) {
            $("#push_"+trait).attr("disabled","disabled");
          } else {
            $("#push_"+trait).click(function() { new Round(new Push(trait, player)); });
          }
        }
      });
    }

    function fillDrainColumn() {
      $("#drain_controls").html("<h2>Drain</h2>");

      $.each(AVATAR_TRAITS, function(index, trait) {
        traitName = switchFemForMascTrait(trait);
        if (rival[trait] > 50) {
          $("#drain_controls").append("<button id='drain_"+trait+"' class='btn btn-combat btn-summon-paternal'>&#8756; "+traitName+"</button>");
          if (player.changra < 6) {
            $("#drain_"+trait).attr("disabled","disabled");
          } else {
            $("#drain_"+trait).click(function() { new Round(new Drain(trait, player)); });
          }
        }
        else{
          $("#drain_controls").append("<button id='drain_"+trait+"' class='btn btn-combat btn-drain'>&#978; "+traitName+"</button>");
          if (player.changra < 4) {
            $("#drain_"+trait).attr("disabled","disabled");
          } else {
            $("#drain_"+trait).click(function() { new Round(new Drain(trait, player)); });
          }
        }
      });
    }

    function fillSupportColumn() {
      $("#support_controls").html("<h2>Other</h2>");
      $.each(["reflect", "rest", "flee"], function( index, action ) {
        $("#support_controls").append("<button id='"+action+"' class='btn btn-combat btn-support'>"+capitalize(action)+"</button>");
        $("#"+action).click(function() { eval("new Round(new "+capitalize(action)+"(player));") });
      });
      $("#reflect").addClass("btn-reflect");
    }
    fillPushColumn();
    fillDrainColumn();
    fillSupportColumn();
    
    redraw();
  }

  insertCombatControls()
  var tell = rivalTell();
  $("#last_action").html("<p class='rival-tell'>"+tell+"</p>");

  function standardChange() { return getRandomInt(7, 13); }

  function checkForDefeat() {
    if (player["physique"].testes > 11 && player.submissiveness >= rival.desires["submissiveness"] && player.domesticity >= rival.desires["domesticity"] && player.maternalism >= rival.desires["maternalism"] && player.allure >= rival.desires["allure"] && player.orientation >= rival.desires["orientation"]) playerDefeated = true;
    else playerDefeated = false;
  }

  function checkForVictoryButton() {
    if (rival["physique"].testes > 11) {
      $("#victory_button_container").html("<button id='victory_button' class='btn btn-victory'>Claim Her</button>");
      $("#victory_button").click(function() { new Victory(); });
    } else $("#victory_button_container").empty();
  }

  function RivalAction() {

    this.action = ""
    this.trait = ""

    this.determineRivalTrait = function() {
      var viableTraits = [];
      var that = this;
      $.each(AVATAR_TRAITS, function(index, trait) {
        if (player[trait] < 100) {
          viableTraits.push(trait);
        }
      })

      var desiredTraits = []
      $.each(viableTraits, function(index, trait) {
        if (that.action === "push" && rival[trait] < 50) {
          var defensiveIncentive = 0;
        } else {
          var defensiveIncentive = (rival[trait]/100) * rival.defensiveness;
        }
        if (that.action === "drain" && player[trait] > 50) {
          var offensiveIncentive = 0;
        } else {
          var offensiveIncentive = ((rival.desires[trait] - player[trait])/50) * rival.offensiveness;
        }
        desiredTraits.push({"trait": trait, "desire": offensiveIncentive + defensiveIncentive + getRandomInt(0, rival.unpredictability * 2)})
      })
      desiredTraits = desiredTraits.sort(function(a,b) {
        return b.desire - a.desire;
      });
      this.trait = desiredTraits[0].trait;
    }

    if (player["physique"].testes > 11 && player.submissiveness >= rival.desires["submissiveness"] && player.domesticity >= rival.desires["domesticity"] && player.maternalism >= rival.desires["maternalism"] && player.allure >= rival.desires["allure"] && player.orientation >= rival.desires["orientation"]) playerDefeated = true;
    else playerDefeated = false;
    if (rival.submissiveness/4 >= getRandomInt(0, 100) && rival.Mods.ironwill < 4) {
			if ((rival.Mods.ironwill * 25) < getRandomInt(1, 100)) return new Hesitate(rival);
			else return new Rest(rival);
    } else if (playerDefeated === true) {
      var fates = [];
      if (player.submissiveness > 75) {
        fates.push("meekly obeying his wishes");
      }
      if (player.domesticity > 75) {
        fates.push("spending your days tending to his household");
      }
      if (player.allure > 75) {
        fates.push("spreading your legs for him every night");
      }
      if (player.maternalism > 75) {
        fates.push("bearing him healthy sons");
      }
      if (fates.length === 0) {
        fates.push("sneaking away, though. You not man, but you refuse to be woman of this man")
      }
      var fate = toCommaSeperatedList(fates);
      fate = "<p>With mighty howl, rival man stomp and point palm at you. His Changra surge into you, and your Changra evaporate like mist in sunlight. You collapse at rival man's feet, and he stare down as you pant and try collect your Changra. Finally he laugh and offer you hand.</p>\
      <p>'You have no Changra,' he say, pulling you up. 'You womanfolk. You mine now, and you be called "+randomFemaleName()+".'</p>\
      <p>You very confused, and you follow man back to clan. You struggle remember what was to be man, but those thoughts become strange to you, until finally all you know is to be woman.</p>\
      <p>Rival man in your thoughts always now. Soon, you "+fate+".</p>"
      new Message("location.reload();", fate)
    } else if (rival.changra < getRandomInt(0, 70)) {
      return new Rest(rival)
    } else {
      var pushPropability = drainCount + rival.pushPreference + getRandomInt(0, rival.unpredictability);
      var drainProbability = reflectCount + rival.drainPreference + getRandomInt(0, rival.unpredictability);
      var reflectProbability = pushCount + rival.reflectPreference + getRandomInt(0, rival.unpredictability);
      var predictions = [{"action": "push", "val": pushPropability}, {"action": "drain", "val": drainProbability}, {"action": "reflect", "val": reflectProbability}]
      predictions = predictions.sort(function(a,b) {
        return b.val - a.val;
      });
      this.action = predictions[0].action;
      this.determineRivalTrait();
      return eval("new "+capitalize(this.action)+"('"+this.trait+"', rival);" )
    }
  }

  function processRound(playerAction, rivalAction) {
    if (playerAction.name === rivalAction.vulnerability) {
      playerAction.special();
    } else if (rivalAction.name === playerAction.vulnerability) {
      rivalAction.special();
    } else {
      playerAction.standard();
      rivalAction.standard();
    }
  }

  function describeTrait(trait, direction) {

    function describeSubmissiveness() {
      switch (player.description[trait]) {
        case 10: return "Your eyes wet with tears. You stupid, scared. You only make mistake. You want dada. You want someone protect you."
        case 9: return "You feel small, like child boy. But when you real child, father protect you. Nobody protect you now."
        case 8: return "Rival man stare at you, and he know. He know you stupid. You make mistake."
        case 7: return "You pause, doubting last action. Did you make mistake? Are you stupid?"
        case 6: return "You hesitate, unsure what to do next."
        
        case 5: return "You plant feet firm in ground. Shaken but ready."
        case 4: return "You stand straight, roll shoulders, stare rival man hard in eye."
        case 3: return "You smile cocky at rival man. He weak. You strong. You make him your woman."
        case 2: return "You laugh at rival man. He become like dog to you. All manfolk become like dog to you."
        case 1: return "You roar at rival man, beat your chest. He cower before you like dog man!"
      }
    }

    function describeDomesticity() {
      switch (player.description[trait]) {
        case 10: return "You want not be in forest. You want be in den. Den safe, warm, good. Forest scary and big."
        case 9: return "Sun reaches high point, and you feel strange urgency. You should be back at den, cooking dinner. Chop vegetables, soften meat, boil water, stir patient."
        case 8: return "Strange voice whisper in head. Tell you get back to den, tend to fire, clean floor, cook dinner, wash clothes, patch holes, sort berries, gather nuts."
        case 7: return "You spot cedar berry, very good on meat. Without thinking you swipe handful of them."
        case 6: return "You notice herb plant near foot. Very strange. Father never teach you of herb plants."
        
        case 5: return "Ears perk up. You hear chitter of squirrels overhead."
        case 4: return "You notice animal tracks everywhere. Once rival man is womanfolk, you go hunt and bring food for everyone."
        case 3: return "Nostrils flare. You catch whiff of musk in air. She-deer nearby."
        case 2: return "You want get bow and stalk through snow, follow track until you kill big she-deer."
        case 1: return "You part lips, move air across tongue like panther. You taste she-deer musk. You want follow trail, but must finish battle."
      }
    }

    function describeMaternalism() {
      switch (player.description[trait]) {
        case 10: return "You want cradle baby in arms. You want coo at baby. Your nipples grow big and hard, and they want suckle baby."
        case 9: return "You imagine self swelling with first baby. Without thinking, you cradle belly, but it is flat and you feel strange sadness."
        case 8: return "One day you have many baby. You smile at thought."
        case 7: return "You feel strange emptiness in belly. Between growing hips is room for babies. . . . One day, maybe they grow healthy inside you."
        case 6: return "When parent, you will show child much love. You no clan. You understand how important kin."
        
        case 5: return "Being father one day be fun. You play with child, teach him how wrestle. Make funny face. Child laugh easy."
        case 4: return "When you have child, you be good father. You teach how hold bow, how walk quiet."
        case 3: return "You imagine woman swelling with baby. Your baby. You grin satisfaction."
        case 2: return "One day, you be good stern father. You show harshness like Iberninth, and son grow strong to survive."
        case 1: return "You imagine whole tribe of womanfolk. All swelling with baby. All your baby. You father to whole clan!"
      }
    }

    function describeAllure() {
      switch (player.description[trait]) {
        case 10: return "You moving like she-cat in heat. Gestures slow, sensual, beckoning. You try stop, but within moments you doing it again."
        case 9: return "You give rival man flirt-like smile. Change posture so he get better look at chest. When you realize what you doing, you jerk straight up. Rival man give you bemused smile."
        case 8: return "Without thinking you bat eyelashes at rival man."
        case 7: return "You think of womanfolk dress. How pretty and delicate and flowing. Blushing, you imagine self wearing their clothes."
        case 6: return "You notice chipped fingernails, dirt underneath. You notice mud on hairy arms. Clothes stained."
        
        case 5: return "You feel wind on lips, and you think of kiss from womanfolk. Always good."
        case 4: return "You think of first time you have sex. Was slow and gentle and little scared."
        case 3: return "Once, a clanswoman gave you love-handing. Was good."
        case 2: return "You want fuck. Or love-handing. Maybe even you love-hand yourself."
        case 1: return "You stare at rival man. You want him ready for fucking."
      }
    }

    function describeOrientation() {
      switch (player.description[trait]) {
        case 10: return rival["physique"].penis < 10 ? "You gaze at rival man's cock, imagining him thrusting it deep into you again and again while you bounce around and moan." : "You imagine being with man with big cock, him thrusting it deep into you again and again while you bounce around and moan."
        case 9: return "You keep thinking of penises. Big erect penises."
        case 8: return rival["physique"].penis < 10 ? "You gaze at rival man's penis, blushing deep as you imagine what it would feel like in your hand. He smirk at you knowing-like." : "You imagine what it would be like to have other man's penis in your hand. In your mouth."
        case 7: return rival["physique"].penis < 10 ? "You find eyes gazing at rival man's penis." : "You find eyes gazing at rival man's crotch, remembering his penis."
        case 6: return "You think of men with big arms, hard muscles."

        case 5: return "You imagine threesome. You and other man with one big bottom woman."
        case 4: return "You think of woman's breast. The feel of it in your hand."
        case 3: return "You want throw woman on hay. Ride her from behind while she moan."
        case 2: return "You imagine woman, heavy thighs wrapped around your waist, wet pussy riding up and down your cock, big ass squeezing in your hands."
        case 1: return "You want four woman, all kissing and stroking and sucking and moaning. All their juices and their smells covering you, covering them, until world is warm and sweet and sticky."
      }
    }

    switch (trait) {
      case "submissiveness":
        return describeSubmissiveness()
      case "domesticity":
        return describeDomesticity()
      case "maternalism":
        return describeMaternalism()
      case "allure":
        return describeAllure()
      case "orientation":
        return describeOrientation()
    }
  }

  function describeChange(avatar, trait) {
    if (avatar === player) {
      var description = ""
      var traitFraction = Math.floor(avatar[trait]/10);
      if (traitFraction != avatar.description[trait]) {
        avatar.description[trait] = traitFraction;
        description = describeTrait(trait);
      }
      if (description != undefined && description.length > 0) {
        $("#changes").prepend("<p class='change-feminine'>"+description+"</p>");
      }
    }
  }

  function processAction(avatar, trait, rate, special) {
    rate = Math.ceil(rate);
    var projectedTotal = avatar[trait] + rate;
    if (special === true) {
      if (projectedTotal > avatar.maximums[trait]) {
        projectedTotal -= avatar.maximums[trait];
        projectedTotal /= 2;
        avatar.maximums[trait] += projectedTotal;
        avatar.minimums[trait] += projectedTotal;
        avatar.natural[trait] += projectedTotal;
        avatar[trait] = avatar.maximums[trait];
      } else if (projectedTotal < avatar.minimums[trait]) {
        projectedTotal = avatar.minimums[trait] - projectedTotal;
        projectedTotal /= 2;
        avatar.maximums[trait] -= projectedTotal;
        avatar.minimums[trait] -= projectedTotal;
        avatar.natural[trait] -= projectedTotal;
        avatar[trait] = avatar.minimums[trait];
      } else {
        avatar[trait] = projectedTotal;
      }
      describeChange(avatar, trait);
    } else {
      if (projectedTotal > avatar.maximums[trait]) {
        avatar.maximums[trait] += 2;
        avatar.minimums[trait] += 2;
        avatar.natural[trait] += 2;
        avatar[trait] = avatar.maximums[trait];
      } else if (projectedTotal < avatar.minimums[trait]) {
        avatar.maximums[trait] -= 2;
        avatar.minimums[trait] -= 2;
        avatar.natural[trait] -= 2;
        avatar[trait] = avatar.minimums[trait];
      } else {
        avatar[trait] = projectedTotal;
      }
    }
    avatar.capTraits();
  }

  function Push(trait, avatar) { 
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "push";
    this.vulnerability = "reflect";
    this.trait = trait;

    this.avatar.currentAction = this;

    if (this.avatar[this.trait] > 50) this.avatar.changra -= 13;
    else this.avatar.changra -= 7;

    this.special = function() {
      var opponentActivity = this.avatar[this.trait] > 50 ? "listen to father ancestors" : "siphon masculinity"
      if (this.avatar[this.trait] > 50) {
        var rate = standardChange() * (this.avatar[this.trait]/25);
        if (this.avatar.Mods["push" + this.trait] != 0) rate *= 1 + (0.2 * this.avatar.Mods["push" + this.trait]);
        processAction(this.opponent, this.trait, rate, true);
        processAction(this.avatar, this.trait, rate * -1, true);
        this.avatar[this.trait] = minValue(this.avatar[this.trait], 50);
        description += this.avatar === player ? "Rival man attempt "+opponentActivity+", but instead he vulnerable as you push him full of "+this.trait+". " : "You attempt "+opponentActivity+", but instead you vulnerable as he push you full of "+this.trait+". ";
      } else {
        var rate = standardChange() * 2;
        if (this.avatar.Mods["push" + this.trait] != 0) rate *= 1 + (0.2 * this.avatar.Mods["push" + this.trait]);
        processAction(this.opponent, this.trait, rate, true);
        description += this.avatar === player ? "Rival man attempt "+opponentActivity+", but instead he soak in your mother ancestor's "+this.trait+" very fast. " : "You attempt "+opponentActivity+", but instead you soak in "+this.trait+" from rival man's mother ancestors. ";
      }
    }

    this.standard = function() {
      if (this.avatar[this.trait] > 50) {
        var rate = standardChange() * (this.avatar[this.trait]/50)
        processAction(this.opponent, this.trait, rate)
        processAction(this.avatar, this.trait, rate * -1)
        this.avatar[this.trait] = minValue(this.avatar[this.trait], 50);
        description += this.avatar === player ? "You push "+this.trait+" into rival man. " : "Rival man push "+this.trait+" into you. ";
      }
      else {
        processAction(this.opponent, this.trait, standardChange())
        description += this.avatar === player ? "You summon mother ancestors, which fill rival man with "+this.trait+". " : "Rival man summon mother ancestors, which whisper to you secrets of "+this.trait+". ";
      }
    }
  }

  function Drain(trait, avatar) { 
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "drain";
    this.vulnerability = "push";
    this.trait = trait;

    this.avatar.currentAction = this

    if (this.avatar[this.trait] > 50) this.avatar.changra -= 6
    else this.avatar.changra -= 4


    this.special = function() {
      if (this.opponent[this.trait] > 50) {
        processAction(this.avatar, this.trait, standardChange() * -1, true)
        description += this.avatar === player ? "Rival man attempt reflect, leaving you free to talk to father ancestors about "+switchFemForMascTrait(this.trait)+". " : "You attempt reflect rival man's attack, leaving him free to talk with father ancestors about "+switchFemForMascTrait(this.trait)+". ";
      } else {
        var rate = standardChange() * 2;
        processAction(this.opponent, this.trait, rate, true)
        processAction(this.avatar, this.trait, rate * -1, true)
        this.opponent[this.trait] = maxValue(this.opponent[this.trait], 51);
        description += this.avatar === player ? "Rival man attempt reflect, make him easy prey as you drain him of "+switchFemForMascTrait(this.trait)+". " : "You attempt reflect, making you easy prey as rival man drain you of "+switchFemForMascTrait(this.trait)+". ";
      }
    }

    this.standard = function() {
      if (this.opponent[this.trait] > 50) {
        processAction(this.avatar, this.trait, standardChange() * -1)
        description += this.avatar === player ? "You summon father ancestors and learn of "+switchFemForMascTrait(this.trait)+". " : "Rival man summon father ancestors and learn of "+switchFemForMascTrait(this.trait)+". ";
      }
      else{
        var rate = standardChange() * 2;
        processAction(this.opponent, this.trait, rate)
        processAction(this.avatar, this.trait, rate * -1)
        this.opponent[this.trait] = maxValue(this.opponent[this.trait], 51);
        description += this.avatar === player ? "You drain rival man of "+switchFemForMascTrait(this.trait)+". " : "Rival man drain you of "+switchFemForMascTrait(this.trait)+". ";
      }
    }
  }

  function Reflect(avatar) { 
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "reflect";
    this.vulnerability = "drain";

    this.avatar.currentAction = this

    this.special = function() {
      this.trait = this.opponent.currentAction.trait
      processAction(this.opponent, this.trait, standardChange() * 2, true)
      description += this.avatar === player ? "Rival man attempt give you "+this.trait+", but you reflect it back at him. " : "You attempt give rival man "+this.trait+", but he reflects it back at you. " ;
    }

    this.standard = function() {
      this.avatar.changra += getRandomInt(0, 5);
      description += this.avatar === player ? "You attempt reflect rival man's attack, but he no attack. " : "Rival man attempt reflect your attack, but you no attack. ";
    }
  }

  function Rest(avatar) { 
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "rest";
    this.vulnerability = "";

    this.avatar.currentAction = this

    this.standard = function() {
      this.avatar.changra += getRandomInt(20, 30);
      $.each(AVATAR_TRAITS, function(index, trait) {
        if (avatar[trait] < avatar.natural[trait]) {
          avatar[trait] += getRandomInt(1, 3);
          avatar[trait] = maxValue(avatar[trait], avatar.natural[trait])
        }
        else if (avatar[trait] > avatar.natural[trait]) {
          avatar[trait] -= getRandomInt(1, 3);
          avatar[trait] = minValue(avatar[trait], avatar.natural[trait])
        }
      })
      description += this.avatar === player ? "You rest. " : "Rival man rest. ";
    }
  }

  function Flee(avatar) { 
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "flee";
    this.vulnerability = "";

    this.avatar.currentAction = this

    this.standard = function() {
      if (getRandomInt(0, 100) < this.opponent.allure) {
        alert("You run like she-deer!");
        this.avatar.changra -= 15;
        Camp();
      } else{
        this.avatar.changra -= 5;
        description += "You attempt escape, but rival man pursue you. ";
      }
    }
  }

  function Hesitate(avatar) {
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "hesitate";
    this.vulnerability = "";

    this.avatar.currentAction = this;

    this.standard = function() {
      this.avatar.changra += getRandomInt(15, 20);
      description += this.avatar === player ? "You hesitate. " : "Rival man hesitate. ";
    }
  }

  function processCounts(playerAction) {
    pushCount -= 1;
    drainCount -= 1;
    reflectCount -= 2;
    if (playerAction.name == "push") pushCount += 2;
    else if (playerAction.name == "drain") drainCount += 2;
    else if (playerAction.name == "reflect") reflectCount += 3;

    pushCount = minValue(pushCount, 0);
    drainCount = minValue(drainCount, 0);
    reflectCount = minValue(reflectCount, 0);
  }

  function rivalTell() {

    function getTell(action) {

      var pushDescription = getRandomElem([
        "Rival man pound chest.",
        "Rival man yell powerful.",
        "Rival man bellow laugh.",
        "Rival man flare nostrils like dragon.",
        "Rival man stomp ground"
      ])

      var drainDescription = getRandomElem([
        "Rival man close eyes and hum to self.",
        "Rival man quiet and focus.",
        "Rival man whisper to self.",
        "Rival man close eyes and breathe deep.",
        "Rival man focused and very still."
      ])

      var reflectDescription = getRandomElem([
        "Rival man plant feed in ground and stare at you defiant.",
        "Rival man cross arms over chest.",
        "Rival man step back, arms crossed in front of face.",
        "Rival man crouch low, arms crossed in front of face.",
        "Rival man crouched and very still."
      ])

      var restDescription = getRandomElem([
        "Rival man breathe deep.",
        "Rival man panting.",
        "Rival man look pale.",
        "Rival man wipe sweat face.",
        "Rival man very still."
      ])

      var hesitateDescription = getRandomElem([
        "Rival man look uncertain.",
        "Rival man look confused.",
        "Rival man bite lip.",
        "Rival man look at ground.",
        "Rival man chew lip."
      ])

      switch(action) {
        case "push": return pushDescription;
        case "drain": return drainDescription;
        case "reflect": return reflectDescription;
        case "rest": return restDescription;
        case "hesitate": return hesitateDescription;
      }
			return "";
    }

    function accurateTell() { return getTell(nextRivalAction.name); }

    function deceptiveTell() {
      if (nextRivalAction.name === "rest") return getTell("push");
      return getTell(nextRivalAction.vulnerability);
    }

    var perceptionRate = getPerceptionRate();

    // No tell 25 - perception/10
    if ((25 - (player.perception() / 10)) > getRandomInt(0, 100)) return "";
		// generate true or deceptive tell based on perception
		if (perceptionRate >= getRandomInt(0, 100))  {
			return accurateTell();
    } 
		return deceptiveTell();
  }

  function Round(playerAction) {
    //alert("Round " + player.submissiveness);
    description = ""

    if (player.submissiveness/4 > getRandomInt(1, 100) && player.Mods.ironwill < 4) {
      //alert("hes");
			if ((player.Mods.ironwill * 25) < getRandomInt(1, 100)) playerAction = new Hesitate(player);
    }

    processRound(playerAction, nextRivalAction);
    processCounts(playerAction);

    nextRivalAction = new RivalAction();
    var tell = rivalTell();

    player.capTraits();
    rival.capTraits();
    insertCombatControls();
    checkForVictoryButton();
    $("#last_action").html("<p class='battle-description'>"+description+"</p><p class='rival-tell'>"+tell+"</p>");
    redraw();
  }
}