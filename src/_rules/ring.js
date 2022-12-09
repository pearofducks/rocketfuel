import { colorResolver, handler as h } from '../utils';
import { varEmpty } from './static';
export const ringBase = {
    '--un-ring-inset': varEmpty,
    '--un-ring-offset-width': '0px',
    '--un-ring-offset-color': '#fff',
    '--un-ring-width': '0px',
    '--un-ring-color': 'rgba(147,197,253,0.5)',
    '--un-shadow': '0 0 rgba(0,0,0,0)',
};
export const rings = [
    // size
    [/^ring(?:-(.+))?$/, ([, d], { theme }) => {
            var _a, _b;
            const value = (_b = (_a = theme.ringWidth) === null || _a === void 0 ? void 0 : _a[d || 'DEFAULT']) !== null && _b !== void 0 ? _b : h.px(d || '1');
            if (value) {
                return {
                    '--un-ring-width': value,
                    '--un-ring-offset-shadow': 'var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)',
                    '--un-ring-shadow': 'var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)',
                    'box-shadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
                };
            }
        }, { autocomplete: 'ring-$ringWidth' }],
    [/^ring-(?:width-|size-)(.+)$/, ([, d], { theme }) => { var _a, _b; return ({ '--un-ring-width': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[d]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.px(d) }); }, { autocomplete: 'ring-(width|size)-$lineWidth' }],
    // offset size
    ['ring-offset', { '--un-ring-offset-width': '1px' }],
    [/^ring-offset-(?:width-|size-)?(.+)$/, ([, d], { theme }) => { var _a, _b; return ({ '--un-ring-offset-width': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[d]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.px(d) }); }, { autocomplete: 'ring-offset-(width|size)-$lineWidth' }],
    // colors
    [/^ring-(.+)$/, colorResolver('--un-ring-color', 'ring'), { autocomplete: 'ring-$colors' }],
    [/^ring-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-ring-opacity': h.bracket.percent(opacity) }), { autocomplete: 'ring-(op|opacity)-<percent>' }],
    // offset color
    [/^ring-offset-(.+)$/, colorResolver('--un-ring-offset-color', 'ring-offset'), { autocomplete: 'ring-offset-$colors' }],
    [/^ring-offset-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-ring-offset-opacity': h.bracket.percent(opacity) }), { autocomplete: 'ring-offset-(op|opacity)-<percent>' }],
    // style
    ['ring-inset', { '--un-ring-inset': 'inset' }],
];
