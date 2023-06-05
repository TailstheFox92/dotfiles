# Rivet

An extension which allows 5etools rolls and (some) data to be sent to Foundry.

## Usage

- Currently, all 5etools _rolls_ are automatically sent to Foundry (N.B. if you find a roll which _isn't_, this is a bug; please report it.), but not the _results_ of those rolls. Therefore, the results you see in 5etools' dice roller will differ from those seen in Foundry. I would recommend using the output from Foundry.
  - This can be disabled in the extension popup settings.
  - This can be set to always whisper in the extension popup settings.

- A 5etools entity (creature, spell, item, etc.) can be sent to Foundry by clicking the appropriate button next to its name. Note that this will only work with anything Plutonium was already capable of importing.
  - SHIFT-click the button to import the entity as a "temporary" Foundry Actor/Item/etc., which will be displayed instead of saved to the game. Note that Foundry's handling of these is spotty at best, so your mileage may vary.

## Installation

The easiet way to install the extension is via the [Chrome Web Store](https://chrome.google.com/webstore/detail/rivet/igmilfmbmkmpkjjgoabaagaoohhhbjde) or [Firefox Add-Ons](https://addons.mozilla.org/en-GB/firefox/addon/rivet/). If you prefer, you can manually install the extension instead:

##### Manual Installation on Chrome

1) Open the Extension Management page by navigating to `chrome://extensions`.
   - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over **More Tools** then selecting **Extensions**.
2) Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3) Click the **LOAD UNPACKED** button and select the extension directory.

##### Manual Installation on Firefox

1) Enter `about:debugging` in the URL bar
2) Click **This Firefox** on the left
3) Click **Load Temporary Add-On...** and select `manifest.json`.
