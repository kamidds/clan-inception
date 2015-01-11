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

	// Identity
  var that = this;
  this.name = "";			// special case for "rival" in battle and drawfigure.js
	this.round = 0;			// day of game for player, day of capture for a woman

	// Power
  this.changra = getRandomInt(75, 100);

	// Traits
  this.submissiveness = submissiveness;
  this.domesticity = domesticity;
  this.maternalism = maternalism;
  this.allure = allure;
  this.orientation = orientation;
	
	this.description = { }
  this.natural = { }
  this.minimums = { }
  this.maximums = { }
	
	// Trainings (via experience or some items)
	this.experience = 0;
	this.Mods = {
		"ironwill": 0,
		"breasts": 0,
		"breastrows": 0,
		"changra": 0,
		"perception": 0,
		"amazon": 0,
		"cock": 0,
		"futa": 0,
		"pushsubmissiveness": 0,
		"pushdomesticity": 0,
		"pushmaternalism": 0,
		"pushallure": 0,
		"pushorientation": 0
	}

	// Your women
  this.women = [];
	
	// Physique
	this.physique = {
		"irisc": getRandomInt(1, 20),
		"hairc": getRandomInt(1, 20),
		"skin": getRandomInt(1, 20),
		"horns": 0
  }

	// Methods
	
  this.femininity = function() {
    var total = 0
    var that = this;
    $.each(AVATAR_TRAITS, function(index, trait) {
      total += that[trait];
    })
    return total/AVATAR_TRAITS.length;
  }

  this.masculinity = function() { return 100 - this.femininity(); }

  this.cunning = function() { return (this.femininity() + this.allure)/2; }

	this.perception = function() { return this.Mods.perception + Math.ceil((this.femininity() + 100 - this.domesticity)/2); }

  this.rest = function() {
    this.changra = 500;
    $.each(AVATAR_TRAITS, function(index, trait) {
      that[trait] = that.natural[trait];
    })
    this.capTraits();
  }
	
	this.isPregnant = function() {
		var aw = 0;
		if (this.name != "rival" && this.maternalism > 70) aw = (this.maternalism - 70) * -1;
		return aw < 0;
	}
	
	// Physique

  this.calcPhysique = function() {

    this.calcHeight = function() {
			if (this.femininity() > 49) return maxValue(20 - (this.submissiveness/5) + this.Mods.amazon, 20);
      return maxValue(20 - (this.submissiveness/5), 20);
    }

    this.calcFace = function() {
      return ((this.allure * 2) + this.submissiveness)/10;
    }

    this.calcEyes = function() {
      return ((this.submissiveness * 2) + this.allure)/10;
    }

    this.calcLips = function() {
      return (this.allure * 3)/10;
    }

    this.calcHairLength = function() {
      return ((this.allure * 2) + this.domesticity)/10;
    }

    this.calcShoulders = function() {
      var val = ((this.submissiveness * 1.5) + (this.domesticity * 1.5) )/10;
			if (this.femininity() > 49) val = val - (this.Mods.amazon * 4);
			if (val < 0) val = 0;
			return val;
    }

    this.calcBreasts = function() {
      var val;
			if (this.femininity() > 49) val = ((((this.allure + this.Mods.breasts) - 50) * 4) + (((this.maternalism + this.Mods.breasts) - 50) * 2 ))/10;
			else val = (((this.allure - 50) * 4) + ((this.maternalism - 50) *2))/10;
      return minValue(val, 0);
    }

    this.calcNipples = function() {
      var val = (((this.maternalism - 50) * 4) + ((this.allure - 50) *2 ))/10;
      return minValue(val, 0);
    }

    this.calcTestes = function() {
      return ((this.orientation * 4) + this.submissiveness + this.domesticity + this.maternalism + this.allure)/40;
    }

    this.calcPenis = function() {
      return (this.orientation + this.allure + this.submissiveness)/10;
    }

    this.calcWaist = function() {
      return (this.allure * 3)/10;
    }

    this.calcHips = function() {
      return (this.maternalism * 3)/10;
    }

    this.calcAss = function() {
      return ((this.maternalism * 2) + this.allure)/10;
    }

    this.calcLegs = function() {
      return ((this.domesticity * 2) + this.allure)/10;
    }

		this.capTraits();
    this["physique"].height = this.calcHeight();
    this["physique"].face = this.calcFace();
    this["physique"].eyes = this.calcEyes();
    this["physique"].lips = this.calcLips();
    this["physique"].hairback = this.calcHairLength();
    this["physique"].hairfront = this.calcHairLength();
    this["physique"].shoulders = this.calcShoulders();
    this["physique"].breasts = this.calcBreasts();
    this["physique"].nipples = this.calcNipples();
    this["physique"].testes = this.calcTestes();
    this["physique"].penis = this.calcPenis();
    this["physique"].waist = this.calcWaist();
    this["physique"].hips = this.calcHips();
    this["physique"].ass = this.calcAss();
    this["physique"].legs = this.calcLegs();
  }
	
	// Traits
	this.capTraits = function()
	{
		// Limit stats
		$.each(AVATAR_TRAITS, function( index, trait ) {
			that[trait] = minValue(that[trait], -4);
			that[trait] = maxValue(Math.floor(that[trait]), 100);
		});
		
		that["changra"] = minValue(that["changra"], 0);
		that["changra"] = Math.floor(maxValue(that["changra"], 120 + that.Mods.changra + (that.women.length / 2) - that.femininity()));

		
		// Following needed to upgrade save games
		if (isNaN(that.Mods.changra)) that.Mods.changra = 0;
		if (isNaN(that.Mods.breasts)) that.Mods.breasts = 0;
		if (isNaN(that.Mods.perception)) that.Mods.perception = 0;
		if (isNaN(that.Mods.amazon)) that.Mods.amazon = 0;
		if (isNaN(that.Mods.cock)) that.Mods.cock = 0;
		if (isNaN(that.Mods.futa)) that.Mods.futa = 0;
		if (isNaN(that.Mods.pushsubmissiveness)) that.Mods.pushsubmissiveness = 0;
		if (isNaN(that.Mods.pushdomesticity)) that.Mods.pushdomesticity = 0;
		if (isNaN(that.Mods.pushmaternalism)) that.Mods.pushmaternalism = 0;
		if (isNaN(that.Mods.pushallure)) that.Mods.pushallure = 0;
		if (isNaN(that.Mods.pushorientation)) that.Mods.pushorientation = 0;
		if (isNaN(that.Mods.ironwill)) that.Mods.ironwill = 0;
		if (isNaN(that.Mods.breastrows)) that.Mods.breastrows = 0;
		if (isNaN(that.physique.horns)) that.physique.horns = 0;
	}
	
	// Initialise
	this.calcPhysique();
	
	$.each(AVATAR_TRAITS, function(index, trait) {
    that.natural[trait] = that[trait];
    that.minimums[trait] = that[trait] - 15;
    that.maximums[trait] = that[trait] + 35;
  })
	
	
	// Rival details
	// Unused for player or their women
	
	this.desires = {
    "submissiveness": getRandomInt(35, 95),
    "domesticity": getRandomInt(35, 95),
    "maternalism": getRandomInt(35, 95),
    "allure": getRandomInt(35, 95),
    "orientation": getRandomInt(50, 95)
  }
	
  this.pushPreference = getRandomInt(0, 2);
  this.drainPreference = getRandomInt(0, 2);
  this.reflectPreference = getRandomInt(0, 1);
  var preferenceDifference = differenceBetween(this.pushPreference, this.drainPreference);
  this.unpredictability = getRandomInt(preferenceDifference, preferenceDifference + 2);
  this.offensiveness = getRandomInt(0, 10);
  this.defensiveness = getRandomInt(0, 10);

  this.currentAction = "";
}