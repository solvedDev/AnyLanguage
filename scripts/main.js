var translateText = "";
var langInput = document.getElementById("lang-input");
var langNameInput = document.getElementById("lang-name-input");
var langText = document.getElementById("lang-text");

function downloadAll() {
	translateText = langText.value;

	for(var i = 0; i < languages.length; i++) {
		download(languages[i] + ".lang", translateText)
	}

	languages = JSON.parse(langInput.value);
	download("languages.json", JSON.stringify(languages, null, "\t"));
	languageNames = JSON.parse(langNameInput.value);
	download("language_names.json", JSON.stringify(createLanguageNames(), null, "\t"));
}

function createLanguageNames() {
	var _tmp = [];

	for (var i = 0; i < languages.length; i++) {
		_tmp[i] = [ languages[i], languageNames[i] ]; 
	}

	return _tmp;
}