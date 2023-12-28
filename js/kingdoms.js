function divisionsScreen() {
    document.getElementById('bgimg').style.display = 'none';
    document.getElementById('popup_block_buttons').style.display = 'none';
    document.getElementById('pause_flex').style.display = 'none';

    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    ispainting = false;
    document.getElementById('start-flex').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('select-grid').style.display = 'none';
    document.getElementById('divisionsFlex').style.display = 'flex';
    document.getElementById('back_button').hidden = false;
    document.getElementById('back_button').onclick = function () {
        start();
    };
    document.getElementById('addDivisionButton').disabled =
        Math.min(maxPersonnel - military, unemployed) < military / Math.max(1, divisions.length);
    document.getElementById('availMen').innerHTML = 'Available Manpower: ' + shorten(unemployed);
    document.getElementById('divisionsMilitary').innerHTML =
        'Military: ' + shorten(military) + '/' + shorten(maxPersonnel);
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
    const ele = document.getElementsByClassName('divisionContainer');
    for (const el of ele) {
        el.remove();
    }
    for (let i = 0; i < divisions.length; i++) {
        displayDivision(divisions[i], i);
    }
    const dSliders = document.getElementsByClassName('divisionSlider');

    for (const el of dSliders) {
        el.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${
            ((el.value - el.min) / (el.max - el.min)) * 100
        }%, gray ${((el.value - el.min) / (el.max - el.min)) * 100}%, gray 100%)`;
    }
}
function hasBorder(pos) {
    for (const k of kingdoms) {
        if (k.borders.has(tilecode(pos.x, pos.y))) {
            return true;
        }
    }
    return playerBorders.has(tilecode(pos.x, pos.y));
}
function addDivision(type) {
    const addFlex = document.getElementById('addDivisionsFlex');
    const newDivision = new division(type, military / Math.max(divisions.length, 1));

    divisions.push(newDivision);
    displayDivision(newDivision, divisions.length - 1);
    dSliders = document.getElementsByClassName('divisionSlider');

    for (const el of dSliders) {
        el.value = military / Math.max(divisions.length, 1);
        el.max = Math.floor(Math.min(maxPersonnel - military, unemployed) / divisions.length);

        el.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${
            ((el.value - el.min) / (el.max - el.min)) * 100
        }%, gray ${((el.value - el.min) / (el.max - el.min)) * 100}%, gray 100%)`;
    }
    addFlex.scrollLeft = addFlex.scrollWidth;
    document.getElementById('addDivisionButton').disabled =
        Math.min(maxPersonnel - military, unemployed) < military / Math.max(1, divisions.length);
}
function displayDivision(division, index) {
    const divisionContainer = document.createElement('div');
    divisionContainer.className = 'divisionContainer';
    const divisionName = document.createElement('h1');
    const divisionImage = document.createElement('img');
    const divisionGroupsContainer = document.createElement('SELECT');
    const divisionTitle = document.createElement('p');
    const divisionPower = document.createElement('p');
    const divisionXpBar = document.createElement('div');
    const divisionXpText = document.createElement('p');
    const divisionGroupLabel = document.createElement('LABEL');
    const divisionSlider = document.createElement('input');
    divisionPower.className = 'dPower';
    divisionSlider.type = 'range';
    divisionSlider.id = index;
    divisionSlider.className = 'divisionSlider';
    divisionSlider.max = Math.floor(Math.min(maxPersonnel, unemployed) / divisions.length);
    divisionSlider.min = 0;
    divisionSlider.value = division.power;

    divisionSlider.oninput = function () {
        for (const d of divisions) {
            d.power = parseInt(divisionSlider.value);
        }
        dPowers = document.getElementsByClassName('dPower');
        for (const el of dPowers) {
            el.innerHTML = 'Manpower: ' + shorten(divisionSlider.value);
        }
        dSliders = document.getElementsByClassName('divisionSlider');

        for (const el of dSliders) {
            el.value = divisionSlider.value;
        }

        displayUI();
        document.getElementById('addDivisionButton').disabled =
            Math.min(maxPersonnel - military, unemployed) <
            military / Math.max(1, divisions.length);

        for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
            document.getElementsByClassName('warning-box')[i].style.display = 'none';
        }
        document.getElementById('availMen').innerHTML =
            'Available Manpower: ' + shorten(unemployed);
        document.getElementById('divisionsMilitary').innerHTML =
            'Military: ' + shorten(military) + '/' + shorten(maxPersonnel);
        const ele = document.getElementsByClassName('divisionSlider');
        for (const el of ele) {
            el.max = Math.floor(Math.min(maxPersonnel, unemployed) / divisions.length);
            el.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${
                ((el.value - el.min) / (el.max - el.min)) * 100
            }%, gray ${((el.value - el.min) / (el.max - el.min)) * 100}%, gray 100%)`;
        }
    };
    divisionXpText.innerHTML =
        division.level >= divisionLevelToTitle.length - 1
            ? 'Maxed Out'
            : `${division.xp}/${50 + (100 * division.level) / 2}`;
    divisionXpText.className = 'divisionXpText';
    divisionXpBar.className = 'divisionXpBar';
    if (division.level >= divisionLevelToTitle.length - 1) {
        divisionXpBar.style.backgroundColor = '#e224ff';
    } else {
        divisionXpBar.style.background = `linear-gradient(to right, #e224ff 0%, #e224ff ${
            (division.xp / (100 + (100 * division.level) / 2)) * 100
        }%, rgba(0,0,0,0) ${
            (division.xp / (100 + (100 * division.level) / 2)) * 100
        }%, rgba(0,0,0,0) 100%)`;
    }
    divisionXpBar.appendChild(divisionXpText);
    divisionPower.innerHTML = 'Manpower: ' + shorten(division.power);
    divisionPower.style.marginTop = '0';
    divisionPower.style.marginBottom = '3%';
    divisionTitle.style.marginBottom = '2%';
    divisionImage.style.width = '30%';
    divisionImage.style.height = 'auto';
    switch (division.type) {
        case 'I':
            divisionImage.src = 'images/marketSword.png';
            break;
        case 'A':
            divisionImage.src = 'images/bow.png';
            break;
    }
    divisionTitle.innerHTML =
        'Title: ' +
        '<br>' +
        divisionLevelToTitle[division.level] +
        ' ' +
        divisionTypeToTitle[division.type];
    divisionGroupsContainer.name = 'divisionGroups';
    divisionGroupsContainer.className = 'divisionGroup';
    for (const group of armyGroups) {
        const divisionGroup = document.createElement('OPTION');
        divisionGroup.innerHTML = group;
        divisionGroup.textAlign = 'center';

        divisionGroupsContainer.appendChild(divisionGroup);
    }
    const addGroup = document.createElement('OPTION');
    addGroup.innerHTML = 'New Army Group';
    divisionGroupsContainer.onchange = function () {
        if (divisionGroupsContainer.value == 'New Army Group') {
            divisionGroupsContainer.value = 'none';
            inputs[0].choosetext(divisionGroupsContainer);
            displaypopup(0, inputs, 50, 50, true, true);
        } else {
            division.armyGroup = divisionGroupsContainer.value;
        }
    };
    divisionGroupLabel.innerHTML = 'Army Group:';
    divisionGroupLabel.htmlFor = 'divisionGroups';
    divisionGroupsContainer.appendChild(addGroup);
    divisionTitle.style.textAlign = 'center';
    divisionName.innerHTML = 'Division ' + division.index;
    divisionName.style.fontSize = '95%';
    divisionContainer.appendChild(divisionName);
    divisionContainer.appendChild(divisionImage);
    divisionContainer.appendChild(divisionXpBar);
    divisionContainer.appendChild(divisionTitle);
    divisionContainer.appendChild(divisionGroupLabel);
    divisionContainer.appendChild(divisionGroupsContainer);
    divisionContainer.appendChild(divisionPower);
    divisionContainer.appendChild(divisionSlider);
    document
        .getElementById('addDivisionsFlex')
        .insertBefore(divisionContainer, document.getElementById('addDivisionButton'));
    displayUI();
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }

    document.getElementById('availMen').innerHTML = 'Available Manpower: ' + shorten(unemployed);
    document.getElementById('divisionsMilitary').innerHTML =
        'Military: ' + shorten(military) + '/' + shorten(maxPersonnel);
}
function checkStraightLine(x1, y1, x2, y2) {
    let attempts = 0;
    while (!(Math.floor(x1) == x2 && Math.floor(y1) == y2) && attempts < 300) {
        const dir = Math.atan2(y2 - y1, x2 - x1);
        x1 += Math.cos(dir);
        y1 += Math.sin(dir);
        if (!isLand(Math.floor(x1), Math.floor(y1))) {
            return false;
        }
        attempts++;
    }
    if (attempts >= 300) {
        return false;
    }
    return true;
}
function findAttackingRaiders() {
    if (p.cities.length == 0) {
        return;
    }
    const arrSpawns = Array.from(sutibleRaiderSpawns);
    raiderSpawnsThatCanAttack.length = 0;
    for (const s of arrSpawns) {
        const pos = tiledecode(s);
        const closestCity = p.cities[0];
        for (const c of p.cities) {
            if (distance(pos.x, pos.y, c.x, c.y) < closestCity) {
                closestCity = c;
            }
        }
        if (
            distance(pos.x, pos.y, closestCity.x, closestCity.y) > 40 &&
            checkStraightLine(pos.x, pos.y, closestCity.x, closestCity.y)
        ) {
            raiderSpawnsThatCanAttack.push(pos);
        }
    }
}
