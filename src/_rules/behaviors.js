import { colorResolver, globalKeywords, handler as h } from '../utils';
export const outline = [
    // size
    [/^outline-(?:width-|size-)?(.+)$/, ([, d], { theme }) => { var _a, _b; return ({ 'outline-width': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[d]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.global.px(d) }); }, { autocomplete: 'outline-(width|size)-<num>' }],
    // color
    [/^outline-(?:color-)?(.+)$/, colorResolver('outline-color', 'outline-color'), { autocomplete: 'outline-$colors' }],
    // offset
    [/^outline-offset-(.+)$/, ([, d], { theme }) => { var _a, _b; return ({ 'outline-offset': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[d]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.global.px(d) }); }, { autocomplete: 'outline-(offset)-<num>' }],
    // style
    ['outline', { 'outline-style': 'solid' }],
    ...['auto', 'dashed', 'dotted', 'double', 'hidden', 'solid', 'groove', 'ridge', 'inset', 'outset', ...globalKeywords].map(v => [`outline-${v}`, { 'outline-style': v }]),
    ['outline-none', { 'outline': '2px solid transparent', 'outline-offset': '2px' }],
];
export const appearance = [
    ['appearance-none', {
            'appearance': 'none',
            '-webkit-appearance': 'none',
        }],
];
const willChangeProperty = (prop) => {
    var _a;
    return (_a = h.properties.auto.global(prop)) !== null && _a !== void 0 ? _a : {
        contents: 'contents',
        scroll: 'scroll-position',
    }[prop];
};
export const willChange = [
    [/^will-change-(.+)/, ([, p]) => ({ 'will-change': willChangeProperty(p) })],
];
