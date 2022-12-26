chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
        id: 1,
        condition: {
            resourceTypes: ["sub_frame"],
            requestDomains: ["ethercrash.io"],
        },
        action: {
            type: "modifyHeaders",
            responseHeaders: [{
                operation: "remove",
                header: "X-Frame-Options",
            }]
        },
    }]
});
