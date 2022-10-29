export default {
  loadCollapsed ({ slug }) {
    const ls = localStorage['BeeBrowse/collapse/' + slug]
    if (ls) return +ls
    else return 0
  },
  storeCollapsed ({ collapsed, slug }) {
    localStorage['BeeBrowse/collapse/' + slug] = collapsed
  },
  loadColors({slug}) {
    const ls = localStorage['BeeBrowse/colors/' + slug]
    if (ls) return JSON.parse(ls)
    else return [];
  },
  storeColors({colors, slug}) {
    localStorage['BeeBrowse/colors/' + slug] = JSON.stringify(colors);
  }
}
