function setColors(colors) {
    let [red, orange, blue, green] = colors;
    document.getElementById("red").value = red;
    document.getElementById("orange").value = orange;
    document.getElementById("blue").value = blue;
    document.getElementById("green").value = green;
}

function getColors() {
    let colors = [];
    for (let x of ["red", "orange", "blue", "green"]) {
        colors.push(document.getElementById(x).value);
    }
    console.log(colors);
    return colors;
}

async function closeWindow() {
    let windowID = (await chrome.windows.getCurrent()).id;
    chrome.windows.remove(windowID);
}

window.onload = async () => {
    let x = decodeURIComponent(window.location.search.substring(1));
    console.log(x);
    let d = JSON.parse(x);
    console.log(d);
    let {slug, colors, tabid} = d;
    document.getElementById("goal-slug").innerText = slug;
    setColors(colors);
    document.getElementById("save").onclick = () => {
        let colors = getColors();
        let saveData = {msg: "saveColors", slug, colors};
        chrome.tabs.sendMessage(tabid, saveData);
        closeWindow();
    };
}