chrome.contextMenus.create({
    title: "Edit colors", 
    id: "editcolors", 
    documentUrlPatterns: ["*://*.beeminder.com/*"],
    contexts: ["all"]
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log({ info, tab });
    chrome.tabs.sendMessage(tab.id, {msg: "openContextMenu"}, response => {
        let data = JSON.stringify({
            ...response,
            tabid: tab.id
        });
        chrome.windows.create({ focused: true, url: "editColors.html?" + data, type: "popup" });
    })
});