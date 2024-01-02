let rainthroughnum = 500;
let speedRainTrough = 25;
let RainTrough = [];
let rainnum = 200;
let rain = [];
let w = canvas2.width;
let h = canvas2.height;
function createRainTrough() {
    for (let i = 0; i < rainthroughnum; i++) {
        RainTrough[i] = {
            x: getRandomInt(0, w),
            y: getRandomInt(0, h),
            length: Math.floor(getRandomInt(1, 830)),
            opacity: Math.random() * 0.2,
            xs: getRandomInt(-2, 2),
            ys: 5,
        };
    }
}

function createRain() {
    for (let i = 0; i < rainnum; i++) {
        rain[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            // xs: -4 + Math.random() * 4 + 2, //random rain movement, more natural but no wind
            xs: Math.random() - 0.5,
            ys: 5,
        };
    }
}

function drawRain(i) {
    ctx2.globalCompositeOperation = 'destination-over';
    ctx2.beginPath();
    ctx2.moveTo(rain[i].x, rain[i].y);
    switch (weather) {
        case 1:
            ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
            ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx2.lineWidth = 2;
            break;
        case 2:
            // ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
            ctx2.arc(rain[i].x, rain[i].y, 1, 0, 2 * Math.PI, false);
            ctx2.strokeStyle = 'rgba(240, 242, 247,0.99)';
            ctx2.lineWidth = 4;
            break;

        case 3:
            // ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
            ctx2.arc(rain[i].x, rain[i].y, 1, 0, 2 * Math.PI, false);
            ctx2.strokeStyle = 'rgba(255, 255, 255,0.99)';
            ctx2.lineWidth = 5;
    }

    ctx2.lineCap = 'round';
    ctx2.stroke();
}

function animateRain() {
    for (let i = 0; i < rainnum; i++) {
        rain[i].x += rain[i].xs;
        rain[i].y += rain[i].ys;
        // if (weather == 1) {
        // rain[i].ys = (10)
        // }
        // if (weather == 2) {
        // rain[i].ys = (10)
        // }
        // if (weather == 3) {
        // rain[i].ys = (15)
        // }
        if (rain[i].x > w || rain[i].y > h) {
            rain[i].x = Math.random() * w;
            rain[i].y = -20;
        }
        if (weather > 0) {
            drawRain(i);
        }
    }
}

function init() {
    createRainTrough();
    createRain();
    window.addEventListener('resize', createRainTrough);
}
init();

function animloop() {
    if (psettings.noweather) {
        return;
    }
    if (weather == 0) {
        return;
    } else {
        ctx2.clearRect(0, 0, screen.width, screen.height);
        animateRain();
        requestAnimationFrame(animloop);
        if (weather == 1) {
            raintimer = 2;
        } else if (weather == 2) {
            raintimer = 1;
        } else if (weather == 3) {
            raintimer = 2;
        }
    }
}

function createSimpleTable(rows) {
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    for (const row of rows) {
        const tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);

        row.forEach((content) => {
            const tableCell = document.createElement('th');
            tableCell.innerText = content;

            tableRow.appendChild(tableCell);
        });
    }

    table.appendChild(tableBody);

    return table;
}

function difficultyscreen() {
    document.getElementById('difficulty-flex').style.display = 'grid';
    document.getElementById('back_button').hidden = false;
    document.getElementById('back_button').onclick = function () {
        menu();
    };
    document.getElementById('title_start').innerHTML = 'Select Difficulty';
    document.getElementById('start-flex').style.display = 'none';
    document.getElementById('bgimg').style.display = 'none';
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
}
function pause_menu() {
    document.getElementById('popup_block_buttons').style.display = 'block';
    pause = document.getElementById('pause_flex');
    pause.style.display = 'flex';
    pause.style.animation = 'none';
    pause.style.animation = 'pause 1s';
}
function unpause() {
    document.getElementById('popup_block_buttons').style.display = 'none';
    document.getElementById('pause_flex').style.display = 'none';
}
function settings(ifmenu = true) {
    document.getElementById('difficulty-flex').style.display = 'none';
    document.getElementById('bgimg').style.display = 'none';
    document.getElementById('popup_block_buttons').style.display = 'none';
    document.getElementById('pause_flex').style.display = 'none';
    document.getElementById('settings-flex').style.display = 'flex';
    document.getElementById('back_button').hidden = false;
    document.getElementById('back_button').onclick = function () {
        ifmenu ? menu() : start();
    };
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    document.getElementById('title_start').style.display = 'block';
    document.getElementById('title_start').innerHTML = 'Settings';
    document.getElementById('start-flex').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('select-grid').style.display = 'none';
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
}
function pause_menu() {
    document.getElementById('popup_block_buttons').style.display = 'block';
    pause = document.getElementById('pause_flex');
    pause.style.display = 'flex';
    pause.style.animation = 'none';
    pause.style.animation = 'pause 1s';
}
function unpause() {
    document.getElementById('popup_block_buttons').style.display = 'none';
    document.getElementById('pause_flex').style.display = 'none';
}

