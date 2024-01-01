let civCasualties = 0;
//pathfinding
class node {
    constructor(start, end, x, y, parent) {
        this.x = x;
        this.y = y;
        this.ds = Math.floor(distance(x, y, start.x, start.y) * 10);
        this.de = Math.floor(distance(x, y, end.x, end.y) * 10);
        this.parent = parent;
    }
}
// define the A* algorithm
function aStar(start, end) {
    const openNodes = [];
    const alreadyExists = [];
    const costs = [];
    const closedNodes = [];

    const newnode = new node(start, end, start.x, start.y, null);
    openNodes.push(newnode);
    costs.push(newnode.ds + newnode.de);
    alreadyExists.push(tilecode(newnode.x, newnode.y));

    while (openNodes.length > 0) {
        const current = openNodes[costs.indexOf(Math.min(...costs))];
        closedNodes.push(current);
        openNodes.splice(costs.indexOf(Math.min(...costs)), 1);
        costs.splice(costs.indexOf(Math.min(...costs)), 1);

        if (
            (end.x == current.x && end.y == current.y) ||
            closedNodes.length > 1000 ||
            (closedNodes.length > 100 && distance(start.x, start.y, end.x, end.y) > 50)
        ) {
            const path = [];
            let currentnode = current;
            while (currentnode.parent != null) {
                path.push({ x: currentnode.x, y: currentnode.y });
                currentnode = currentnode.parent;
            }
            return path.reverse();
        }

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (
                    current.x + j < 0 ||
                    current.x + j > 499 ||
                    current.y + i < 0 ||
                    current.y + i > 499
                ) {
                    continue;
                }
                if (
                    tilestats[tilecode(current.x + j, current.y + i)] == undefined ||
                    alreadyExists.includes(tilecode(current.x + j, current.y + i)) ||
                    exists('lake', current.x + j, current.y + i)
                ) {
                    continue;
                }

                const newnode = new node(start, end, current.x + j, current.y + i, current);
                openNodes.push(newnode);
                costs.push(newnode.ds + newnode.de);
                alreadyExists.push(tilecode(newnode.x, newnode.y));
            }
        }
    }
    return [];
}

