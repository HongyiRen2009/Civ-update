const tileindex = {};
const tiles = [
    {
        type: 'grass',
        image: false,
        color: 'rgb(51, 166, 59)',
        r: 51,
        g: 166,
        b: 59,
    },
    {
        type: 'hill',
        image: false,
        color: 'rgb(103, 104, 107)',
        r: 103,
        g: 104,
        b: 107,
    },
    {
        type: 'sand',
        image: false,
        color: 'rgb(255, 227, 160)',
        r: 255,
        g: 227,
        b: 160,
    },
    {
        type: 'river',
        image: false,
        color: 'rgb(3,172,252)',
        r: 3,
        g: 172,
        b: 252,
    },
    {
        type: 'lake',
        image: false,
        color: 'rgb(3,172,252)',
        r: 3,
        g: 172,
        b: 252,
    },
    {
        type: 'desert',
        image: false,
        color: 'rgb(241, 190, 108)',
        r: 241,
        g: 190,
        b: 108,
    },
    {
        type: 'jungle',
        image: false,
        color: 'rgb(49, 85, 39)',
        r: 49,
        g: 85,
        b: 39,
    },
    {
        type: 'snow',
        image: false,
        color: 'rgb(255,255,255)',
        r: 255,
        g: 255,
        b: 255,
    },
    {
        type: 'ice',
        image: false,
        color: 'rgb(63,208,212)',
        r: 63,
        g: 208,
        b: 212,
    },
    {
        type: 'savanna',
        image: false,
        color: 'rgb(209,189,146)',
        r: 209,
        g: 189,
        b: 146,
    },
];
for (let i = 0, len = tiles.length; i < len; i++) {
    tileindex[tiles[i].type] = i;
}

function tilecode(x, y) {
    return x + '/' + y;
}
function tiledecode(code) {
    return {
        x: parseInt(code.slice(0, code.indexOf('/'))),
        y: parseInt(code.substr(code.indexOf('/') + 1, code.length)),
    };
}
function addTile(index, x, y) {
    tilestats[tilecode(x, y)] = tileindex[index];
    ctx3.fillStyle = tiles[tileindex[index]].color;
    ctx3.fillRect(x, y, 1, 1);
}
function exists(type, x, y) {
    return tilestats[tilecode(x, y)] == tileindex[type];
}
function isLand(x, y) {
    return tilestats[tilecode(x, y)] != undefined && tilestats[tilecode(x, y)] != tileindex['lake'];
}
function removetile(x, y) {
    delete tilestats[tilecode(x, y)];
}
class Perlin {
    constructor(width, height, seed) {
        /** @type {number} */
        this.width = width;
        /** @type {number} */
        this.height = height;

        this.seed = seed;

        /** @type {{x: number, y: number}[]}*/
        this.gradients = [];
        for (let i = 0; i < (this.width + 1) * (this.height + 1); i++) {
            const x = i % (this.width + 1);
            const y = Math.floor(i / (this.height + 1));
            this.gradients.push(this.getRandomGradient(x, y));
        }
    }

    getRandomGradient(x, y) {
        // basically stolen from https://stackoverflow.com/a/8831937/13996389
        let a = x;
        let b = y;
        let c = this.seed;
        let d = a + b;

        let t = 0;

        for (let i = 0; i < 20; i++) {
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            d >>>= 0;
            t = (a + b) | 0;
            a = b ^ (b >>> 9);
            b = (c + (c << 3)) | 0;
            c = (c << 21) | (c >>> 11);
            d = (d + 1) | 0;
            t = (t + d) | 0;
            c = (c + t) | 0;
        }
        const random = (t >>> 0) / 4294967296;

        const angle = random * 2 * Math.PI;
        return { x: Math.cos(angle), y: Math.sin(angle) };
    }

    getDotProduct(x1, y1, x2, y2) {
        return x1 * x2 + y1 * y2;
    }

    calculateDotProduct(pointX, pointY, cornerX, cornerY) {
        const cornerGradient = this.gradients[cornerX + cornerY * this.height];
        const offsetX = pointX - cornerX;
        const offsetY = pointY - cornerY;

        const dotProduct = this.getDotProduct(cornerGradient.x, cornerGradient.y, offsetX, offsetY);

        return dotProduct;
    }

