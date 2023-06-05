"use strict";

const _browser = typeof chrome === "undefined" ? browser : chrome;

class PopupUtil {
	static async pSetStorage (k, v) {
		const fullK = `rivet.${k}`;
		return new Promise(resolve => {
			_browser.storage.sync.set(
				{[fullK]: v},
				() => resolve()
			)
		});
	}

	static async pGetStorage (k) {
		const fullK = `rivet.${k}`;
		return new Promise(resolve => {
			_browser.storage.sync.get(fullK, (data) => resolve((data || {})[fullK]));
		});
	}
}

window.addEventListener("load", async () => {
	const eleContent = document.getElementById("content");

	let initialSendRolls = await PopupUtil.pGetStorage("isSendRolls");
	if (initialSendRolls == null) {
		await PopupUtil.pSetStorage("isSendRolls", true);
		initialSendRolls = true;
	}

	eleContent.innerHTML = `<div class="w-100 p-1">
		<h3 class="mt-0 mb-1">Rivet &#x2014; Settings</h3>
		<hr class="my-1">
		<label class="flex-v-center">
			<div class="no-wrap w-100">Send Rolls</div>
			<input type="checkbox" name="cb-send-rolls">
		</label>
		<label class="flex-v-center">
			<div class="no-wrap w-100">Whisper Rolls</div>
			<input type="checkbox" name="cb-whisper-rolls">
		</label>
	</div>`;

	const eleCbSendRolls = eleContent.querySelector(`[name="cb-send-rolls"]`);
	eleCbSendRolls.addEventListener("change", () => PopupUtil.pSetStorage("isSendRolls", eleCbSendRolls.checked))
	if (initialSendRolls) eleCbSendRolls.checked = true;

	const eleCbWhisper = eleContent.querySelector(`[name="cb-whisper-rolls"]`);
	eleCbWhisper.addEventListener("change", () => PopupUtil.pSetStorage("isWhisper", eleCbWhisper.checked))
	if ((await PopupUtil.pGetStorage("isWhisper"))) eleCbWhisper.checked = true;
});
