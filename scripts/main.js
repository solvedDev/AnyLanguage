var translateText = "";

var targetLangDiv = document.getElementById("edit-langs"); 
var langInput = document.getElementById("lang-input");
var langNameInput = document.getElementById("lang-name-input");
var langText = document.getElementById("lang-text");
var langTextKey = document.getElementById("lang-text-key");
var checkboxTranslate = document.getElementById("auto-translate");
var checkboxTargetLangs = document.getElementById("target-langs");
var progress_state = document.getElementById("progress");

async function downloadAll() {
	languages = JSON.parse(langInput.value);
	languageNames = JSON.parse(langNameInput.value);

	for(var i = 0; i < languages.length; i++) {
		translateText = "";
		await combineKeyTranslation(languages[i][0]+languages[i][1]);
		await download(languages[i] + ".lang", translateText)
	}

	await download("languages.json", JSON.stringify(languages, null, "\t"));
	await download("language_names.json", JSON.stringify(await createLanguageNames(), null, "\t"));
}

async function createLanguageNames() {
	var _tmp = [];

	for (var i = 0; i < languages.length; i++) {
		_tmp[i] = [ languages[i], languageNames[i] ]; 
	}
	
	return _tmp;
}

async function combineKeyTranslation(lang) {
	var _tmp1 = langTextKey.value.split("\n");
	var _tmp2 = langText.value.split("\n");

	for(var i = 0; i < _tmp1.length; i++) {
		if(checkboxTranslate.checked) {
			if(_tmp1[i] != "" && _tmp2[i] != "") {
				translateText += _tmp1[i] + "=" + await translate(_tmp2[i], "auto", lang ) + "\n";
			} 
			else {
				translateText += "\n";
			}
		}
		else {
			if(_tmp1[i] != "" && _tmp2[i] != "") {
				translateText += _tmp1[i] + "=" + _tmp2[i] + "\n";
			}
			else {
				translateText += "\n";
			}
		}
	}
}

function loadFile(file) {
	var reader = new FileReader();
	//Reading file
	reader.readAsText(file);
	reader.onprogress = function(progress) {
		progress_state.value = progress.loaded/progress.total;
	}
	reader.onload = function() {
		var _text = reader.result;
		var _lines = _text.split("\n");
		var _keys = "";
		var _langText = "";

		for(var i = 0; i < _lines.length; i++) {
			var _tmp = _lines[i].split("=");
			if(_tmp[0][0] != "#") {
				_keys += _tmp[0] + "\n";
				_langText += _tmp[1] + "\n";
			}
		}

		langTextKey.value = _keys;
		langText.value = _langText;
	};
}