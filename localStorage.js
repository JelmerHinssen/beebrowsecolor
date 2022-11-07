const DEFAULT_COLORS = [1, 3, 7, Infinity];
export default {
  loadCollapsed ({ slug }) {
    const ls = localStorage['BeeBrowse/collapse/' + slug]
    if (ls) return +ls
    else return 0
  },
  storeCollapsed ({ collapsed, slug }) {
    localStorage['BeeBrowse/collapse/' + slug] = collapsed
  },
  storeColors({colors, slug}) {
    localStorage['BeeBrowse/colors/' + slug] = JSON.stringify(colors);
  },
  loadHideWithData({slug}) {
    const ls = localStorage['BeeBrowse/todaytahide/' + slug];
    if (ls) return +ls;
    else return 0;
  },
  storeHideWithData({autohide, slug}) {
    localStorage['BeeBrowse/todaytahide/' + slug] = +autohide;
  },
  getGoalColors(goal) {
    let colors = loadColors(goal.dataset);
    if (!colors || colors.length === 0) {
        colors = DEFAULT_COLORS;
    } else {
        colors = colors.map((x) => x === null ? Infinity : x);
    }
    return colors;
  },
  storeHideOn({slug, hideOn}) {
    localStorage['BeeBrowse/hideOn/' + slug] = JSON.stringify(hideOn);
  },
  loadHideOn({slug}) {
    const ls = localStorage['BeeBrowse/hideOn/' + slug];
    if (ls) return JSON.parse(ls);
    else return [0, 0, 0, 0, 0, 0, 0];
  },
  storeHideAfter({slug, hideAfter}) {
    localStorage['BeeBrowse/hideAfter/' + slug] = JSON.stringify(hideAfter);
  },
  loadHideAfter({slug}) {
    const ls = localStorage['BeeBrowse/hideAfter/' + slug];
    if (ls) return JSON.parse(ls);
    else return [23, 59];
  }
}

function loadColors({slug}) {
  const ls = localStorage['BeeBrowse/colors/' + slug];
  if (ls) return JSON.parse(ls).map(parseFloat);
  else return [];
}
