import LocalStorage from './localStorage'
import {
    getGoalElements,
    getGoalParentElement,
} from './util'

const COLOR_NAMES = ["red", "orange", "blue", "green"];
const DEFAULT_COLORS = [1, 2, 3, Infinity];
let activeGoal = null;

export default {
    init() {
        if (!getGoalParentElement()) return;
        const goalElements = getGoalElements();
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
            if (msg.msg === "openContextMenu") {
                sendResponse({slug: activeGoal.dataset.slug, colors: getGoalColors(activeGoal).map(x=>"" + x)});
            } else if (msg.msg === "saveColors") {
                console.log(msg);
                LocalStorage.storeColors(msg);
            }
        });

        goalElements.forEach(goal => {
            goal.addEventListener("contextmenu", (e)=>{
                activeGoal = goal;
            });
            removeColors(goal);
            addColors(goal);
        })
    }
}

function getDaysUntilDeadline(goal) {
    let { losedate } = goal.dataset;
    let deadline = new Date(losedate * 1000);
    let now = new Date();
    return (deadline - now) / (24 * 60 * 60 * 1000);
}

function addColors(goal) {
    let daysUntilDeadline = getDaysUntilDeadline(goal);
    let colors = getGoalColors(goal);
    let hasColor = false;
    for (let i = 0; i < Math.min(COLOR_NAMES.length, colors.length); i++) {
        if (daysUntilDeadline < colors[i]) {
            goal.classList.add(COLOR_NAMES[i]);
            hasColor = true;
            break;
        }
    }
    if (!hasColor) {
        goal.classList.add("nocolor");
    }
}

function removeColors(goal) {
    for (let x of COLOR_NAMES) {
        goal.classList.remove(x);
    }
}

function getGoalColors(goal) {
    let colors = LocalStorage.loadColors(goal.dataset);
    if (!colors || colors.length === 0) {
        colors = DEFAULT_COLORS;
    } else {
        colors = colors.map((x) => x === null ? Infinity : x);
    }
    return colors;
}