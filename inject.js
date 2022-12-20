function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function openWindow() {
	var btnHistory = null;

	do {
		await delay(2000);

		btnHistory = document.querySelector('#tabs-inner-container li:first-child');
	} while (!btnHistory);

	btnHistory.click();

	var newWindow = window.open('https://bcgraph.netlify.app?game=ethercrash', '', 'fullscreen=yes');
	if (!newWindow) {
		window.location.reload();
	} else {
		var prevHash = '';

		setInterval(() => {
			var latestHash = document.querySelector('#games-log-container .games-log-hash').value;
			if (latestHash != prevHash) {
				prevHash = latestHash;
				newWindow.postMessage({ hash: latestHash }, '*');
			}
		}, 2000);
	}
}

setTimeout(() => {
	openWindow();
}, 2000);
