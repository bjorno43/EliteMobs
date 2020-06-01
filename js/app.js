$(document).ready(function(){
	$('.sidenav').sidenav();
	$('.dropdown-trigger').dropdown();
	$('.collapsible').collapsible();
	$('select').formSelect();

	$("#bossHelmet").autocomplete({
		data: {
			"LEATHER_HELMET": './layout/images/icons/leather/leather_helmet.png',
			"CHAINMAIL_HELMET": './layout/images/icons/chainmail/chainmail_helmet.png',
			"IRON_HELMET": './layout/images/icons/iron/iron_helmet.png',
			"GOLDEN_HELMET": './layout/images/icons/gold/golden_helmet.png',
			"DIAMOND_HELMET": './layout/images/icons/diamond/diamond_helmet.png'
		},
    });

	$("#bossChestplate").autocomplete({
		data: {
			"LEATHER_CHESTPLATE": './layout/images/icons/leather/leather_chest.png',
			"CHAINMAIL_CHESTPLATE": './layout/images/icons/chainmail/chainmail_chest.png',
			"IRON_CHESTPLATE": './layout/images/icons/iron/iron_chest.png',
			"GOLDEN_CHESTPLATE": './layout/images/icons/gold/golden_chest.png',
			"DIAMOND_CHESTPLATE": './layout/images/icons/diamond/diamond_chest.png'
		},
	});

	$("#bossLeggings").autocomplete({
		data: {
			"LEATHER_LEGGINGS": './layout/images/icons/leather/leather_leggings.png',
			"CHAINMAIL_LEGGINGS": './layout/images/icons/chainmail/chainmail_leggings.png',
			"IRON_LEGGINGS": './layout/images/icons/iron/iron_leggings.png',
			"GOLDEN_LEGGINGS": './layout/images/icons/gold/golden_leggings.png',
			"DIAMOND_LEGGINGS": './layout/images/icons/diamond/diamond_leggings.png'
		},
	});

	$("#bossBoots").autocomplete({
		data: {
			"LEATHER_BOOTS": './layout/images/icons/leather/leather_boots.png',
			"CHAINMAIL_BOOTS": './layout/images/icons/chainmail/chainmail_boots.png',
			"IRON_BOOTS": './layout/images/icons/iron/iron_boots.png',
			"GOLDEN_BOOTS": './layout/images/icons/gold/golden_boots.png',
			"DIAMOND_BOOTS": './layout/images/icons/diamond/diamond_boots.png'
		},
	});

	$("#bossMainhand, #bossOffhand").autocomplete({
		data: {
			"BOW": './layout/images/icons/weapons/bow.png',
			"DIAMOND_AXE": './layout/images/icons/diamond/diamond_axe.png',
			"DIAMOND_SWORD": './layout/images/icons/diamond/diamond_sword.png',
			"GOLDEN_AXE": './layout/images/icons/gold/golden_axe.png',
			"GOLDEN_SWORD": './layout/images/icons/gold/golden_sword.png',
			"IRON_AXE": './layout/images/icons/iron/iron_axe.png',
			"IRON_SWORD": './layout/images/icons/iron/iron_sword.png',
			"STONE_AXE": './layout/images/icons/stone/stone_axe.png',
			"STONE_SWORD": './layout/images/icons/stone/stone_sword.png',
			"WOODEN_AXE": './layout/images/icons/wood/wooden_axe.png',
			"WOODEN_SWORD": './layout/images/icons/wood/wooden_sword.png'
		},
	});

	$("#bossTrails").autocomplete({
		data: {
			"ANVIL": null,
			"ARROW": null,
			"BARRIER": null,
			"BELL": null,
			"BLOCK_DUST": null,
			"BONE": null,
			"BOOK": null,
			"CAKE": null,
			"CAMPFIRE_COSY_SMOKE": null,
			"CARROTS": null,
			"CHEST": null,
			"COBWEB": null,
			"COOKIE": null,
			"EXPLOSION_NORMAL": null,
			"FALLING_LAVA": null,
			"FALLING_WATER": null,
			"HEART": null,
			"SLIME": null,
			"SNOWBALL": null,
			"TOTEM": null
		}
	});
});

function draggable(elem){
	$('.collapsible').collapsible();
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elem.id + "Header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elem.id + "Header").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elem.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		if(elem.offsetTop - pos2 < 0) {
			elem.style.top = "0px";
		} else {
			elem.style.top = (elem.offsetTop - pos2) + "px";
		}
		if(elem.offsetLeft - pos1 < 310) {
			elem.style.left = "310px";
		} else {
			elem.style.left = (elem.offsetLeft - pos1) + "px";
		}
		document.getElementById(elem.id + "Header").style.pointerEvents = "none";
	}

	function cancelDefault(e){
		e.stopPropagation();
	}

	function closeDragElement() {
		document.getElementById(elem.id + "Header").style.pointerEvents = "auto";
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

class FormContainer
{
	constructor() {
		this.divConID = "";
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

	// Getter for divConID
	getID() {
		return this.divConID;
	}

	// Main container
	containerDiv() {
		this.divConID = this.generateID();
		const divContainer = document.createElement('div');

		divContainer.id = this.divConID;
		divContainer.className = 'draggable';

		return divContainer;
	}

	// Container header
	containerDivHeader(headerTXT) {
		this.divConHeaderID = this.divConID + 'Header';
		const divConHeaderUL = document.createElement('ul');
		const divConHeaderLI = document.createElement('li');
		const divConHeaderDIV = document.createElement('div');

		const divConHeadTXT = document.createTextNode(headerTXT);

		divConHeaderUL.className = 'collapsible';
		divConHeaderDIV.id = this.divConHeaderID;
		divConHeaderDIV.className = 'collapsible-header';

		divConHeaderDIV.appendChild(divConHeadTXT);
		divConHeaderLI.appendChild(divConHeaderDIV);
		divConHeaderUL.appendChild(divConHeaderLI);

		return divConHeaderUL;
	}
}