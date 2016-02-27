"use strict";
function getCurrent(tabId) {
    chrome.storage.sync.get("rules", function (items) {
        chrome.tabs.get(tabId, function (tab) {
            chrome.contextMenus.removeAll();
            let url = tab.url.replace("index.shtml", "");
            for (let item of items) {
                let regexp = new RegExp(item["match"]);
                if (url.match(regexp)) {
                    let dest = url.replace(regexp, item.target);
                    console.info(dest);
                    chrome.contextMenus.create({
                        "title": item.menu,
                        "onclick": ()=> {
                            chrome.tabs.create({
                                "url": dest
                            });
                        }
                    });
                }
            }
        });
    });
}
//When tab activated or updated, then generate menus
chrome.tabs.onActivated.addListener(activeInfo=> {
    getCurrent(activeInfo.tabId, "activated");
});
chrome.tabs.onUpdated.addListener(changeInfo=> {
    getCurrent(changeInfo || changeInfo.tabId, "updated");
});