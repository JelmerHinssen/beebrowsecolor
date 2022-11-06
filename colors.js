import LocalStorage from './localStorage'
import {
    getGoalElements,
    getGoalParentElement,
} from './util'

const COLOR_NAMES = ["red", "orange", "blue", "green"];
const DEFAULT_COLORS = [1, 3, 7, Infinity];

export default {
    init() {
        if (!getGoalParentElement()) return;
        const goalElements = getGoalElements();

        goalElements.forEach(goal => {
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
    let colors = LocalStorage.getGoalColors(goal);
    let hasColor = false;
    for (let i = 0; i < Math.min(COLOR_NAMES.length, colors.length); i++) {
        if (daysUntilDeadline < colors[i]) {
            goal.classList.add(COLOR_NAMES[i]);
            hasColor = true;
            break;
        }
    }
    if (!hasColor || shouldHideToday(goal)) {
        goal.classList.add("nocolor");
    }
}

function shouldHideToday(goal) {
    let now = new Date();
    let day = (now.getDay() + 6) % 7;
    let hideOn = LocalStorage.loadHideOn(goal.dataset);
    return hideOn[day];
}

function removeColors(goal) {
    for (let x of COLOR_NAMES) {
        goal.classList.remove(x);
    }
}

