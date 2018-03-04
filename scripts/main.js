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
	progress_state.style.display = "inline";
	languages = JSON.parse(langInput.value);
	languageNames = JSON.parse(langNameInput.value);

	for(var i = 0; i < languages.length; i++) {
		await combineKeyTranslation(languages[i][0]+languages[i][1]);
		addToZip(languages[i] + ".lang", translateText);
		console.log(i/languages.length);
		$("#progress").text( "Progress: " + Math.round(i/languages.length * 100) + "%");
	}

	await addToZip("languages.json", JSON.stringify(languages, null, "\t"));
	await addToZip("language_names.json", JSON.stringify(await createLanguageNames(), null, "\t"));

	zip.generateAsync({type:"blob"})
		.then(function(content) {
			saveAs(content, "texts.zip");
			progress_state.style.display = "none";
		});
	
}

async function createLanguageNames() {
	var _tmp = [];

	for (var i = 0; i < languages.length; i++) {
		_tmp[i] = [ languages[i], languageNames[i] ]; 
	}
	
	return _tmp;
}

async function combineKeyTranslation(lang) {
	translateText = "";
	var _tmp1 = langTextKey.value.split("\n");
	var _tmp2 = langText.value.split("\n");

	for(var i = 0; i < _tmp1.length; i++) {
		if(checkboxTranslate.checked) {
			if(_tmp1[i] != "" && _tmp2[i] != "") {
				translateText += _tmp1[i] + "=" + await translate(_tmp2[i], "auto", lang ) + "\n";
			} 
			else {
				if(i+1 != _tmp1.length) translateText += "\n";
			}
		}
		else {
			if(_tmp1[i] != "" && _tmp2[i] != "") {
				translateText += _tmp1[i] + "=" + _tmp2[i] + "\n";
			}
			else {
				if(i+1 != _tmp1.length) translateText += "\n";
			}
		}
	}
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