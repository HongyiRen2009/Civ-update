const p = {
    pieceROM: [
        {
            name: 'Canopy',
            letter: 'C',
            description:
                'A small unit of housing that houses 1 person. Requires 1 resource to construct',
            piecepositions: [{ x: 0, y: 0, img: { dx: 65, dy: 85 } }],
            tab: 'Housing',
            unlocked: true,
            near: 'building',
            amountbought: 0,

            effect() {
                this.amountbought++;
                p.population = 1;
                resources -= 1;
            },

            requires() {
                return resources >= 1;
            },
        },
        {
            name: 'Hut',
            letter: 'H',
            description:
                'A medium unit of housing that houses 6 people. Requires 5 resources to construct',
            piecepositions: [{ x: 0, y: 0, img: { dx: 65, dy: 106 } }],
            unlocked: true,
            near: 'building',
            effect() {
                p.population = 6;
                resources -= 5 + Math.ceil(3 * techstats.eff_infra);
            },
            tab: 'Housing',
            requires() {
                return resources >= 5 - Math.ceil(3 * techstats.eff_infra);
            },
        },
        {
            name: 'Townhouse',
            letter: 'TH',
            description:
                'A house for many people. Houses 20 people and requires 10 resources to construct',
            piecepositions: [
                { x: 0, y: 0, img: { dx: 1, dy: 148 } },
                { x: 1, y: 0, img: { dx: 22, dy: 148 } },
            ],
            unlocked: false,
            near: 'building',
            effect() {
                p.population = 20;
                resources -= 10 + Math.ceil(3 * techstats.eff_infra);
            },
            tab: 'Housing',
            requires() {
                return resources >= 10 - Math.ceil(3 * techstats.eff_infra);
            },
        },

        {
            name: 'Insula',
            letter: 'I',
            description:
                'A high density primitive apartment that houses 35 people. Requires 15 resources to construct',
            piecepositions: [
                { x: 1, y: 0, img: { dx: 64, dy: 147 } },
                { x: 0, y: 0, img: { dx: 43, dy: 147 } },
                { x: 0, y: 1, img: { dx: 43, dy: 167 } },
                { x: 1, y: 1, img: { dx: 64, dy: 167 } },
            ],
            unlocked: false,
            near: 'building',
            tab: 'Housing',
            effect() {
                p.population = 35;
                resources -= 15 + Math.ceil(3 * techstats.eff_infra);
            },
            requires() {
                return resources >= 15 - Math.ceil(3 * techstats.eff_infra);
            },
        },

        {
            name: 'Road',
            letter: 'R',
            description:
                'A road that connects one place from the village to another. Requires 0.5 resources to construct.',
            piecepositions: [{ x: 0, y: 0, img: { dx: 210, dy: 0 } }],
            unlocked: true,
            near: 'building',
            tab: 'Misc',
            effect() {
                resources -= techstats.cement ? 0.25 : 0.5;
            },
            requires() {
                return resources >= (techstats.cement ? 0.25 : 0.5);
            },
        },
        {
            name: 'Tiny Farm',
            letter: 'TF',
            piecepositions: [
                { x: 1, y: 0, img: { dx: 274, dy: 169 } },
                { x: 0, y: 0, img: { dx: 254, dy: 169 } },
                { x: 1, y: 1, img: { dx: 273, dy: 190 } },
                { x: 0, y: 1, img: { dx: 253, dy: 190 } },
            ],
            description:
                'A very small farm that produces 1 food. Requires 3 resources to construct.',
            unlocked: true,
            near: 'building',
            tab: 'Farms',
            effect() {
                p.food = 1;
                resources -= 2 - Math.ceil(2 * techstats.simple_farms);
            },
            requires() {
                return resources >= 2 - Math.ceil(2 * techstats.simple_farms) && unemployed >= 0;
            },
        },
        {
            name: 'Small Farm',
            letter: 'F',
            piecepositions: [
                { x: 1, y: 0, img: { dx: 169, dy: 150 } },
                { x: 0, y: 0, img: { dx: 148, dy: 150 } },
                { x: 0, y: 1, img: { dx: 148, dy: 170 } },
                { x: 1, y: 1, img: { dx: 169, dy: 170 } },
                { x: 0, y: 2, img: { dx: 148, dy: 190 } },
                { x: 1, y: 2, img: { dx: 169, dy: 190 } },
            ],
            description:
                'A small farm that produces 3 food. Requires 4 resources to construct and 1 person operating it.',
            unlocked: true,
            near: 'building',
            tab: 'Farms',
            effect() {
                p.food = 3;
                resources -= 4 - Math.ceil(4 * techstats.simple_farms);
                unemployed -= 1;
            },
            requires() {
                return resources >= 4 - Math.ceil(4 * techstats.simple_farms) && unemployed >= 1;
            },
        },
        {
            name: 'Medium Farm',
            letter: 'MF',
            description:
                'A medium farm that produces 12 food. Requires 12 resources to construct and 3 people operating it. Cannot be on a hill.',
            unlocked: false,
            piecepositions: [
                { x: 1, y: 0, img: { dx: 21, dy: 106 } },
                { x: 0, y: 0, img: { dx: 1, dy: 106 } },
                { x: 0, y: 1, img: { dx: 1, dy: 127 } },
                { x: 1, y: 1, img: { dx: 21, dy: 127 } },
                { x: 1, y: -1, img: { dx: 21, dy: 85 } },
                { x: 0, y: -1, img: { dx: 1, dy: 85 } },
                { x: 2, y: -1, img: { dx: 42, dy: 85 } },
                { x: 2, y: 0, img: { dx: 43, dy: 106 } },
                { x: 2, y: 1, img: { dx: 43, dy: 127 } },
            ],
            near: '!hill',
            tab: 'Farms',
            effect() {
                p.food = 12;
                resources -= 12 - Math.ceil(6 * techstats.simple_farms);
                unemployed -= 3;
            },
            requires() {
                return resources >= 12 - Math.ceil(6 * techstats.simple_farms) && unemployed >= 3;
            },
        },
        {
            name: 'Large Farm',
            letter: 'LF',
            description:
                'A large farm that produces 30 food. Requires 24 resources to construct, 5 people operating it. Must be nearby a river for irrigation and cannot be on a hill.',
            unlocked: false,
            piecepositions: [
                { x: 0, y: 0, img: { dx: 1, dy: 1 } },
                { x: 1, y: 0, img: { dx: 21, dy: 1 } },
                { x: 2, y: 0, img: { dx: 42, dy: 1 } },
                { x: 3, y: 0, img: { dx: 63, dy: 1 } },
                { x: 0, y: 1, img: { dx: 1, dy: 21 } },
                { x: 1, y: 1, img: { dx: 21, dy: 21 } },
                { x: 2, y: 1, img: { dx: 42, dy: 21 } },
                { x: 3, y: 1, img: { dx: 63, dy: 21 } },
                { x: 0, y: 2, img: { dx: 1, dy: 42 } },
                { x: 1, y: 2, img: { dx: 21, dy: 42 } },
                { x: 2, y: 2, img: { dx: 42, dy: 42 } },
                { x: 3, y: 2, img: { dx: 63, dy: 42 } },
                { x: 0, y: 3, img: { dx: 1, dy: 63 } },
                { x: 1, y: 3, img: { dx: 21, dy: 63 } },
                { x: 2, y: 3, img: { dx: 42, dy: 63 } },
                { x: 3, y: 3, img: { dx: 63, dy: 63 } },
            ],
            near: 'river not',
            tab: 'Farms',
            effect() {
                p.food = 30;
                resources -= 24 - Math.ceil(24 * techstats.simple_farms);
                unemployed -= 5;
            },
            requires() {
                return resources >= 24 - Math.ceil(24 * techstats.simple_farms) && unemployed >= 5;
            },
        },
        {
            name: 'Temple',
            letter: 'T',
            description:
                'A temple to pray to RNGesus (increases luck). Requires 40 resources to construct and 10 people operating it.',
            unlocked: false,
            piecepositions: [
                { x: 1, y: 0, img: { dx: 190, dy: 106 } },
                { x: 0, y: 0, img: { dx: 169, dy: 106 } },
                { x: 0, y: 1, img: { dx: 169, dy: 127 } },
                { x: 1, y: 1, img: { dx: 190, dy: 127 } },
                { x: 1, y: -1, img: { dx: 190, dy: 85 } },
                { x: 0, y: -1, img: { dx: 169, dy: 85 } },
                { x: -1, y: 0, img: { dx: 148, dy: 106 } },
                { x: -1, y: -1, img: { dx: 148, dy: 85 } },
                { x: -1, y: 1, img: { dx: 148, dy: 127 } },
            ],
            near: 'building',
            tab: 'Misc',
            effect() {
                luck += Math.ceil(2 * (1 + techstats.ded_worship));
                p.xp += 50;
                reputation += 5;
                resources -= 40;
                unemployed -= 10;
            },
            requires() {
                return resources >= 40 && unemployed >= 10;
            },
        },
        {
            name: 'Military Base',
            letter: 'MB',
            description:
                'A building for military operations that houses your divisions. Can house 20 personnel. Requires 12 resources to construct.',
            unlocked: false,
            piecepositions: [
                { x: 1, y: 1, img: { dx: 127, dy: 106 } },
                { x: 0, y: 0, img: { dx: 106, dy: 85 } },
                { x: -1, y: 1, img: { dx: 85, dy: 106 } },
                { x: -1, y: -1, img: { dx: 85, dy: 64 } },
                { x: 1, y: -1, img: { dx: 127, dy: 64 } },
            ],
            near: 'building',
            tab: 'Military',
            effect() {
                p.military = 20;
                resources -= 12;
            },
            requires() {
                return resources >= 12;
            },
        },
        {
            name: 'Barracks',
            letter: 'BR',
            description:
                'A building to train soldiers, passively leveling them up. Requires 30 resources to construct.',
            unlocked: false,
            piecepositions: [
                { x: -1, y: 0, img: { dx: 85, dy: 22 } },
                { x: 0, y: 0, img: { dx: 106, dy: 22 } },
                { x: 0, y: 1, img: { dx: 106, dy: 43 } },
                { x: -1, y: 1, img: { dx: 85, dy: 43 } },
                { x: -1, y: -1, img: { dx: 85, dy: 1 } },
                { x: 0, y: -1, img: { dx: 106, dy: 1 } },
                { x: 1, y: -1, img: { dx: 127, dy: 1 } },
                { x: 1, y: 1, img: { dx: 127, dy: 43 } },
            ],
            near: 'building',
            tab: 'Military',
            effect() {
                resources -= 30;
            },
            requires() {
                return resources >= 30;
            },
        },
        {
            name: 'Fortress',
            letter: 'FT',
            description:
                'A massive structure that offers substantial defense. Can house 300 personnel. Requires 100 resources to construct.',
            unlocked: false,
            piecepositions: [
                { x: -1, y: 0, img: { dx: 85, dy: 148 } },
                { x: 0, y: 0, img: { dx: 106, dy: 148 } },
                { x: 0, y: 1, img: { dx: 106, dy: 169 } },
                { x: -1, y: 1, img: { dx: 85, dy: 169 } },
                { x: -1, y: -1, img: { dx: 85, dy: 127 } },
                { x: 0, y: -1, img: { dx: 106, dy: 127 } },
                { x: 1, y: -1, img: { dx: 127, dy: 127 } },
                { x: 1, y: 1, img: { dx: 127, dy: 169 } },
                { x: 1, y: 0, img: { dx: 127, dy: 148 } },
            ],
            near: 'building',
            tab: 'Military',
            effect() {
                p.military = 300;
                resources -= 100;
            },
            requires() {
                return resources >= 100;
            },
        },
        {
            name: 'Bridge',
            letter: 'B',
            description:
                'A bridge to connect one side of the river to another. Must be on a river to construct and requires 3 resources.',
            unlocked: true,
            piecepositions: [{ x: 0, y: 0, img: { dx: 190, dy: 148 } }],
            near: 'building',
            tab: 'Misc',
            effect() {
                resources -= techstats.cement ? 1.5 : 3;
            },
            requires() {
                return resources >= (techstats.cement ? 1.5 : 3);
            },
        },
        {
            name: 'Small Mine',
            letter: 'SM',
            description:
                'A small mine to extract resources from a hill. Collects 2 resources per year. Requires 4 resources and 1 person operating it.',
            unlocked: true,
            piecepositions: [
                { x: 0, y: 0, img: { dx: 22, dy: 190 } },
                { x: 0, y: 1, img: { dx: 21, dy: 211 } },
            ],
            near: 'building',
            tab: 'Mines',
            effect() {
                p.resources = 2;
                resources -= 4 - Math.ceil(techstats.planned_mines * 4);
                unemployed -= 1;
            },
            requires() {
                return resources >= 4 - Math.ceil(techstats.planned_mines * 4) && unemployed >= 1;
            },
        },
        {
            name: 'Medium Mine',
            letter: 'MM',
            description:
                'A medium mine to extract resources from a hill. Collects 18 resources per year. Must be entirely on a hill and requires 24 resources and 5 people operating it.',
            piecepositions: [
                { x: -1, y: 0, img: { dx: 43, dy: 190 } },
                { x: 0, y: 0, img: { dx: 64, dy: 190 } },
                { x: 1, y: 0, img: { dx: 85, dy: 190 } },
                { x: -1, y: 1, img: { dx: 43, dy: 211 } },
                { x: 0, y: 1, img: { dx: 64, dy: 211 } },
                { x: 1, y: 1, img: { dx: 85, dy: 211 } },
            ],
            unlocked: false,
            near: 'entire',
            tab: 'Mines',
            effect() {
                p.resources = 18;
                resources -= 24 - Math.ceil(techstats.planned_mines * 24);
                unemployed -= 5;
            },
            requires() {
                return resources >= 24 - Math.ceil(techstats.planned_mines * 24) && unemployed >= 5;
            },
        },
        {
            name: 'Large Mine',
            letter: 'LM',
            description:
                'A large mine to extract resources from a hill. Collects 70 resources per year. Must be on entirely on a hill and requires 70 resources and 8 people operating it.',
            piecepositions: [
                { x: 1, y: 0, img: { dx: 190, dy: 22 } },
                { x: 0, y: 0, img: { dx: 169, dy: 22 } },
                { x: -1, y: 0, img: { dx: 148, dy: 22 } },
                { x: 0, y: 1, img: { dx: 169, dy: 43 } },
                { x: 1, y: 1, img: { dx: 190, dy: 43 } },
                { x: -1, y: 1, img: { dx: 148, dy: 43 } },
                { x: 0, y: 2, img: { dx: 169, dy: 64 } },
                { x: 1, y: 2, img: { dx: 190, dy: 64 } },
                { x: -1, y: 2, img: { dx: 148, dy: 64 } },
                { x: 1, y: -1, img: { dx: 190, dy: 1 } },
                { x: 0, y: -1, img: { dx: 169, dy: 1 } },
                { x: -1, y: -1, img: { dx: 148, dy: 1 } },
            ],
            unlocked: false,
            near: 'entire',
            tab: 'Mines',
            effect() {
                p.resources = 70;
                resources -= 70 - Math.ceil(techstats.planned_mines * 70);
                unemployed -= 8;
            },
            requires() {
                return resources >= 70 - Math.ceil(techstats.planned_mines * 70) && unemployed >= 8;
            },
        },
        {
            name: 'Mega Temple',
            letter: 'MT',
            description:
                'A mega temple to directly contact god. Build one to beat the game. Requires 100000 resources and 300 people praying.',
            piecepositions: [
                { x: 1, y: 0, img: { dx: 254, dy: 127 } },
                { x: 0, y: 0, img: { dx: 232, dy: 127 } },
                { x: 0, y: 1, img: { dx: 232, dy: 148 } },
                { x: 1, y: 1, img: { dx: 254, dy: 148 } },
                { x: 1, y: -1, img: { dx: 254, dy: 106 } },
                { x: 0, y: -1, img: { dx: 232, dy: 106 } },
                { x: -1, y: 0, img: { dx: 211, dy: 127 } },
                { x: -1, y: -1, img: { dx: 211, dy: 106 } },
                { x: -1, y: 1, img: { dx: 211, dy: 148 } },
                { x: 2, y: 1, img: { dx: 275, dy: 148 } },
                { x: 2, y: 0, img: { dx: 275, dy: 127 } },
                { x: 2, y: -1, img: { dx: 275, dy: 106 } },
                { x: 2, y: -2, img: { dx: 275, dy: 85 } },
                { x: 1, y: -2, img: { dx: 254, dy: 85 } },
                { x: 0, y: -2, img: { dx: 232, dy: 85 } },
                { x: -1, y: -2, img: { dx: 211, dy: 85 } },
            ],
            unlocked: false,
            near: 'building',
            tab: 'Misc',
            effect() {
                displaypopup(popups.length - 2);
                resources -= 100000;
                unemployed -= 300;
            },
            requires() {
                return resources >= 100000 && unemployed >= 300;
            },
        },
        {
            name: 'Town Hall',
            letter: 'TH',
            description:
                'A city center. Requires exponentially more resources the more you build it.',
            piecepositions: [
                { x: 0, y: 0, img: { dx: 148, dy: 211 } },
                { x: 1, y: 0, img: { dx: 169, dy: 211 } },
                { x: 0, y: 1, img: { dx: 254, dy: 211 } },
                { x: 1, y: 1, img: { dx: 275, dy: 211 } },
            ],
            unlocked: true,
            near: 'building',
            tab: 'Misc',
            amountbought: 0,
            effect() {
                resources -= Math.ceil(Math.max((difficulty - 10) ** 2.7 / 25, 4));
                this.amountbought += 1;
                p.cities.push({
                    x: position.x,
                    y: position.y,
                });
                for (let i = -16; i <= 16; i++) {
                    for (let j = -16; j <= 16; j++) {
                        if (
                            distance(i, j, 0, 0) < 15 &&
                            tilestats[tilecode(position.x + j, position.y + i)] != undefined &&
                            tilestats[tilecode(position.x + j, position.y + i)] != 4 &&
                            !hasBorder({ x: position.x + j, y: position.y + i })
                        ) {
                            playerBorders.add(tilecode(position.x + j, position.y + i));
                            ctx5.fillStyle = 'rgba(0,0,255,0.7)';
                            ctx5.fillRect(position.x + j, position.y + i, 1, 1);
                        }
                    }
                }
            },
            requires() {
                return (
                    resources >= Math.ceil(Math.max((difficulty - 10) ** 2.7 / 25, 4)) &&
                    difficulty >= 10 &&
                    p.cities.length / 5 < difficulty
                );
            },
        },
        {
            name: 'Trade School',
            letter: 'TS',
            description:
                'A school for teaching miners and farmers.<br>Increases resource and food production 20% and requires 200 resources and 15 people to build.',
            unlocked: false,
            piecepositions: [
                { x: 1, y: 0, img: { dx: 232, dy: 190 } },
                { x: 0, y: 0, img: { dx: 211, dy: 190 } },
                { x: -1, y: 0, img: { dx: 190, dy: 190 } },
                { x: 0, y: 1, img: { dx: 211, dy: 211 } },
                { x: 1, y: 1, img: { dx: 232, dy: 211 } },
                { x: 1, y: -1, img: { dx: 232, dy: 169 } },
                { x: 0, y: -1, img: { dx: 211, dy: 169 } },
                { x: -1, y: -1, img: { dx: 190, dy: 169 } },
                { x: -1, y: 1, img: { dx: 190, dy: 211 } },
            ],
            near: 'building',
            tab: 'Misc',
            effect() {
                modifiers.food += 2;
                modifiers.resources += 2;
                resources -= 200;
                unemployed -= 15;
            },
            requires() {
                return resources >= 200 && unemployed >= 15;
            },
        },
        {
            name: 'Workshop',
            letter: 'W',
            description:
                'A workshop for practicing and learning. Increases wisdom by 50 but uses up 5 resources each round<br>Requires 20 resources and 5 people to build.',
            unlocked: false,
            piecepositions: [
                { x: 0, y: 0, img: { dx: 1, dy: 169 } },
                { x: 1, y: 0, img: { dx: 21, dy: 169 } },
            ],
            near: 'building',
            tab: 'Misc',
            effect() {
                p.xp = 50;
                p.resources = -5;
                resources -= 20;
                unemployed -= 5;
            },
            requires() {
                return resources >= 20 && unemployed >= 5;
            },
        },
        {
            name: 'Fishery',
            letter: 'F',
            description:
                "A fishery for fishing. Every years' catch will vary in amount of food. Requires 10 resources and 2 people to build.",
            unlocked: false,
            piecepositions: [
                { x: 0, y: 0, img: { dx: 106, dy: 211 } },
                { x: 1, y: 0, img: { dx: 127, dy: 211 } },
                { x: 1, y: -1, img: { dx: 127, dy: 190 } },
            ],
            near: 'river',
            tab: 'Farms',
            effect() {
                p.food = getRandomInt(10, 15);
                resources -= 10;
                p.fish = true;
                unemployed -= 2;
            },
            requires() {
                return resources >= 10 && unemployed >= 2;
            },
        },
    ],
    cities: [],
    food: 0,
    population: 0,
    military: 0,
    resources: 0,
    fish: false,
    xp: 0,
    river: false,
    hill: false,
    entirehill: false,
};
for (const un of p.pieceROM) {
    unlocked.push(un.unlocked);
    reset.push(un.unlocked);
}

