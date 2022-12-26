function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function openWindow() {
	var btnHistory = null;
	var userId = '';
	var userRoundsTab = null;

	do {
		await delay(2000);

		btnHistory = document.querySelector('#tabs-inner-container li:first-child');
	} while (!btnHistory);

	btnHistory.click();

	// Show ETH balance
	var balanceSpan = document.querySelector("#top-bar > .user-login > .balance-bits > .balance");
	if (balanceSpan) {
		const ethSpan = document.createElement('span');
		const ethBalance = balanceSpan.innerText.replace(',', '') / 1000000;
		ethSpan.innerText = '(' + ethBalance.toFixed(2) + ')';
		balanceSpan.insertAdjacentElement('afterend', ethSpan);

		balanceSpan.addEventListener('DOMSubtreeModified', () => {
			const ethBalance = balanceSpan.innerText.replace(',', '') / 1000000;
			ethSpan.innerText = '(' + ethBalance.toFixed(2) + ')';
		});
	}

	// Add user info show/hide toggle button
	var userField = document.querySelector('#top-bar > .user-login');
	if (userField) {
		const svg = document.createElement('svg');
		svg.setAttribute('viewBox', '0 0 64 64');
		const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		elem.setAttribute('d', 'M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z');
		elem.setAttribute('fill', '#202020');
		svg.appendChild(elem);

		const toggleButton = document.createElement('button');
		toggleButton.appendChild(svg);
		toggleButton.style.position = 'absolute';
		toggleButton.style.right = '10px';
		toggleButton.style.top = '10px';

		toggleButton.addEventListener('click', () => {
			userField.style.display = userField.style.display == 'none' ? 'block' : 'none';
		});

		document.querySelector('#top-bar').appendChild(toggleButton);

		// Get user id if logged in
		userId = userField.querySelector('.username > a').innerHTML;
	}

	if (userId) {
		userRoundsTab = window.open(`https://www.ethercrash.io/user/${userId}`, '_blank');
	}
	
	var bcgraphURL = 'https://bcgraph.netlify.app?game=ethercrash';
	var bcgraphTab = window.open(bcgraphURL, '_blank');
	if (!bcgraphTab) {
		window.location.reload();
	} else {
		var prevHash = '';

		setInterval(() => {
			var latestHash = document.querySelector('#games-log-container .games-log-hash').value;
			if (latestHash != prevHash) {
				prevHash = latestHash;
				bcgraphTab.postMessage({ hash: latestHash }, '*');
				userRoundsTab?.location?.reload();
			}
		}, 2000);
	}
}

setTimeout(() => {
	openWindow();
}, 2000);
