var AVATAR_TRAITS = ["submissiveness", "domesticity", "maternalism", "allure", "orientation"];

function switchFemForMascTrait(trait) {
  switch(trait) {
    case "submissiveness": return "Dominance";
    case "domesticity": return "Adventurousness";
    case "maternalism": return "Paternity";
    case "allure": return "Lustfulness";
    case "orientation": return "Attraction to &#9792;";
  }
}

function Avatar(submissiveness, domesticity, maternalism, allure, orientation) {

	// Variables
  var that = this;
	
	// Identity
  this.name = "";			// special case for "Rival man" in battle and drawfigure.js
	this.round = 0;			// day of game for player, day of capture for a woman
	
	// Futanari
	this.futa = 0;			// > 0 if a futa

	// Power
  this.changra = getRandomInt(75, 100);

	// Traits
  this.submissiveness = submissiveness;
  this.domesticity = domesticity;
  this.maternalism = maternalism;
  this.allure = allure;
  this.orientation = orientation;
	
	// Motherhood
  this.pregnancy = 0;
  this.children = 0;
	this.pregnancyMessage = 0;
	
  // Desire
  this.desire = 0;
	
	this.description = { };
  this.activity = "";
  this.natural = { };
  this.minimums = { };
  this.maximums = { };
	
	// Trainings (via experience or some items)
	this.experience = 0;
	this.Mods = {
		"ironwill": 0,
		"breasts": 0,
		"changra": 0,
		"perception": 0,
		"amazon": 0,
		"cock": 0,
		"futa": 0,
		"balls": 0,
		// Bonuses to Push
		"pushsubmissiveness": 0,
		"pushdomesticity": 0,
		"pushmaternalism": 0,
		"pushallure": 0,
		"pushorientation": 0,
		// Resistances
		"resistsubmissiveness": 0,
		"resistdomesticity": 0,
		"resistmaternalism": 0,
		"resistallure": 0,
		"resistorientation": 0,
		// Crafting
		"infuse": 0,
		"craftnipplerings": 0,
		"craftcollar": 0,
		"craftheadband": 0,
		"craftbellybuttonstud": 0
	};
	this.getTrainingRanks = function(nc)
	{
		this.capTraits();	// ensure they are all initialised
		var val = this.Mods.ironwill + (this.Mods.perception / 5) + (this.Mods.changra / 5);
		if (nc === true) {
			// rank that do not affect combat
			val += (this.Mods.breasts / 10) + (this.Mods.amazon / 2) + (this.Mods.cock / 2) + (this.Mods.futa / 2);
			val += this.physique.breastrows + this.physique.horns + this.physique.tail + this.physique.wings;
		}
		val += (this.Mods.pushsubmissiveness / 2) + (this.Mods.pushdomesticity / 2) + (this.Mods.pushmaternalism / 2) + (this.Mods.pushallure / 2) + (this.Mods.pushorientation / 2);
		val += this.Mods.resistsubmissiveness + this.Mods.resistdomesticity + this.Mods.resistmaternalism + this.Mods.resistallure + this.Mods.resistorientation;
		return Math.ceil(val);
	};
	
	// Physique
	this.physique = {
		"hairc": getRandomInt(1, 20),
		"hairstyle": getRandomInt(0, 9),
		
		// special numbers 100 = red, 101 = blue
		"irisc": getRandomInt(1, 20),
		"skin": getRandomInt(1, 20),
		
		// Body parts
		"breastrows": 0,
		"hornstype": 0,
		"horns": 0,
		"tailtype": 0,
		"tail": 0,
		"wings": 0,
		"gentialscnt": 1
  };

	// Possessions
	
	// Your women
  this.women = [];
	
	// Goods
	this.goods = 0;
	this.metal = 0;
	
	// Items
	this.items = {
		"nipplerings": 0,
		"collar": 0,
		"headband": 0,
		"bellybuttonstud": 0
	}
	
	// Methods
		
  this.femininity = function() {
    var total = 0;
    var that = this;
    $.each(AVATAR_TRAITS, function(index, trait) {
      total += that[trait];
    });
    return total/AVATAR_TRAITS.length;
  };
	
	this.isFemale = function () { return this.femininity() > 49; };

	this.hasVagina = function () { return this.femininity() > 49 || this.futa > 0 || this.Mods.futa > 0; };

	this.masculinity = function () { return 100 - this.femininity(); };

	this.hasCock = function () { return this.femininity() < 50 || this.futa > 0 || this.Mods.futa > 0; };

	this.isFutanari = function () { return this.hasCock && this.hasVagina; };

	this.heshe = function() { return this.femininity() > 49 || this.futa > 0 ? "she" : "he"; }
	this.HeShe = function() { return this.femininity() > 49 || this.futa > 0 ? "She" : "He"; }
	this.himher = function() { return this.femininity() > 49 || this.futa > 0 ? "her" : "him"; }
	this.hisher = function() { return this.femininity() > 49 || this.futa > 0 ? "her" : "his"; }

  this.cunning = function() { return this.Mods.perception + ((this.femininity() + this.allure) / 2); };

	this.perception = function() { return this.Mods.perception + Math.ceil((this.femininity() + 100 - this.domesticity)/2); };
	
	this.changeNatural = function(trait, val) 
	{
		this.maximums[trait] += val;
    this.minimums[trait] += val;
    this.natural[trait] += val;
	}

  this.rest = function() {
    this.changra = 500;
    $.each(AVATAR_TRAITS, function(index, trait) {
      that[trait] = that.natural[trait];
    });
    this.capTraits();
  };

  this.isPregnant = function() {
    return this.pregnancy > 0;
  };

  this.advancePregnancy = function () {
		if (this.isPregnant()) {

				this.pregnancy += 2.5;

				if (this.pregnancy >= 15 && this.pregnancy <= 25 && this.pregnancyMessage == 0) {

						this.pregnancyMessage += 1;
						//Player
						if (this == player) {

								this.activity = "You feel strange in belly. You put hand on it. Belly feels soft and warm with Changra... you are with child!";

								if (player.isFemale()) {
										if (player.isFutanari()) {
												this.activity = this.activity + " You smile and pat belly. You make clan greater breeding woman and getting bred!";
										} else {
												this.activity = this.activity + " You smile and pat belly. You make clan greater with breeding more children!";
										}
								}
								if (!player.isFemale()) {
										this.activity = this.activity + " You frown. You should seed woman! Not get seed like woman!";
								}
						}
								//NPC
						else {
								this.activity = this.HeShe() + " come to you, " + this.himher() + " hand on stomach. " + this.HeShe() + " telling you that she is with child. You proudly rub " + this.himher() + " belly.";
						}
				}

				if (this.pregnancy >= 48 && this.pregnancy <= 55 && this.pregnancyMessage == 1) {

						this.pregnancyMessage += 1;

						//Player
						if (this == player) {

								this.activity = "Your belly is big from child, but still growing!";

								if (player.isFemale()) {
										if (player.isFutanari()) {
												this.activity = this.activity + " Your cock grow hard thinking about having more children.";
										} else {
												this.activity = this.activity + " You can't wait to have more children.";
										}
								}
								if (!player.isFemale()) {
										this.activity = this.activity + " You swear to gods to be more careful and not get bred again.";
								}
						}
								//NPC
						else {
								this.activity = "You see " + this.himher() + " with big belly. You smile.";
						}
				}

				if (this.pregnancy >= 80 && this.pregnancyMessage == 2) {

						this.pregnancyMessage += 1;

						//Player
						if (this == player) {

								this.activity = "Your belly is huge from child, you can feel it moving inside you!";

								if (player.isFemale()) {
										if (player.isFutanari()) {
												this.activity = this.activity + " Soon your clan will grow! You feel getting hard, thinking about getting bred again.";
										} else {
												this.activity = this.activity + "  Soon your clan will grow! You feel getting wet, thinking about having another child right after this.";
										}
								}
								if (!player.isFemale()) {
										this.activity = this.activity + " You hate belly. It huge hinderance.";
								}
						}
								//NPC
						else {
								this.activity = this.HeShe() + " is waddling, " + this.hisher() + " belly huge. Soon clan will have more children.";
								if (player.hasCock()) { this.activity = this.activity + " Your cock hard, wanting to " + this.himher() + " again."; }
						}
				}

				if (this.pregnancy >= getRandomInt(90, 105)) {
						this.activity = this == player ? "You" : this.HeShe();
						this.activity += " give birth to fine " + (Math.random() < 0.5 ? "son" : "daughter") + " last night. Your clan grow.";
						this.pregnancy = 0;
						this.pregnancyMessage = 0;
						this.children += 1;
				}
		}
	};

  this.advanceDesire = function() {
    function calcDesire(subject, object) {
      var objectGender = object.masculinity() - 50;
      var desire = 0;
      if (subject.orientation < 50) {
       desire = objectGender < 0 ? objectGender * -2 : (objectGender * 2) * ((50 - subject.orientation) / 50);
      } else {
       desire = objectGender > 0 ? objectGender * 2 : (objectGender * -2) * ((subject.orientation - 50) / 50);
      }
      return (desire * ((110 - subject.submissiveness) / 100)) / 2;
    }

    var herDesire = calcDesire(this, player);
		if (this.items.nipplerings > 0) herDesire += 1;
    var playerDesire = calcDesire(player, this);

    this.desire += herDesire + playerDesire;
  };

  this.fornicate = function() {

        this.desire = 0;

        //NPC only Vagina
        if (!this.hasCock() && this.hasVagina()) {

            if (player.hasCock()) {
                this.PCfucksNPCvaginal(this);
            } else {
                this.activity = this.HeShe() + " come to you and beg for release. You make " + this.himher() + " scream with tongue and finger. Then she licks you like shecat till you scream like beast.";
            }
        }

        //NPC only Cock
        if (this.hasCock() && !this.hasVagina()) {

            if (player.hasVagina() && !player.hasCock) {
                this.NPCfucksPCvaginal(this);
            }

            if (player.hasCock) {
                if (!player.hasVagina) {

                    this.PCwithDickNPCwithDick(this);

                } else {

                    var probPCfuck2 = getRandomInt(1, 100);

                    if (!player.isPregnant()) { probPCfuck2 += 10; }

                    if (probPCfuck2 > 60) {
                        this.NPCfucksPCvaginal(this);

                    } else {
                        this.PCwithDickNPCwithDick(this);
                    }
                }
            }
        }

        //NPC is futa
        if (this.hasCock() && this.hasVagina()) {

            var probPCfuck3 = getRandomInt(1, 100);

            //player is male
            if (player.hasCock && !player.hasVagina) {
                if (probPCfuck3 < 80) { this.PCfucksNPCvaginal(this); }
                else { this.PCwithDickNPCwithDick(this); }
            }
            //player is female
            if (!player.hasCock && player.hasVagina) {
                this.NPCfucksPCvaginal(this);
            }

            //player is futa
            if (player.hasCock && player.hasVagina) {

                if (!player.isPregnant()) { probPCfuck3 += 10; }

                if (probPCfuck3 < 70) {
                    this.PCfucksNPCvaginal(this);
                }
                else {
                    this.NPCfucksPCvaginal(this);
                }
            }
        }
    };

    this.PCwithDickNPCwithDick = function (avatar) {
        var probPCgetFucked = getRandomInt(1, 100);

        if (player.hasVagina) { probPCgetFucked -= 10; }

        if (probPCgetFucked > 70) {
            avatar.activity = avatar.HeShe() + " come to you at night. You look at cock and turn around, moving ass like woman. " + avatar.HeShe() + " takes invitation and fucks you in manhole. You moan like woman and release your seed on ground.";
        } else {
            avatar.activity = avatar.HeShe() + " come to you at night and in need. You push " + avatar.himher() + " on stomach and fuck manhole like pussy, releasing your seed in it.";
        }
    };


    this.NPCfucksPCvaginal = function (avatar) {

        var probPCgetFucked = getRandomInt(1, 100);

        if (!player.isPregnant()) { probPCgetFucked += 20; }

        if (probPCgetFucked < 70) {

            avatar.activity = "You feel desire. You push " + avatar.himher() + " down and ride cock. You scream like shebeast as you come.";

            if (player.hasCock) { avatar.activity = avatar.activity + " You coat " + avatar.himher() + " stomach with your seed."; }


            if (!player.isPregnant()) {

                var prob2 = (player.maternalism + 20) - getRandomInt(50, 100);

                if (prob2 > 0) {
                    player.pregnancy = 2.5;
                    avatar.activity = "You feel desire. You push " + avatar.himher() + " down and ride cock. You scream like shebeast as you feel " + avatar.hisher() + " seed flowing in you.";
                }
            }

        } else {
            avatar.activity = "You overwhelmed from lust. You spread legs for " + avatar.himher() + " and get fucked.";

            if (!player.isPregnant()) {

                var prob2 = (player.maternalism + 50) - getRandomInt(50, 100);

                if (prob2 > 0) {
                    player.pregnancy = 2.5;
                    avatar.activity = "You overwhelmed from lust. You spread legs for " + avatar.himher() + " to get fucked. " + avatar.HeShe() + " push deep inside. You moan like shebeast, as" + avatar.hisher() + " seed erupts from cock inside you.";
                }
            }
        }

    };
    this.PCfucksNPCvaginal = function (avatar) {
        avatar.activity = avatar.HeShe() + " come to you and spread legs. You fuck like beast.";

        if (!this.isPregnant()) {
            var prob = this.maternalism - getRandomInt(50, 100);
            if (prob > 0) {
                this.pregnancy = 2.5;
                avatar.activity = avatar.HeShe() + " come to you and spread legs like shebeast in need. You fuck like animal and fill " + avatar.himher() + " with seed.";
            }
        }
    };


  this.confused = function(avatar) {
    avatar.activity = "She spend week wandering camp, muttering to self about how she man. Strong man. But she walk more and more like woman. She cry easier and easier like woman. Soon she forget how be man and only be woman for you.";
    avatar.dysphoria -= getRandomInt(1, 10);
  };

  this.tend = function(avatar) {
    avatar.activity = avatar.HeShe() + " dutifully tend camp for you.";
  };

  this.fuck = function(avatar) {
    avatar.activity = avatar.HeShe() + " come to you every night and spread legs. You fuck like animal.";
    avatar.fornicate();
  };

  this.setActivity = function() {
    var probs = [
      { action: this.confused, prob: this.dysphoria },
      { action: this.tend, prob: this.domesticity + getRandomInt(-25, 25) },
      { action: this.fuck, prob: this.desire + getRandomInt(-25, 25) }
    ];

    probs = probs.sort(function(a,b) {
      return b.prob - a.prob;
    });
    probs[0].action(this);
  };
	
	// Physique
	
	this.calcTestes = function(nb) {
		var val	= ((this.orientation * 4) + this.submissiveness + this.domesticity + this.maternalism + this.allure)/40;
		if (this.Mods.balls > 0 && nb !== false) val = val > 0 ? this.Mods.balls * -2 : (val + this.Mods.balls * -2);
		return val;
	};

  this.calcPhysique = function() {
		
		this.getSubmissiveness = function() {
			if (this.futa > 0 && this.submissiveness < 49) return this.submissiveness + 50;
			return this.submissiveness;
		};
		this.getAllure = function() {
			if (this.futa > 0 && this.allure < 49) return this.allure + 50;
			return this.allure;
		};
		this.getDomesticity = function() {
			if (this.futa > 0 && this.domesticity < 49) return this.domesticity + 50;
			return this.domesticity;
		};
		this.getMaternalism = function() {
			if (this.futa > 0 && this.maternalism < 49) return this.maternalism + 50;
			return this.maternalism;
		};
		this.getOrientation = function() {
			if (this.futa > 0 && this.orientation < 49) return this.orientation + 50;
			return this.orientation;
		};	

    this.calcHeight = function() {
			if (this.futa > 0 || this.femininity() > 49) return maxValue(20 - (this.submissiveness/5) + this.Mods.amazon, 20);
      return maxValue(20 - (this.getSubmissiveness()/5), 20);
    };

    this.calcFace = function() {
      return ((this.getAllure() * 2) + this.getSubmissiveness())/10;
    };

    this.calcEyes = function() {
      return ((this.getSubmissiveness() * 2) + this.getAllure())/10;
    };

    this.calcLips = function() {
      return (this.getAllure() * 3)/10;
    };

    this.calcHairLength = function() {
      return ((this.getAllure() * 2) + this.getDomesticity())/10;
    };

    this.calcShoulders = function() {
      var val = ((this.getSubmissiveness() * 1.5) + (this.getDomesticity() * 1.5) )/10;
			if (this.femininity() > 49 || this.futa > 0) val = val - (this.Mods.amazon * 4);
			if (val < 0) val = 0;
			return val;
    };

    this.calcBreasts = function() {
      var val;
			if (this.futa > 0 || this.femininity() > 49) val = ((((this.getAllure() + this.Mods.breasts) - 50) * 4) + (((this.getMaternalism() + this.Mods.breasts) - 50) * 2 ))/10;
			else val = (((this.getAllure() - 50) * 4) + ((this.getMaternalism() - 50) *2))/10;
      return minValue(val, 0);
    };

    this.calcNipples = function() {
      var val = (((this.getMaternalism() - 50) * 4) + ((this.getAllure() - 50) *2 ))/10;
      return minValue(val, 0);
    };

    this.calcPenis = function() {
      return (this.orientation + this.allure + this.submissiveness)/10;
    };

    this.calcWaist = function() {
      return ((this.getAllure() * 3) - this.pregnancy * 5)/10;
    };

    this.calcHips = function() {
      return (this.getMaternalism() * 3)/10;
    };

    this.calcAss = function() {
      return ((this.getMaternalism() * 2) + this.getAllure())/10;
    };

    this.calcLegs = function() {
      return ((this.getDomesticity() * 2) + this.getAllure())/10;
    };

		this.capTraits();
    this.physique.height = this.calcHeight();
    this.physique.face = this.calcFace();
    this.physique.eyes = this.calcEyes();
    this.physique.lips = this.calcLips();
    this.physique.hairlength = this.calcHairLength();
    this.physique.shoulders = this.calcShoulders();
    this.physique.breasts = this.calcBreasts();
    this.physique.nipples = this.calcNipples();
    this.physique.testes = this.calcTestes();
    this.physique.penis = this.calcPenis();
    this.physique.waist = this.calcWaist();
    this.physique.hips = this.calcHips();
    this.physique.ass = this.calcAss();
    this.physique.legs = this.calcLegs();
  };
	
	// Traits
	this.capTraits = function()
	{
		$.each(AVATAR_TRAITS, function( index, trait ) {
			that[trait] = minValue(that[trait], -4);
			that.minimums[trait] = minValue(that.minimums[trait], -4);
			that.natural[trait] = minValue(that.natural[trait], -4);
			that[trait] = maxValue(Math.floor(that[trait]), 100);
			that.maximums[trait] = maxValue(Math.floor(that.maximums[trait]), 100);
			that.natural[trait] = maxValue(Math.floor(that.natural[trait]), 100);
		});
		
		that.changra = minValue(that.changra, 0);
		that.changra = Math.floor(maxValue(that.changra, 120 + that.Mods.changra + (that.women.length / 2) - that.femininity()));		
	};
	
	// Initialise
	this.calcPhysique();
	
	$.each(AVATAR_TRAITS, function(index, trait) {
    that.natural[trait] = that[trait];
    that.minimums[trait] = that[trait] - 15;
    that.maximums[trait] = that[trait] + 35;
  });
	
	
	// Rival details
	// Unused for player or their women
	
	this.desires = {
    "submissiveness": getRandomInt(35, 95),
    "domesticity": getRandomInt(35, 95),
    "maternalism": getRandomInt(35, 95),
    "allure": getRandomInt(35, 95),
    "orientation": getRandomInt(50, 95)
  };

  this.dysphoria = this.masculinity();
	
  this.pushPreference = getRandomInt(0, 2);
  this.drainPreference = getRandomInt(0, 2);
  this.reflectPreference = getRandomInt(0, 1);
  var preferenceDifference = differenceBetween(this.pushPreference, this.drainPreference);
  this.unpredictability = getRandomInt(preferenceDifference, preferenceDifference + 2);
  this.offensiveness = getRandomInt(0, 10);
  this.defensiveness = getRandomInt(0, 10);

  this.currentAction = "";
	
	// Combat functions
	this.Victory = function() { };
	this.Defeat = function() { };
	this.spendExperience = function() { };
	this.getTell = function(action) { };
	
	// Save/Load
	this.upgradeSave = function(rnd)
	{
		// Following needed to upgrade save games
		if (isNaN(that.Mods.changra)) that.Mods.changra = 0;
		if (isNaN(that.Mods.breasts)) that.Mods.breasts = 0;
		if (isNaN(that.Mods.perception)) that.Mods.perception = 0;
		if (isNaN(that.Mods.amazon)) that.Mods.amazon = 0;
		if (isNaN(that.Mods.cock)) that.Mods.cock = 0;
		if (isNaN(that.Mods.futa)) that.Mods.futa = 0;
		if (isNaN(that.Mods.balls)) that.Mods.balls = 0;
		if (isNaN(that.Mods.infuse)) that.Mods.infuse = 0;
		if (isNaN(that.Mods.craftnipplerings)) that.Mods.craftnipplerings = 0;
		if (isNaN(that.Mods.craftcollar)) that.Mods.craftcollar = 0;
		if (isNaN(that.Mods.craftheadband)) that.Mods.craftheadband = 0;
		if (isNaN(that.Mods.craftbellybuttonstud)) that.Mods.craftbellybuttonstud = 0;
		if (isNaN(that.Mods.pushsubmissiveness)) that.Mods.pushsubmissiveness = 0;
		if (isNaN(that.Mods.pushdomesticity)) that.Mods.pushdomesticity = 0;
		if (isNaN(that.Mods.pushmaternalism)) that.Mods.pushmaternalism = 0;
		if (isNaN(that.Mods.pushallure)) that.Mods.pushallure = 0;
		if (isNaN(that.Mods.pushorientation)) that.Mods.pushorientation = 0;
		if (isNaN(that.Mods.ironwill)) that.Mods.ironwill = 0;
		if (isNaN(that.physique.breastrows)) that.physique.breastrows = 0;
		if (isNaN(that.physique.gentialscnt)) that.physique.gentialscnt = 1;
		if (isNaN(that.physique.horns)) {
			that.physique.horns = 0;
			that.physique.hornstype = 0;
		}
		if (isNaN(that.physique.tail)) {
			that.physique.tail = 0;
			that.physique.tailtype = 0;
		}
		if (isNaN(that.physique.wings)) that.physique.wings = 0;
		if (isNaN(that.Mods.resistsubmissiveness)) that.Mods.resistsubmissiveness = 0;
		if (isNaN(that.Mods.resistdomesticity)) that.Mods.resistdomesticity = 0;
		if (isNaN(that.Mods.resistmaternalism)) that.Mods.resistmaternalism = 0;
		if (isNaN(that.Mods.resistallure)) that.Mods.resistallure = 0;
		if (isNaN(that.Mods.resistorientation)) that.Mods.resistorientation = 0;
		
		if (that.activity === "" && that != player) that.setActivity();
		else if (that == player && that.activity.indexOf("birth") == -1) that.activity = "";
		if (that.name === "") that.name = getUnusedFemaleName();
		if (isNaN(that.pregnancy)) {
			that.pregnancy = 0;
			that.children = 0;
		}
		if (that.pregnancy > 0 && !(that.isFemale() || that.futa > 0)) {
			that.pregnancy = 0;
			that.children = 0;
		}			
		if (isNaN(that.dysphoria)) that.dysphoria = that.masculinity();
		
		if (that.round === undefined || that.round === 0) {
			if (rnd !== undefined) that.round = rnd;
			else that.round = 0;
		}
		
		if (isNaN(that.futa)) that.futa = 0;
		if (isNaN(that.physique.hairstyle)) that.physique.hairstyle = 1;
		if (isNaN(that.goods)) that.goods = 0;
		if (isNaN(that.metal)) that.metal = 0;
		if (isNaN(that.items.nipplerings)) {
			if (that == smith) that.items.nipplerings = 1;
			else that.items.nipplerings = 0;
		}
		if (isNaN(that.items.collar)) that.items.collar = 0;
		if (isNaN(that.items.headband)) that.items.headband = 0;
		if (isNaN(that.items.bellybuttonstud)) that.items.bellybuttonstud = 0;
	};
	
}