function removebuildings(intensity = 4, onhill = false) {
    let casualties = 0;
    let amount = 0;

    const buildingschecked = [...gridstats];
    for (let i = buildingschecked.length - 1; i > -1; i--) {
        buildingschecked[i].bindex = i;
        let remove = false;

        for (let j = 0; j != buildingschecked[i].positions.length; j++) {
            if (
                exists(
                    'hill',
                    buildingschecked[i].positions[j].y,
                    buildingschecked[i].positions[j].x
                )
            ) {
                remove = true;
            }
        }

        if (!buildingschecked[i].disabled && (!onhill || remove)) {
            amount += 1;
        } else {
            buildingschecked.splice(i, 1);
        }
    }
    let removeamount = Math.floor(amount / intensity);
    for (i = gridstats.length - 1; i > -1; i--) {
        const trueindex = getRandomInt(0, buildingschecked.length - 1);
        const randomb = buildingschecked[trueindex].bindex;

        buildingschecked.splice(trueindex, 1);

        buildingamounts[gridstats[randomb].index] -= 1;
        gridstats[randomb].disabled = true;
        switch (gridstats[randomb].index) {
            case '18':
                for (let j = 0; j < p.cities.length; j++) {
                    if (
                        p.cities[j].x == gridstats[randomb].citypos.x &&
                        p.cities[j].y == gridstats[randomb].citypos.y
                    ) {
                        p.cities.splice(j, 1);
                        break;
                    }
                }
                recalcBuildings();
                break;
            case '19':
                modifiers.food -= 2;
                modifiers.resources -= 2;
                break;
        }
        currentpop -= gridstats[randomb].employmentrequired;
        casualties += gridstats[randomb].employmentrequired;
        removeamount -= 1;
        if (removeamount <= 0) {
            break;
        }
    }

    render();
    displayUI();
    return casualties;
}
function isallowed() {
    localallowed = false;
    for (let i = 0, len = piece.length; i != len; i++) {
        if (
            position.x - widthmax / 2 + piece[i].x - spawnX > max.right ||
            position.x - widthmax / 2 + piece[i].x - spawnX < max.left ||
            position.y - heightmax / 2 + piece[i].y - spawnY > max.down ||
            position.y - heightmax / 2 + piece[i].y - spawnY < max.up
        ) {
            return false;
        }
        if (tilestats[tilecode(position.x + piece[i].x, position.y + piece[i].y)] == undefined) {
            return false;
        }
        if (exists('lake', position.x + piece[i].x, position.y + piece[i].y)) {
            return false;
        }
        if (p.river && !exists('river', position.x + piece[i].x, position.y + piece[i].y)) {
            return false;
        } else if (
            grid[position.y + piece[i].y].includes(position.x + piece[i].x) ||
            (!p.river && exists('river', position.x + piece[i].x, position.y + piece[i].y))
        ) {
            return false;
        }
        if (
            p.pieceROM[p_index].near.includes('!hill') ||
            p.pieceROM[p_index].near.includes('not')
        ) {
            if (exists('hill', position.x + piece[i].x, position.y + piece[i].y)) {
                return false;
            }
        }
        if (p.pieceROM[p_index].near.includes('entire')) {
            if (exists('hill', position.x + piece[i].x, position.y + piece[i].y)) {
                return false;
            }
        }
        for (const k of kingdoms) {
            if (k.borders.has(tilecode(position.x + piece[i].x, position.y + piece[i].y))) {
                return false;
            }
        }
        if (!first_turn) {
            if (grid[position.y + piece[i].y].includes(1 + position.x + piece[i].x)) {
                localallowed = true;
            } else if (grid[position.y + piece[i].y].includes(-1 + position.x + piece[i].x)) {
                localallowed = true;
            } else if (
                grid[Math.min(grid.length - 1, 1 + position.y + piece[i].y)].includes(
                    position.x + piece[i].x
                )
            ) {
                localallowed = true;
            } else if (
                grid[Math.max(0, -1 + position.y + piece[i].y)].includes(position.x + piece[i].x)
            ) {
                localallowed = true;
            }
        } else {
            localallowed = true;
        }
    }
    if (!localallowed) return false;
    if (
        p.pieceROM[p_index].near != 'building' &&
        !p.pieceROM[p_index].near.includes('!hill') &&
        !p.pieceROM[p_index].near.includes('entire')
    ) {
        localallowed = false;
    }
    for (let i = 0; i != piece.length; i++) {
        if (p.pieceROM[p_index].near.includes('river')) {
            if (exists('river', position.x + piece[i].x, 1 + position.y + piece[i].y)) {
                localallowed = true;
                break;
            } else if (exists('river', position.x + piece[i].x, -1 + position.y + piece[i].y)) {
                localallowed = true;
                break;
            }
        }
        if (p.pieceROM[p_index].near == 'hill') {
            if (exists('hill', position.x + piece[i].x, position.y + piece[i].y)) {
                localallowed = true;
                break;
            }
        }
    }
    return localallowed;
}
canvas.onmousemove = function (event) {
    if (battling) {
        mousePos = { x: event.clientX, y: event.clientY };
        if (isPlacing) {
            if (isPlacingArmies) {
                if (
                    convertToPlaceCoords(mousePos.x, false) ==
                        convertToPlaceCoords(oldMousePos, false) &&
                    convertToPlaceCoords(mousePos.y, false) ==
                        convertToPlaceCoords(oldMousePos, false)
                ) {
                    return;
                }
                oldMousePos = { x: mousePos.x, y: mousePos.y };
                renderArmyUI();
            }
        } else if (isSelecting) {
            renderArmyUI();
        }
    } else {
        if (ispainting && zoom >= 15) {
            position = {
                x: Math.ceil(event.clientX / zoom) - Math.round((1 * 20) / zoom) + scrollX,
                y: Math.round(event.clientY / zoom) - Math.round((3 * 20) / zoom) + scrollY,
            };
            if (position.x != oldposition.x || position.y != oldposition.y) {
                allowed = false;
                oldposition.x = position.x;
                oldposition.y = position.y;

                render();
                ctx.beginPath();

                allowed = isallowed();

                for (len = piece.length, i = 0; i != len; i++) {
                    if (!allowed) {
                        ctx.fillStyle = 'rgba(255,0,0,0.5)';
                        if (psettings.noimage) {
                            ctx.fillText(
                                letter,
                                position.x * zoom +
                                    10 -
                                    letter.length * 4 -
                                    scrollX * zoom +
                                    piece[i].x * zoom,
                                position.y * zoom + 10 - scrollY * zoom + piece[i].y * zoom
                            );
                        } else {
                            ctx.drawImage(
                                buildimg,
                                p.pieceROM[p_index].piecepositions[i].img.dx,
                                p.pieceROM[p_index].piecepositions[i].img.dy,
                                20,
                                20,
                                (position.x - scrollX + piece[i].x) * zoom,
                                (position.y - scrollY + piece[i].y) * zoom,
                                zoom,
                                zoom
                            );
                        }

                        ctx.fillRect(
                            (position.x - scrollX + piece[i].x) * zoom,
                            (position.y - scrollY + piece[i].y) * zoom,
                            zoom,
                            zoom
                        );
                    } else {
                        ctx.strokeStyle = 'black';
                        if (psettings.noimage) {
                            ctx.fillText(
                                letter,
                                position.x +
                                    10 -
                                    letter.length * 4 -
                                    scrollX * zoom +
                                    piece[i].x * zoom,
                                position.y * zoom + 10 - scrollY * zoom + piece[i].y * zoom
                            );
                            ctx.rect(
                                (position.x - scrollX + piece[i].x) * zoom,
                                (position.y + -scrollY + piece[i].y) * zoom,
                                zoom,
                                zoom
                            );
                        } else {
                            ctx.fillStyle = 'rgba(0,255,0,0.7)';
                            ctx.fillRect(
                                (position.x - scrollX + piece[i].x) * zoom,
                                (position.y + -scrollY + piece[i].y) * zoom,
                                zoom,
                                zoom
                            );

                            ctx.drawImage(
                                buildimg,
                                p.pieceROM[p_index].piecepositions[i].img.dx,
                                p.pieceROM[p_index].piecepositions[i].img.dy,
                                20,
                                20,
                                (position.x - scrollX + piece[i].x) * zoom,
                                (position.y + -scrollY + piece[i].y) * zoom,
                                zoom,
                                zoom
                            );
                        }
                    }
                }
                ctx.stroke();
            }
        } else if (removing || repairing) {
            position = {
                x: Math.ceil(event.clientX / zoom) - 1 + scrollX,
                y: Math.floor(event.clientY / zoom) - 3 + scrollY,
            };

            render();

            ctx.beginPath();
            if (removing) {
                ctx.strokeStyle = 'white';
            } else {
                ctx.strokeStyle = '#4d4d4d';
            }
            ctx.rect(
                (position.x - scrollX) * zoom,
                (position.y + -scrollY) * zoom,
                zoom * (21 / 20),
                zoom * (21 / 20)
            );
            ctx.stroke();
            ctx.closePath();
        }
    }
};
function isremoving() {
    ispainting = false;
    repairing = false;
    if (removing == false) {
        removing = true;
    } else {
        removing = false;
    }
}
function isrepairing() {
    ispainting = false;
    removing = false;
    if (repairing == false) {
        repairing = true;
    } else {
        repairing = false;
    }
}

