// Global vars
var interactiveMode = false;
var boss = false;
var worldBoss = false;
var loot = false;
var npc = false;
var treasureChest = false;

$(document).ready(function() {

	// Preload modals
	$('.modal').modal({
		dismissible: false
	});

	// Create modal selectors
	const modeSelectorElem = document.getElementById('modal');
	const modeInstance = M.Modal.getInstance(modeSelectorElem);
	const interactiveModeElem = document.getElementById('interactive');
	const interactiveInstance = M.Modal.getInstance(interactiveModeElem);
	const formselectModeElem = document.getElementById('formselect');
	const formselectInstance = M.Modal.getInstance(formselectModeElem);
	const layoutModeElem = document.getElementById('layoutselect');
	const layoutInstance = M.Modal.getInstance(layoutModeElem);

	// Load Mode Selector modal
	modeInstance.open();

	// Load Interactive Mode modal
	$("#btnInteractive").on("click", function(e){
		modeInstance.close();
		interactiveInstance.open();

		interactiveMode = true;
	});

	// Load Form Select Mode modal
	$("#btnFormSelect").on("click", function(e){
		modeInstance.close();
		formselectInstance.open();

		interactiveMode = false;
	});

	// Go back to the beginning
	$(".btnBack").on("click", function(e){

		// Deselect all checkboxes
		$("input:checkbox").prop('checked', false);

		// Disable world boss checkboxes
		$("#checkCustomWorldBoss").attr("disabled", true);
		$("#checkCustomWorldBossForm").attr("disabled", true);

		interactiveInstance.close();
		formselectInstance.close();
		layoutInstance.close();
		modeInstance.open();
	});

	// Enable / Disable world boss checkbox interactive mode
	$("#checkCustomBoss").change(function(){
		if(this.checked){
			$("#checkCustomWorldBoss").removeAttr("disabled");
		} else {
			// Make sure to deselect the checkbox as well
			$("#checkCustomWorldBoss").prop("checked", false);
			$("#checkCustomWorldBoss").attr("disabled", true);
		}
	});

	// Enable / Disable world boss checkbox formselect mode
	$("#checkCustomBossForm").change(function(){
		if(this.checked){
			$("#checkCustomWorldBossForm").removeAttr("disabled");
		} else {
			// Make sure to deselect the checkbox as well
			$("#checkCustomWorldBossForm").prop("checked", false);
			$("#checkCustomWorldBossForm").attr("disabled", true);
		}
	});

	// Choose workspace
	$(".btnWork").on("click", function(e){
		interactiveInstance.close();
		formselectInstance.close();
		layoutInstance.open();
	});

	// User clicked Begin, build up workspace and forms
	$(".btnBegin").on("click", function(e){
		// Get the choosen workspace
		const layout = $("input[name='layoutStyle']:checked").val();

		// Load the choosen workspace
		$("#workspace").load("./workspace/"+layout+".html", function(){
			// Show world boss form elements if choosen
			if($('#checkCustomWorldBoss, #checkCustomWorldBossForm').is(':checked')){
				worldBoss = true;
			}

			// Load the choosen forms
			if($('#checkCustomBoss, #checkCustomBossForm').is(':checked')){
				boss = true;
				$('#bossFormContent').load('./forms/customBossForm.html', function(){
					const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);

					const inputDelegate = delegate('input');

					document.getElementById('bossForm').addEventListener("input", function(e){
						var form = new FormData(document.getElementById('bossForm'));
						var yml = generateBossYML(form);
						yml = yml.replace(/(?:\r\n|\r|\n)/g, '<br>');
						$("#ymlPreview").html(yml);
					});
					// Implement bossForm functionality
					bossFormFunctions();
					$('#workBossForm').show();
				});
			}
			if($('#checkCustomLoot, #checkCustomLootForm').is(':checked')){
				loot = true;
				$('#bossFormContent').load('./forms/customLootForm.html', function(){
					$('#workLootForm').show();
				});
			}
			if($('#checkCustomNPC, #checkCustomNPCForm').is(':checked')){
				npc = true;
				$('#bossFormContent').load('./forms/customNPCForm.html', function(){
					$('#workNPCForm').show();
				});
			}
			if($('#checkCustomLootBox, #checkCustomLootBoxForm').is(':checked')){
				treasureChest = true;
				$('#bossFormContent').load('./forms/customTreasureChestForm.html', function(){
					$('#workTreasureForm').show();
				});
			}
		});

		// Load interactive handholding
		if(interactiveMode){
		}

		// Close the modals and show workspace
		layoutInstance.close();
		$("#workspace").show();
	});
});