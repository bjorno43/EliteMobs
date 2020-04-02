// Generates a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function just creates a basic html color pallette
function createColorPallete() {
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
			const element = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1];
			
			element.value += '&'+labels[i];
		}
		newDiv.appendChild(newLabel);
	}

	return newDiv;
}


/*document.getElementById('bossForm').addEventListener("change", function(e){
	var form = new FormData(document.getElementById('bossForm'));
	var yml = generateBossYML(form);
	yml = yml.replace(/(?:\r\n|\r|\n)/g, '<br>');
	$("#ymlPreview").html(yml);
});*/

// General trigger on any blur (lose focus) event
document.addEventListener("blur", function(e){
	if(document.getElementById('bossForm') !== null){
		var form = new FormData(document.getElementById('bossForm'));
		var yml = generateBossYML(form);
		yml = yml.replace(/(?:\r\n|\r|\n)/g, '<br>');
		$("#ymlPreview").html(yml);
	}
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