function renderclouds() {
    const grd = ctx.createLinearGradient(
        (spawnX - scrollX) * zoom + screen.width / 2 + max.right * zoom,
        0,
        (spawnX - scrollX) * zoom + screen.width + screen.width / 2 + max.right * zoom,
        0
    );
    grd.addColorStop(1, '#ffffff');
    grd.addColorStop(0.25, '#ffffff');
    grd.addColorStop(0.15, 'rgba(255,255,255,0.8)');
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(
        (spawnX - scrollX) * zoom + screen.width / 2 + max.right * zoom,
        0,
        screen.width,
        screen.height
    );
    const ygrd = ctx.createLinearGradient(
        (spawnX - scrollX) * zoom - screen.width / 2 + max.left * zoom,
        0,
        (spawnX - scrollX) * zoom + screen.width / 2 + max.left * zoom,
        0
    );
    ygrd.addColorStop(0, '#ffffff');
    ygrd.addColorStop(0.75, '#ffffff');
    ygrd.addColorStop(0.85, 'rgba(255,255,255,0.8)');
    ygrd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = ygrd;
    ctx.fillRect(
        (spawnX - scrollX) * zoom - screen.width / 2 + max.left * zoom,
        0,
        screen.width,
        screen.height
    );
    const yxgrd = ctx.createLinearGradient(
        0,
        -80 + (spawnY - scrollY) * zoom + screen.height / 2 + max.down * zoom,
        0,
        -80 + (spawnY - scrollY) * zoom + 900 + screen.height / 2 + max.down * zoom
    );
    yxgrd.addColorStop(1, '#ffffff');
    yxgrd.addColorStop(0.25, '#ffffff');
    yxgrd.addColorStop(0.15, 'rgba(255,255,255,0.8)');
    yxgrd.addColorStop(0, 'rgba(255,255,255,0)');
    ctx.fillStyle = yxgrd;
    ctx.fillRect(
        0,
        -80 + (spawnY - scrollY) * zoom + screen.height / 2 + max.down * zoom,
        screen.width,
        screen.height
    );
    const xygrd = ctx.createLinearGradient(
        0,
        -120 + (spawnY - scrollY) * zoom - screen.height / 2 + max.up * zoom,
        0,
        -120 + (spawnY - scrollY) * zoom + screen.height / 2 + max.up * zoom
    );
    xygrd.addColorStop(0, '#ffffff');
    xygrd.addColorStop(0.65, '#ffffff');
    xygrd.addColorStop(0.75, 'rgba(255,255,255,0.8)');
    xygrd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = xygrd;
    ctx.fillRect(
        0,
        -120 + (spawnY - scrollY) * zoom - screen.height / 2 + max.up * zoom,
        screen.width,
        screen.height
    );
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.stroke();
}
function searchrange(lower, higher, list) {
    let numlist = [...list];
    while (numlist.length > 1) {
        const numlen = numlist.length;
        if (numlist[Math.floor(numlen / 2)] > higher) {
            numlist = numlist.slice(0, Math.floor(numlen / 2));
        } else if (numlist[Math.floor(numlen / 2)] < lower) {
            numlist = numlist.slice(Math.floor(numlen / 2), numlen - 1);
        } else {
            return numlist[Math.floor(numlen / 2)];
        }
    }

    return null;
}
function changeZoom(currentZoom) {
    heightmax = Math.round((screen.height * 0.88) / currentZoom);
    widthmax = Math.round(screen.width / currentZoom);
}

