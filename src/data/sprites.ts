/**
 * 8-bit Pixel Sprite Data
 * 
 * Each creature is defined as a 16x16 grid of color values.
 * Colors are hex strings; '' (empty) means transparent.
 * 
 * These are rendered to <canvas> elements at runtime for crisp pixel art.
 */

export type SpriteData = string[][];

// Helper to create a blank 16x16 grid
const blank = (): SpriteData => Array.from({ length: 16 }, () => Array(16).fill(''));

// Color palette
const C = {
    // Slime
    slimeLight: '#88ddff',
    slimeMid: '#55aadd',
    slimeDark: '#3388bb',
    slimeEye: '#ffffff',
    slimePupil: '#222244',
    // Elephant
    elephantLight: '#ccbbdd',
    elephantMid: '#aa99bb',
    elephantDark: '#887799',
    // Snake
    snakeLight: '#88ee88',
    snakeMid: '#55bb55',
    snakeDark: '#338833',
    snakeWing: '#eeeeff',
    // Turtle
    turtleShell: '#bb8844',
    turtleBody: '#77aa55',
    turtleGem: '#55eeff',
    // Behemoth
    behemothLight: '#dd9966',
    behemothMid: '#bb7744',
    behemothDark: '#995533',
    // Leviathan
    leviathanLight: '#5588dd',
    leviathanMid: '#3366bb',
    leviathanDark: '#224488',
    leviathanFin: '#99bbee',
    // Ziz
    zizLight: '#ee8844',
    zizMid: '#cc6622',
    zizDark: '#aa4400',
    zizFeather: '#ffdd44',
    // Akupara
    akuparaShell: '#44aa88',
    akuparaBody: '#338866',
    akuparaEarth: '#997755',
    // Mahapadma
    mahaLight: '#9988cc',
    mahaMid: '#7766aa',
    mahaDark: '#554488',
    mahaCrown: '#ffdd44',
    // Ouroboros
    ouroLight: '#44ddaa',
    ouroMid: '#22bb88',
    ouroDark: '#119966',
    // Jormungandr
    jormLight: '#7755cc',
    jormMid: '#5533aa',
    jormDark: '#331188',
    jormScale: '#aa88ff',
    // Yggdrasil
    treeLeaf: '#44bb44',
    treeTrunk: '#886633',
    treeGlow: '#ffffaa',
    treeRoot: '#664422',
};

const _ = ''; // transparent

// 2: マナスライム - A cute blob
const MANA_SLIME: SpriteData = (() => {
    const s = blank();
    const { slimeLight: l, slimeMid: m, slimeDark: d, slimeEye: e, slimePupil: p } = C;
    // Row 6-13 area for a small slime
    s[6] = [_, _, _, _, _, _, m, m, m, m, _, _, _, _, _, _];
    s[7] = [_, _, _, _, _, m, l, l, l, l, m, _, _, _, _, _];
    s[8] = [_, _, _, _, m, l, l, l, l, l, l, m, _, _, _, _];
    s[9] = [_, _, _, m, l, l, e, l, l, e, l, l, m, _, _, _];
    s[10] = [_, _, _, m, l, l, p, l, l, p, l, l, m, _, _, _];
    s[11] = [_, _, _, m, m, l, l, l, l, l, l, m, m, _, _, _];
    s[12] = [_, _, _, _, m, m, l, l, l, l, m, m, _, _, _, _];
    s[13] = [_, _, _, _, _, m, m, m, m, m, m, _, _, _, _, _];
    return s;
})();

