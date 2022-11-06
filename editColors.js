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
    return colors;
}

async function closeWindow() {
    let windowID = (await chrome.windows.getCurrent()).id;
    chrome.windows.remove(windowID);
}

function setHideOn(hideOn) {
    let i = 0;
    for (let day of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]) {
        document.getElementById("hideon-" + day).checked = hideOn[i];
        i++;
    }
}

function getHideOn() {
    let ans = [];
    for (let day of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]) {
        ans.push(document.getElementById("hideon-" + day).checked);
    }
    return ans;
}

function setHideAfter(hideAfter) {
    let i = 0;
    for (let day of ["hour", "minute"]) {
        document.getElementById("hideafter-" + day).value = hideAfter[i];
        i++;
    }
}

function getHideAfter() {
    let ans = [];
    for (let day of ["hour", "minute"]) {
        ans.push(document.getElementById("hideafter-" + day).value);
    }
    return ans;
}

window.onload = async () => {
    let x = decodeURIComponent(window.location.search.substring(1));
    let d = JSON.parse(x);
    let {slug, colors, tabid, autohide, hideOn, hideAfter} = d;
    document.getElementById("goal-slug").innerText = slug;
    setColors(colors);
    setHideOn(hideOn);
    setHideAfter(hideAfter);
    document.getElementById("autohide").checked = autohide;
    document.getElementById("save").onclick = () => {
        let colors = getColors();
        let autohide = document.getElementById("autohide").checked
        let hideOn = getHideOn();
        let hideAfter = getHideAfter();
        let saveData = {msg: "saveGoalInfo", slug, colors, autohide, hideOn, hideAfter};
        chrome.tabs.sendMessage(tabid, saveData);
        closeWindow();
    };
}