function confirmclear(index) {
    confirmation[2].choosetext(index);
    displaypopup(2, confirmation);
}
function clearsave(index) {
    localStorage.removeItem('griditems' + index);
    localStorage.removeItem('scrollinfo' + index);
    localStorage.removeItem('pstats' + index);
    localStorage.removeItem('slot' + index);
    localStorage.removeItem('marketmod' + index);
    localStorage.removeItem('marketitems' + index);
    localStorage.removeItem('marketstats' + index);
}
function info() {
    infovisits += 1;
    document.body.style.overflowY = 'scroll';
    ispainting = false;
    removing = false;
    repairing = false;
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    document.getElementById('info-flex').innerHTML = '';
    document.getElementById('info').style.display = 'flex';
    document.getElementById('boss_health_container').style.display = 'none';
    document.getElementById('difficulty-flex').style.display = 'none';
    document.getElementById('back_button').hidden = false;
    document.getElementById('back_button').onclick = function () {
        start();
    };
    document.getElementById('stats').style.display = 'none';
    document.getElementById('select-grid').style.display = 'none';
    ctx.clearRect(0, 0, screen.width, screen.height);
    document.getElementById('save-flex').style.display = 'none';

    const statflex = document.getElementById('stat-info');
    statflex.innerHTML = '';
    const stats = [
        {
            title: 'Population',
            description: '',
            choosetext() {
                this.description = `The people in your village, who can be employed to preform important tasks.<br>Population: ${currentpop}`;
            },
        },
        {
            title: 'Food',
            description: '',
            choosetext() {
                this.description = `A necessity for survival, your population grows if there is more food than people.<br>Food Production: ${food}<br>Population Gain: ${Math.max(
                    -2 - Math.ceil(currentpop / 5),
                    Math.min(1 + Math.ceil(currentpop / 5), food - currentpop)
                )}`;
            },
        },

        {
            title: 'Resources',
            description: '',
            choosetext() {
                this.description = `The building blocks of construction, all buildings require resources to construct.<br>Resource Production: ${resourcesgained}`;
            },
        },
        {
            title: 'Unemployed',
            description: '',
            choosetext() {
                this.description = `The people who aren't employed. Most buildings require operators.<br>Amount Unemployed: ${unemployed}`;
            },
        },
        {
            title: 'Military',
            description: '',
            choosetext() {
                this.description = `The power of your military. All unemployed people serve in the military.<br>Military Power: ${military}`;
            },
        },
        {
            title: 'Wisdom',
            description: '',
            choosetext() {
                this.description = `The accumulated wisdom of your village, now in pure number form! Once the wisdom bar fills up, it's converted into research points, which can be used to unlock tech.<br>Progress to Next Level: ${(
                    xp / totalxp
                ).toFixed(2)}%`;
            },
        },
    ];
    for (const stat of stats) {
        const statf = document.createElement('div');

        const stattitle = document.createElement('h1');
        const statdes = document.createElement('p');
        stat.choosetext();
        stattitle.style.textAlign = 'center';
        statdes.style.textAlign = 'center';
        stattitle.innerHTML = stat.title;
        statdes.innerHTML = stat.description;
        statf.appendChild(stattitle);
        statf.appendChild(statdes);
        statflex.appendChild(statf);
    }
    for (const building of p.pieceROM) {
        const grid = document.createElement('div');
        grid.className = 'info-grid';

        const title = document.createElement('h1');
        title.className = 'infotext';
        title.innerHTML = building.name;
        title.style.gridColumn = 3;
        grid.appendChild(title);
        const des = document.createElement('p');
        des.style.gridRow = 2;
        des.style.gridColumn = '3/ span 3';
        if (building.unlocked) {
            const buildcanvas = document.createElement('canvas');
            buildcanvas.style.gridRow = 1;
            buildcanvas.style.gridColumn = 2;
            buildcanvas.style.width = 80;
            buildcanvas.style.height = 80;
            const bctx = buildcanvas.getContext('2d');
            for (const pos of building.piecepositions) {
                bctx.drawImage(
                    buildimg,
                    pos.img.dx,
                    pos.img.dy,
                    20,
                    20,
                    (pos.x + 2) * 20,
                    (pos.y + 2) * 20,
                    20,
                    20
                );
            }
            grid.appendChild(buildcanvas);
            des.innerHTML = building.description;
        } else {
            des.innerHTML = '???';
            grid.style.opacity = 0.7;
            title.style.opacity = 0.7;
            des.style.opacity = 0.7;
            grid.style.backgroundColor = 'rgb(69, 62, 62)';
        }
        des.className = 'infotext';
        grid.appendChild(des);

        document.getElementById('info-flex').appendChild(grid);
    }
}
function menu() {
    build_music.pause();
    war_music.pause();
    boss_music.pause();
    market_music.pause();
    removing = false;
    ispainting = false;
    repairing = false;
    istutorial = false;
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    document.getElementById('achievement-flex').style.display = 'none';
    document.getElementById('bgimg').style.display = 'block';
    document.getElementById('title_start').style.display = 'block';
    document.getElementById('difficulty-flex').style.display = 'none';
    document.getElementById('settings-flex').style.display = 'none';
    document.getElementById('title_start').innerHTML = 'Dawn of Civilization';
    document.getElementById('back_button').hidden = true;
    document.getElementById('boss_health_container').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('start-flex').style.display = 'grid';
    document.body.style.overflow = 'hidden';
    document.getElementById('select-grid').style.display = 'none';
    ctx.clearRect(0, 0, screen.width, screen.height);
    document.getElementById('save-flex').style.display = 'none';
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
}
function savescreen(save) {
    confirmation[2].isSave(save);
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    removing = false;
    ispainting = false;
    repairing = false;

    document.getElementById('back_button').hidden = false;
    const ele = document.getElementsByClassName('save_button');

    i = 1;
    for (const el of ele) {
        el.disabled = false;
        el.innerHTML = 'Save Game';
        el.onclick = function () {
            savegame(el.id);
        };
        i++;
    }
    const ele2 = document.getElementsByClassName('clear_button');
    i = 1;
    for (const el of ele2) {
        if (localStorage.getItem('pstats' + i) == null) {
            el.disabled = true;
        } else {
            el.disabled = false;
        }
        i++;
    }
    if (!save) {
        document.getElementById('back_button').onclick = function () {
            menu();
        };
        const ele = document.getElementsByClassName('save_button');
        const ele2 = document.getElementsByClassName('clear_button');
        i = 1;
        for (const el of ele2) {
            if (localStorage.getItem('pstats' + i) == null) {
                el.disabled = true;
            } else {
                el.disabled = false;
            }
            i++;
        }
        i = 1;
        for (const el of ele) {
            el.innerHTML = 'Load Game';
            el.onclick = function () {
                load(el.id);
            };
            if (localStorage.getItem('pstats' + i) == null) {
                el.disabled = true;
            }
            i++;
        }
    } else {
        document.getElementById('back_button').onclick = function () {
            start();
        };
    }
    for (let i = 1; i < 6; i++) {
        const localstats = JSON.parse(localStorage.getItem('pstats' + i));
        const ele = document.getElementsByClassName('savedes' + i)[0];
        if (localStorage.getItem('pstats' + i) != null) {
            difficultyname = {
                1.2: 'copper',
                1.5: 'iron',
                1.8: 'diamond',
                2: 'eternity',
            }[localstats.difficultymultiplier];

            // remove all children of `ele`
            // https://stackoverflow.com/a/3955238/13996389
            while (ele.lastChild) {
                ele.removeChild(ele.lastChild);
            }

            ele.appendChild(
                createSimpleTable([
                    ['difficulty:', difficultyname],
                    ['year:', shorten(localstats.difficulty)],
                    ['population:', shorten(localstats.currentpop)],
                    ['resources:', shorten(localstats.resources)],
                    ['military:', shorten(localstats.military)],
                ])
            );
        } else {
            ele.innerHTML = 'Empty Slot';
        }
    }
    document.getElementById('title_start').style.display = 'block';
    document.getElementById('title_start').innerHTML = 'Select Save';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('bgimg').style.display = 'none';
    document.getElementById('start-flex').style.display = 'none';
    document.getElementById('select-grid').style.display = 'none';
    ctx.clearRect(0, 0, screen.width, screen.height);
    document.getElementById('save-flex').style.display = 'grid';
    document.getElementById('boss_health_container').style.display = 'none';
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
}
function techscreen() {
    if (istutorial && tutorialindex == 16) {
        continuetutorial(++tutorialindex);
    }
    for (let i = 0; i < tech.length; i++) {
        for (let j = 0; j < tech[i].length; j++) {
            tech[i][j].choosetext();
        }
    }
    for (let i = 0; i < document.getElementsByClassName('warning-box').length; i++) {
        document.getElementsByClassName('warning-box')[i].style.display = 'none';
    }
    ispainting = false;
    removing = false;
    repairing = false;
    build_music.pause();
    war_music.pause();
    boss_music.pause();
    tech_music.play();
    document.getElementById('info').style.display = 'none';
    document.body.overflowY = 'scroll';
    document.getElementById('techbutton').style.animation = 'none';
    document.getElementById('difficulty-flex').style.display = 'none';
    document.getElementById('tech-tree-container').style.display = 'grid';
    document.getElementById('back_button').hidden = false;
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
    document.getElementById('back_button').onclick = function () {
        start();
    };
    document.getElementById('stats').style.display = 'none';
    document.getElementById('boss_health_container').style.display = 'none';
    document.getElementById('select-grid').style.display = 'none';
    ctx.clearRect(0, 0, screen.width, screen.height);
    document.getElementById('save-flex').style.display = 'none';
    const categories = [
        'Farming',
        'Farming II',
        'Housing',
        'Housing II',
        'Mining',
        'Mining II',
        'Intelligence',
        'Intelligence II',
        'Virtue',
        'Virtue II',
        'Military',
        'Military II',
    ];
    const techgrid = document.getElementById('tech-tree');
    const linecontainer = document.getElementById('techlinecontainer');
    linecontainer.style.display = 'block';
    linecontainer.innerHTML = '';
    techgrid.innerHTML = '';

    const techelements = [];
    const descriptioncontainer = document.getElementById('techcontainer');
    descriptioncontainer.innerHTML = '';
    const destitle = document.createElement('h1');
    const cost = document.createElement('p');
    const tier = document.createElement('p');
    const points = document.createElement('p');
    const ifyears = document.createElement('p');
    const reserachbutton = document.createElement('button');

    points.innerHTML = 'Research Points:<br> ' + research_points;
    destitle.style.gridRow = '1';
    destitle.style.gridColumn = '2';
    points.style.gridRow = '1';
    points.style.gridColumn = '3';
    points.style.fontSize = '20px';
    points.id = 'research-points';
    cost.style.gridRow = '1';
    cost.style.gridColumn = '1';
    cost.style.fontSize = '20px';
    tier.style.gridRow = '1';
    tier.style.gridColumn = '1';
    tier.style.marginTop = 'auto';
    tier.style.fontSize = '20px';
    document.body.style.overflowY = 'scroll';
    const des = document.createElement('p');
    des.style.gridRow = '2';
    ifyears.style.gridRow = '2';
    ifyears.style.gridColumn = '2';
    reserachbutton.style.gridColumn = '3';
    reserachbutton.style.gridRow = '2';
    reserachbutton.style.maxWidth = '100px';
    reserachbutton.style.maxHeight = '40px';
    reserachbutton.hidden = true;
    des.style.gridColumn = '2';
    descriptioncontainer.className = 'techcontainer';
    descriptioncontainer.appendChild(cost);
    descriptioncontainer.appendChild(destitle);
    descriptioncontainer.appendChild(des);
    descriptioncontainer.appendChild(ifyears);
    descriptioncontainer.appendChild(reserachbutton);
    descriptioncontainer.appendChild(points);
    descriptioncontainer.appendChild(tier);

    techgrid.style.gridTemplateColumns = `1fr `.repeat(categories.length);
    techgrid.style.gridTemplateRows = `1fr `.repeat(tech.length);

    const techrect = techgrid.getBoundingClientRect();
    linecontainer.setAttribute('height', techrect.height);
    linecontainer.setAttribute('width', techrect.width);
    descriptioncontainer.addEventListener('mouseover', function () {
        descriptioncontainer.classList.add('hover');
    });
    descriptioncontainer.addEventListener('mouseout', function () {
        descriptioncontainer.classList.remove('hover');
    });

    techgrid.onclick = function () {
        if (!descriptioncontainer.classList.contains('hover')) {
            const techoptions = document.getElementsByClassName('techbutton');
            destitle.innerHTML = '';
            des.innerHTML = '';
            cost.innerHTML = '';
            tier.innerHTML = '';
            reserachbutton.hidden = true;
            let isimage = 0;
            for (const el of techoptions) {
                if (el.classList.contains('hover')) {
                    techclick.play();
                    el.style.border = '4px solid yellow';
                    const techindex = JSON.parse(el.id);
                    reserachbutton.hidden = false;
                    destitle.innerHTML = tech[techindex[0]][techindex[1]].name;
                    des.innerHTML = tech[techindex[0]][techindex[1]].description;

                    reserachbutton.innerHTML = 'Research';
                    if (
                        tech[techindex[0]][techindex[1]].tier <
                            tech[techindex[0]][techindex[1]].maxtier ||
                        tech[techindex[0]][techindex[1]].maxtier == -1
                    ) {
                        tier.innerHTML = `<strong> Tier: ${
                            tech[techindex[0]][techindex[1]].tier
                        }</strong>`;
                    } else {
                        tier.innerHTML = `<strong class= 'color-g'> Tier: ${
                            tech[techindex[0]][techindex[1]].tier
                        } (MAXED OUT)</strong>`;
                    }
                    cost.innerHTML = `<strong class = 'color-${
                        research_points >= tech[techindex[0]][techindex[1]].cost ? 'g' : 'r'
                    }'> Research cost: ${tech[techindex[0]][techindex[1]].cost}</strong>`;
                    reserachbutton.disabled = !(
                        research_points >= tech[techindex[0]][techindex[1]].cost &&
                        (tech[techindex[0]][techindex[1]].maxtier >
                            tech[techindex[0]][techindex[1]].tier ||
                            tech[techindex[0]][techindex[1]].maxtier == -1)
                    );
                    for (const el of tech[techindex[0]][techindex[1]].requires) {
                        if (tech[el[0]][el[1]].tier == 0) {
                            reserachbutton.disabled = true;
                            break;
                        }
                    }
                    switch (techindex[0]) {
                        case 0:
                            if (difficulty < 5) {
                                reserachbutton.disabled = true;
                                des.innerHTML =
                                    des.innerHTML +
                                    "<br><strong class = 'color-r'>Must be in Tribal Age</strong>";
                            }
                            break;
                        case 1:
                            if (difficulty < 10) {
                                reserachbutton.disabled = true;
                                des.innerHTML =
                                    des.innerHTML +
                                    "<br><strong class = 'color-r'>Must be in Pre-Diplomacy Age</strong>";
                            }
                            break;
                        case 2:
                            if (difficulty < 10) {
                                reserachbutton.disabled = true;
                                des.innerHTML =
                                    des.innerHTML +
                                    "<br><strong class = 'color-r'>Must be in Pre-Diplomacy Age</strong>";
                            }
                            break;
                        case 3:
                            if (difficulty < 40) {
                                reserachbutton.disabled = true;
                                des.innerHTML =
                                    des.innerHTML +
                                    "<br><strong class = 'color-r'>Must be in Post-Diplomacy Age</strong>";
                            }
                            break;
                        case 4:
                            if (difficulty < 40) {
                                reserachbutton.disabled = true;
                                des.innerHTML =
                                    des.innerHTML +
                                    "<br><strong class = 'color-r'>Must be in Post-Diplomacy Age</strong>";
                            }
                            break;
                        case 5:
                            if (difficulty < 40) {
                                reserachbutton.disabled = true;
                                des.innerHTML =
                                    des.innerHTML +
                                    "<br><strong class = 'color-r'>Must be in Post-Diplomacy Age</strong>";
                            }
                            break;
                    }
                    const whichimage = isimage;

                    reserachbutton.onclick = function () {
                        techbuy.play();
                        const success = document.createElement('h1');
                        success.className = 'status';
                        success.style.animation = 'none';
                        success.offsetHeight; /* trigger reflow */
                        success.style.animation = null;
                        document.body.appendChild(success);
                        success.innerHTML = "<strong class = 'color-g'>Tech Researched</strong>";
                        research_points -= tech[techindex[0]][techindex[1]].cost;
                        tech[techindex[0]][techindex[1]].effect();
                        tech[techindex[0]][techindex[1]].tier++;
                        document.getElementById('research-points').innerHTML =
                            'Research Points:<br> ' + research_points;
                        if (
                            tech[techindex[0]][techindex[1]].tier <
                                tech[techindex[0]][techindex[1]].maxtier ||
                            tech[techindex[0]][techindex[1]].maxtier == -1
                        ) {
                            tier.innerHTML = `<strong> Tier: ${
                                tech[techindex[0]][techindex[1]].tier
                            }</strong>`;
                        } else {
                            tier.innerHTML = `<strong class= 'color-g'> Tier: ${
                                tech[techindex[0]][techindex[1]].tier
                            } (MAXED OUT)</strong>`;
                        }

                        tech[techindex[0]][techindex[1]].unlocked = true;
                        destitle.innerHTML = tech[techindex[0]][techindex[1]].name;
                        des.innerHTML = tech[techindex[0]][techindex[1]].description;

                        techelements[whichimage].image.style.filter = 'brightness(100%)';
                        cost.innerHTML = `<strong class = 'color-${
                            research_points >= tech[techindex[0]][techindex[1]].cost ? 'g' : 'r'
                        }'> Research cost: ${tech[techindex[0]][techindex[1]].cost}</strong>`;

                        reserachbutton.disabled = !(
                            research_points >= tech[techindex[0]][techindex[1]].cost &&
                            (tech[techindex[0]][techindex[1]].maxtier >
                                tech[techindex[0]][techindex[1]].tier ||
                                tech[techindex[0]][techindex[1]].maxtier == -1)
                        );
                        success.style.animation = 'done 2s linear 0s 1 normal forwards';

                        displayUI();
                        for (
                            let i = 0;
                            i < document.getElementsByClassName('warning-box').length;
                            i++
                        ) {
                            document.getElementsByClassName('warning-box')[i].style.display =
                                'none';
                        }
                        document.getElementById('boss_health_container').style.display = 'none';
                        setTimeout(function () {
                            success.remove();
                        }, 2000);
                    };
                } else {
                    el.style.border = '4px solid black';
                }
                isimage++;
            }
        }
    };
    for (let i = 0, len = tech.length; i < len; i++) {
        for (let j = 0, leng = tech[i].length; j < leng; j++) {
            const techoption = document.createElement('button');
            techoption.style.gridRow = i + 1;
            techoption.style.gridColumn = categories.indexOf(tech[i][j].category) + 1;
            techoption.className = 'techbutton';
            techoption.id = JSON.stringify([i, j]);
            const image = document.createElement('img');
            techoption.addEventListener('mouseover', function () {
                techoption.classList.add('hover');
            });
            techoption.addEventListener('mouseout', function () {
                techoption.classList.remove('hover');
            });
            if (tech[i][j].tier >= 1) {
                image.style.filter = 'brightness(100%)';
            } else {
                image.style.filter = 'brightness(30%)';
            }
            techgrid.appendChild(techoption);

            image.src = tech[i][j].image;

            image.style.width = '30px';
            image.style.height = '30px';
            image.style.position = 'relative';
            image.style.bottom = '0.5px';
            image.style.right = '1px';
            techoption.appendChild(image);

            for (const el of tech[i][j].requires) {
                let techelement = null;

                for (const teposition of techelements) {
                    if (
                        el[0] == teposition.techposition[0] &&
                        el[1] == teposition.techposition[1]
                    ) {
                        techelement = teposition;
                    }
                }

                const techline = document.createElementNS('http://www.w3.org/2000/svg', 'line');

                const thisposition = techoption.getBoundingClientRect();
                const thatposition = techelement.element.getBoundingClientRect();

                const screenOffsetY = techgrid.getBoundingClientRect().top;
                const screenOffsetX = techgrid.getBoundingClientRect().left;

                techline.setAttribute('x1', thisposition.x + 17.5 - screenOffsetX);
                techline.setAttribute('y1', thisposition.y + 17.5 - screenOffsetY);
                techline.setAttribute('x2', thatposition.x + 17.5 - screenOffsetX);
                techline.setAttribute('y2', thatposition.y + 17.5 - screenOffsetY);
                techline.style.stroke = 'black';
                techline.style.strokeWidth = '2';
                linecontainer.append(techline);
            }
            techelements.push({
                image: image,
                element: techoption,
                techposition: [i, j],
            });
        }
    }
}

