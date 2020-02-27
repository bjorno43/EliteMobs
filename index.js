/*
 * Initial vars
 *
 * bossName	= Holds default name of boss
 * errors	= Set to true in case any form errors are unsolved
 *
 */
var bossName;
var errors = false;
var selectedForm = 'bossform';

/*
 * Runs when DOM is fully loaded
 *
 */
$(document).ready(function() {
	// Changes the form based on user select
	$("#changeForm").on("change", function(e){
		selectedForm = $("#changeForm").val();

		$(".worldBoss").css("display", "none");

		if(selectedForm == 'worldbossform'){
			$(".worldBoss").css("display", "grid");
		}
	});
	// Generate random default boss name
	bossName = 'Test_'+getRandomInt(1, 9999);

	// Sets default boss name as placeholder in the form
	document.getElementById('bossName').placeholder = bossName;

	// Creates color pallets next to form fields that support them
	$("#bossNameColors").html(createColorPallete('bossName'));
	$("#spawnMessageNameColors").html(createColorPallete('bossSpawnMessage'));
	$("#deathMessageColors").html(createColorPallete('bossDeathMessage'));
	$("#escapeMessageColors").html(createColorPallete('bossEscapeMessage'));
	$("#locationMessageColors").html(createColorPallete('bossLocationMessage'));

	// Handles adding extra input field to Powers
	$("#addPowerBtn").on("click", function(e){
		// Prevents the form from being submitted
		e.preventDefault();

		// Creates the new form field
		var newDiv = document.createElement('div');
		var newSpan = document.createElement('span');
		var newTxt = document.createElement('input');

		newDiv.className = 'form-group';
		newTxt.className = 'form-field';
		newTxt.classList.add('powers');
		newTxt.type = 'text';
		newTxt.name = 'powers[]'; // Using array here so we can walk through all the values
		newTxt.placeholder = 'filename.yml';

		newDiv.appendChild(newSpan);
		newDiv.appendChild(newTxt);

		// Append to DOM
		document.getElementById('powersDiv').appendChild(newDiv);
	});

	// Handles adding extra input field to uniqueLootList
	$("#addLootBtn").on("click", function(e){
		// Prevents the form from being submitted
		e.preventDefault();

		// Creates the new form field
		var newDiv = document.createElement('div');
		var newSpan = document.createElement('span');
		var newTxt = document.createElement('input');

		newDiv.className = 'form-group';
		newTxt.className = 'form-field';
		newTxt.classList.add('loot');
		newTxt.type = 'text';
		newTxt.name = 'loot[]'; // Using array here so we can walk through all the values
		newTxt.placeholder = 'magmaguys_toothpick.yml:1';

		newDiv.appendChild(newSpan);
		newDiv.appendChild(newTxt);

		// Append to DOM
		document.getElementById('lootDiv').appendChild(newDiv);
	});

	// Handles adding extra input field to onDamageMessages
	$("#addDmgMsgBtn").on("click", function(e){
		// Prevents the form from being submitted
		e.preventDefault();

		// Creates the new form field
		var newDiv = document.createElement('div');
		var newSpan = document.createElement('span');
		var newTxt = document.createElement('input');

		newDiv.className = 'form-group';
		newTxt.className = 'form-field';
		newTxt.type = 'text';
		newTxt.name = 'damageMessage[]'; // Using array here so we can walk through all the values
		newTxt.placeholder = 'I\'ve hit you!';

		newDiv.appendChild(newSpan);
		newDiv.appendChild(newTxt);

		// Append to DOM
		document.getElementById('dmgMsgDiv').appendChild(newDiv);
	});

	// Handles adding extra input field to onDamagedMessages
	$("#addDmgdMsgBtn").on("click", function(e){
		// Prevents the form from being submitted
		e.preventDefault();

		// Creates the new form field
		var newDiv = document.createElement('div');
		var newSpan = document.createElement('span');
		var newTxt = document.createElement('input');

		newDiv.className = 'form-group';
		newTxt.className = 'form-field';
		newTxt.type = 'text';
		newTxt.name = 'damagedMessage[]'; // Using array here so we can walk through all the values
		newTxt.placeholder = 'I\'ve been hit!';

		newDiv.appendChild(newSpan);
		newDiv.appendChild(newTxt);

		// Append to DOM
		document.getElementById('dmgdMsgDiv').appendChild(newDiv);
	});

	// Handles adding extra input field to trails
	$("#addTrailsBtn").on("click", function(e){
		// Prevents the form from being submitted
		e.preventDefault();

		// Creates the new form field
		var trailsList = document.getElementById('trails');
		var newDiv = document.createElement('div');
		var newSpan = document.createElement('span');
		var newList = document.createElement('select');
		newDiv.className = 'form-group';
		newList.className = 'form-field';
		newList.name = 'trails[]';

		var listItems = [];

		// Gets the existing select options so it auto updates
		// in case the form is ever changed
		for (i = 0; i < trailsList.options.length; i++) {
			listItems.push(trailsList.options[i].value);
		}

		for(let i=0; i<listItems.length; i++){
			var option = document.createElement('option');
			var txt = document.createTextNode(listItems[i]);

			option.value = listItems[i];

			option.appendChild(txt);
			newList.appendChild(option);
		}

		newDiv.appendChild(newSpan);
		newDiv.appendChild(newList);

		// Append to DOM
		document.getElementById('trailsDiv').appendChild(newDiv);
	});

	// Triggers when user loses focus on bossLevel field
	$("#bossLevel").on("blur", function(e){
		var str = document.getElementById('bossLevel').value;
		// Verifies user input
		var err = verifyBossLevel(str);

		// Shows / Hides the error message
		if(err){
			errors = true;
			$("#error-level").css("display","grid");
		} else {
			errors = false;
			$("#error-level").css("display","none");
		}
	});

	// Triggers when user loses focus on bossTimeout field
	$("#bossTimeout").on("blur", function(e){
		var str = document.getElementById('bossTimeout').value;
		// Verifies user input
		var err = verifyBossTimeout(str);

		// Shows / Hides the error message
		if(err){
			errors = true;
			$("#error-timeout").css("display","grid");
		} else {
			errors = false;
			document.getElementById('bossTimeout').value = parseInt(str);
			$("#error-timeout").css("display","none");
		}
	});

	// Triggers when user loses focus on bossHealthMultiplier field
	$("#bossHealthMultiplier").on("blur", function(e){
		var str = document.getElementById('bossHealthMultiplier').value;
		// Verifies user input
		var err = verifyBossHealthMultiplier(str);

		// Number input fields return empty if there's invalid value but doesn't
		// actually empty the field for the user. This fixes that issue
		if(str == ''){
			document.getElementById('bossHealthMultiplier').value = '';
		}

		// Shows / Hides the error message
		if(err){
			errors = true;
			$("#error-healthMultiplier").css("display","grid");
		} else {
			errors = false;
			$("#error-healthMultiplier").css("display","none");
		}
	});

	// Triggers when user loses focus on bossDamageMultiplier field
	$("#bossDamageMultiplier").on("blur", function(e){
		var str = document.getElementById('bossDamageMultiplier').value;
		// Verifies user input
		var err = verifyBossHealthMultiplier(str);

		// Number input fields return empty if there's invalid value but doesn't
		// actually empty the field for the user. This fixes that issue
		if(str == ''){
			document.getElementById('bossDamageMultiplier').value = '';
		}

		// Shows / Hides the error message
		if(err){
			$("#error-damageMultiplier").css("display","grid");
		} else {
			$("#error-damageMultiplier").css("display","none");
		}
	});

	// Triggers when user loses focus on bossSpawnChance field
	$("#bossSpawnChance").on("blur", function(e){
		var str = document.getElementById('bossSpawnChance').value;
		// Verifies user input
		var err = verifyBossSpawnChance(str);

		// Number input fields return empty if there's invalid value but doesn't
		// actually empty the field for the user. This fixes that issue
		if(str == ''){
			document.getElementById('bossSpawnChance').value = '';
		}

		// Shows / Hides the error message
		if(err){
			errors = true;
			$("#error-spawnChance").css("display","grid");
		} else {
			errors = false;
			$("#error-spawnChance").css("display","none");
		}
	});

	// General trigger on any blur (lose focus) event
	document.addEventListener("blur", function(e){
		// Make sure the element contains a classList
		if(e.target.classList){
			// Triggers when user loses focus on any of the powers fields
			if(e.target.classList.contains('powers')){
				// Gets all powers fields
				var listElems = document.querySelectorAll(".powers");

				// Loop through all powers fields
				for(let i=0; i<listElems.length; i++){
					var str = listElems[i].value;
					// Verifies user input
					var err = verifyPowers(str);

					// Shows / Hides the error message
					if(err){
						// Make sure no errors pop up if the user empties a field
						if(str == ''){
							return false;
						}
						errors = true;
						$("#error-powers").css("display","grid");
						break;
					} else {
						errors = false;
						$("#error-powers").css("display","none");
					}
				}
			// Triggers when user loses focus on any of the loot fields
			} else if(e.target.classList.contains('loot')){
				// Gets all loot fields
				var listElems = document.querySelectorAll(".loot");

				// Loop through all loot fields
				for(let i=0; i<listElems.length; i++){
					var str = listElems[i].value;
					// Verifies user input
					var err = verifyLoot(str);

					// Shows / Hides the error message
					if(err){
						// Make sure no errors pop up if the user empties a field
						if(str == ''){
							return false;
						}
						errors = true;
						$("#error-uniqueLootList").css("display","grid");
						break;
					} else {
						errors = false;
						$("#error-uniqueLootList").css("display","none");
					}
				}
			}
		}
	}, true);

	// Triggers when user generates a YML file
	$("#generate").on("click", function(e){
		// Prevents the form from being submitted
		e.preventDefault();

		// Cancels creating a YML file and warns the user to fix any errors
		if(errors){
			alert("Please fix any errors before generating the YML file!");
			return false;
		}

		// We're not actually sending any form to the server, but this is an
		// easy way of getting all the form data.
		var form = new FormData(document.getElementById('bossForm'));

		var filename;
		// Gives the bossName it's generated value if the user left it empty
		if(form.get('bossName').replace(/\s/g, "") == ''){
			filename = bossName;
		} else {
			filename = form.get('bossName').replace(/\s/g, "_").toLowerCase() + '.yml';
		}
			filename = filename.replace(/&./g, "");
			filename = filename.replace(/'/g, "");

		// Generates the YML content
		var text = '';
			if(form.get('isEnabled') != 'EMPTY'){
				text += 'isEnabled: '+form.get('isEnabled')+'\r\n';
			}
			if(selectedForm == 'worldbossform'){
				text += 'isRegionalBoss: '+form.get('isRegionalBoss')+'\r\n';
				if(form.get('spawnLocation').replace(/\s/g, "") != ''){
					text += 'spawnLocation: '+form.get('spawnLocation')+'\r\n';
				}
				if(form.get('spawnCooldown').replace(/\s/g, "") != ''){
					text += 'spawnCooldown: '+form.get('spawnCooldown')+'\r\n';
				}
				if(form.get('leashRadius').replace(/\s/g, "") != ''){
					text += 'leashRadius: '+form.get('leashRadius')+'\r\n';
				}
			}
			text += 'entityType: '+form.get('entityType')+'\r\n';

			// Most if / else statements here just check if the user left
			// the field empty or not and only adds it in case it's not
			//
			// Note: Several regex checks are added to strip spaces from fields
			//		 that only contain spaces.
			if(form.get('bossName').replace(/\s/g, "") == ''){
				text += 'name: \''+bossName+'\'\r\n';
			} else {
				text += 'name: \''+form.get('bossName').replace(/'/g, "\\'")+'\'\r\n';
			}
			if(form.get('bossLevel').replace(/\s/g, "") != ''){
				text += 'level: '+form.get('bossLevel')+'\r\n';
			}
			if(form.get('bossTimeout').replace(/\s/g, "") != ''){
				text += 'timeout: '+form.get('bossTimeout')+'\r\n';
			}
			if(form.get('isPersistent') != 'EMPTY'){
				text += 'isPersistent: '+form.get('isPersistent')+'\r\n';
			}
			if(form.get('bossHealthMultiplier').replace(/\s/g, "") != ''){
				text += 'healthMultiplier: '+form.get('bossHealthMultiplier')+'\r\n';
			}
			if(form.get('bossDamageMultiplier').replace(/\s/g, "") != ''){
				text += 'damageMultiplier: '+form.get('bossDamageMultiplier')+'\r\n';
			}
			if(form.get('bossHelmet') != 'EMPTY'){
				text += 'helmet: ';
				if(form.get('bossHelmet') == 'EMPTY'){
					text += '{}\r\n';
				} else {
					text += form.get('bossHelmet')+'\r\n';
				}
			}
			if(form.get('bossChestplate') != 'EMPTY'){
				text += 'chestplate: ';
				if(form.get('bossChestplate') == 'EMPTY'){
					text += '{}\r\n';
				} else {
					text += form.get('bossChestplate')+'\r\n';
				}
			}
			if(form.get('bossLeggings') != 'EMPTY'){
				text += 'leggings: ';
				if(form.get('bossLeggings') == 'EMPTY'){
					text += '{}\r\n';
				} else {
					text += form.get('bossLeggings').value+'\r\n';
				}
			}
			if(form.get('bossBoots') != 'EMPTY'){
				text += 'boots: ';
				if(form.get('bossBoots') == 'EMPTY'){
					text += '{}\r\n';
				} else {
					text += form.get('bossBoots')+'\r\n';
				}
			}
			if(form.get('bossMainhand') != 'EMPTY'){
				text += 'mainhand: ';
				if(form.get('bossMainhand') == 'EMPTY'){
					text += '{}\r\n';
				} else {
					text += form.get('bossMainhand')+'\r\n';
				}
			}
			if(form.get('bossOffhand') != 'EMPTY'){
				text += 'offhand: ';
				if(form.get('bossOffhand') == 'EMPTY'){
					text += '{}\r\n';
				} else {
					text += form.get('bossOffhand')+'\r\n';
				}
			}
			if(form.get('isBaby') != 'EMPTY'){
				text += 'isBaby: '+form.get('isBaby')+'\r\n';
			}

			var powersArr = form.getAll('powers[]');

			// This is a bit more tricky. It checks if the fields only contain
			// empty or duplicate empty values and removes them. Otherwise it
			// would add the field to the YML file if the user added extra fields
			// but never put any data into them.
			if(powersArr.filter((v, i, a) => a.indexOf(v) === i) != ''){
				text += 'powers:';
				if(powersArr.length < 2 && form.get('powers[]').replace(/\s/g, "") == ''){
					text += ' {}\r\n';
				} else {
					text += '\r\n';
					for(let i=0; i<powersArr.length; i++){
						if(powersArr[i].replace(/\s/g, "") != ''){
							text += '- '+powersArr[i]+'\r\n';
						}
					}
				}
			}
			if(form.get('bossSpawnMessage').replace(/\s/g, "") != ''){
				text += 'spawnMessage: \''+form.get('bossSpawnMessage').replace(/'/g, "\\'")+'\'\r\n';
			}
			if(form.get('bossDeathMessage').replace(/\s/g, "") != ''){
				text += 'deathMessage: \''+form.get('bossDeathMessage').replace(/'/g, "\\'")+'\'\r\n';
			}
			if(form.get('bossEscapeMessage').replace(/\s/g, "") != ''){
				text += 'escapeMessage: \''+form.get('bossEscapeMessage').replace(/'/g, "\\'")+'\'\r\n';
			}
			if(form.get('bossLocationMessage').replace(/\s/g, "") != ''){
				text += 'locationMessage: \''+form.get('bossLocationMessage').replace(/'/g, "\\'")+'\'\r\n';
			}

			var lootArr = form.getAll('loot[]');
			if(lootArr.filter((v, i, a) => a.indexOf(v) === i) != ''){
				text += 'uniqueLootList:';
				if(lootArr.length < 2 && form.get('loot[]').replace(/\s/g, "") == ''){
					text += ' {}\r\n';
				} else {
					text += '\r\n';
					for(let i=0; i<lootArr.length; i++){
						if(lootArr[i].replace(/\s/g, "") != ''){
							text += '- '+lootArr[i]+'\r\n';
						}
					}
				}
			}
			if(form.get('dropsEliteMobsLoot') != 'EMPTY'){
				text += 'dropsEliteMobsLoot: '+form.get('dropsEliteMobsLoot')+'\r\n';
			}
			if(form.get('dropsVanillaLoot') != 'EMPTY'){
				text += 'dropsVanillaLoot: '+form.get('dropsVanillaLoot')+'\r\n';
			}

			var trailsArr = form.getAll('trails[]');
			if(trailsArr.filter((v, i, a) => a.indexOf(v) === i) != 'EMPTY'){
				text += 'trails:';
				if(trailsArr.length < 2 && form.get('trails[]').replace(/\s/g, "") == ''){
					text += ' {}\r\n';
				} else {
					text += '\r\n';
					for(let i=0; i<trailsArr.length; i++){
						if(trailsArr[i].replace(/\s/g, "") != ''){
							if(trailsArr[i] != 'EMPTY'){
								text += '- '+trailsArr[i]+'\r\n';
							}
						}
					}
				}
			}

			var dmgMsgArr = form.getAll('damageMessage[]');
			if(dmgMsgArr.filter((v, i, a) => a.indexOf(v) === i) != ''){
				text += 'onDamageMessages:';
				if(dmgMsgArr.length < 2 && form.get('damageMessage[]').replace(/\s/g, "") == ''){
					text += ' {}\r\n';
				} else {
					text += '\r\n';
					for(let i=0; i<dmgMsgArr.length; i++){
						if(dmgMsgArr[i].replace(/\s/g, "") != ''){
							text += '- \''+dmgMsgArr[i].replace(/'/g, "\\'")+'\'\r\n';
						}
					}
				}
			}

			var dmgdMsgArr = form.getAll('damagedMessage[]');
			if(dmgdMsgArr.filter((v, i, a) => a.indexOf(v) === i) != ''){
				text += 'onDamagedMessages:';
				if(dmgdMsgArr.length < 2 && form.get('damagedMessage[]').replace(/\s/g, "") == ''){
					text += ' {}\r\n';
				} else {
					text += '\r\n';
					for(let i=0; i<dmgdMsgArr.length; i++){
						if(dmgdMsgArr[i].replace(/\s/g, "") != ''){
							text += '- \''+dmgdMsgArr[i].replace(/'/g, "\\'")+'\'\r\n';
						}
					}
				}
			}
			if(form.get('bossSpawnChance').replace(/\s/g, "") != ''){
				text += 'spawnChance: '+form.get('bossSpawnChance');
			}

		// This is pretty much only cross-browser compatible way to generate
		// a file download without actually creating a file on the server
		var blob = new Blob([text], {type: 'text/csv'});
		if(window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename);
		} else {
			var elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			elem.download = filename;        
			document.body.appendChild(elem);
			elem.click();        
			document.body.removeChild(elem);
		}
	});
});

// This function just creates a basic html color pallette
function createColorPallete(ele) {
	var newDiv = document.createElement('div');
	var btnClasses = [
		'blackBtn',
		'darkBlueBtn',
		'darkGreenBtn',
		'darkAquaBtn',
		'darkRedBtn',
		'purpleBtn',
		'orangeBtn',
		'lightGrayBtn',
		'darkGrayBtn',
		'blueBtn',
		'lightGreenBtn',
		'aquaBtn',
		'redBtn',
		'pinkBtn',
		'yellowBtn',
		'whiteBtn'
	];
	var labels = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

	for(let i=0; i<btnClasses.length; i++){
		var newLabel = document.createElement('label');

		newLabel.className = 'colorBtn';
		newLabel.classList.add(btnClasses[i]);
		newLabel.onclick = function(){
			const element = document.getElementById(ele);
			element.value += '&'+labels[i];
		}
		newDiv.appendChild(newLabel);
	}

	return newDiv;
}

// Generates a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// If str contains anything else but dynamic, make sure it's an integer between 1 and 150
function verifyBossLevel(str){
	if(str.toLowerCase() != 'dynamic'){
		if(!isNaN(str)){
			str = parseInt(str);

			if(str < 1 || str > 150){
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}

// Makes sure str is an integer of 1 or higher
function verifyBossTimeout(str){
	if(!isNaN(str)){
		str = parseInt(str);

		if(str < 1){
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
}

// Makes sure str is a double of 0.0001 or higher
function verifyBossHealthMultiplier(str){
	if(!isNaN(str)){
		str = parseFloat(str);

		if(str < 0.0001){
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
}

// Makes sure str ends in .yml
function verifyPowers(str){
	if(!/.+\.yml$/.test(str)){
		return true;
	} else {
		if(str.includes(' ')){
			return true;
		} else {
			return false;
		}
	}
}

// Makes sure str ends with .yml:0 or :1 optionally followed by a dot and 0 to 4 numbers
function verifyLoot(str){
	if(!/.+\.yml:[0-1]\.?\d{0,4}$/.test(str)){
		return true;
	} else {
		if(str.includes(' ')){
			return true;
		} else {
			str = parseFloat(str);

			if(str < 0 || str > 1){
				return true;
			} else {
				return false;
			}
		}
	}
}

// Makes sure str is a double between 0.001 and 1
function verifyBossSpawnChance(str){
	if(!isNaN(str)){
		str = parseFloat(str);

		if(str < 0.001 || str > 1){
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
}