// 4: ピグミーエレファント
const PYGMY_ELEPHANT: SpriteData = (() => {
    const s = blank();
    const { elephantLight: l, elephantMid: m, elephantDark: d, slimeEye: e, slimePupil: p } = C;
    s[4] = [_, _, _, _, _, m, m, _, _, _, _, _, _, _, _, _];
    s[5] = [_, _, _, _, m, l, l, m, m, m, m, _, _, _, _, _];
    s[6] = [_, _, _, _, m, l, l, l, l, l, l, m, _, _, _, _];
    s[7] = [_, _, _, m, l, e, l, l, l, e, l, l, m, _, _, _];
    s[8] = [_, _, _, m, l, p, l, l, l, p, l, l, m, _, _, _];
    s[9] = [_, _, _, _, m, l, l, l, l, l, l, m, _, _, _, _];
    s[10] = [_, _, _, _, m, l, m, m, l, l, m, _, _, _, _, _];
    s[11] = [_, _, _, _, _, m, _, m, l, m, _, _, _, _, _, _];
    s[12] = [_, _, _, _, m, l, m, _, m, l, m, _, _, _, _, _];
    s[13] = [_, _, _, _, m, m, _, _, _, m, m, _, _, _, _, _];
    return s;
})();

// 8: ウイング・スネーク
const WING_SNAKE: SpriteData = (() => {
    const s = blank();
    const { snakeLight: l, snakeMid: m, snakeDark: d, snakeWing: w, slimeEye: e, slimePupil: p } = C;
    s[4] = [_, _, _, w, _, _, _, _, _, _, _, _, w, _, _, _];
    s[5] = [_, _, w, w, _, _, _, _, _, _, _, _, w, w, _, _];
    s[6] = [_, w, w, _, _, _, m, m, m, _, _, _, _, w, w, _];
    s[7] = [_, _, _, _, _, m, l, l, l, m, _, _, _, _, _, _];
    s[8] = [_, _, _, _, m, l, e, l, e, l, m, _, _, _, _, _];
    s[9] = [_, _, _, _, m, l, p, l, p, l, m, _, _, _, _, _];
    s[10] = [_, _, _, _, _, m, l, l, l, m, _, _, _, _, _, _];
    s[11] = [_, _, _, _, _, _, m, l, m, _, _, _, _, _, _, _];
    s[12] = [_, _, _, _, _, _, _, m, _, _, _, _, _, _, _, _];
    s[13] = [_, _, _, _, _, _, m, d, m, _, _, _, _, _, _, _];
    return s;
})();

// 16: コア・タートル
const CORE_TURTLE: SpriteData = (() => {
    const s = blank();
    const { turtleShell: sh, turtleBody: b, turtleGem: g, slimeEye: e, slimePupil: p } = C;
    s[5] = [_, _, _, _, _, _, sh, sh, sh, sh, _, _, _, _, _, _];
    s[6] = [_, _, _, _, _, sh, sh, g, g, sh, sh, _, _, _, _, _];
    s[7] = [_, _, _, _, sh, sh, g, g, g, g, sh, sh, _, _, _, _];
    s[8] = [_, _, _, sh, sh, sh, sh, sh, sh, sh, sh, sh, _, _, _, _];
    s[9] = [_, _, b, e, b, sh, sh, sh, sh, sh, sh, b, e, b, _, _];
    s[10] = [_, _, b, p, b, sh, sh, sh, sh, sh, sh, b, p, b, _, _];
    s[11] = [_, _, _, b, b, _, sh, sh, sh, sh, _, b, b, _, _, _];
    s[12] = [_, _, _, _, b, b, _, _, _, _, b, b, _, _, _, _];
    return s;
})();

