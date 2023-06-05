/**
 * A content script which receives events from the DOM and re-transmits them to the extension, or
 *   vice-versa.
 */

"use strict";

const _browser = typeof chrome === "undefined" ? browser : chrome;

class PopupUtil {
	static async pGetStorage (k) {
		const fullK = `rivet.${k}`;
		return new Promise(resolve => {
			_browser.storage.sync.get(fullK, (data) => resolve((data || {})[fullK]));
		});
	}
}

function setExtensionFlag () {
	window.dispatchEvent(new CustomEvent("rivet.active", {detail: true}));
}

// handle events from the DOM
function handleSend (evt) {
	if (evt.type !== "rivet.send") return

	// pass them on to the extension
	_browser.runtime.sendMessage({detail: evt.detail, type: "rivet.send"}, (response) => { /* no-op */ });
}

// handle events from the extension
async function pHandleReceive (request, sender, sendResponse) {
	if (request.type !== "rivet.receive") {
		sendResponse(true);
		return;
	}

	const settings = {};

	await Promise.all([
		settings.isWhisper = await PopupUtil.pGetStorage("isWhisper"),
		settings.isSendRolls = await PopupUtil.pGetStorage("isSendRolls")
	]);

	// pass them on to the DOM
	const toPass = {...request.detail, settings};
	if (navigator.userAgent.includes("Firefox")) {
		// Firefox doesn't like passing events, so we have to do some stupid stuff and hope for the best
		const eleTextarea = document.createElement("textarea");
		eleTextarea.className = "rivet-transfer";
		eleTextarea.value = JSON.stringify(toPass);
		eleTextarea.style.height = "1px";
		eleTextarea.style.width = "1px";
		eleTextarea.style.position = "fixed";
		eleTextarea.style.top = "-100px";
		eleTextarea.style.left = "-100px";
		document.body.appendChild(eleTextarea);

		window.dispatchEvent(new CustomEvent("rivet.receive-text"));
	} else {
		window.dispatchEvent(new CustomEvent("rivet.receive", {detail: toPass}));
	}

	sendResponse(true);
}

// Works in Firefox
if (document.readyState === "complete") setExtensionFlag();
// Works in Chrome
else window.addEventListener("load", () => setExtensionFlag());

window.addEventListener("rivet.send", handleSend);
_browser.runtime.onMessage.addListener(pHandleReceive);

console.log("Rivet content_script initialised");
