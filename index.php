<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="Author" content="">
		<meta name="Keywords" content="">
		<meta name="Description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<title>EliteMobs - Webapp</title>

		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="./layout/css/materialize.min.css"/>
		<link type="text/css" rel="stylesheet" href="./layout/css/style.css"/>

		<script type="text/javascript" src="./js/jquery-3.4.1.min.js"></script>
		<script type="text/javascript" src="./js/app.js"></script>
		<script type="text/javascript" src="./modules/bossForm.js"></script>
	</head>
	<body>
		<header></header>
		<main>
			<ul id="sideMenu" class="sidenav sidenav-fixed">
				<li>
					<div class="background">
						<img class="logo" src="./layout/images/elitemobs.png">
					</div>
				</li>
				<li><a href="#">About</a></li>
				<li class="no-padding">
					<ul class="collapsible collapsible-accordion">
						<li class="bold active">
							<a class="collapsible-header">Forms</a>
							<div class="collapsible-body">
								<ul>
									<li><a href="#" onclick="createBossForm()" id="createBossBtn">Create boss</a></li>
									<li><a href="#" id="createWorldBossBtn">Create world boss</a></li>
									<li><a href="#">Create loot</a></li>
									<li><a href="#">Create NPC</a></li>
									<li><a href="#">Create Treasure Chest</a></li>
								</ul>
							</div>
						</li>
					</ul>
				</li>
			</ul>
			<a href="#" data-target="sideMenu" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
			<div class="row">
				<div class="col s12">
					<div id="panel">
						<ul class="collapsible">
							<li>
								<div class="collapsible-header">Boss form</div>
								<div class="collapsible-body">
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
		<footer>
		</footer>
		<script type="text/javascript" src="./js/materialize.min.js"></script>
	</body>
</html>