// 32: ベヒーモス
const BEHEMOTH: SpriteData = (() => {
    const s = blank();
    const { behemothLight: l, behemothMid: m, behemothDark: d, slimeEye: e, slimePupil: p } = C;
    s[3] = [_, _, _, m, m, _, _, _, _, _, _, m, m, _, _, _];
    s[4] = [_, _, m, l, l, m, _, _, _, _, m, l, l, m, _, _];
    s[5] = [_, _, m, l, l, l, m, m, m, m, l, l, l, m, _, _];
    s[6] = [_, m, l, l, l, l, l, l, l, l, l, l, l, l, m, _];
    s[7] = [_, m, l, e, l, l, l, l, l, l, l, l, e, l, m, _];
    s[8] = [_, m, l, p, l, l, l, l, l, l, l, l, p, l, m, _];
    s[9] = [_, _, m, l, l, l, l, l, l, l, l, l, l, m, _, _];
    s[10] = [_, _, m, d, l, l, l, l, l, l, l, l, d, m, _, _];
    s[11] = [_, _, _, m, m, l, l, l, l, l, l, m, m, _, _, _];
    s[12] = [_, _, m, m, _, m, m, _, _, m, m, _, m, m, _, _];
    s[13] = [_, _, m, m, _, m, m, _, _, m, m, _, m, m, _, _];
    return s;
})();

// 64: リヴァイアサン
const LEVIATHAN: SpriteData = (() => {
    const s = blank();
    const { leviathanLight: l, leviathanMid: m, leviathanDark: d, leviathanFin: f, slimeEye: e, slimePupil: p } = C;
    s[3] = [_, _, _, _, _, f, f, _, _, _, _, _, _, _, _, _];
    s[4] = [_, _, _, _, f, m, m, f, _, _, _, _, _, _, _, _];
    s[5] = [_, _, _, m, l, l, l, l, m, _, _, _, _, _, _, _];
    s[6] = [_, _, m, l, e, l, l, e, l, m, _, _, _, _, _, _];
    s[7] = [_, _, m, l, p, l, l, p, l, m, _, _, _, _, _, _];
    s[8] = [_, _, _, m, l, l, l, l, m, _, _, _, _, _, _, _];
    s[9] = [_, _, _, _, m, m, m, m, _, _, _, _, _, _, _, _];
    s[10] = [_, _, _, _, _, _, m, l, m, _, _, _, _, _, _, _];
    s[11] = [_, _, _, _, _, _, _, m, l, m, m, _, _, _, _, _];
    s[12] = [_, _, _, _, _, _, _, _, m, l, l, m, m, _, _, _];
    s[13] = [_, _, _, _, _, _, _, _, _, m, m, d, d, m, f, _];
    return s;
})();

// 128: ジズ
const ZIZ: SpriteData = (() => {
    const s = blank();
    const { zizLight: l, zizMid: m, zizDark: d, zizFeather: f, slimeEye: e, slimePupil: p } = C;
    s[3] = [_, _, _, _, _, _, _, f, f, _, _, _, _, _, _, _];
    s[4] = [_, _, _, _, _, _, f, m, m, f, _, _, _, _, _, _];
    s[5] = [_, _, _, _, _, m, l, l, l, l, m, _, _, _, _, _];
    s[6] = [_, _, _, _, m, l, e, l, l, e, l, m, _, _, _, _];
    s[7] = [_, _, _, _, m, l, p, l, l, p, l, m, _, _, _, _];
    s[8] = [_, f, f, m, m, l, l, l, l, l, l, m, m, f, f, _];
    s[9] = [f, l, m, l, l, l, l, l, l, l, l, l, l, m, l, f];
    s[10] = [_, f, _, m, m, l, l, l, l, l, l, m, m, _, f, _];
    s[11] = [_, _, _, _, _, m, l, l, l, l, m, _, _, _, _, _];
    s[12] = [_, _, _, _, _, m, m, _, _, m, m, _, _, _, _, _];
    return s;
})();

