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
    console.log(localStorage['BeeBrowse/todaytahide/' + slug]);
  },
  getGoalColors(goal) {
    let colors = loadColors(goal.dataset);
    if (!colors || colors.length === 0) {
        colors = DEFAULT_COLORS;
    } else {
        colors = colors.map((x) => x === null ? Infinity : x);
    }
    return colors;
  }
}

function loadColors({slug}) {
  const ls = localStorage['BeeBrowse/colors/' + slug];
  if (ls) return JSON.parse(ls).map(parseFloat);
  else return [];
}
