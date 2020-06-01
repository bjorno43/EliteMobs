function createBossForm(worldBoss = false){

	// Create form container
	let container = new FormContainer();
	const conDiv = container.containerDiv();

	// Create form container header and give it a title
	const conDivHeader = container.containerDivHeader('Custom boss form');
	const conID = container.getID();

	// Create normal boss
	let bossForm = new BossForm(false);
	const bossFormContent = bossForm.generateForm();

	// Append boss form to container
	conDivHeader.getElementsByTagName('li')[0].innerHTML = bossFormContent;
	conDiv.appendChild(conDivHeader);

	// Insert into DOM
	var ele = document.getElementById('panel');
	ele.appendChild(conDiv);

	// Apply draggable
	draggable(document.getElementById(conID));

	// Prevent user from creating more boss forms
	var bossBtn = document.getElementById('createBossBtn');
	var wBossBtn = document.getElementById('createWorldBossBtn');
	bossBtn.onclick = '';
	wBossBtn.onclick = '';
	bossBtn.style.cursor = 'not-allowed';
	wBossBtn.style.cursor = 'not-allowed';
	bossBtn.style.opacity = '0.5';
	wBossBtn.style.opacity = '0.5';
}

class BossForm
{
	// World boss or normal boss
	constructor(worldBoss) {
		this.worldBoss = worldBoss;
		this.formID = "";
	}

	// Getter for formID
	getFormID() {
		return this.formID;
	}

	// Generate random ID
	generateID() {
		const id = '_' + Math.random().toString(36).substr(2, 9);

		// Check if ID already used
		if(document.getElementById(id)){
			this.generateID();
		} else {
			return id;
		}
	}