// 256: アクパーラ
const AKUPARA: SpriteData = (() => {
    const s = blank();
    const { akuparaShell: sh, akuparaBody: b, akuparaEarth: e } = C;
    s[2] = [_, _, _, _, _, _, e, e, e, e, _, _, _, _, _, _];
    s[3] = [_, _, _, _, _, e, e, e, e, e, e, _, _, _, _, _];
    s[4] = [_, _, _, _, e, e, e, e, e, e, e, e, _, _, _, _];
    s[5] = [_, _, _, sh, sh, sh, sh, sh, sh, sh, sh, sh, _, _, _, _];
    s[6] = [_, _, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, _, _, _];
    s[7] = [_, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, _, _];
    s[8] = [_, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, sh, _, _];
    s[9] = [b, '#ffffff', b, sh, sh, sh, sh, sh, sh, sh, sh, sh, b, '#ffffff', b, _];
    s[10] = [b, '#222244', b, _, sh, sh, sh, sh, sh, sh, sh, _, b, '#222244', b, _];
    s[11] = [_, b, b, _, _, sh, sh, sh, sh, sh, sh, _, _, b, b, _];
    s[12] = [_, _, _, _, b, b, _, _, _, _, b, b, _, _, _, _];
    s[13] = [_, _, _, _, b, b, _, _, _, _, b, b, _, _, _, _];
    return s;
})();

// 512: マハパドマ
const MAHAPADMA: SpriteData = (() => {
    const s = blank();
    const { mahaLight: l, mahaMid: m, mahaDark: d, mahaCrown: cr } = C;
    s[2] = [_, _, _, _, _, _, _, cr, cr, _, _, _, _, _, _, _];
    s[3] = [_, _, _, _, _, _, cr, cr, cr, cr, _, _, _, _, _, _];
    s[4] = [_, _, _, m, m, _, _, cr, cr, _, _, m, m, _, _, _];
    s[5] = [_, _, m, l, l, m, m, m, m, m, m, l, l, m, _, _];
    s[6] = [_, m, l, l, l, l, l, l, l, l, l, l, l, l, m, _];
    s[7] = [_, m, l, '#ffffff', l, l, l, l, l, l, l, l, '#ffffff', l, m, _];
    s[8] = [_, m, l, '#222244', l, l, l, l, l, l, l, l, '#222244', l, m, _];
    s[9] = [_, _, m, l, l, l, l, l, l, l, l, l, l, m, _, _];
    s[10] = [_, _, m, l, l, m, m, l, l, l, l, l, l, m, _, _];
    s[11] = [_, _, _, m, l, l, _, m, l, l, m, l, m, _, _, _];
    s[12] = [_, _, m, m, _, _, _, _, m, m, _, m, m, _, _, _];
    s[13] = [_, _, m, m, _, _, _, _, m, m, _, m, m, _, _, _];
    return s;
})();

// 1024: ウロボロス
const OUROBOROS: SpriteData = (() => {
    const s = blank();
    const { ouroLight: l, ouroMid: m, ouroDark: d } = C;
    s[3] = [_, _, _, _, _, m, m, m, m, m, m, _, _, _, _, _];
    s[4] = [_, _, _, m, m, l, l, _, _, l, l, m, m, _, _, _];
    s[5] = [_, _, m, l, _, _, _, _, _, _, _, _, l, m, _, _];
    s[6] = [_, m, l, _, _, _, _, _, _, _, _, _, _, l, m, _];
    s[7] = [_, m, l, _, _, _, '#ffffff', '#222244', _, _, _, _, _, l, m, _];
    s[8] = [_, m, l, _, _, _, _, _, _, _, _, _, _, l, m, _];
    s[9] = [_, m, l, _, _, _, _, _, _, _, _, _, _, l, m, _];
    s[10] = [_, _, m, l, _, _, _, _, _, _, _, _, l, m, _, _];
    s[11] = [_, _, _, m, m, l, _, _, _, _, l, m, m, _, _, _];
    s[12] = [_, _, _, _, _, m, m, d, d, m, m, _, _, _, _, _];
    s[13] = [_, _, _, _, _, _, d, m, m, d, _, _, _, _, _, _];
    return s;
})();

