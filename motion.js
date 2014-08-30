// motion.js

window.onload = init;

var stepsPerSeason = 100;
var delay = 50; //milliseconds
var step, theta, planet, orbit, left, right, leftDark,
    rightDark, planetRadius, sun, season, bgPosition,
    universe, currentSaying;
var planetIsLocked = false;

function init() {
	if (!document.getElementById) {
		alert("I'm sorry.  Your browser does not support the web standards needed to animate this demo.  I highly recommend viewing this page in Opera7+ or a browser based on the Gecko engine, such as Netscape7+, Firebird, Mozilla, et.al.");
		return;
	}	
	with (document) {
		planet = getElementById("planet");
		orbit = getElementById("orbit");
		left = getElementById("left");
		right = getElementById("right");
		leftDark = getElementById("leftDark");
		rightDark = getElementById("rightDark");
		sun = getElementById("sun");
		universe = getElementById("universe");
	}

	currentSaying = -1;
	planet.onclick = function() {
		if (currentSaying >= 0) {
			planet.getElementsByTagName("li")[currentSaying].style.display = "none";
		}
		currentSaying = (currentSaying < 3)? (currentSaying + 1) : -1;
		if (currentSaying >= 0 ) {
			planet.getElementsByTagName("li")[currentSaying].style.display = "inline";
		}
	}

	right.style.visibility = "visible";
	bgPosition = 0;
	season = 4;
	changeOfSeason();
}

function takeStep() {
	step++;
	
	bgPosition = (bgPosition < 0)? (750 + bgPosition) : (bgPosition - 2.8);
	universe.style.backgroundPosition = pixels(bgPosition) + "  0";
	
	if (step > (stepsPerSeason-1)) {
		changeOfSeason();
	} else {
		switch (season) {
			case 1 : springStep(); break;
			case 2 : summerStep(); break;
			case 3 : fallStep(); break;
			case 4 : winterStep(); break;
		}
		setTimeout("takeStep()",delay);
	}
}

function springStep() {
	theta = (step / stepsPerSeason) * Math.PI / 2.0;
	right.style.right = percent(50 - 50.0 * step / stepsPerSeason);
	positionPlanet(theta);
}

function summerStep() {
	theta = (1 + step / stepsPerSeason) * Math.PI / 2.0;
	positionPlanet(theta);
	left.style.left = percent(50.0 * step / stepsPerSeason);
}

function fallStep() {
	theta = (2 + step / stepsPerSeason) * Math.PI / 2.0;
	positionPlanet(theta);
	rightDark.style.right = percent(50 - 50.0 * step / stepsPerSeason);
}

function winterStep() {
	theta = (3 + step / stepsPerSeason) * Math.PI / 2.0;
	positionPlanet(theta);
	leftDark.style.left = percent(50.0 * step / stepsPerSeason);
}

function sunZindex(z) {
	sun.style.zIndex = z;
}

function changeOfSeason() {
	season = (season == 4)? 1 : (season+1);

	switch (season) {
		case 1:
			positionPlanet(0);
			left.style.left = 0; left.style.right = "50%";
			right.style.left = "50%"; right.style.right = "50%";
			left.style.zIndex = 5;
			right.style.zIndex = 5;
			leftDark.style.zIndex = 1;
			rightDark.style.zIndex = 1;
			setTimeout("sunZindex(100)",delay/2);
			break;
		case 2:	
			positionPlanet(0.5 * Math.PI);
			leftDark.style.left = 0; leftDark.style.right = "50%";
			left.style.zIndex = 5;
			right.style.zIndex = 5;
			leftDark.style.zIndex = 1;
			rightDark.style.zIndex = 1;
			break;
		case 3:
			positionPlanet(Math.PI);
			leftDark.style.left = 0; leftDark.style.right = "50%";
			rightDark.style.left = "50%"; rightDark.style.right = "50%";
			leftDark.style.zIndex = 5;
			left.style.zIndex = 1;
			rightDark.style.zIndex = 5;
			right.style.zIndex = 1;
			setTimeout("sunZindex(1)",delay/2);
			break;
		case 4:			
			positionPlanet(3.0/2.0 * Math.PI);
			left.style.left = 0;			
	}
	
	step = 0;
	setTimeout("takeStep()",delay);
}

function pixels(real) {
	return (Math.round(real)) + "px";
}
function percent(real) {
	return (Math.round(real)) + "%";
}

function positionPlanet(theta) {
	if (planetIsLocked) return;
	
	orbit.style.left = percent(100.0 * Math.cos(theta));
	orbit.style.top = pixels(-40.0 * Math.sin(theta));
	planetRadius = (25.0 - 5.0 * Math.sin(theta));
	planet.style.top = pixels(-planetRadius);
	planet.style.height = pixels(2.0 * planetRadius);
	planet.style.left = pixels(-planetRadius);
	planet.style.width = pixels(2.0 * planetRadius);
}

function hideSun() {
	sun.style.visibility = "hidden";
	return false;
}

function hideStars() {
	universe.style.backgroundImage = "none";
	return false;
}

function zoomPlanet() {
	hideSun();
	hideStars();
	planetIsLocked = true;
	orbit.style.left = "0";
	orbit.style.top = "0";
	planet.style.left = "-100px";
	planet.style.top = "-100px";
	planet.style.width = "200px";
	planet.style.height = "200px";
		
	//trigger season change
	step = stepsPerSeason -1 ;
	season = 4;

	return false;
}