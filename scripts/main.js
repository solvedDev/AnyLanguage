var translateText = "";
var langInput = document.getElementById("lang-input");
var langNameInput = document.getElementById("lang-name-input");
var langText = document.getElementById("lang-text");
var langTextKey = document.getElementById("lang-text-key");
var checkbox = document.getElementById("auto-translate");

async function downloadAll() {
	for(var i = 0; i < languages.length; i++) {
		translateText = "";
		await combineKeyTranslation(languages[i][0]+languages[i][1]);
		await download(languages[i] + ".lang", translateText)
	}

	languages = JSON.parse(langInput.value);
	await download("languages.json", JSON.stringify(languages, null, "\t"));
	languageNames = JSON.parse(langNameInput.value);
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
		if(checkbox.checked) {
			translateText += _tmp1[i] + "=" + await translate(_tmp2[i], "auto", lang ) + "\n";
		}
		else {
			translateText += _tmp1[i] + "=" + _tmp2[i] + "\n";
		}
	}
}