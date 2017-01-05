function coordToRegion(coord) {
	return Math.floor((coord / 16) / 32.0);
}

function calculateRegionInfixString(Xcoord, Ycoord) {
	$('#region').html("You are in region " + coordToRegion(Xcoord) + ',' + coordToRegion(Ycoord) + ". The white circle indicates your exact position.");
	return coordToRegion(Xcoord) + '.' + coordToRegion(Ycoord);
}

function validateNumericInput(fieldSelector, errMsg) {
	if ( $.isNumeric(fieldSelector) == false ) {
		alert(errMsg);
		return false;
	}
	return true;
}

function showLocalMap() {
	var $Xcoord = $('#x-coord');
	var $Ycoord = $('#y-coord');
	var errMsg = "Coordinate input must be numeric.";
	if (false == (validateNumericInput($Xcoord.val(), errMsg) && validateNumericInput($Ycoord.val(), errMsg))) {
		return; //do nothing
	}

	var regionInfixString = calculateRegionInfixString(parseInt($Xcoord.val()), parseInt($Ycoord.val()));
	var $localMapImage = $('#local-map');
	var downloadingImage = new Image();

	downloadingImage.onload = function() {
		$localMapImage.attr("src", this.src);

		var c = document.getElementById("map-canvas");
    	var ctx = c.getContext("2d");
    	var img = downloadingImage; //document.getElementById("local-map");
    	ctx.strokeStyle = "#000000";
    	ctx.fillRect(0,0,512,512);
    	ctx.drawImage(img, 0, 0);
    	ctx.strokeStyle = "#FFFFFF";
    	ctx.beginPath();
    	ctx.arc(Math.abs(parseInt($Xcoord.val()) % 512), Math.abs(parseInt($Ycoord.val()) % 512),20,0,2*Math.PI);
    	ctx.stroke();
	};

	downloadingImage.onerror = function() {
		$("#region").html('Sorry, that map tile does not exist.');
	};

	downloadingImage.src = "map/tile." + regionInfixString + ".png";
	console.log(downloadingImage.src);
}