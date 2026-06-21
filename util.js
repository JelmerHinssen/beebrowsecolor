const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

export function futureDays(date) {
  return Math.floor((date * 1000 - Date.now()) / MILLISECONDS_IN_DAY);
}

export function createElement(tag, text = null, props = {}) {
  const elem = document.createElement(tag);
  if (text) {
    elem.textContent = text;
  }
  for (const [key, value] of Object.entries(props)) {
    elem[key] = value;
  }
  return elem;
}

export function createGoalLabel({ baremin, losedate }) {
  const text = ` (${baremin}/${futureDays(losedate)}d)`;
  return createElement("span", text, {
    className: "small-description",
  });
}

export function isGoalRed(elem) {
  return Array.from(elem.classList).includes("red");
}

export function hasNoColor(elem) {
  return elem.classList.contains("nocolor");
}

export function hasTodayta(elem) {
  let todayta = elem.querySelector(".todayta");
  return todayta && !todayta.classList.contains("hidden");
}

export function hasYesterdayta(elem) {
  const now = new Date();
  const lastData = parseInt(
    elem.querySelector(".last-datapoint").textContent.trim()
  );
  const lastDataDate = new Date(now.getFullYear(), now.getMonth(), lastData);
  if (lastDataDate > now) {
    lastDataDate.setMonth(lastDataDate.getMonth() - 1);
  }
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return lastDataDate >= yesterday;
}

export function goalCmp({ dataset: x }, { dataset: y }) {
  if (+x.collapsed === +y.collapsed) {
    return +x.losedate === +y.losedate ? 0 : +x.losedate > +y.losedate ? 1 : -1;
  } else {
    if (+x.collapsed) return 1;
    else return -1;
  }
}

export function getGoalElements() {
  return Array.from(
    document.querySelectorAll(".dashboard > .panel > .goals > .goal")
  );
}

export function getGoalParentElement() {
  return document.querySelector(".dashboard > .panel > .goals");
}

export function isGoalCollapsed(elem) {
  return Boolean(+elem.dataset.collapsed);
}