function battlescreen(battleType, armyPower) {
    armyInfo.length = 0;
    for (let i = 0; i < divisions.length; i++) {
        divisions[i].index = i;
        armyInfo.push(divisions[i].power);
    }
    civCasualties = 0;
    placedTiles.clear();
    armyScrollX = scrollX * 20;
    armyScrollY = scrollY * 20;
    battling = true;
    blueArmies.length = 0;
    redArmies.length = 0;
    document.getElementById('bgimg').style.display = 'none';
    document.getElementById('popup_block_buttons').style.display = 'none';
    document.getElementById('pause_flex').style.display = 'none';
    document.getElementById('startBattle').hidden = false;
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    ispainting = false;
    document.getElementById('start-flex').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('select-grid').style.display = 'none';
    isPlacing = true;
    const placeGrid = document.getElementById('placeGrid');
    placeGrid.innerHTML = '';
    for (const army of divisions) {
        army.placed = false;
    }
    for (const armyGroup of armyGroups) {
        const groupContainer = document.createElement('div');
        const groupName = document.createElement('h1');
        const groupPower = document.createElement('p');

        const groupDivisions = document.createElement('p');
        groupContainer.className = 'groupContainer';
        groupContainer.id = armyGroup;
        groupName.innerHTML = armyGroup;

        let currentPower = 0;
        let divisionsCount = 0;
        for (const d of divisions) {
            if (d.armyGroup == armyGroup) {
                currentPower += d.power;
                divisionsCount++;
            }
        }
        currentArmyGroup = armyGroup;
        groupPower.innerHTML = 'Manpower: ' + shorten(currentPower);
        groupDivisions.innerHTML = 'Divisions: ' + divisionsCount;
        groupContainer.appendChild(groupName);
        groupContainer.appendChild(groupPower);
        groupContainer.appendChild(groupDivisions);
        placeGrid.appendChild(groupContainer);
        groupContainer.onclick = function () {
            const ele = document.getElementsByClassName('groupContainer');
            for (const el of ele) {
                el.style.border = '3px solid black';
            }
            currentDivisions.length = 0;
            for (const army of divisions) {
                if ((army.armyGroup = armyGroup) && !army.placed) {
                    currentDivisions.push(army);
                }
            }
            if (currentDivisions.length == 0) {
                return;
            }
            groupContainer.style.border = '3px solid yellow';
        };
    }
    redTotalPower = 0;
    blueTotalPower = 0;
    redPower = 0;
    bluePower = 0;
    let divisionNumber = 0;
    switch (battleType) {
        case 'raid':
            const randomSpawn =
                raiderSpawnsThatCanAttack[getRandomInt(0, raiderSpawnsThatCanAttack.length - 1)];

            for (let i = -4; i <= 4; i++) {
                for (let j = -4; j <= 4; j++) {
                    if (
                        isLand(randomSpawn.x + j, randomSpawn.y + i) &&
                        !hasBorder({ x: randomSpawn.x + j, y: randomSpawn.y + i })
                    ) {
                        divisionNumber++;
                    }
                }
            }
            divisionNumber = Math.min(divisionNumber, armyPower);
            let currentDivisionNumber = 0;
            for (let i = -4; i <= 4; i++) {
                for (let j = -4; j <= 4; j++) {
                    if (
                        isLand(randomSpawn.x + j, randomSpawn.y + i) &&
                        !hasBorder({ x: randomSpawn.x + j, y: randomSpawn.y + i })
                    ) {
                        redArmies.push(
                            new army(
                                (randomSpawn.x + j) * 20,
                                (randomSpawn.y + i) * 20,
                                armyPower / divisionNumber,
                                'I',
                                'red',
                                'raid',
                                getRandomItem(playerBorders)
                            )
                        );
                        currentDivisionNumber++;
                        if (divisionNumber < currentDivisionNumber) {
                            break;
                        }
                    }
                }
            }
            break;
    }
    let currentRedPower = 0;
    for (const a of redArmies) {
        currentRedPower += a.power;
    }
    redTotalPower = currentRedPower;
    placeGrid.style.display = 'flex';
    redPower = redTotalPower;
    bluePower = blueTotalPower;
    renderArmies();
    updateArmyPowerBars();
}

function startBattle() {
    placeGrid.style.display = 'none';
    document.getElementById('startBattle').hidden = true;
    updateArmyPowerBars();
    document.getElementById('bar').style.display = 'block';
    isPlacing = false;
    isPlacingArmies = false;
    mainFunction();
}
function updateArmyPowerBars() {
    redPower = 0;
    bluePower = 0;
    for (let ar of blueArmies) {
        ar.power = Math.floor(ar.power);
        bluePower += ar.power;
    }
    for (let ar of redArmies) {
        ar.power = Math.floor(ar.power);
        redPower += ar.power;
    }
    document.getElementById('bluePowerBar').style.clipPath = `polygon(0% 0%, 0% 100%, ${
        (bluePower / (redPower + bluePower)) * 100
    }% 100%, ${(bluePower / (redPower + bluePower)) * 100}% 0%)`;
    document.getElementById('redPowerBar').style.clipPath = `polygon(100% 0%, 100% 100%, ${
        100 - (redPower / (redPower + bluePower)) * 100
    }% 100%, ${100 - (redPower / (redPower + bluePower)) * 100}% 0%)`;
    document.getElementById('blueArmyPowerText').style.left =
        (bluePower / (redPower + bluePower) / 2) * 100 + '%';
    document.getElementById('redArmyPowerText').style.left =
        100 - (redPower / (redPower + bluePower)) * 50 + '%';
    document.getElementById('redArmyPowerText').innerHTML = shorten(redPower);
    document.getElementById('blueArmyPowerText').innerHTML = shorten(bluePower);
}

