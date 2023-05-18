const maxRgbValue = 255;

function round(x, n) {
    return n
        ? Math.round(x * (n = Math.pow(10, n))) / n
        : Math.round(x);
}

function mixColors(base, added) {
    const a = round(added.a * maxRgbValue, 17);

    return {
        r: Math.round((round(round(maxRgbValue - a, 17) * base.r, 17) + round(a * added.r, 17))/maxRgbValue),
        g: Math.round((round(round(maxRgbValue - a, 17) * base.g, 17) + round(a * added.g, 17))/maxRgbValue),
        b: Math.round((round(round(maxRgbValue - a, 17) * base.b, 17) + round(a * added.b, 17))/maxRgbValue)
    };
}

function toHex(number) {
    let result = number.toString(16);
    if( result.length < 2 ) {
      result = '0' + result;
    }
    return result;
}

function toHexColor(rgbColor) {
    return '#' + toHex(rgbColor.r) + toHex(rgbColor.g) + toHex(rgbColor.b);
}

export function hexToRgba(hexStr) {
    return {
        r: parseInt(hexStr[0] + hexStr[1], 16),
        g: parseInt(hexStr[2] + hexStr[3], 16),
        b: parseInt(hexStr[4] + hexStr[5], 16),
        a: hexStr[6] && hexStr[7] ? round(parseInt(hexStr[6] + hexStr[7], 16)/maxRgbValue, 2) : 1,
    };
}

function toRgba(str) {
    let rgb = str.replace('rgb(', '');
    rgb = rgb.replace('rgba(', '');
    rgb = rgb.replace(')', '');
    rgbArr = rgb.split(',').map(r => Number(r));
    return {
        r: rgbArr[0],
        g: rgbArr[1],
        b: rgbArr[2],
        a: rgbArr[3] === undefined ? 1 : rgbArr[3],
    }
}

function readColor(str) {
    if (str.startsWith('#')) {
        const hex = str.replace('#', '');
        switch (hex.length) {
            case 3:
                return hexToRgba(hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]);
            case 6:
            case 8:
                return hexToRgba(hex);
        }
    }
    if (str.startsWith('rgb')) {
        return toRgba(str);
    }
}

export function mixLayersOfColors(colorArr) {
    let startingBackgroundColor = readColor(colorArr[colorArr.length - 1]);

    while(colorArr.length > 1) {
        const color = readColor(colorArr.shift());
        startingBackgroundColor = mixColors(startingBackgroundColor, color);
    }

    return toHexColor(startingBackgroundColor);
}