    smootherStep(x) {
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    }

    interpolate(fromValue, toValue, byAmount) {
        return (toValue - fromValue) * this.smootherStep(byAmount) + fromValue;
    }

    /**
     * @param x {number}
     * @param y {number}
     * @returns {number}
     */
    getPixel(x, y) {
        // find the four corners of the tile the give point is in
        const cornerX0 = Math.floor(x);
        const cornerX1 = cornerX0 + 1;
        const cornerY0 = Math.floor(y);
        const cornerY1 = cornerY0 + 1;

        const offsetX = x - cornerX0;
        const offsetY = y - cornerY0;

        // generate the four dot products
        const dotProduct0 = this.calculateDotProduct(x, y, cornerX0, cornerY0); // top left
        const dotProduct1 = this.calculateDotProduct(x, y, cornerX1, cornerY0); // top right
        const dotProduct2 = this.calculateDotProduct(x, y, cornerX1, cornerY1); // bottom right
        const dotProduct3 = this.calculateDotProduct(x, y, cornerX0, cornerY1); // bottom left

        const interpolated0 = this.interpolate(dotProduct0, dotProduct1, offsetX);
        const interpolated1 = this.interpolate(dotProduct3, dotProduct2, offsetX);

        const interpolated2 = this.interpolate(interpolated0, interpolated1, offsetY);
        // interpolated2 ∊ [-1, 1]

        return interpolated2;
    }
}

function generaterivers() {
    const HEIGHT = 500;
    const WIDTH = 500;
    //revert back to 999 after testing is done
    const NODE_HEIGHT = 30;
    const NODE_WIDTH = 30;

    const pointLocationsCount = Array(WIDTH * HEIGHT).fill(0);

    let pointLocations = [];
    for (let x = 0; x < WIDTH; x += 50) {
        for (let y = 0; y < HEIGHT; y += 50) {
            pointLocations.push({ x, y });
        }
    }

    for (let iteration = 0; iteration < 150; iteration++) {
        const newPoints = [];
        for (const point of pointLocations) {
            const pixelColor = perlin17.getPixel(
                (Math.round(point.x) * NODE_WIDTH) / WIDTH,
                (Math.round(point.y) * NODE_HEIGHT) / HEIGHT
            );

            const directionX = Math.cos(pixelColor * 4 * Math.PI);
            const directionY = Math.sin(pixelColor * 4 * Math.PI);

            const newPoint = { x: point.x + directionX, y: point.y + directionY };

            const xOutOfBounds = newPoint.x < 0 || newPoint.x > WIDTH;
            const yOutOfBounds = newPoint.y < 0 || newPoint.y > HEIGHT;
            if (xOutOfBounds || yOutOfBounds) continue;

            let pixelIndex = Math.round(newPoint.x) + Math.round(newPoint.y) * HEIGHT;
            // not sure why this case triggers
            if (pointLocationsCount[pixelIndex] === undefined) {
                pointLocationsCount[pixelIndex] = 0;
            }
            pointLocationsCount[pixelIndex]++;
            newPoints.push(newPoint);
            //return newPoint;
        }
        pointLocations = newPoints;
    }

    const adjust = (x) => x ** 0.3;
    let max = 0;
    for (const a of pointLocationsCount) {
        if (a > max) {
            max = a;
        }
    }
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let i = x + y * WIDTH;
            let pixelValue = pointLocationsCount[i];
            let pixelColor = pixelValue / max;
            pixelColor = adjust(pixelColor);
            if (pixelColor > 0.5) {
                addTile('river', x * 2, y * 2);
                addTile('river', x * 2 + 1, y * 2 + 1);
                addTile('river', x * 2 + 1, y * 2);
                addTile('river', x * 2, y * 2 + 1);
                addTile('river', x * 2 + 2, y * 2 + 1);
                addTile('river', x * 2 + 2, y * 2);
                addTile('river', x * 2 + 2, y * 2 + 2);
                addTile('river', x * 2 + 1, y * 2 + 2);
                addTile('river', x * 2, y * 2 + 2);
            }
        }
    }
}

