async function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
	
	document.body.removeChild(element);
}

async function translate(sText, sL, tL) {
	var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sL + "&tl=" + tL + "&dt=t&q=" + encodeURI(sText);
	var text = "";

	await $.ajax({
		url: url,
		dataType: "text"
	  })
	  .done(function(data) {
		  data = JSON.parse(data.replace(/,+/g, ","));
		  console.log(data);

		  for(var i = 0; i < data[0].length; i++ ) {
			text += data[0][i][0];
		  }
		  console.log(text);
	  });
	
	return text;
}

var languages = [
	"en_US",
	"en_GB",
	"de_DE",
	"es_ES",
	"es_MX",
	"fr_FR",
	"fr_CA",
	"it_IT",
	"ja_JP",
	"ko_KR",
	"pt_BR",
	"pt_PT",
	"ru_RU",
	"zh_CN",
	"zh_TW",
	"nl_NL",
	"bg_BG",
  	"cs_CZ",
	"da_DK",
	"el_GR",
	"fi_FI",
	"hu_HU",
	"id_ID",
	"nb_NO",
	"pl_PL",
	"sk_SK",
	"sv_SE",
	"tr_TR",
	"uk_UA"
]

var languageNames = [
	"English (US)",
	"English (UK)",
	"Deutsch (Deutschland)",
	"Español (España)",
	"Español (México)",
	"Français (France)",
	"Français (Canada)",
	"Italiano (Italia)",
	"日本語 (日本)",
	"한국어 (대한민국)",
	"Português (Brasil)",
	"Português (Portugal)",
	"Русский (Россия)",
	"简体中文 (中国)",
	"繁體中文 (台灣)",
	"Nederlands (Nederland)",
	"Български (BG)",
	"Čeština (Česká republika)",
	"Dansk (DA)",
	"Ελληνικά (Ελλάδα)",
	"Suomi (Suomi)",
	"Magyar (HU)",
	"Bahasa Indonesia (Indonesia)",
	"Norsk bokmål (Norge)",
	"Polski (PL)",
	"Slovensky (SK)",
	"Svenska (Sverige)",
	"Türkçe (Türkiye)",
	"Українська (Україна)"
  ]