function savegame(bindex) {
    confirmation[0].choosetext(bindex);
    displaypopup(0, confirmation);
}
function save(bindex) {
    window.onbeforeunload = null;

    const localtier = [];
    for (const un of tech) {
        for (const unn of un) {
            localtier.push({ tier: unn.tier, description: unn.description });
        }
    }
    for (const k of kingdoms) {
        k.borders = Array.from(k.borders);
    }
    localStorage.setItem('kingdoms' + bindex, JSON.stringify(kingdoms));

    for (const k of kingdoms) {
        k.borders = new Set(k.borders);
    }
    save_slot = bindex;
    const localmarketstats = [];
    for (const item of m.marketselections) {
        localmarketstats.push({
            price: item.price,
            amountincrease: item.amountincrease,
            stock: item.stock,
        });
    }
    localStorage.setItem(
        'griditems' + bindex,
        JSON.stringify({
            grid,
            buildstats,
            roadgrid,
            gridstats,
            tilestats,
            loadedchunks,
            sutibleRaiderSpawns: Array.from(sutibleRaiderSpawns),
            playerBorders: Array.from(playerBorders),
        })
    );
    localStorage.setItem(
        'scrollinfo' + bindex,
        JSON.stringify([scrollX, scrollY, spawnX, spawnY, max])
    );
    localStorage.setItem(
        'pstats' + bindex,
        JSON.stringify({
            localtier,
            siege,
            weathermod,
            cities: p.cities,
            wars,
            megatemple,
            xp,
            armyGroups,
            divisions,
            totalxp,
            techstats,
            research_points,
            difficultymultiplier,
            unlocked,
            luck,
            buildingamounts,
            temporaryeffects,
            reputation,
            difficulty,
            modifiers,
            buildingModifiers,
            currentpop,
            military,
            resources,
            outofrange,
        })
    );
    localStorage.setItem('slot' + bindex, JSON.stringify(save_slot));
    localStorage.setItem(
        'marketmod' + bindex,
        JSON.stringify([
            m.assissin,
            m.spy,
            m.rebel,
            m.phase,
            m.bhealth,
            m.totalbhealth,
            m.scout,
            m.shield,
        ])
    );
    localStorage.setItem('marketstats' + bindex, JSON.stringify(localmarketstats));
    localStorage.setItem('marketitems' + bindex, JSON.stringify(marketitems));

    document.getElementById('save-flex').style.display = 'none';
    start();
}
function load(bindex) {
    buildingamounts.length = 0;
    tilestats = {};
    grid.length = 0;
    marketitems.length = 0;
    unlocked.length = 0;
    wars.length = 0;
    kingdoms.length = 0;
    playerBorders.clear();
    p.cities.length = 0;
    const griditems = JSON.parse(localStorage.getItem('griditems' + bindex));
    for (const el of griditems.grid) {
        grid.push(el);
    }
    const localmarketstats = JSON.parse(localStorage.getItem('marketstats' + bindex));
    for (let i = 0; i < m.marketselections.length; i++) {
        m.marketselections[i].price = localmarketstats[i].price;
        m.marketselections[i].amountincrease = localmarketstats[i].amountincrease;
        m.marketselections[i].stock = localmarketstats[i].stock;
    }
    const localscrolldata = JSON.parse(localStorage.getItem('scrollinfo' + bindex));
    const pstats = JSON.parse(localStorage.getItem('pstats' + bindex));
    resources = pstats.resources;
    weathermod = pstats.weathermod;
    currentpop = pstats.currentpop;
    reputation = pstats.reputation;
    xp = pstats.xp;
    totalxp = pstats.totalxp;
    siege = pstats.siege;
    megatemple = pstats.megatemple;
    outofrange = pstats.outofrange;
    playerBorders = new Set(griditems.playerBorders);
    sutibleRaiderSpawns = new Set(griditems.sutibleRaiderSpawns);
    const localKingdoms = JSON.parse(localStorage.getItem('kingdoms' + bindex));
    for (const k of localKingdoms) {
        kingdoms.push(k);
    }
    for (const k of kingdoms) {
        ctx4.fillStyle = `rgba(${k.fillColor.r}, ${k.fillColor.g}, ${k.fillColor.b}, 0.7)`;

        for (const b of k.borders) {
            const pos = tiledecode(b);
            ctx4.fillRect(pos.x, pos.y, 1, 1);
        }
        k.borders = new Set(k.borders);
    }
    for (const p of playerBorders) {
        ctx5.fillStyle = 'rgba(0,0,255,0.7)';
        ctx5.fillRect(tiledecode(p).x, tiledecode(p).y, 1, 1);
    }
    for (const d of pstats.divisions) {
        divisions.push(d);
    }
    for (const war of pstats.wars) {
        wars.push(war);
    }
    for (const obj in pstats.techstats) {
        techstats[obj] = pstats.techstats[obj];
    }

    for (const obj in griditems.roadgrid) {
        roadgrid[obj] = griditems.roadgrid[obj];
    }

    i = 0;
    for (const un of tech) {
        for (const unn of un) {
            unn.tier = pstats.localtier[i].tier;

            unn.description = pstats.localtier[i].description;
            i += 1;
        }
    }
    for (const l of griditems.loadedchunks) {
        loadedchunks.push(l);
    }
    research_points = pstats.research_points;
    armyGroups = pstats.armyGroups;

    const localmod = pstats.modifiers;
    for (const el of pstats.temporaryeffects) {
        temporaryeffects.push(el);
    }
    save_slot = JSON.parse(localStorage.getItem('slot' + bindex));
    difficulty = pstats.difficulty;
    for (const increa in pstats.cities) {
        p.cities[increa] = pstats.cities[increa];
    }
    difficultymultiplier = pstats.difficultymultiplier;
    for (const el of pstats.buildingamounts) {
        buildingamounts.push(el);
    }
    i = 0;
    for (const el of pstats.unlocked) {
        unlocked.push(el);
        p.pieceROM[i].unlocked = el;
        i++;
    }
    for (const el of JSON.parse(localStorage.getItem('marketitems' + bindex))) {
        marketitems.push(el);
    }
    tilestats = griditems.tilestats;
    buildstats = griditems.buildstats;
    gridstats = griditems.gridstats;
    for (const tile in tilestats) {
        const tilePos = tiledecode(tile);
        ctx3.fillStyle = tiles[tilestats[tile]].color;
        ctx3.fillRect(tilePos.x, tilePos.y, 1, 1);
    }
    luck = JSON.parse(localStorage.getItem('luck' + bindex));
    weathermod = Math.sin(difficulty / 3) / 10;
    if (weathermod > 0.05) {
        weather = 1;
    } else if (weathermod < -0.05) {
        weather = 2;
    } else if (Math.random() > 0.95) {
        weather = 3;
    } else {
        weather = 0;
    }
    animloop();
    const localmarketmod = JSON.parse(localStorage.getItem('marketmod' + bindex));
    m.assissin = localmarketmod[0];
    m.spy = localmarketmod[1];
    m.rebel = localmarketmod[2];
    m.phase = localmarketmod[3];
    m.bhealth = localmarketmod[4];
    m.totalbhealth = localmarketmod[5];
    m.scout = localmarketmod[6];
    m.shield = localmarketmod[7];
    if (m.phase > 0) {
        m.marketselections[m.marketselections.length - 1].stock = 0;
    }
    spawnX = localscrolldata[2];
    spawnY = localscrolldata[3];
    scrollX = localscrolldata[0];
    scrollY = localscrolldata[1];
    max.up = localscrolldata[4].up;
    max.down = localscrolldata[4].down;
    max.left = localscrolldata[4].left;
    max.right = localscrolldata[4].right;

    if (Object.keys(gridstats).length > 0 || Object.keys(roadgrid).length > 0) {
        first_turn = false;
    }
    modifiers.food = localmod.food;
    modifiers.population = localmod.population;
    modifiers.resources = localmod.resources;
    modifiers.military = localmod.military;
    buildingModifiers = pstats.buildingModifiers;
    document.getElementById('year_label').innerHTML = 'Year: ' + difficulty;
    displaytab();
    displayUI();

    start();
}
function newgame(difficult) {
    ctx4.clearRect(0, 0, 5000, 5000);
    window.onbeforeunload = function () {
        return 'hi';
    };
    for (const stat in techstats) {
        if (typeof techstats[stat] === 'boolean') {
            techstats[stat] = false;
        } else {
            techstats[stat] = 0;
        }
    }
    for (let i = 0; i < tech.length; i++) {
        for (j = 0; j < tech[i].length; j++) {
            tech[i][j].tier = 0;
        }
    }
    armyGroups = ['none'];
    divisions.length = 0;
    gridstats = {};
    tilestats = {};
    grid.length = 0;
    weathermod = 0;
    weather = 0;
    wars.length = 0;
    displaytab();
    temporaryeffects.length = 0;
    buildingamounts.length = 0;
    punishamount = 0;
    spawnX = getRandomInt(100, 300);
    spawnY = getRandomInt(100, 300);
    scrollX = spawnX;
    scrollY = spawnY;
    difficulty = 0;
    repairbreakamount = 0;
    infovisits = 0;
    diplomacylearned = 0;
    megatempletimer = 5;
    bosstimer = -1;
    for (let i = 0; i < tech.length; i++) {
        for (let j = 0; j < tech[i].length; j++) {
            tech[i][j].description = defreset[i][j];
        }
    }
    for (let i = 0, len = p.pieceROM.length; i < len; i++) {
        unlocked[i] = reset[i];
        p.pieceROM[i].unlocked = reset[i];
    }
    for (let i = 0; i < p.pieceROM.length; i++) {
        buildingamounts.push(0);
    }
    modifiers = {
        population: 0,
        food: 15 - difficult * 10,
        resources: 15 - difficult * 10,
        military: 0,
    };
    first_turn = true;
    save_slot = null;
    resources = 10 + (difficult <= 2 ? 2 : 0);
    difficulty = 0;
    difficultymultiplier = difficult;
    currentpop = 2;
    unemployed = 2;
    military = 0;
    xp = 0;
    totalxp = 50;
    tilestats = {};
    p.cities.length = 0;
    m.assissin = 0;
    m.spy = 0;
    m.rebel = 0;
    m.phase = 0;
    m.bhealth = 0;
    m.totalbhealth = 0;
    m.scout = false;
    m.shield = 0;
    grid.length = 0;
    gridstats = {};
    seed = Math.random() * 10 ** 20;
    perlin = new Perlin(nodes[0], nodes[0], seed);
    perlin2 = new Perlin(nodes[1], nodes[1], seed + 1);
    perlin3 = new Perlin(nodes[2], nodes[2], seed + 2);
    perlin4 = new Perlin(nodes[3], nodes[3], seed + 3);
    perlin5 = new Perlin(nodes[4], nodes[4], seed + 4);
    perlin6 = new Perlin(nodes[5], nodes[5], seed + 5);
    perlin7 = new Perlin(nodes[6], nodes[6], seed + 6);
    perlin8 = new Perlin(nodes[7], nodes[7], seed + 7);
    perlin9 = new Perlin(nodes[5], nodes[5], seed + 8);
    perlin10 = new Perlin(nodes[6], nodes[6], seed + 9);
    perlin11 = new Perlin(nodes[7], nodes[7], seed + 10);
    perlin12 = new Perlin(nodes[8], nodes[8], seed + 11);
    perlin13 = new Perlin(nodes[9], nodes[9], seed + 12);
    perlin14 = new Perlin(nodes[10], nodes[10], seed + 13);
    perlin15 = new Perlin(nodes[11], nodes[11], seed + 14);
    perlin16 = new Perlin(nodes[12], nodes[12], seed + 15);
    perlin17 = new Perlin(nodes[12], nodes[12], seed + 16);
    perlin18 = new Perlin(nodes[13], nodes[13], seed + 17);
    generaterivers();

    for (let i = Math.floor(scrollY / 50) - 2; i < Math.ceil((scrollY + heightmax) / 50) + 2; i++) {
        for (
            let j = Math.floor(scrollX / 50) - 2;
            j < Math.ceil((scrollX + widthmax) / 50) + 2;
            j++
        ) {
            if (!loadedchunks.includes(tilecode(j, i))) {
                rerenderchunks(j * 50, i * 50, true);
            }
        }
    }
    for (let i = 0; i < 500; i += 40) {
        for (let j = 0; j < 500; j += 40) {
            if (getHeight(i, j) > 0.02) {
                sutibleRaiderSpawns.add(tilecode(i, j));
            }
        }
    }
    const randIndex = getRandomInt(0, sutibleSpawns.length - 1);
    kingdoms.push(new kingdom(generateWord(dataObj), sutibleSpawns[randIndex]));
    sutibleSpawns.splice(randIndex);
    ctx2.clearRect(0, 0, screen.width, screen.height);

    for (let i = 0; i < 500; i++) {
        grid.push([]);
    }

    if (psettings.notutorial) {
        displayUI();

        start();
    } else {
        displaypopup(3, confirmation);
    }
    render();
    document.getElementById('year_label').innerHTML = 'Year: ' + difficulty;
}
function uniqueNumber() {
    var date = Date.now();

    // If created at same millisecond as previous
    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date - 1704052542615;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min)) + min;
}
function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
}
function cropDecimal(num, fixed) {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}
function shorten(number) {
    if (number.toString().includes('e')) {
        return number;
    }
    let numlength = Math.floor(JSON.stringify(Math.floor(Math.abs(number) / 10)).length / 3);
    let returnnum = number / 10 ** (numlength * 3);
    let endsymbol = '';
    switch (numlength) {
        case 0:
            break;
        case 1:
            endsymbol = 'k';
            break;
        case 2:
            endsymbol = 'm';
            break;
        case 3:
            endsymbol = 'b';
            break;
        case 4:
            endsymbol = 't';
            break;
        case 5:
            endsymbol = 'Qa';
            break;
        case 6:
            endsymbol = 'Qi';
            break;
        case 7:
            endsymbol = 'Sx';
            break;
    }

    returnnum = cropDecimal(returnnum, 2);

    while (returnnum.includes('.') && returnnum[returnnum.length - 1] === '0') {
        returnnum = returnnum.slice(0, returnnum.length - 1);
    }
    if (returnnum[returnnum.length - 1] == '.') {
        returnnum = returnnum.slice(0, returnnum.length - 1);
    }
    return returnnum + endsymbol;
}
function start() {
    battling = false;
    tech_music.pause();
    if (m.phase > 1) {
        boss_music.play();
        war_music.pause();
        build_music.pause();
    } else if (wars.length > 0) {
        build_music.pause();
        boss_music.pause();
        war_music.play();
    } else {
        build_music.play();
        boss_music.pause();
        war_music.pause();
    }
    market_music.pause();
    if (istutorial) {
        disableinfo = tutorialindex < 14;
    } else {
        disableinfo = false;
    }

    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    document.getElementById('tech-tree-container').style.display = 'none';
    if (m.phase > 1 || wars.length > 0) {
        document.getElementById('boss_health_container').style.display = 'block';
    }
    document.getElementById('difficulty-flex').style.display = 'none';
    document.getElementById('settings-flex').style.display = 'none';
    document.getElementById('info').style.display = 'none';
    document.getElementById('achievement-flex').style.display = 'none';
    document.getElementById('back_button').hidden = true;
    document.getElementById('startBattle').hidden = true;

    document.getElementById('techlinecontainer').style.display = 'none';
    document.getElementById('title_start').style.display = 'none';
    document.getElementById('stats').style.display = 'flex';
    document.getElementById('start-flex').style.display = 'none';
    document.getElementById('market-flex').style.display = 'none';
    document.getElementById('save-flex').style.display = 'none';
    document.getElementById('select-grid').style.display = 'flex';
    document.getElementById('divisionsFlex').style.display = 'none';
    document.getElementById('bar').style.display = 'none';
    document.getElementById('placeGrid').style.display = 'none';
    canvas.style.display = 'block';
    canvas2.style.display = 'block';
    displayUI();
    document.getElementById('boss_healthg').style.transition = '0s';
    document.getElementById('boss_healthg').style.width =
        document.getElementById('boss_health').style.width;
    document.getElementById('boss_healthg').style.transition = 'all 1s ease-out';
    render();

    if (istutorial && tutorialindex == 0) {
        continuetutorial(0);
    }
}
function move(x, y) {
    scrollX += x;
    scrollY += y;
    for (let i = Math.floor(scrollY / 50); i < Math.ceil((scrollY + heightmax) / 50); i++) {
        for (let j = Math.floor(scrollX / 50); j < Math.ceil((scrollX + widthmax) / 50); j++) {
            if (!loadedchunks.includes(tilecode(j, i))) {
                rerenderchunks(j * 50, i * 50);
            }
        }
    }
    render();
}
