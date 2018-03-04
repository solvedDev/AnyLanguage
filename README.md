# AnyLanguage
AnyLanguage is an easy to use .lang file tool for addon creator of Minecraft Bedrock.

## Usage
Visit https://solveddev.github.io/AnyLanguage/ or download this repository and open the index.html file. Minecraft language files consist of two components: A key and a translation. Now enter the key in the textarea on the far left and next to it the translation. (Example: death.fell.killer and %1$s was doomed to fall). You can edit the target languages in the other two textareas. If you add a new language, you need to add a name for it in the same line in the textarea on the far right, the language key is the textbox next to it. Make sure that the format follows en_US where the first two letters represent the language and the last two the region.
In order to generate the language files, click "Download". The page will start to download all needed files. Make sure to select them all and put them into your resource_pack folder in a folder called "texts".

## Auto Translator
AnyLanguage can automatically translate your text into the languages you select. Accepted languages are the ones supported by the Google Translator. Make sure to click the corresponding checkbox to toggle auto translations.

## Why?!
The only way to rename items on Minecraft Bedrock with addons is currently by changing the translation files. In order to support all languages, you need to edit every single .lang file. Sometimes you also want to rename an entity which causes the same amount of work. This generator can do this nasty work for you.