// 2048: ヨルムンガンド
const JORMUNGANDR: SpriteData = (() => {
    const s = blank();
    const { jormLight: l, jormMid: m, jormDark: d, jormScale: sc } = C;
    s[2] = [_, _, _, _, _, m, m, m, m, m, _, _, _, _, _, _];
    s[3] = [_, _, _, m, m, sc, l, l, l, sc, m, m, _, _, _, _];
    s[4] = [_, _, m, sc, l, '#ffffff', l, l, '#ffffff', l, sc, m, _, _, _, _];
    s[5] = [_, _, m, l, l, '#222244', l, l, '#222244', l, l, m, _, _, _, _];
    s[6] = [_, m, sc, l, l, l, l, l, l, l, l, l, sc, m, _, _];
    s[7] = [_, m, l, l, l, l, l, l, l, l, l, l, l, m, _, _];
    s[8] = [_, _, m, m, m, l, l, l, l, l, m, m, m, _, _, _];
    s[9] = [_, _, _, _, m, sc, m, m, m, sc, m, _, _, _, _, _];
    s[10] = [_, _, _, m, sc, l, l, l, l, l, sc, m, _, _, _, _];
    s[11] = [_, m, m, sc, l, l, l, l, l, l, l, sc, m, m, _, _];
    s[12] = [m, sc, l, l, l, m, m, m, m, l, l, l, sc, m, _, _];
    s[13] = [_, m, m, _, _, _, _, _, _, _, m, m, _, _, _, _];
    return s;
})();

// 4096: 世界樹ユグドラシル
const YGGDRASIL: SpriteData = (() => {
    const s = blank();
    const { treeLeaf: le, treeTrunk: t, treeGlow: g, treeRoot: r } = C;
    s[1] = [_, _, _, _, _, _, _, g, g, _, _, _, _, _, _, _];
    s[2] = [_, _, _, _, _, _, le, g, g, le, _, _, _, _, _, _];
    s[3] = [_, _, _, _, _, le, le, le, le, le, le, _, _, _, _, _];
    s[4] = [_, _, _, _, le, le, le, le, le, le, le, le, _, _, _, _];
    s[5] = [_, _, _, le, le, le, le, le, le, le, le, le, le, _, _, _];
    s[6] = [_, _, le, le, le, le, le, le, le, le, le, le, le, le, _, _];
    s[7] = [_, _, _, le, le, le, le, le, le, le, le, le, le, _, _, _];
    s[8] = [_, _, _, _, le, le, le, le, le, le, le, le, _, _, _, _];
    s[9] = [_, _, _, _, _, _, _, t, t, _, _, _, _, _, _, _];
    s[10] = [_, _, _, _, _, _, _, t, t, _, _, _, _, _, _, _];
    s[11] = [_, _, _, _, _, _, _, t, t, _, _, _, _, _, _, _];
    s[12] = [_, _, _, _, _, r, r, t, t, r, r, _, _, _, _, _];
    s[13] = [_, _, _, _, r, r, _, t, t, _, r, r, _, _, _, _];
    s[14] = [_, _, _, r, r, _, _, _, _, _, _, r, r, _, _, _];
    return s;
})();

export const SPRITES: Record<number, SpriteData> = {
    2: MANA_SLIME,
    4: PYGMY_ELEPHANT,
    8: WING_SNAKE,
    16: CORE_TURTLE,
    32: BEHEMOTH,
    64: LEVIATHAN,
    128: ZIZ,
    256: AKUPARA,
    512: MAHAPADMA,
    1024: OUROBOROS,
    2048: JORMUNGANDR,
    4096: YGGDRASIL,
};

/**
 * Render a sprite to a canvas and return its data URL.
 * The canvas is 16x16 logical pixels, scaled up by `scale`.
 */
export function renderSpriteToDataUrl(sprite: SpriteData, scale: number = 4): string {
    const canvas = document.createElement('canvas');
    canvas.width = 16 * scale;
    canvas.height = 16 * scale;
    const ctx = canvas.getContext('2d')!;

    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const color = sprite[y]?.[x];
            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    }

    return canvas.toDataURL('image/png');
}