function calcbiome(temp, hum) {
    if (temp < -0.3) {
        return { biome: 'snow' };
    } else if (hum < -0.3) {
        return { biome: 'desert' };
    } else if (hum < 0) {
        return { biome: 'savanna' };
    } else if (hum > 0.3) {
        return { biome: 'jungle' };
    }
    return { biome: 'grass' };
}
function getHeight(xpos, ypos) {
    return (
        (perlin.getPixel(xpos / (5000 / nodes[0]), ypos / (5000 / nodes[0])) +
            perlin2.getPixel(xpos / (5000 / nodes[1]), ypos / (5000 / nodes[1])) * 0.7 +
            perlin3.getPixel(xpos / (5000 / nodes[2]), ypos / (5000 / nodes[2])) * 0.5 +
            perlin4.getPixel(xpos / (5000 / nodes[3]), ypos / (5000 / nodes[3])) * 0.15 +
            perlin5.getPixel(xpos / (5000 / nodes[4]), ypos / (5000 / nodes[4])) * 0.125) **
        2
    );
}
function rerenderchunks(x, y, findSutiableSpots = false) {
    for (let i = y; i < y + 50; i++) {
        for (let j = x; j < x + 50; j++) {
            const xpos = j;
            let sutible = true;
            const ypos = i;

            const height = getHeight(xpos, ypos);

            const temp =
                perlin6.getPixel(xpos / (5000 / nodes[5]), ypos / (5000 / nodes[5])) +
                perlin7.getPixel(xpos / (5000 / nodes[6]), ypos / (5000 / nodes[6])) +
                perlin8.getPixel(xpos / (5000 / nodes[7]), ypos / (5000 / nodes[7]));

            const lakeheight =
                (perlin12.getPixel(xpos / (5000 / nodes[8]), ypos / (5000 / nodes[8])) +
                    perlin13.getPixel(xpos / (5000 / nodes[9]), ypos / (5000 / nodes[9])) <
                0
                    ? 0
                    : perlin12.getPixel(xpos / (5000 / nodes[8]), ypos / (5000 / nodes[8])) +
                      perlin13.getPixel(xpos / (5000 / nodes[9]), ypos / (5000 / nodes[9]))) * 0.25;

            if (
                tilestats[tilecode(xpos, ypos)] != undefined &&
                tilestats[tilecode(xpos, ypos)] == tileindex['river']
            ) {
                if (height < 0.02 + lakeheight && height > 0.015) {
                    addTile('lake', xpos, ypos);
                } else {
                    if (height < 0.015) {
                        removetile(xpos, ypos);
                        ctx3.clearRect(j, i, 1, 1);

                        continue;
                    }
                    if (temp < -0.3) {
                        addTile('ice', xpos, ypos);
                    }
                    continue;
                }
            }
            if (height > 0.55) {
                addTile('snow', xpos, ypos);
            } else if (height > 0.3) {
                addTile('hill', xpos, ypos);
            } else if (height > 0.05 + lakeheight) {
                const hum =
                    perlin9.getPixel(xpos / (5000 / nodes[5]), ypos / (5000 / nodes[5])) +
                    perlin10.getPixel(
                        (xpos * 1.5) / (5000 / nodes[6]),
                        (ypos * 1.5) / (5000 / nodes[6])
                    ) +
                    perlin11.getPixel(
                        (xpos * 2) / (5000 / nodes[7]),
                        (ypos * 2) / (5000 / nodes[7])
                    );
                const tileBiome = calcbiome(temp, hum);
                addTile(tileBiome.biome, xpos, ypos);
            } else if (height > 0.02 + lakeheight) {
                addTile('sand', xpos, ypos);
            } else if (height > 0.015) {
                sutible = false;
                if (temp < -0.3) {
                    addTile('ice', xpos, ypos);
                } else {
                    addTile('lake', xpos, ypos);
                }
            } else {
                sutible = false;
            }
            if (sutible && getRandomInt(0, 1000) == 0 && findSutiableSpots) {
                sutibleSpawns.push({ x: xpos, y: ypos });
            }
        }
    }
    loadedchunks.push(tilecode(Math.floor(x / 50), Math.floor(y / 50)));
}