function renderArmyUI() {
    renderArmies();
    if (isPlacing) {
        const convertedMousePos = convertToPlaceCoords(mousePos, false);
        const convertedStartPos = convertToPlaceCoords(startingPlace, true);
        let divisionCount = 0;
        let ySign = Math.sign(convertedMousePos.y - convertedStartPos.y);
        let xSign = Math.sign(convertedMousePos.x - convertedStartPos.x);
        if (ySign == 0) {
            ySign = 1;
        }
        if (xSign == 0) {
            xSign = 1;
        }
        for (
            let i = convertedStartPos.y;
            ySign == 1 ? i <= convertedMousePos.y : i >= convertedMousePos.y;
            i += 20 * ySign
        ) {
            for (
                let j = convertedStartPos.x;
                xSign == 1 ? j <= convertedMousePos.x + 20 : j >= convertedMousePos.x - 20;
                j += 20 * xSign
            ) {
                if (divisionCount >= currentDivisions.length) {
                    return;
                }
                if (
                    !playerBorders.has(tilecode((j + armyScrollX) / 20 - 1, (i + armyScrollY) / 20))
                ) {
                    continue;
                }
                if (placedTiles.has(tilecode(j - 10, i + 10))) {
                    continue;
                }
                const division = currentDivisions[divisionCount];
                switch (division.type) {
                    case 'I':
                        drawDirectionalRectangle(
                            j - 10 * armyZoom,
                            i + 10 * armyZoom,
                            0,
                            'rgba(0,0,255,0.5)',
                            12 * armyZoom,
                            'black',
                            2 * armyZoom
                        );

                        break;
                    case 'C':
                        drawDirectionalTriangle(
                            j - 10 * armyZoom,
                            i + 10 * armyZoom,
                            0,
                            'rgba(0,0,255,0.5)',
                            12 * armyZoom,
                            'black',
                            2 * armyZoom
                        );

                        break;
                    case 'A':
                        ctx.lineWidth = 2 * armyZoom;
                        ctx.fillStyle = 'rgba(0,0,255,0.5)';
                        ctx.beginPath();

                        ctx.arc(
                            j - 10 * armyZoom,
                            i + 10 * armyZoom,
                            10 * armyZoom,
                            0,
                            Math.PI * 2
                        );
                        ctx.stroke();
                        ctx.fill();
                        break;
                }
                divisionCount++;
            }
        }
    } else if (isSelecting) {
        if (drawingRectangle) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.rect(
                startingPlace.x + (startingScroll.x - armyScrollX) * armyZoom,
                startingPlace.y + (startingScroll.y - armyScrollY) * armyZoom,
                mousePos.x - startingPlace.x - (startingScroll.x - armyScrollX) * armyZoom,
                mousePos.y - startingPlace.y - (startingScroll.y - armyScrollY) * armyZoom
            );
            ctx.stroke();
        } else if (drawingLine) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(
                (blueArmies[armyChosen].x - armyScrollX) * armyZoom,
                (blueArmies[armyChosen].y - armyScrollY) * armyZoom
            );
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();

            for (const a of armiesChosen) {
                const armyDirection = Math.atan2(
                    blueArmies[armyChosen].y - blueArmies[a].y,
                    blueArmies[armyChosen].x - blueArmies[a].x
                );
                switch (blueArmies[a].type) {
                    case 'I':
                        drawDirectionalRectangle(
                            mousePos.x -
                                Math.cos(armyDirection + (Math.PI / 12) * rotationAmount) *
                                    blueArmies[a].getDistance(
                                        blueArmies[armyChosen].x,
                                        blueArmies[armyChosen].y
                                    ) *
                                    tightnessX *
                                    armyZoom,

                            mousePos.y -
                                Math.sin(armyDirection + (Math.PI / 12) * rotationAmount) *
                                    blueArmies[a].getDistance(
                                        blueArmies[armyChosen].x,
                                        blueArmies[armyChosen].y
                                    ) *
                                    tightnessY *
                                    armyZoom,
                            ((blueArmies[a].direction + (Math.PI / 12) * rotationAmount) * 180) /
                                Math.PI,
                            'rgba(0,0,255,0.5)',
                            12 * armyZoom,
                            'black',
                            2 * armyZoom
                        );

                        break;
                    case 'C':
                        drawDirectionalTriangle(
                            mousePos.x -
                                Math.cos(armyDirection + (Math.PI / 12) * rotationAmount) *
                                    blueArmies[a].getDistance(
                                        blueArmies[armyChosen].x,
                                        blueArmies[armyChosen].y
                                    ) *
                                    tightnessX *
                                    armyZoom,

                            mousePos.y -
                                Math.sin(armyDirection + (Math.PI / 12) * rotationAmount) *
                                    blueArmies[a].getDistance(
                                        blueArmies[armyChosen].x,
                                        blueArmies[armyChosen].y
                                    ) *
                                    tightnessY *
                                    armyZoom,
                            ((blueArmies[a].direction + (Math.PI / 12) * rotationAmount) * 180) /
                                Math.PI,
                            'rgba(0,0,255,0.5)',
                            12 * armyZoom,
                            'black',
                            2 * armyZoom
                        );

                        break;
                    case 'A':
                        ctx.lineWidth = 2 * armyZoom;
                        ctx.fillStyle = 'rgba(0,0,255,0.5)';
                        ctx.beginPath();

                        ctx.arc(
                            mousePos.x -
                                Math.cos(armyDirection + (Math.PI / 12) * rotationAmount) *
                                    blueArmies[a].getDistance(
                                        blueArmies[armyChosen].x,
                                        blueArmies[armyChosen].y
                                    ) *
                                    tightnessX *
                                    armyZoom,

                            mousePos.y -
                                Math.sin(armyDirection + (Math.PI / 12) * rotationAmount) *
                                    blueArmies[a].getDistance(
                                        blueArmies[armyChosen].x,
                                        blueArmies[armyChosen].y
                                    ) *
                                    tightnessY *
                                    armyZoom,
                            10 * armyZoom,
                            0,
                            Math.PI * 2
                        );
                        ctx.stroke();
                        ctx.fill();
                        break;
                }
            }
        }
    }
}

