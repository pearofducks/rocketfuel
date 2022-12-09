import { toArray } from '@unocss/core';
import { colorResolver, colorableShadows, handler as h } from '../utils';
const weightMap = {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
    // int[0, 900] -> int
};
export const fonts = [
    // family
    [
        /^font-(.+)$/,
        ([, d], { theme }) => { var _a; return ({ 'font-family': ((_a = theme.fontFamily) === null || _a === void 0 ? void 0 : _a[d]) || h.bracket.cssvar.global(d) }); },
        { autocomplete: 'font-$fontFamily' },
    ],
    // size
    [
        /^text-(.+)$/,
        ([, s = 'base'], { theme }) => {
            var _a;
            const themed = toArray((_a = theme.fontSize) === null || _a === void 0 ? void 0 : _a[s]);
            if (themed === null || themed === void 0 ? void 0 : themed[0]) {
                const [size, height = '1'] = themed;
                return {
                    'font-size': size,
                    'line-height': height,
                };
            }
            return { 'font-size': h.bracketOfLength.rem(s) };
        },
        { autocomplete: 'text-$fontSize' },
    ],
    [/^text-size-(.+)$/, ([, s], { theme }) => {
            var _a, _b;
            const themed = toArray((_a = theme.fontSize) === null || _a === void 0 ? void 0 : _a[s]);
            const size = (_b = themed === null || themed === void 0 ? void 0 : themed[0]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.global.rem(s);
            if (size != null)
                return { 'font-size': size };
        }, { autocomplete: 'text-size-$fontSize' }],
    // weights
    [
        /^(?:font|fw)-?([^-]+)$/,
        ([, s]) => ({ 'font-weight': weightMap[s] || h.global.number(s) }),
        { autocomplete: `(font|fw)-(100|200|300|400|500|600|700|800|900|${Object.keys(weightMap).join('|')})` },
    ],
    // leadings
    [
        /^(?:font-)?(?:leading|lh)-(.+)$/,
        ([, s], { theme }) => { var _a; return ({ 'line-height': ((_a = theme.lineHeight) === null || _a === void 0 ? void 0 : _a[s]) || h.bracket.cssvar.global.rem(s) }); },
        { autocomplete: '(leading|lh)-$lineHeight' },
    ],
    // synthesis
    ['font-synthesis-weight', { 'font-synthesis': 'weight' }],
    ['font-synthesis-style', { 'font-synthesis': 'style' }],
    ['font-synthesis-small-caps', { 'font-synthesis': 'small-caps' }],
    ['font-synthesis-none', { 'font-synthesis': 'none' }],
    [/^font-synthesis-(.+)$/, ([, s]) => ({ 'font-synthesis': h.bracket.cssvar.global(s) })],
    // tracking
    [
        /^(?:font-)?tracking-(.+)$/,
        ([, s], { theme }) => { var _a; return ({ 'letter-spacing': ((_a = theme.letterSpacing) === null || _a === void 0 ? void 0 : _a[s]) || h.bracket.cssvar.global.rem(s) }); },
        { autocomplete: 'tracking-$letterSpacing' },
    ],
    // word-spacing
    [
        /^(?:font-)?word-spacing-(.+)$/,
        ([, s], { theme }) => { var _a; return ({ 'word-spacing': ((_a = theme.wordSpacing) === null || _a === void 0 ? void 0 : _a[s]) || h.bracket.cssvar.global.rem(s) }); },
        { autocomplete: 'word-spacing-$wordSpacing' },
    ],
];
export const tabSizes = [
    [/^tab(?:-(.+))?$/, ([, s]) => {
            const v = h.bracket.cssvar.global.number(s || '4');
            if (v != null) {
                return {
                    '-moz-tab-size': v,
                    '-o-tab-size': v,
                    'tab-size': v,
                };
            }
        }],
];
export const textIndents = [
    [/^indent(?:-(.+))?$/, ([, s], { theme }) => { var _a; return ({ 'text-indent': ((_a = theme.textIndent) === null || _a === void 0 ? void 0 : _a[s || 'DEFAULT']) || h.bracket.cssvar.global.fraction.rem(s) }); }, { autocomplete: 'indent-$textIndent' }],
];
export const textStrokes = [
    // widths
    [/^text-stroke(?:-(.+))?$/, ([, s], { theme }) => { var _a; return ({ '-webkit-text-stroke-width': ((_a = theme.textStrokeWidth) === null || _a === void 0 ? void 0 : _a[s || 'DEFAULT']) || h.bracket.cssvar.px(s) }); }, { autocomplete: 'text-stroke-$textStrokeWidth' }],
    // colors
    [/^text-stroke-(.+)$/, colorResolver('-webkit-text-stroke-color', 'text-stroke'), { autocomplete: 'text-stroke-$colors' }],
    [/^text-stroke-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-text-stroke-opacity': h.bracket.percent(opacity) }), { autocomplete: 'text-stroke-(op|opacity)-<percent>' }],
];
export const textShadows = [
    [/^text-shadow(?:-(.+))?$/, ([, s], { theme }) => {
            var _a;
            const v = (_a = theme.textShadow) === null || _a === void 0 ? void 0 : _a[s || 'DEFAULT'];
            if (v != null) {
                return {
                    '--un-text-shadow': colorableShadows(v, '--un-text-shadow-color').join(','),
                    'text-shadow': 'var(--un-text-shadow)',
                };
            }
            return { 'text-shadow': h.bracket.cssvar.global(s) };
        }, { autocomplete: 'text-shadow-$textShadow' }],
    // colors
    [/^text-shadow-color-(.+)$/, colorResolver('--un-text-shadow-color', 'text-shadow'), { autocomplete: 'text-shadow-color-$colors' }],
    [/^text-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-text-shadow-opacity': h.bracket.percent(opacity) }), { autocomplete: 'text-shadow-color-(op|opacity)-<percent>' }],
];
