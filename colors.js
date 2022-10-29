import LocalStorage from './localStorage'
import {
  createElement,
  createGoalLabel,
  getGoalElements,
  getGoalParentElement,
  goalCmp,
  isGoalCollapsed,
  isGoalRed
} from './util'

const ColorNames = ["red", "orange", "blue", "green"];

export default {
  init () {
    if (!getGoalParentElement()) return

    const goalElements = getGoalElements()

    goalElements.forEach(elem => {
        let goalname = elem.getAttribute("data-slug");

        let deadline = new Date(elem.getAttribute("data-losedate") * 1000);
        let now = new Date();
        let daysUntillDeadline = (deadline - now) / (24 * 60 * 60 * 1000);
        console.log(daysUntillDeadline);
        for (let x of ColorNames) {
            elem.classList.remove(x);
        }
        let thumbnail = elem.querySelector("thumbnail img");
        if (thumbnail) {
            let title = thumbnail.getAttribute("title");
            title = title.split(": ")[1];
            thumbnail.setAttribute("title", title);
        }
        let colors = LocalStorage.loadColors({goalname});
        if (!colors || colors.length === 0) {
            colors = [1, 2, 3, 14];
        }
        let hasColor = false;
        for (let i = 0; i < Math.min(ColorNames.length, colors.length); i++) {
            if (daysUntillDeadline < colors[i]) {
                elem.classList.add(ColorNames[i]);
                hasColor = true;
                break;
            }
        }
        if (!hasColor) {
            elem.classList.add("nocolor");
        }

    //   new Date()
    //   console.log(new Date())
    })
  }
}