function drawDirectionalRectangle(
    x,
    y,
    direction,
    color,
    size = 15,
    lineColor = 'black',
    lineWidth = 5 * armyZoom
) {
    ctx.beginPath();
    let currentD = 45 + direction;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    ctx.fillStyle = color;
    ctx.moveTo(
        x + Math.cos((currentD * Math.PI) / 180) * size,
        y + Math.sin((currentD * Math.PI) / 180) * size
    );
    for (let i = 0; i < 4; i++) {
        currentD += 90;
        ctx.lineTo(
            x + Math.cos((currentD * Math.PI) / 180) * size,
            y + Math.sin((currentD * Math.PI) / 180) * size
        );
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function drawDirectionalTriangle(
    x,
    y,
    direction,
    color,
    size = 15,
    lineColor = 'black',
    lineWidth = 5 * armyZoom
) {
    ctx.beginPath();
    let currentD = direction;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    ctx.fillStyle = color;
    ctx.moveTo(
        x + Math.cos((currentD * Math.PI) / 180) * size,
        y + Math.sin((currentD * Math.PI) / 180) * size
    );
    for (let i = 0; i < 3; i++) {
        currentD += 120;
        ctx.lineTo(
            x + Math.cos((currentD * Math.PI) / 180) * size,
            y + Math.sin((currentD * Math.PI) / 180) * size
        );
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
document.onwheel = function (event) {
    if (battling) {
        armyZoom -= 0.05 * Math.sign(event.deltaY);
        armyZoom = Math.min(10, Math.max(0.25, armyZoom));
        changeZoom(armyZoom * 20);
        renderArmyUI();
    }
};

function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
function mainFunction() {
    if (!isSelecting && !isPlacing) {
        Object.keys(gridArmies).forEach((key) => delete gridArmies[key]);

        for (const a of redArmies) {
            const posString = Math.floor(a.x / 30) + '/' + Math.floor(a.y / 30);
            if (gridArmies[posString] == undefined) {
                gridArmies[posString] = [a];
            } else {
                gridArmies[posString].push(a);
            }
        }
        for (const a of blueArmies) {
            const posString = Math.floor(a.x / 30) + '/' + Math.floor(a.y / 30);
            if (gridArmies[posString] == undefined) {
                gridArmies[posString] = [a];
            } else {
                gridArmies[posString].push(a);
            }
        }
        for (let i = arrows.length - 1; i >= 0; i--) {
            const arrow = arrows[i];

            arrows[i].x += Math.cos(arrow.direction) * 30;
            arrows[i].y += Math.sin(arrow.direction) * 30;
            const posArray = gridArmies[Math.floor(arrow.x / 30) + '/' + Math.floor(arrow.y / 30)];
            arrows[i].ticks++;

            if (arrow.ticks > 30) {
                arrows.splice(i, 1);
            }
            if (posArray == undefined) {
                continue;
            }
            for (const a of posArray) {
                if (a.side == arrow.side) {
                    continue;
                }
                a.power -=
                    arrow.damage +
                    (Math.abs(a.direction - arrow.direction) < Math.PI / 2 || a.type == 'A'
                        ? 1
                        : 0.25);
                arrows.splice(i, 1);
                continue;
            }
        }
        if (redArmies.length == 0) {
            battling = false;
            information[1].choosetext(
                blueTotalPower - bluePower,
                redTotalPower - redPower,
                civCasualties
            );
            displaypopup(1, information);
            return;
        }
        if (blueArmies.length == 0 || raidProgress >= 20000) {
            battling = false;
            information[0].choosetext(
                blueTotalPower - bluePower,
                redTotalPower - redPower,
                civCasualties
            );
            displaypopup(0, information);
            return;
        }
        for (const a of redArmies) {
            if (isLand(Math.floor(a.x / 20), Math.floor(a.y / 20))) {
                a.waterTimer = 0;
            } else {
                a.waterTimer++;
                a.power -= a.power / 2000;
            }

            if (a.type != 'C' || a.calveryStun == 0) {
                if (a.animationTime == -6) {
                    let min = Infinity;
                    let leastCoord;
                    for (const a2 of blueArmies) {
                        const nearestDistance = a.getDistance(a2.x, a2.y);
                        if (nearestDistance < min) {
                            min = nearestDistance;
                            leastCoord = { x: a2.x, y: a2.y };
                            arrowTarget = a2;
                            if (a.getDistance(a2.x, a2.y) < 30) {
                                a.destination.splice(0, 1);
                                a.animationTime = 1;
                                a.target = a2;
                                break;
                            }
                        }
                    }
                    switch (a.battleType) {
                        case 'raid':
                            if (a.type == 'I' || a.type == 'C') {
                                if (min < 100) {
                                    a.isRaiding = false;
                                    a.destination.length = 0;
                                    a.destination.push(leastCoord);
                                } else if (a.destination.length == 0) {
                                    if (
                                        buildstats[
                                            tilecode(Math.floor(a.x / 20), Math.floor(a.y / 20))
                                        ] != undefined
                                    ) {
                                        raidProgress++;
                                        const currentBuilding =
                                            gridstats[
                                                buildstats[
                                                    tilecode(
                                                        Math.floor(a.x / 20),
                                                        Math.floor(a.y / 20)
                                                    )
                                                ]
                                            ];
                                        if (
                                            (currentBuilding.disabled =
                                                false &&
                                                Math.random() * currentBuilding.resourcerefund <
                                                    0.05 &&
                                                currentBuilding.index != '18')
                                        ) {
                                            currentBuilding.disabled = true;
                                            civCasualties += currentBuilding.population;
                                        }
                                    }
                                    if (
                                        distance(a.x, a.y, a.targetCoord.x, a.targetCoord.y) <= 30
                                    ) {
                                        const newTarget = tiledecode(getRandomItem(playerBorders));
                                        a.targetCoord = {
                                            x: newTarget.x * 20,
                                            y: newTarget.y * 20,
                                        };
                                    }
                                    a.destination.push(
                                        ...aStar(
                                            { x: Math.floor(a.x / 20), y: Math.floor(a.y / 20) },
                                            { x: a.targetCoord.x / 20, y: a.targetCoord.y / 20 }
                                        ).map(function ({ x: num, y: num2 }) {
                                            return { x: num * 20, y: num2 * 20 };
                                        })
                                    );
                                }
                            } else if (a.type == 'A') {
                                if (min > 500) {
                                    if (a.arrowCoolDown <= 0) {
                                        arrows.push(
                                            new arrow(
                                                a.x,
                                                a.y,
                                                Math.atan2(leastCoord.y - a.y, leastCoord.x - a.x),
                                                Math.ceil(a.power / 10) + (a.power % 10),
                                                leastCoord,
                                                'red'
                                            )
                                        );
                                        a.arrowCoolDown = 15 + Math.random() * 5;
                                    } else {
                                        a.arrowCoolDown--;
                                    }
                                } else {
                                    if (min < 100) {
                                        a.isRaiding = false;
                                        a.destination.length = 0;
                                        a.destination.push(leastCoord);
                                    } else if (a.destination.length == 0) {
                                        if (
                                            playerBorders.has(
                                                tilecode(Math.floor(a.x / 20), Math.floor(a.y / 20))
                                            )
                                        ) {
                                            raidProgress++;
                                        }
                                        a.destination.push(
                                            ...aStar(
                                                {
                                                    x: Math.floor(a.x / 20),
                                                    y: Math.floor(a.y / 20),
                                                },
                                                { x: a.targetCoord.x / 20, y: a.targetCoord.y / 20 }
                                            ).map(function ({ x: num, y: num2 }) {
                                                return { x: num * 20, y: num2 * 20 };
                                            })
                                        );
                                    }
                                }
                            }
                    }

                    if (a.destination.length > 0) {
                        a.direction = Math.atan2(
                            a.destination[0].y - a.y,
                            a.destination[0].x - a.x
                        );
                        if (a.getDistance(a.destination[0].x, a.destination[0].y) <= 30) {
                            a.destination.splice(0, 1);
                        }
                        if (a.destination.length > 0) {
                            a.x +=
                                Math.cos(a.direction) *
                                (min > 180 ? 5 : a.speed) *
                                (a.waterTimer != 0 ? 0.2 : 1);
                            a.y +=
                                Math.sin(a.direction) *
                                (min > 180 ? 5 : a.speed) *
                                (a.waterTimer != 0 ? 0.2 : 1);
                        }
                    }
                } else {
                    if (a.animationTime > 0) {
                        a.x += Math.cos(a.direction) * 3;
                        a.y += Math.sin(a.direction) * 3;
                        if (a.animationTime >= 5) {
                            a.animationTime = -1;
                        }
                        a.animationTime++;
                    } else {
                        a.x -= Math.cos(a.direction) * 3;
                        a.y -= Math.sin(a.direction) * 3;
                        if (a.animationTime <= -5) {
                            a.target.power -=
                                (Math.ceil(a.power / 10) + (a.power % 10)) *
                                (Math.abs(a.target.direction - a.direction) < Math.PI / 2 ||
                                a.target.type == 'A'
                                    ? 2
                                    : 0.5);
                            if (a.type != 'C') {
                                a.target.calveryStun = 3;
                            }
                        }
                        a.animationTime--;
                    }
                }
            } else {
                a.calveryStun -= 1;
            }
        }
        for (const a of blueArmies) {
            if (isLand(Math.floor(a.x / 20), Math.floor(a.y / 20))) {
                a.waterTimer = 0;
            } else {
                a.waterTimer++;
                a.power -= a.power / 2000;
            }
            if (a.type != 'C' || a.calveryStun == 0) {
                if (a.animationTime == -6) {
                    let min = Infinity;
                    let leastCoord;
                    let arrowTarget = null;

                    for (const a2 of redArmies) {
                        if (a2.side == 'blue') {
                            continue;
                        }
                        const nearestDistance = a.getDistance(a2.x, a2.y);
                        if (nearestDistance < min) {
                            min = nearestDistance;
                            leastCoord = { x: a2.x, y: a2.y };
                            arrowTarget = a2;
                            if (a.getDistance(a2.x, a2.y) < 30 && a.priority != 1) {
                                a.destination.length = 0;
                                a.animationTime = 1;
                                a.target = a2;
                                break;
                            }
                        }
                    }

                    if (min > 180 - (a.type == 'A' ? 100 : 0) && a.priority == 1) {
                        a.priority = 3;
                    }
                    if (min < 180 - (a.type == 'A' ? 100 : 0)) {
                        if (a.priority != 1) {
                            a.priority = 2;
                            a.destination.length = 0;
                            a.destination.push(leastCoord);
                        }
                    } else if (a.type == 'A' && min < 500 && a.arrowCoolDown <= 0) {
                        arrows.push(
                            new arrow(
                                a.x,
                                a.y,
                                Math.atan2(leastCoord.y - a.y, leastCoord.x - a.x),
                                Math.ceil(a.power / 10) + (a.power % 10),
                                leastCoord,
                                'blue'
                            )
                        );
                        a.arrowCoolDown =
                            (15 + Math.random() * 5) *
                            (a.destination.length == 0 ||
                            a.getDistance(a.destination[0].x, a.destination[0].y) < 40
                                ? 1
                                : 1.5) *
                            Math.ceil(
                                gridArmies[Math.floor(a.x / 30) + '/' + Math.floor(a.y / 30)]
                                    .length / 3
                            );
                    } else if (a.arrowCoolDown > 0) {
                        a.arrowCoolDown--;
                    }

                    if (a.destination.length > 0) {
                        a.direction = Math.atan2(
                            a.destination[0].y - a.y,
                            a.destination[0].x - a.x
                        );

                        if (a.getDistance(a.destination[0].x, a.destination[0].y) > a.speed) {
                            a.x += Math.cos(a.direction) * a.speed * (a.waterTimer != 0 ? 0.2 : 1);
                            a.y += Math.sin(a.direction) * a.speed * (a.waterTimer != 0 ? 0.2 : 1);
                        } else {
                            a.x = a.destination[0].x;
                            a.y = a.destination[0].y;
                            a.direction = a.targetRotation;
                            a.priority = 3;
                            a.destination.splice(0, 1);
                        }
                    }
                } else {
                    if (a.animationTime > 0) {
                        a.x += Math.cos(a.direction) * 3;
                        a.y += Math.sin(a.direction) * 3;
                        if (a.animationTime >= 5) {
                            a.animationTime = -1;
                        }
                        a.animationTime++;
                    } else {
                        a.x -= Math.cos(a.direction) * 3;
                        a.y -= Math.sin(a.direction) * 3;
                        if (a.animationTime <= -5) {
                            a.target.power -=
                                (Math.ceil(a.power / 10) + (a.power % 10)) *
                                (Math.abs(a.target.direction - a.direction) < Math.PI / 2 ||
                                a.target.type == 'A'
                                    ? 2
                                    : 0.5);
                            if (a.type != 'C') {
                                a.target.calveryStun = 3;
                            }
                        }
                        a.animationTime--;
                    }
                }
            } else {
                a.calveryStun -= 1;
            }
        }
        let substeps = 3;
        for (let k = 0; k < substeps; k++) {
            for (const a of redArmies) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const posArray =
                            gridArmies[Math.floor(a.x / 30) + i + '/' + (Math.floor(a.y / 30) + j)];
                        if (posArray == undefined) {
                            continue;
                        }
                        for (const a2 of posArray) {
                            if (a.x == a2.x && a.y == a2.y) {
                                continue;
                            }
                            let amount = 0;
                            while (a.getDistance(a2.x, a2.y) < 25) {
                                const direction = Math.atan2(a2.y - a.y, a2.x - a.x);
                                a.x -= Math.cos(direction) * 0.3;
                                a.y -= Math.sin(direction) * 0.3;
                                a2.x += Math.cos(direction) * 0.3;
                                a2.y += Math.sin(direction) * 0.3;
                                amount++;
                            }
                        }
                    }
                }
            }
            for (const a of blueArmies) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const posArray =
                            gridArmies[Math.floor(a.x / 30) + i + '/' + (Math.floor(a.y / 30) + j)];
                        if (posArray == undefined) {
                            continue;
                        }
                        for (const a2 of posArray) {
                            if (a.x == a2.x && a.y == a2.y) {
                                continue;
                            }
                            let amount = 0;
                            while (a.getDistance(a2.x, a2.y) < 25) {
                                isColliding = true;
                                const direction = Math.atan2(a2.y - a.y, a2.x - a.x);
                                a.x -= Math.cos(direction) * 0.3;
                                a.y -= Math.sin(direction) * 0.3;
                                a2.x += Math.cos(direction) * 0.3;
                                a2.y += Math.sin(direction) * 0.3;
                                amount++;
                            }
                        }
                    }
                }
            }
        }
        renderArmies();
        updateArmyPowerBars();
    }
    setTimeout(mainFunction, 50);
}
//const main = window.setInterval(mainFunction, 60);
function renderArmies() {
    renderBackGround(armyZoom * 20, armyScrollX / 20, armyScrollY / 20);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        canvas5,
        armyScrollX / 20,
        armyScrollY / 20,
        widthmax + 1,
        heightmax + 2,
        0,
        0,
        (widthmax + 1) * armyZoom * 20,
        (heightmax + 2) * armyZoom * 20
    );
    ctx.imageSmoothingEnabled = true;
    for (let i = redArmies.length - 1; i >= 0; i--) {
        if (redArmies[i].power <= 0) {
            redArmies.splice(i, 1);
            continue;
        }
        switch (redArmies[i].type) {
            case 'I':
                drawDirectionalRectangle(
                    (redArmies[i].x - armyScrollX) * armyZoom,
                    (redArmies[i].y - armyScrollY) * armyZoom,
                    (redArmies[i].direction * 180) / Math.PI,
                    'red',
                    10 * armyZoom
                );
                break;
            case 'C':
                drawDirectionalTriangle(
                    (redArmies[i].x - armyScrollX) * armyZoom,
                    (redArmies[i].y - armyScrollY) * armyZoom,
                    (redArmies[i].direction * 180) / Math.PI,
                    'red',
                    10 * armyZoom
                );
                break;
            case 'A':
                ctx.lineWidth = 5 * armyZoom;

                ctx.beginPath();
                ctx.fillStyle = 'red';
                ctx.strokeStyle = 'black';
                ctx.arc(
                    (redArmies[i].x - armyScrollX) * armyZoom,
                    (redArmies[i].y - armyScrollY) * armyZoom,
                    8 * armyZoom,
                    0,
                    Math.PI * 2
                );
                ctx.stroke();
                ctx.fill();
                break;
        }
        /* ctx.fillStyle = 'black';
        for (const pos of redArmies[i].destination) {
            ctx.fillRect(
                (pos.x - armyScrollX) * armyZoom,
                (pos.y - armyScrollY) * armyZoom,
                10 * armyZoom,
                10 * armyZoom
            );
        } */
    }

    ctx.fillStyle = 'blue';
    for (let i = blueArmies.length - 1; i >= 0; i--) {
        if (blueArmies[i].power <= 0) {
            armyInfo[blueArmies[i].index] = 0;
            blueArmies.splice(i, 1);
            continue;
        }
        switch (blueArmies[i].type) {
            case 'I':
                drawDirectionalRectangle(
                    (blueArmies[i].x - armyScrollX) * armyZoom,
                    (blueArmies[i].y - armyScrollY) * armyZoom,
                    (blueArmies[i].direction * 180) / Math.PI,
                    'blue',
                    10 * armyZoom,
                    blueArmies[i].selected ? 'white' : 'black'
                );
                break;
            case 'C':
                drawDirectionalTriangle(
                    (blueArmies[i].x - armyScrollX) * armyZoom,
                    (blueArmies[i].y - armyScrollY) * armyZoom,
                    (blueArmies[i].direction * 180) / Math.PI,
                    'blue',
                    10 * armyZoom,
                    blueArmies[i].selected ? 'white' : 'black'
                );
                break;
            case 'A':
                ctx.lineWidth = 5 * armyZoom;
                ctx.beginPath();
                if (blueArmies[i].selected) {
                    ctx.strokeStyle = 'white';
                } else {
                    ctx.strokeStyle = 'black';
                }
                ctx.arc(
                    (blueArmies[i].x - armyScrollX) * armyZoom,
                    (blueArmies[i].y - armyScrollY) * armyZoom,
                    8 * armyZoom,
                    0,
                    Math.PI * 2
                );
                ctx.stroke();
                ctx.fill();
                break;
        }
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    for (const arrow of arrows) {
        const direction = Math.atan2(arrow.landingSpot.y - arrow.y, arrow.landingSpot.x - arrow.x);
        ctx.beginPath();
        ctx.moveTo(
            (arrow.x - armyScrollX - Math.cos(direction) * 20) * armyZoom,
            (arrow.y - Math.sin(direction) * 20 - armyScrollY) * armyZoom
        );
        ctx.lineTo((arrow.x - armyScrollX) * armyZoom, (arrow.y - armyScrollY) * armyZoom);
        ctx.stroke();
    }
}
