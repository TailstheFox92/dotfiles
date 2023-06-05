"use strict";

const _browser = typeof chrome === "undefined" ? browser : chrome;

// On messages from the content script
_browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type !== "rivet.send") {
		sendResponse(true);
		return;
	}

	// Find any Foundry tabs and pass the data to them
	_browser.tabs.query(
		// Search for all tabs, as the user could be running their game with a routePrefix, etc.
		{"url": "<all_urls>"},
		tabs => {
			tabs
				// Running Foundry instances should always end in "/game"
				.filter(tab => new URL(tab.url).pathname.endsWith("/game"))
				.forEach(tab => {
					_browser.tabs.sendMessage(
						tab.id,
						{type: "rivet.receive", detail: JSON.parse(JSON.stringify(request.detail))},
						(response) => { /* no-op */ }
					);
				});
		});

	sendResponse(true);

	return true;
});
