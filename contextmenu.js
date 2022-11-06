import LocalStorage from './localStorage'
import {
    getGoalElements,
    getGoalParentElement,
} from './util'

let activeGoal = null;

export default {
    init() {
        if (!getGoalParentElement()) return;
        const goalElements = getGoalElements();
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
            if (msg.msg === "openContextMenu") {
                openContextMenu(sendResponse);
            } else if (msg.msg === "saveGoalInfo") {
                saveGoalInfo(msg);
            }
        });

        goalElements.forEach(goal => {
            goal.addEventListener("contextmenu", (e)=>{
                activeGoal = goal;
            });
        })
    }
}

function openContextMenu(sendResponse) {
    sendResponse({
        slug: activeGoal.dataset.slug, 
        colors: LocalStorage.getGoalColors(activeGoal).map(x=>"" + x),
        autohide: LocalStorage.loadHideWithData(activeGoal.dataset),
        hideOn: LocalStorage.loadHideOn(activeGoal.dataset)
    });
}

function saveGoalInfo(msg) {
    LocalStorage.storeColors(msg);
    LocalStorage.storeHideWithData(msg);
    LocalStorage.storeHideOn(msg);
}
