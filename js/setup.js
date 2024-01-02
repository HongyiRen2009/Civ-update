class division {
    constructor(type, power) {
        this.type = type;
        this.power = power;
        this.index = divisions.length + 1;
        this.armor = 0;
        this.weapons = 0;
        this.level = 0;
        this.xp = 0;
        this.armyGroup = 'none';
        this.placed = false;
    }
}
const nodes = [10, 20, 60, 120, 240, 10, 50, 100, 50, 100, 10, 20, 40, 160];
const sutibleSpawns = [];
const raiderSpawnsThatCanAttack = [];
let perlin;
let perlin2;
let perlin3;
let perlin4;
let perlin5;
let perlin6;
let perlin7;
let perlin8;
let perlin9;
let perlin10;
let perlin11;
let perlin12;
let perlin13;
let perlin14;
let perlin15;
let perlin16;
let perlin17;
let perlin18;
let seed;
let trainingXp = 0;
let armyGroups = ['none'];
const divisionLevelToTitle = [
    'Conscript',
    'Imperial',
    'Imperial Trained',
    'Veteren',
    'Veteren Elite',
];
const divisionTypeToTitle = { I: 'Infantrymen', A: 'Archer', C: 'Horseman' };
const canvas = document.querySelector('canvas');
canvas.height = screen.height * 0.88;
canvas.width = screen.width;
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const canvas4 = document.getElementById('canvas4');
const canvas5 = document.getElementById('canvas5');
canvas3.style.display = 'none';
canvas4.style.display = 'none';
canvas5.style.display = 'none';
canvas2.height = screen.height * 0.88;
canvas2.width = screen.width;
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
const ctx4 = canvas4.getContext('2d');
const ctx5 = canvas5.getContext('2d');
let zoom = 20;
const canvasrect = canvas.getBoundingClientRect();
canvas2.style.left = canvasrect.left;
canvas2.style.right = canvasrect.right;
canvas2.style.top = canvasrect.top;
canvas2.style.bottom = canvasrect.bottom;
let heightmax = Math.round((screen.height * 0.88) / zoom);
let widthmax = Math.round(screen.width / zoom);
let maxPersonnel = 0;
const divisions = [];
let tilestats = {};
const max = {
    up: -40,
    down: 40,
    left: -40,
    right: 40,
};
const grid = [];
const tabs = ['Housing', 'Farms', 'Military', 'Mines', 'Misc'];
let gridstats = {};
let buildstats = {};
const wars = [];
const psettings = {
    noimage: false,
    nofade: false,
    arrowkeys: false,
    notutorial: false,
    noflash: false,
    alternateMusic: false,
    noweather: false,
    autosave: false,
};
if (localStorage.getItem('settings') == null) {
    localStorage.setItem('settings', JSON.stringify(psettings));
} else {
    const localsettings = JSON.parse(localStorage.getItem('settings'));
    const ele = document.getElementsByClassName('sc-gJwTLC ikxBAC');
    let el = 0;
    for (const se in psettings) {
        if (localsettings[se] == undefined) {
            localsettings[se] = false;
        }
        psettings[se] = localsettings[se];
        if (psettings[se] == false) {
            ele[el].checked = false;
        } else {
            ele[el].checked = true;
        }
        el++;
    }
}
class kingdom {
    constructor(name, startPos) {
        this.resources = getRandomInt(10, 14);
        this.food = 1;
        this.currentpop = getRandomInt(2, 4);
        this.cities = [{ x: startPos.x, y: startPos.y, name: generateWord(dataObj) }];
        this.borders = new Set([tilecode(startPos.x, startPos.y)]);
        this.fillColor = {
            r: getRandomInt(100, 255),
            g: getRandomInt(100, 255),
            b: getRandomInt(100, 255),
        };

        this.edgeBorders = [
            { x: startPos.x + 1, y: startPos.y },
            { x: startPos.x - 1, y: startPos.y },
            { x: startPos.x, y: startPos.y + 1 },
            { x: startPos.x, y: startPos.y - 1 },
        ];
        this.name = name;
        this.resourcesgained = 0;
        this.traits = {
            risk: getRandomInt(3, 7),
        };
        rerenderchunks(startPos.x, startPos.y);
        ctx4.fillStyle = `rgba(${this.fillColor.r},${this.fillColor.g},${this.fillColor.b},0.7)`;
        ctx4.fillRect(startPos.x, startPos.y, 1, 1);
    }
    nextTurn() {
        this.currentpop += Math.max(
            -2 - Math.ceil(this.currentpop / 5),
            Math.min(1 + Math.ceil(this.currentpop / 5), this.food - this.currentpop)
        );
        this.resources += this.resourcesgained;
        let randIndex = 0;
        let randBorder = this.edgeBorders[randIndex];
        let chosenTile = {
            x: randBorder.x,
            y: randBorder.y,
        };
        let attempts = 0;
        let expansionTimes = Math.ceil(((this.resources / 4) * this.traits.risk) / 10);
        this.resources -= expansionTimes * 4;
        for (let i = 0; i < expansionTimes; i++) {
            randIndex = 0;
            randBorder = this.edgeBorders[randIndex];
            chosenTile = {
                x: randBorder.x,
                y: randBorder.y,
            };
            attempts = 0;
            while (
                (tilestats[tilecode(chosenTile.x, chosenTile.y)] == undefined ||
                    tilestats[tilecode(chosenTile.x, chosenTile.y)] == 4 ||
                    hasBorder(chosenTile)) &&
                attempts < 30
            ) {
                this.edgeBorders.splice(randIndex, 1);
                randIndex = 0;
                randBorder = this.edgeBorders[randIndex];
                chosenTile = {
                    x: randBorder.x,
                    y: randBorder.y,
                };
                attempts++;
            }
            if (attempts < 30) {
                if (this.resourcesgained > this.food) {
                    this.food++;
                } else {
                    this.resourcesgained++;
                }
                this.edgeBorders.push({ x: chosenTile.x + 1, y: chosenTile.y });
                this.edgeBorders.push({ x: chosenTile.x - 1, y: chosenTile.y });
                this.edgeBorders.push({ x: chosenTile.x, y: chosenTile.y + 1 });
                this.edgeBorders.push({ x: chosenTile.x, y: chosenTile.y - 1 });
                this.borders.add(tilecode(chosenTile.x, chosenTile.y));
                sutibleRaiderSpawns.delete(tilecode(chosenTile.x, chosenTile.y));
                ctx4.fillStyle = `rgba(${this.fillColor.r},${this.fillColor.g},${this.fillColor.b},0.7)`;
                ctx4.fillRect(chosenTile.x, chosenTile.y, 1, 1);
                let minCity = this.cities[0];
                for (const city of this.cities) {
                    if (
                        distance(minCity.x, minCity.y, chosenTile.x, chosenTile.y) >
                        distance(city.x, city.y, chosenTile.x, chosenTile.y)
                    ) {
                        minCity = city;
                    }
                }
                if (distance(minCity.x, minCity.y, chosenTile.x, chosenTile.y) > 32) {
                    this.cities.push({
                        x: chosenTile.x,
                        y: chosenTile.y,
                        name: generateWord(dataObj),
                    });
                }
            }
        }
    }
}
class army {
    constructor(x, y, power, type, side, bType = 'none', targetCoord = '0/0') {
        this.power = power;
        this.x = x;
        this.y = y;
        this.direction = 0;
        this.destination = [];
        this.speed = 5 + (type == 'C' ? 7 : 0) + (type == 'I' ? 2 : 0);
        this.selected = false;
        this.animationTime = -6;
        this.target = null;
        this.index = 0;
        this.arrowCoolDown = 0;
        this.type = type;
        this.targetRotation = 0;
        this.side = side;
        this.battleType = bType;
        this.status = 'default';
        this.targetCoord = tiledecode(targetCoord);
        this.isRaiding = true;
        this.targetCoord.x *= 20;
        this.targetCoord.y *= 20;
        this.priority = 3;
        this.calveryStun = 0;
        this.waterTimer = 0;
        this.command = 'A';
        if (side == 'red') {
            redTotalPower += power;
        } else {
            blueTotalPower += power;
        }
    }
    getDistance(x, y) {
        return Math.hypot(this.x - x, this.y - y);
    }
}
class arrow {
    constructor(x, y, direction, damage, landingSpot, side) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.direction = direction;
        this.landingSpot = landingSpot;
        this.startPos = { x, y };
        this.ticks = 0;
        this.side = side;
    }
}
const armyInfo = [];
let currentArmyGroup = '';
const placedTiles = new Set();
let sutibleRaiderSpawns = new Set();
let playerBorders = new Set();
let isPlacingArmies = false;
let placeStartPos = { x: 0, y: 0 };
let armyChosen = null;
let isPlacing = false;
const currentDivisions = [];
const kingdoms = [];
const placingArmies = [];
let armiesChosen = [];
let startingPlace = {};
const redArmies = [];
const blueArmies = [];
const arrows = [];
let mousePos = { x: 0, y: 0 };
let oldMousePos = { x: 0, y: 0 };
let startingScroll = {};
let rotationAmount = 0;
let armyScrollX = 0;
let armyScrollY = 0;
let drawingLine = false;
let tightnessX = 0;
let tightnessY = 0;
const startDistance = 1000;
let armyZoom = 1;
let drawingRectangle = false;
const gridArmies = {};
ctx.imageSmoothingEnabled = false;
let raidProgress = 0;
let isSelecting = false;
let redTotalPower = 0;
let blueTotalPower = 0;
let redPower = 0;
let bluePower = 0;
let armyStartPower = 2000;
let weather = 0; //1 is rain, 2 is hail, 3 is snow
let raintimer = 10;
let scrollX = 250;
const oldposition = {};
let scrollY = 250;
let spawnX = 0;
let spawnY = 0;
let ispainting = false;
let siege = false;
let repairing = false;
let position = {};
let letter = '';
let piece = [];
let population = 0;
let difference = 0;
let m_personnel = 0;
let food = 0;
let resources = 8;
let research_points = 0;
let resourcesgained = 0;
let p_index = 0;
let battling = false;
let megatemple = 0;
let repairbreakamount = 0;
let infovisits = 0;
let diplomacylearned = 0;
let megatempletimer = 5;
let bosstimer = -1;
let defreset = [];
let modifiers = {
    population: 0,
    food: 0,
    resources: 0,
    military: 0,
};
let buildingModifiers = { population: 0, food: 0, resources: 0, military: 0 };
const marketitems = [];
let tab = 'Housing';
let punishamount = 0;
let allowed = true;
let military = 0;
let currentpop = 2;
const click = new Audio('sounds/click.mp3');
let build_music = new Audio(
    `music/${psettings.alternateMusic ? 'Alternate_music.mp3' : 'Build_music.mp3'}`
);
const market_music = new Audio('music/Market_music.mp3');
const boss_music = new Audio('music/Boss_music.mp3');
const kaching = new Audio('sounds/Purchase.mp3');
const breaksound = new Audio('sounds/remove.mp3');
const repairsound = new Audio('sounds/repair.mp3');
const techclick = new Audio('sounds/techclick.mp3');
const techbuy = new Audio('sounds/techbuy.mp3');
const tech_music = new Audio('music/tech_music.mp3');
const war_music = new Audio('music/War_music.mp3');
const buildimg = document.getElementById('cloudimg');
const buildimg2 = document.getElementById('cloudimg2');
const buildimg3 = document.getElementById('cloudimg3');
market_music.loop = true;
build_music.loop = true;
boss_music.loop = true;
tech_music.loop = true;
war_music.loop = true;
let istutorial = false;
let tutorialindex = 0;
let disableinfo = false;
let unemployed = 2;
let xp = 0;
let totalxp = 50;
let difficulty = 0;
let first_turn = true;
let removing = false;
let luck = 0;