function renderBackGround(currentZoom, xScroll, yScroll) {
    ctx.fillStyle = 'rgb(43,101,236)';

    ctx.fillRect(0, 0, screen.width, screen.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        canvas3,
        xScroll,
        yScroll,
        widthmax + 1,
        heightmax + 2,
        0,
        0,
        (widthmax + 1) * currentZoom,
        (heightmax + 2) * currentZoom
    );
    ctx.drawImage(
        canvas4,
        xScroll,
        yScroll,
        widthmax + 1,
        heightmax + 2,
        0,
        0,
        (widthmax + 1) * currentZoom,
        (heightmax + 2) * currentZoom
    );

    ctx.fillStyle = 'black';
    ctx.imageSmoothingEnabled = true;
    ctx.textAlign = 'center';

    ctx.font = `${zoom}px PF Tempesta Five Condensed`;
    for (const k of kingdoms) {
        for (const city of k.cities) {
            ctx.fillText(
                city.name,
                (city.x - scrollX) * zoom + zoom / 2,
                (city.y - scrollY - 1) * zoom + zoom / 2
            );
            ctx.beginPath();
            ctx.arc(
                (city.x - scrollX) * zoom + zoom / 2,
                (city.y - scrollY) * zoom + zoom / 2,
                zoom / 8,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }
}
function render() {
    renderBackGround(zoom, scrollX, scrollY);
    ctx.fillStyle = 'rgba(0,0,0,1)';

    if (psettings.noimage) {
        for (len = gridstats.length, i = 0; i < len; i++) {
            ctx.beginPath();

            if (gridstats[i].disabled) {
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            } else if (!gridstats[i].inrange) {
                ctx.strokeStyle = 'rgba(255,0,0,1)';
            } else {
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            }

            for (let j = 0, len = gridstats[i].positions.length; j != len; j++) {
                if (
                    gridstats[i].positions[j].x - 1 < scrollX + widthmax &&
                    gridstats[i].positions[j].x + 1 > scrollX
                )
                    ctx.fillText(
                        gridstats[i].letter,
                        gridstats[i].positions[j].x * zoom +
                            zoom / 2 -
                            gridstats[i].letter.length * 4 -
                            scrollX * zoom,
                        gridstats[i].positions[j].y * zoom + zoom / 2 - scrollY * zoom
                    );
                ctx.rect(
                    (gridstats[i].positions[j].x - scrollX) * zoom,
                    (gridstats[i].positions[j].y - scrollY) * zoom,
                    (zoom * 19) / 20,
                    (zoom * 19) / 20
                );
            }
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(0,0,0,1)';
        for (const road in roadgrid) {
            const pos = JSON.parse(road);

            ctx.fillText('R', (pos.x - scrollX) * zoom + 6, (pos.y - scrollY) * zoom + zoom / 2);
            ctx.rect((pos.x - scrollX) * zoom, (pos.y - scrollY) * zoom, zoom, zoom);
        }
    } else {
        for (len = gridstats.length, i = 0; i < len; i++) {
            ctx.beginPath();

            for (let j = 0, len = gridstats[i].positions.length; j != len; j++) {
                if (
                    gridstats[i].positions[j].x - 1 < scrollX + widthmax &&
                    gridstats[i].positions[j].x + 1 > scrollX
                ) {
                    if (gridstats[i].disabled) {
                        ctx.drawImage(
                            buildimg2,
                            gridstats[i].positions[j].img.dx,
                            gridstats[i].positions[j].img.dy,
                            20,
                            20,
                            (gridstats[i].positions[j].x - scrollX) * zoom,
                            (gridstats[i].positions[j].y - scrollY) * zoom,
                            zoom,
                            zoom
                        );
                        ctx.stroke();
                    } else if (!gridstats[i].inrange) {
                        ctx.drawImage(
                            buildimg3,
                            gridstats[i].positions[j].img.dx,
                            gridstats[i].positions[j].img.dy,
                            20,
                            20,
                            (gridstats[i].positions[j].x - scrollX) * zoom,
                            (gridstats[i].positions[j].y - scrollY) * zoom,
                            zoom,
                            zoom
                        );
                        ctx.stroke();
                    } else {
                        ctx.drawImage(
                            buildimg,
                            gridstats[i].positions[j].img.dx,
                            gridstats[i].positions[j].img.dy,
                            20,
                            20,
                            (gridstats[i].positions[j].x - scrollX) * zoom,
                            (gridstats[i].positions[j].y - scrollY) * zoom,
                            zoom,
                            zoom
                        );
                        ctx.stroke();
                    }
                }
                ctx.closePath();
            }
        }
        for (const road in roadgrid) {
            const pos = JSON.parse(road);

            ctx.drawImage(
                buildimg,
                roadgrid[road].x,
                roadgrid[road].y,
                20,
                20,
                (pos.x - scrollX) * zoom,
                (pos.y - scrollY) * zoom,
                (zoom * 22) / 20,
                (zoom * 22) / 20
            );
        }
    }
    renderclouds();
}

function recalcBuildings() {
    if (difficulty < 10) {
        return;
    }
    outofrange = gridstats.length;

    for (const building of gridstats) {
        building.inrange = false;
        for (const city of p.cities) {
            for (const position of building.positions) {
                if (Math.abs(position.x - city.x) <= 15 && Math.abs(position.y - city.y) <= 15) {
                    building.inrange = true;
                    outofrange--;
                    break;
                }
            }
        }
    }

    render();
}

function recalcroads(roads) {
    const valueindex = [
        '0000',
        '1000',
        '0100',
        '0010',
        '0001',
        '1100',
        '0110',
        '0011',
        '1001',
        '1110',
        '0111',
        '1011',
        '1101',
        '1010',
        '0101',
        '1111',
    ];
    const valuexy = [
        { x: 212, y: 1 },
        { x: 233, y: 1 },
        { x: 254, y: 1 },
        { x: 275, y: 1 },
        { x: 212, y: 21 },
        { x: 233, y: 21 },
        { x: 254, y: 21 },
        { x: 275, y: 21 },
        { x: 212, y: 42 },
        { x: 233, y: 42 },
        { x: 254, y: 42 },
        { x: 275, y: 42 },
        { x: 212, y: 63 },
        { x: 233, y: 63 },
        { x: 254, y: 63 },
        { x: 275, y: 63 },
    ];
    const constraints = [
        {
            istrue(whichroad) {
                const pos = JSON.parse(whichroad);
                return roadgrid[JSON.stringify({ x: pos.x, y: pos.y - 1 })] != undefined;
            },
        },
        {
            istrue(whichroad) {
                const pos = JSON.parse(whichroad);
                return roadgrid[JSON.stringify({ x: pos.x + 1, y: pos.y })] != undefined;
            },
        },
        {
            istrue(whichroad) {
                const pos = JSON.parse(whichroad);
                return roadgrid[JSON.stringify({ x: pos.x, y: pos.y + 1 })] != undefined;
            },
        },
        {
            istrue(whichroad) {
                const pos = JSON.parse(whichroad);
                return roadgrid[JSON.stringify({ x: pos.x - 1, y: pos.y })] != undefined;
            },
        },
    ];

    for (const road in roads) {
        if (roadgrid[roads[road]] != undefined) {
            let value = '';
            for (const el of constraints) {
                value += el.istrue(roads[road]) ? 1 : 0;
            }

            roadgrid[roads[road]] = valuexy[valueindex.indexOf(value.toString())];
        }
    }
}
document.onmouseup = function () {
    if (isPlacingArmies) {
        if (currentDivisions.length == 0) {
            return;
        }
        isPlacingArmies = false;
        const convertedMousePos = convertToPlaceCoords(mousePos, false);
        const convertedStartPos = convertToPlaceCoords(startingPlace, true);
        convertedMousePos.x /= armyZoom;
        convertedMousePos.y /= armyZoom;
        convertedStartPos.x /= armyZoom;
        convertedStartPos.y /= armyZoom;
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
                    break;
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
                blueArmies.push(
                    new army(
                        j - 10 + armyScrollX,
                        i + 10 + armyScrollY,
                        division.power,
                        division.type,
                        'blue'
                    )
                );
                division.placed = true;
                placedTiles.add(tilecode(j - 10, i + 10));

                divisionCount++;
            }
        }
        const placeButton = document.getElementById(currentArmyGroup);
        placeButton.style.border = '3px solid black';
        placeButton.childNodes[2].innerHTML =
            'Divisions: ' + (currentDivisions.length - divisionCount);
        let currentPower = 0;
        for (let i = divisionCount; i < currentDivisions.length; i++) {
            currentPower += currentDivisions[i].power;
        }
        placeButton.childNodes[1].innerHTML = 'Manpower: ' + shorten(currentPower);
        isPlacingArmies = false;
        currentDivisions.length = 0;
        renderArmies();
    }
};
canvas.onmouseup = function (event) {
    if (battling) {
        if (!isPlacing) {
            if (drawingRectangle) {
                for (let i = 0; i < blueArmies.length; i++) {
                    if (
                        blueArmies[i].x >
                            Math.min(
                                startingPlace.x / armyZoom + startingScroll.x,
                                mousePos.x / armyZoom + armyScrollX
                            ) &&
                        blueArmies[i].x <
                            Math.max(
                                startingPlace.x / armyZoom + startingScroll.x,
                                mousePos.x / armyZoom + armyScrollX
                            ) &&
                        blueArmies[i].y >
                            Math.min(
                                startingPlace.y / armyZoom + startingScroll.y,
                                mousePos.y / armyZoom + armyScrollY
                            ) &&
                        blueArmies[i].y <
                            Math.max(
                                startingPlace.y / armyZoom + startingScroll.y,
                                mousePos.y / armyZoom + armyScrollY
                            )
                    ) {
                        armiesChosen.push(i);
                        blueArmies[i].selected = true;
                    }
                }
                if (armiesChosen.length > 0) {
                    drawingRectangle = false;
                    return;
                }
            } else if (armyChosen != null) {
                for (const a of armiesChosen) {
                    const armyDirection = Math.atan2(
                        blueArmies[armyChosen].y - blueArmies[a].y,
                        blueArmies[armyChosen].x - blueArmies[a].x
                    );
                    blueArmies[a].destination.length = 0;
                    if (blueArmies[a].priority <= 2) {
                        blueArmies[a].priority = 1;
                    }
                    blueArmies[a].destination.push({
                        x:
                            armyScrollX +
                            mousePos.x / armyZoom -
                            Math.cos(armyDirection + (Math.PI / 12) * rotationAmount) *
                                blueArmies[a].getDistance(
                                    blueArmies[armyChosen].x,
                                    blueArmies[armyChosen].y
                                ) *
                                tightnessX,

                        y:
                            armyScrollY +
                            mousePos.y / armyZoom -
                            Math.sin(armyDirection + (Math.PI / 12) * rotationAmount) *
                                blueArmies[a].getDistance(
                                    blueArmies[armyChosen].x,
                                    blueArmies[armyChosen].y
                                ) *
                                tightnessY,
                    });
                    blueArmies[a].targetRotation =
                        blueArmies[a].direction + (Math.PI / 12) * rotationAmount;
                    blueArmies[a].selected = false;
                }
                isSelecting = false;
                armiesChosen.length = 0;
            }
            drawingRectangle = false;
        }
    }
};
function convertToPlaceCoords(pos) {
    return {
        x: Math.floor(pos.x / (armyZoom * 20)) * armyZoom * 20,
        y: Math.floor(pos.y / (armyZoom * 20)) * armyZoom * 20,
    };
}
canvas.onmousedown = function (event) {
    mousePos = { x: event.clientX, y: event.clientY };

    if (battling) {
        if (isPlacing) {
            isPlacingArmies = true;
            startingScroll = { x: armyScrollX, y: armyScrollY };
            startingPlace = { x: mousePos.x, y: mousePos.y };
        } else {
            if (!isSelecting) {
                rotationAmount = 0;
                tightnessX = 1;
                tightnessY = 1;
            }

            if (event.button == 0) {
                for (let i = 0; i < blueArmies.length; i++) {
                    if (
                        blueArmies[i].getDistance(
                            mousePos.x / armyZoom + armyScrollX,
                            mousePos.y / armyZoom + armyScrollY
                        ) <
                        20 / armyZoom
                    ) {
                        if (armiesChosen.length == 0) armiesChosen.push(i);
                        armyChosen = i;
                        drawingLine = true;
                        isSelecting = true;
                        startingPlace = {
                            x: mousePos.x,
                            y: mousePos.y,
                        };
                        startingScroll = { x: armyScrollX, y: armyScrollY };
                        break;
                    }
                }
            } else {
                armyChosen = null;
                drawingLine = false;
                drawingRectangle = true;
                isSelecting = true;
                startingPlace = {
                    x: mousePos.x,
                    y: mousePos.y,
                };
                startingScroll = { x: armyScrollX, y: armyScrollY };
            }
        }
    } else {
        if (ispainting && allowed && position.y - scrollY * zoom < canvas.height && zoom >= 15) {
            allowed = false;
            let isInRange = false;
            click.play();
            p.population = 0;
            p.military = 0;
            p.resources = 0;
            p.food = 0;
            p.xp = 0;
            p.fish = 0;
            const oldpop = unemployed;
            const gridposition = [];
            if (Math.floor(position.x - screen.width / 2) - spawnX + 5 > max.right) {
                max.right = Math.floor(position.x - screen.width / 2) - spawnX + 5;
            }
            if (Math.floor(position.x - screen.width / 2) - spawnX - 5 < max.left) {
                max.left = Math.floor(position.x - screen.width / 2) - spawnX - 5;
            }
            if (Math.floor(position.y - screen.height / 2) - spawnY + 10 > max.down) {
                max.down = Math.floor(position.y - screen.height / 2) - spawnY + 10;
            }
            if (Math.floor(position.y - screen.height / 2) - spawnY - 5 < max.up) {
                max.up = Math.floor(position.y - screen.height / 2) - spawnY - 5;
            }
            for (let i = 0; i != piece.length; i++) {
                gridposition.push({
                    x: position.x + piece[i].x,
                    y: position.y + piece[i].y,
                    img: p.pieceROM[p_index].piecepositions[i].img,
                });
                grid[position.y + piece[i].y].push(position.x + piece[i].x);
                if (
                    p.pieceROM[p_index].name == 'Road' ||
                    p.pieceROM[p_index].name == 'Bridge' ||
                    p.pieceROM[p_index].name == 'Bonfire' ||
                    difficulty < 10
                ) {
                    isInRange = true;
                    if (p.pieceROM[p_index].name == 'Road') {
                        p.pieceROM[p_index].effect();
                        buildingamounts[p_index] += 1;
                        roadgrid[JSON.stringify({ x: position.x, y: position.y })] = { x: 0, y: 0 };
                        recalcroads([
                            JSON.stringify({ x: position.x, y: position.y }),
                            JSON.stringify({ x: position.x + 1, y: position.y }),
                            JSON.stringify({ x: position.x, y: position.y + 1 }),
                            JSON.stringify({ x: position.x, y: position.y - 1 }),
                            JSON.stringify({ x: position.x - 1, y: position.y }),
                        ]);
                        displayUI();
                        render();
                        allowed = false;
                        first_turn = false;
                        if (!p.pieceROM[p_index].requires()) {
                            piece.length = 0;
                            ispainting = false;
                        }
                        return;
                    }
                }
                if (!isInRange) {
                    for (j = 0; j < p.cities.length; j++) {
                        if (
                            Math.abs(p.cities[j].x - gridposition[i].x) <= 15 &&
                            Math.abs(p.cities[j].y - gridposition[i].y) <= 15
                        ) {
                            isInRange = true;
                            break;
                        }
                    }
                }

                if (!exists('hill', gridposition[i].y, gridposition[i].x)) {
                    p.entirehill = false;
                }
                if (exists('hill', gridposition[i].y, gridposition[i].x)) {
                    p.hill = true;
                }
            }

            const oldresources = resources;
            p.pieceROM[p_index].effect();

            gridstats.push({
                index: p_index,
                letter: letter,
                population: p.population,
                employmentrequired: oldpop - unemployed,
                food: p.food,
                resources: p.resources,
                military: p.military,
                xp: p.xp,
                fish: p.fish,
                positions: gridposition.slice(0),
                resourcerefund: oldresources - resources,
                disabled: false,
                inrange: isInRange,
            });
            xp += Math.ceil((oldresources - resources) * (1 + techstats.innovation) * 2);
            first_turn = false;
            if (p_index == 18) {
                gridstats[gridstats.length - 1].citypos = {
                    x: position.x,
                    y: position.y,
                };
            }
            if (!p.pieceROM[p_index].requires()) {
                piece.length = 0;
                ispainting = false;
            }

            buildingamounts[p_index] += 1;
            if (!isInRange) {
                outofrange++;
            }
            if (p_index == 18) {
                recalcBuildings();
            }
            displayUI();
            render();
            if (tutorialindex == 10 || tutorialindex == 11 || tutorialindex == 12) {
                displayUI();
                if (tutorialindex != 12) {
                    continuetutorial(++tutorialindex, 30, 70, false);
                } else {
                    if (p.pieceROM[0].amountbought >= 2) {
                        continuetutorial(++tutorialindex);
                    }
                }
            }
        } else if (removing && grid[position.y].includes(position.x)) {
            let found = false;
            let buildingindex = 0;
            if (roadgrid[JSON.stringify({ x: position.x, y: position.y })] != undefined) {
                grid[position.y].splice(grid[position.y].indexOf(position.x));
                delete roadgrid[JSON.stringify({ x: position.x, y: position.y })];
                recalcroads([
                    JSON.stringify({ x: position.x + 1, y: position.y }),
                    JSON.stringify({ x: position.x, y: position.y + 1 }),
                    JSON.stringify({ x: position.x, y: position.y - 1 }),
                    JSON.stringify({ x: position.x - 1, y: position.y }),
                ]);
                render();
                return;
            }
            for (let i = 0, len = gridstats.length; i < len; i++) {
                for (let j = 0, len = gridstats[i].positions.length; j < len; j++) {
                    if (
                        gridstats[i].positions[j].x == position.x &&
                        gridstats[i].positions[j].y == position.y
                    ) {
                        buildingindex = i;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }

            for (const el of gridstats[buildingindex].positions) {
                const indexx = grid[el.y].indexOf(el.x);
                grid[el.y].splice(indexx, 1);
                repairbreakamount += 1;
                breaksound.play();
            }
            resources += Math.floor(gridstats[buildingindex].resourcerefund / 2);
            buildingamounts[gridstats[buildingindex].index] -= 1;

            switch (gridstats[buildingindex].index) {
                case '18':
                    for (let i = 0, len = p.cities.length; i < len; i++) {
                        if (
                            p.cities[i].x == gridstats[buildingindex].citypos.x &&
                            p.cities[i].y == gridstats[buildingindex].citypos.y
                        ) {
                            p.cities.splice(i, 1);
                            break;
                        }
                    }
                    recalcBuildings();
                    break;
                case '19':
                    modifiers.food -= 2;
                    modifiers.resources -= 2;
                    break;
            }
            gridstats.splice(buildingindex, 1);

            render();
            displayUI();
        } else if (repairing && grid[position.y].includes(position.x)) {
            let found = false;
            let buildingindex = 0;
            for (let i = 0, len = gridstats.length; i < len; i++) {
                for (let j = 0, len = gridstats[i].positions.length; j < len; j++) {
                    if (
                        gridstats[i].positions[j].x == position.x &&
                        gridstats[i].positions[j].y == position.y
                    ) {
                        buildingindex = i;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (
                gridstats[buildingindex].disabled == true &&
                resources >= Math.round(gridstats[buildingindex].resourcerefund / 2) &&
                unemployed >= gridstats[buildingindex].employmentrequired
            ) {
                repairbreakamount += 1;
                repairsound.play();
                resources -= Math.round(gridstats[buildingindex].resourcerefund / 2);
                gridstats[buildingindex].disabled = false;
                switch (gridstats[buildingindex].index) {
                    case '18':
                        p.cities.push(gridstats[buildingindex].citypos);
                        recalcBuildings();
                        break;
                    case '19':
                        modifiers.food += 2;
                        modifiers.resources += 2;
                        break;
                }
                render();
                displayUI();
            }
        }
    }
};

document.onkeydown = function (event) {
    if (battling) {
        switch (event.key) {
            case 'w':
                armyScrollY -= 20;
                renderArmyUI();
                break;
            case 's':
                armyScrollY += 20;
                renderArmyUI();
                break;
            case 'a':
                armyScrollX -= 20;
                renderArmyUI();
                break;
            case 'd':
                armyScrollX += 20;
                renderArmyUI();
                break;
            case 'q':
                rotationAmount--;
                renderArmyUI();
                break;
            case 'e':
                rotationAmount++;
                renderArmyUI();
                break;
            case 'z':
                tightnessY += 0.1;
                renderArmyUI();
                break;
            case 'c':
                tightnessY -= 0.1;
                renderArmyUI();
                break;
            case 'Z':
                tightnessX += 0.1;
                renderArmyUI();
                break;
            case 'C':
                tightnessX -= 0.1;
                renderArmyUI();
                break;
            case '-':
                armyZoom -= 0.1;
                armyZoom = Math.max(0.25, armyZoom);
                changeZoom(armyZoom * 20);

                break;
            case '=':
                armyZoom += 0.1;
                armyZoom = Math.min(10, armyZoom);

                changeZoom(armyZoom * 20);
                break;
        }
    } else {
        if (event.key == 'Escape') {
            if (canvas.style.display == 'block') {
                pause_menu();
            }
        }
        if (
            techstats.exploration &&
            document.getElementById('popup_block_buttons').style.display != 'block' &&
            canvas.style.display == 'block'
        ) {
            
            if (psettings.arrowkeys) {
                switch (event.key) {
                    case 'ArrowUp':
                        if (scrollY > 0 && scrollY - spawnY > max.up) {
                            move(0, -1);
                        }
                        break;
                    case 'ArrowDown':
                        if (scrollY < 499 - heightmax && scrollY - spawnY < max.down) {
                            move(0, 1);
                        }
                        break;
                    case 'ArrowLeft':
                        if (scrollX > 0 && scrollX - spawnX > max.left) {
                            move(-1, 0);
                        }
                        break;
                    case 'ArrowRight':
                        if (scrollX < 499 && scrollX - spawnX < max.right) {
                            move(1, 0);
                        }
                        break;

                    //case "r":
                    //rotate()
                    //break
                }
            } else {
                switch (event.key) {
                    case 'w':
                        if (scrollY > 0 && scrollY - spawnY > max.up) {
                            move(0, -1);
                        }
                        break;
                    case 's':
                        if (scrollY < 499 - heightmax && scrollY - spawnY < max.down) {
                            move(0, 1);
                        }
                        break;
                    case 'a':
                        if (scrollX > 0 && scrollX - spawnX > max.left) {
                            move(-1, 0);
                        }
                        break;
                    case 'd':
                        if (scrollX < 499 && scrollX - spawnX < max.right) {
                            move(1, 0);
                        }
                        break;
                    //case "r":
                    //rotate()
                    //break
                }
            }
        }
    }
};

function rotate() {
    difference += 0.5;
    let x = [];
    let y = [];
    for (let i = 0; i != piece.length; i++) {
        x.push(piece[i].x);
        y.push(piece[i].y);
    }
    let max = Math.max(...x);
    let min = Math.min(...x);
    let miny = Math.min(...y);
    let maxy = Math.max(...y);
    midpoint = { x: (min + max) / 2, y: (miny + maxy) / 2 };

    for (i = 0; i < piece.length; i++) {
        piece[i].x -= midpoint.x;
        piece[i].y -= midpoint.y;

        oldy = piece[i].y;
        piece[i].y = piece[i].x * -1;
        piece[i].x = oldy;
        piece[i].x += midpoint.x;
        piece[i].y += midpoint.y;
        piece[i].x = Math.floor(piece[i].x);
        piece[i].y = Math.floor(piece[i].y);
        if (Math.floor(difference) == 1) {
            piece[i].x += 1;
            piece[i].y += 1;
        }
    }
    if (Math.floor(difference) == 1) {
        difference = 0;
    }
    render();
}
function select(index) {
    removing = false;
    repairing = false;
    piece = [];
    p.river = false;
    p.hill = false;
    p.entirehill = true;
    for (let i = 0; i != p.pieceROM[index].piecepositions.length; i++) {
        piece.push(p.pieceROM[index].piecepositions[i]);
    }
    if (p.pieceROM[index].name == 'Bridge') {
        p.river = true;
    }

    letter = p.pieceROM[index].letter;
    p_index = index;
    p.pieceROM[index];
    ispainting = true;
}
function cancel() {
    piece = [];
    removing = false;
    ispainting = false;
    repairing = false;
    render();
}

function displaytab() {
    const selectcontainer = document.getElementById('select-grid');
    const ele = document.getElementsByClassName('select-choice');
    for (let i = ele.length - 1; i > -1; i--) {
        ele[i].remove();
    }
    for (let i = 0, len = p.pieceROM.length; i < len; i++) {
        if (p.pieceROM[i].tab == tab) {
            const button = document.createElement('button');
            button.style.animation = 'none';
            button.innerHTML = p.pieceROM[i].name;
            button.className = 'select-choice';
            button.id = i;
            button.onclick = function () {
                select(button.id);
            };
            if (
                !p.pieceROM[i].requires() ||
                !p.pieceROM[i].unlocked ||
                (tutorialindex == 10 && p.pieceROM[i].name != 'Small Mine') ||
                (tutorialindex == 11 && p.pieceROM[i].name != 'Small Farm') ||
                (tutorialindex == 12 && p.pieceROM[i].name != 'Canopy')
            ) {
                button.disabled = true;
            } else {
                button.disabled = false;
                if (buildingamounts[i] < 1 && !psettings.noflash) {
                    button.style.animation = 'flash 2s step-start infinite';
                }
            }
            selectcontainer.insertBefore(button, document.getElementById('year_label'));
        }
    }
}
