var win = Ti.UI.createWindow({
	backgroundColor : "#f0f0f0"
});
win.addEventListener("android:back", function(e) {
	alert("ANDROID BACK");
});

var button = Ti.UI.createButton({
	title : "Show POP"
});
button.addEventListener("click", function(e) {
	var msgPOP = popActInd("My POP", "#000", 0.7, win);
	setTimeout(function(e) {
		msgPOP.pop.close();
	}, 1000);
});
win.add(button);

win.open();

function popActInd(msg, color, opct, window) {
	//Basic Index
	//msg - Mensage Text
	//color - Background Color
	//opct - Opacity Nivel
	//window - Used for get the same function android:back in your current Window

	var winPOP1 = Ti.UI.createWindow({
		backgroundColor : color,
		opacity : opct,
		//orientationModes: [Ti.UI.PORTRAIT] if you want to use only Portrait Window
	});
	winPOP1.addEventListener("android:back", function(e) {
		return false;
	});
	var winPOP2 = Ti.UI.createWindow({
		backgroundColor : "transparent",
		//orientationModes: [Ti.UI.PORTRAIT],
		width : "100%",
		height : "100%"
	});

	//if you have a callback in android:back
	winPOP2.addEventListener("android:back", function(e) {
		try {
			if (window)
				window.fireEvent("android:back");
			else
				return false;
		} catch(e) {
			return false;
		}
	});

	var actPOP = Ti.UI.createActivityIndicator({
		message : " " + msg + " ",
		color : "#fff",
		font : {
			fontSize : 25,
			fontFamily : "Arial",
			fontWeight : "bold"
		},
	});
	winPOP2.add(actPOP);
	actPOP.show();

	winPOP1.open();
	winPOP2.open();

	winPOP1.addEventListener("close", function(e) {
		winPOP2.close();
	});

	var obj = {
		pop : winPOP1,
		act : actPOP
	};
	return obj;

}