let outofrange = 0;

let reputation = 0;
let save_slot = null;
let difficultymultiplier = 0;
const choicesdisabled = [];
const buildingamounts = [];
const unlocked = [];
const reset = [];
const roadgrid = {};
const temporaryeffects = [];
const loadedchunks = [];
document.getElementById('noimage').addEventListener('change', () => {
    if (document.getElementById('noimage').checked) {
        psettings.noimage = true;
    } else {
        psettings.noimage = false;
    }
    change_settings(noimage);
});
document.getElementById('nofade').addEventListener('change', () => {
    if (document.getElementById('nofade').checked) {
        psettings.nofade = true;
    } else {
        psettings.nofade = false;
    }
    change_settings(nofade);
});
document.getElementById('arrowkeys').addEventListener('change', () => {
    if (document.getElementById('arrowkeys').checked) {
        psettings.arrowkeys = true;
    } else {
        psettings.arrowkeys = false;
    }
    change_settings(arrowkeys);
});
document.getElementById('notutorial').addEventListener('change', () => {
    if (document.getElementById('notutorial').checked) {
        psettings.notutorial = true;
    } else {
        psettings.notutorial = false;
    }
    change_settings(notutorial);
});
document.getElementById('noflash').addEventListener('change', () => {
    if (document.getElementById('noflash').checked) {
        psettings.noflash = true;
    } else {
        psettings.noflash = false;
    }
    change_settings(noflash);
});
document.getElementById('alternateMusic').addEventListener('change', () => {
    if (document.getElementById('alternateMusic').checked) {
        psettings.alternateMusic = true;
        build_music.pause();
        build_music.src = `music/Alternate_music.mp3`;
        build_music.play();
    } else {
        psettings.alternateMusic = false;
        build_music.pause();
        build_music.src = `music/Build_music.mp3`;
        build_music.play();
    }
    change_settings(alternateMusic);
});
document.getElementById('noweather').addEventListener('change', () => {
    if (document.getElementById('noweather').checked) {
        psettings.noweather = true;
    } else {
        psettings.noweather = false;
    }
    change_settings(noweather);
    ctx2.clearRect(0, 0, screen.width, screen.height);
});
document.getElementById('autosave').addEventListener('change', () => {
    if (document.getElementById('autosave').checked) {
        psettings.autosave = true;
    } else {
        psettings.autosave = false;
    }
    change_settings(autosave);
});
function change_settings(setting) {
    localStorage.setItem('settings', JSON.stringify(psettings));
}
function changefont() {
    if (!psettings.noserif) {
        document.body.style.fontFamily = 'Roboto Slab';
        const buttons = document.getElementsByTagName('button');

        for (const b of buttons) {
            b.style.fontFamily = 'Roboto Slab';
        }
        const sele = document.getElementsByTagName('select');
        for (const se of sele) {
            se.style.fontFamily = 'Roboto Slab';
        }
        return;
    }
    document.body.style.fontFamily = 'Arial';
    const buttons = document.getElementsByTagName('button');

    for (const b of buttons) {
        b.style.fontFamily = 'Arial';
    }
    const sele = document.getElementsByTagName('select');
    for (const se of sele) {
        se.style.fontFamily = 'Arial';
    }
}
function switchtab() {
    tab = document.getElementById('taboption').value;
    displaytab();
}
for (i = tabs.length - 1; i >= 0; i--) {
    const taboption = document.createElement('option');
    taboption.innerHTML = tabs[i];

    document.getElementById('taboption').appendChild(taboption);
    if (i == 0) {
        taboption.selected = true;
    }
}
const ele = document.getElementsByClassName('setting_slider');

for (const el of ele) {
    const min = el.min;
    const max = el.max;
    const value = el.value;
    el.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${
        ((value - min) / (max - min)) * 100
    }%, gray ${((value - min) / (max - min)) * 100}%, gray 100%)`;

    el.oninput = function () {
        if (el.id == 'music') {
            build_music.volume = el.value * 0.01;
            tech_music.volume = el.value * 0.01;
            market_music.volume = el.value * 0.01;
            boss_music.volume = el.value * 0.01;
            war_music.volume = el.value * 0.01;
        } else if ((el.id = 'sound')) {
            click.volume = el.value * 0.01;
            techbuy.volume = el.value * 0.01;
            techclick.volume = el.value * 0.01;
            kaching.volume = el.value * 0.01;
            breaksound.volume = el.value * 0.01;
            repairsound.volume = el.value * 0.01;
        }
        this.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${
            ((this.value - this.min) / (this.max - this.min)) * 100
        }%, gray ${((this.value - this.min) / (this.max - this.min)) * 100}%, gray 100%)`;
    };
}
// enable/disable devtools
const devmode = true;
