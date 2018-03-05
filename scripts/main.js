var translateText = "";

var targetLangDiv = document.getElementById("edit-langs"); 
var langInput = document.getElementById("lang-input");
var langNameInput = document.getElementById("lang-name-input");
var langText = document.getElementById("lang-text");
var langTextKey = document.getElementById("lang-text-key");
var checkboxTranslate = document.getElementById("auto-translate");
var checkboxTargetLangs = document.getElementById("target-langs");
var progress_state = $("#progress");
var status_span = $("#status");

async function downloadAll() {
	progress_state.show();
	languages = JSON.parse(langInput.value);
	languageNames = JSON.parse(langNameInput.value);

	//Creating translation packages
	if(checkboxTranslate.checked) {
		setStatus("Creating packages...", true);
		var _textLines = langText.value.split("\n");
		var _packages = await createPackages(_textLines);
	}

	for(var i = 0; i < languages.length; i++) {
		await combineKeyTranslation(_packages, languages[i][0]+languages[i][1]);
		addToZip(languages[i] + ".lang", translateText);
		progress_state.text( "Progress: " + Math.round(i/languages.length * 100) + "%");
	}

	setStatus("Adding language defintions...", true);
	await addToZip("languages.json", JSON.stringify(languages, null, "\t"));
	await addToZip("language_names.json", JSON.stringify(await createLanguageNames(), null, "\t"));
	
	setStatus("Download!", true);
	zip.generateAsync({type:"blob"})
		.then(function(content) {
			saveAs(content, "texts.zip");
			progress_state.hide();
			setStatus("", false);
		});
	
}

async function createLanguageNames() {
	var _tmp = [];

	for (var i = 0; i < languages.length; i++) {
		_tmp[i] = [ languages[i], languageNames[i] ]; 
	}
	
	return _tmp;
}

async function combineKeyTranslation(pPackages, lang) {
	translateText = "";
	var _keys = langTextKey.value.split("\n");
	if(checkboxTranslate.checked) {
		//Old code, only support up to 2000 chars
		//var _tmp2 = await translate(langText.value, "auto", lang);
		//_tmp2 = _tmp2.split("\n");

		await translatePackages(pPackages, "auto", lang);
		var _textLines = await joinPackages(pPackages);
		_textLines = _textLines.split("\n");
	}
	else {
		var _textLines = langText.value.split("\n");
	}
	

	for(var i = 0; i < _keys.length; i++) {
		if(_keys[i] != "" && _textLines[i] != "") {
			translateText += _keys[i] + "=" + _textLines[i] + "\n";
		}
		else {
			if(i+1 != _keys.length) translateText += "\n";
		}
	}
}

async function createPackages(pLines) {
	var lastPackageIndex = 0;
	var packages = [];
	for(var i = 0; i < pLines.length; i++) {
		if(pLines.getTotalLength(lastPackageIndex, i) > 1999) {
			let _tmp = pLines.slice(lastPackageIndex, i);
			packages.push(new Package(_tmp.join("\n")));

			lastPackageIndex= i;
		}
	}
	let _tmp = pLines.slice(lastPackageIndex, i);
	packages.push(new Package(_tmp.join("\n")));
	console.log(packages)
	return packages;
}

async function translatePackages(pPackages, sL, tL) {
	for(var i = 0; i < pPackages.length; i++) {
		setStatus("Translating package " + i + "/" + pPackages.length + "...", true);
		await pPackages[i].translate(sL, tL);
	}
}

async function joinPackages(pPackages) {
	var _text ="";
	setStatus("Processing translations...", true);
	for(var i =  0; i < pPackages.length; i++) {
		_text += pPackages[i]._translation + "\n";
	}

	return _text;
}

function loadFile(file) {
	var reader = new FileReader();
	//Reading file
	reader.readAsText(file);
	reader.onload = function() {
		var _text = reader.result;
		var _lines = _text.split("\n");
		var _keys = "";
		var _langText = "";

		for(var i = 0; i < _lines.length; i++) {
			var _tmp = _lines[i].split("=");
			if(_tmp[0][0] != "#") {
				_keys += _tmp[0] + "\n";
				if(_tmp[1]) {
					_langText += _tmp[1] + "\n";
				}
				else {
					_langText += "\n";
				}
			}
		}

		langTextKey.value = _keys;
		langText.value = _langText;
	};
}

function setStatus(pText, pShow) {
	if(pShow) {
		status_span.show();
	}
	else {
		status_span.hide();
	}
	status_span.text( " | Status: " + pText);
}