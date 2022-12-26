chrome.runtime.onMessage.addListener(
    function (request, sender) {
        switch (request.action) {
            case "closePreviousOpenedTabs":
                chrome.windows.getAll({ populate: true }, (winData) => {
                    for (var i in winData) {
                        if (winData[i].focused === true) {
                            var winTabs = winData[i].tabs;
                            var totTabs = winTabs.length;
                            for (var j = 0; j < totTabs; j++) {
                                if (winTabs[j].url.includes('ethercrash.io/user') || winTabs[j].url.includes('bcgraph.netlify.app')) {
                                    chrome.tabs.remove(winTabs[j].id, function () { });
                                }
                            }
                        }
                    }
                });
                break;
        }
    }
);