	// Generate form
	generateForm() {
		let html = '';
		
			html += '<form data-formType="bossForm">';
			html += '<div class="row">';
			html += '<div class="col s12">';
			html += '<div class="row">';
			html += '<div class="input-field col s4">';
			html += '<input type="text" id="bossName" class="validate">';
			html += '<label for="bossName">Boss name:</label>';
			html += '</div>';
			html += '<div class="input-field col s4">';
			html += '<select>';
			html += '<option value="default">Default</option>';
			html += '<option value="true">True</option>';
			html += '<option value="false">False</option>';
			html += '</select>';
			html += '<label>isEnabled</label>';
			html += '</div>';
			html += '<div class="input-field col s4">';
			html += '<select>';
			html += '<option value="BLAZE">BLAZE</option>';
			html += '<option value="CAVE_SPIDER">CAVE_SPIDER</option>';
			html += '<option value="CREEPER">CREEPER</option>';
			html += '<option value="DROWNED">DROWNED</option>';
			html += '<option value="ELDER_GUARDIAN">ELDER_GUARDIAN</option>';
			html += '<option value="ENDERMAN">ENDERMAN</option>';
			html += '<option value="ENDERMITE">ENDERMITE</option>';
			html += '<option value="EVOKER">EVOKER</option>';
			html += '<option value="HUSK">HUSK</option>';
			html += '<option value="ILLUSIONER">ILLUSIONER</option>';
			html += '<option value="IRON_GOLEM">IRON_GOLEM</option>';
			html += '<option value="PHANTOM">PHANTOM</option>';
			html += '<option value="PIG_ZOMBIE">PIG_ZOMBIE</option>';
			html += '<option value="PIG_ZOMBIE">PILLAGER</option>';
			html += '<option value="POLAR_BEAR">POLAR_BEAR</option>';
			html += '<option value="RAVAGER">RAVAGER</option>';
			html += '<option value="SILVERFISH">SILVERFISH</option>';
			html += '<option value="SKELETON">SKELETON</option>';
			html += '<option value="SPIDER">SPIDER</option>';
			html += '<option value="STRAY">STRAY</option>';
			html += '<option value="VEX">VEX</option>';
			html += '<option value="VINDICATOR">VINDICATOR</option>';
			html += '<option value="WITCH">WITCH</option>';
			html += '<option value="WITHER_SKELETON">WITHER_SKELETON</option>';
			html += '<option value="ZOMBIE">ZOMBIE</option>';
			html += '</select>';
			html += '<label>entityType</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s4">';
			html += '<input type="text" id="bossLevel" class="validate">';
			html += '<label for="bossLevel">Level:</label>';
			html += '</div>';
			html += '<div class="input-field col s4">';
			html += '<input type="number" id="bossTimeout" class="validate" min="1" step="1"/>';
			html += '<label for="bossTimeout">Timeout:</label>';
			html += '</div>';
			html += '<div class="input-field col s4">';
			html += '<select>';
			html += '<option value="default">Default</option>';
			html += '<option value="true">True</option>';
			html += '<option value="false">False</option>';
			html += '</select>';
			html += '<label>isPersistent</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s6">';
			html += '<input type="number" id="bossHealthMultiplier" class="validate" min="0.0001" step="0.0001"/>';
			html += '<label for="bossHealthMultiplier">HealthMultiplier:</label>';
			html += '</div>';
			html += '<div class="input-field col s6">';
			html += '<input type="number" id="bossDamageMultiplier" class="validate" min="0.0001" step="0.0001"/>';
			html += '<label for="bossDamageMultiplier">HealthMultiplier:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s3">';
			html += '<input type="text" id="bossHelmet" class="autocomplete">';
			html += '<label for="bossHelmet">Helmet:</label>';
			html += '</div>';
			html += '<div class="input-field col s3">';
			html += '<input type="text" id="bossChestplate" class="autocomplete">';
			html += '<label for="bossChestplate">Chestplate:</label>';
			html += '</div>';
			html += '<div class="input-field col s3">';
			html += '<input type="text" id="bossLeggings" class="autocomplete">';
			html += '<label for="bossLeggings">Leggings:</label>';
			html += '</div>';
			html += '<div class="input-field col s3">';
			html += '<input type="text" id="bossBoots" class="autocomplete">';
			html += '<label for="bossBoots">Boots:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s6">';
			html += '<input type="text" id="bossMainhand" class="autocomplete">';
			html += '<label for="bossMainhand">Mainhand:</label>';
			html += '</div>';
			html += '<div class="input-field col s6">';
			html += '<input type="text" id="bossOffhand" class="autocomplete">';
			html += '<label for="bossOffhand">Offhand:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<select>';
			html += '<option value="default">Default</option>';
			html += '<option value="true">True</option>';
			html += '<option value="false">False</option>';
			html += '</select>';
			html += '<label>isBaby</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossPowers" class="validate">';
			html += '<label for="bossPowers">Powers:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossSpawnMessage" class="validate">';
			html += '<label for="bossSpawnMessage">SpawnMessage:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossDeathMessage" class="validate">';
			html += '<label for="bossDeathMessage">DeathMessage:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossEscapeMessage" class="validate">';
			html += '<label for="bossEscapeMessage">EscapeMessage:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossLocationMessage" class="validate">';
			html += '<label for="bossLocationMessage">LocationMessage:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossUniqueLootList" class="validate">';
			html += '<label for="bossUniqueLootList">UniqueLootList:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<select>';
			html += '<option value="default">Default</option>';
			html += '<option value="true">True</option>';
			html += '<option value="false">False</option>';
			html += '</select>';
			html += '<label>dropsEliteMobsLoot</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<select>';
			html += '<option value="default">Default</option>';
			html += '<option value="true">True</option>';
			html += '<option value="false">False</option>';
			html += '</select>';
			html += '<label>dropsVanillaLoot</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossTrails" class="autocomplete">';
			html += '<label for="bossTrails">Trails:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossOnDamageMessages" class="validate">';
			html += '<label for="bossOnDamageMessages">OnDamageMessages:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="text" id="bossOnDamagedMessages" class="validate">';
			html += '<label for="bossOnDamagedMessages">OnDamagedMessages:</label>';
			html += '</div>';
			html += '</div>';
			html += '<div class="row">';
			html += '<div class="input-field col s12">';
			html += '<input type="number" id="bossSpawnChance" class="validate" min="1" step="1"/>';
			html += '<label for="bossSpawnChance">SpawnChance:</label>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</form>';

			return html;
		
	}
}